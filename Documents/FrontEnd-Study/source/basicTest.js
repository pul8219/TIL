// // function Cat(name){
// //     this.name = name;
// // }

// // Cat.prototype.speak = function(){
// //     console.log(`${this.name} makes a noise`);
// // };

// // function Lion(name){
// //     Cat.call(this, name);
// // }

// // console.log(Lion.prototype);

// // Lion.prototype = Object.create(Cat.prototype);

// // //console.log(Lion.prototype);
// // //console.log(Lion.prototype.__proto__);


// // Lion.prototype.constructor = Lion;

// // console.log(Lion.prototype);
// // console.log(Lion.prototype.__proto__);
// // console.dir(Lion);

// class Cat{
//     constructor(name){
//         this.name = name;
//     }

//     speak(){
//         console.log(`${this.name} makes a noise`);
//     }

// }

// class Lion extends Cat{
    
//     // constructor(name){
//     //     super();
//     //     this.name = name;
//     // }
//     speak(){
//         super.speak();
//         console.log(`${this.name} roars`);

//     }
// }

// console.dir(Cat);
// console.dir(Lion);

// const lion = new Lion("Samba");
// console.dir(lion);
// // console.dir(lion);

// // lion.speak();


// class Example {
//     constructor() {
//       const proto = Object.getPrototypeOf(this);
//       console.log(Object.getOwnPropertyNames(proto));
//     }
//     first(){}
//     second(){}
//     static third(){}
//   }
  
//   new Example(); // ['constructor', 'first', 'second']

const Style = (_ => {
  const prop = new Map, prefix = 'webkt,moz,ms,chrome,o,khtml'.split(',');
  const NONE = Symbol();
  const BASE = document.body.style;
  const getKey = key => {
    if(prop.has(key)) return prop.get(key);
    if(key in BASE) prop.set(key, key);
    else if(!prefix.some(v =>{
      const newKey = v + key[0].toUpperCase() + key.substr(1);
      if(newKey in BASE){ 
        prop.set(key, newKey);
        key = newKey;
        return true; 
      } else return false;
    })){
      prop.set(key, NONE);
      key = NONE;
    }
    return key;
  }; // end of getKey()
  return class{
    constructor(style){this._style = style;} // 생성자에 style객체를 준다. 이 클래스는 style 객체를 안고 태어난다.
    // 키를 얻기(스타일 시트에 있는 background라는 값을 얻고싶다면?)
    get(key){
      key = getKey(key); // 반드시 getKey에 보내서 진짜 이름을 얻어야 한다.
      if(key === NONE) return null; // 브라우저가 지원하지 않는 경우 부드럽게 null을 리턴하기 // Unsupported Property 문제 해결!
      return this._style[key]; // 이름이 있다면 진짜 이름으로 style객체에 해당 속성값을 가져오자

    }
    set(key, val){
      key = getKey(key);
      // key가 NONE이 아니면
      if(key !== NONE) this._style[key] = val; // 값을 설정
      // NONE이면 스타일을 아예 건들지 않는다(Graceful Fail)
      return this; // set을 계속 호출하는 경우가 많아서 set을 쓸 수 있게 this를 리턴

    }
  };
})();

const Rule = class{
  constructor(rule){
    this._rule = rule;
    this._style = new Style(rule.style);
  }
  get(key){
    return this._style.get(key);
  }
  set(key, val){
    this._style.set(key, val);
    return this;
  }
};

const Sheet = class {
  constructor(sheet){
    this._sheet = sheet;
    this._rules = new Map;
  }
  add(selector){
    const index = this._sheet.cssRules.length;
    this._sheet.insertRule(`${selector}{}`, index); 
    const cssRule = this._sheet.cssRules[index]; // 여기엔 style rule이 올 수도, keyframe rule이 올 수도 있다.
    // const rule = new Rule(cssRule); // 여기에서 관여해야한다.
    let rule;
    if(selector.startsWith('@keyframes')){ // keyframe rule 일 경우
      rule = new KeyFramesRule(cssRule); // KeyFramesRule 객체를 만들어 관련작업을 이 객체에 위임한다.
    } else{ // style rule일 경우
      rule = new Rule(cssRule);
    }
    this._rules.set(selector, rule);
    return rule;
  }
  remove(selector){
    if(!this._rules.contains(selector)) return;
    const rule = this._rules.get(selector)._rule;
    Array.from(this._sheet.cssRules).some((cssRule, index) => {
      if(cssRule === rule._rule){
        this._sheet.deleteRule(index);
        return true;
      }
    });
  }
  get(selector){return this._rule.get(selector);}

};


// const Rule = class {
//   constructor(rule){
//     this._rule = rule;
//     this._style = new Style(rule.style);
//   }
//   // ...
// };

// KeyFramesRule은 Sheet 객체와 생김새가 똑같다.
// keyframes 내부가 스타일 시트처럼 생겼기 때문이다.
// 유일한 차이점은 rule을 넣을 때 insertRule 대신 appendRule을 써야한다.(w3c 표준)

const KeyFramesRule = class{
  constructor(rule){
    this._keyframe = rule;
    this._rules = new Map;
  }
  add(selector){
    const index = this._keyframe.cssRules.length;
    this._keyframe.appendRule(`${selector}{}`);
    const cssRule = this._keyframe.cssRules[index];
    const rule = new Rule(cssRule);
    this._rules.set(selector, rule);
    return rule;
  }
  remove(selector){
    if(!this._rules.contains(selector)) return;
    const rule = this._rules.get(selector)._rule;
    Array.from(this._keyframe.cssRules).some((cssRule, index) => {
      if(cssRule === rule._rule){
        this._keyframe.deleteRule(index);
        return true;
      }
    });
  }
};


const sheet = new Sheet(document.styleSheets[0]);
const size = sheet.add('@keyframes size'); // keyframes rule 객체가 리턴됨
size.add("from").set("width", "0"); // Rule 객체가 리턴되므로 set 을 호출할 수 있음
size.add("to").set("width", "500px");

// sheet.add('body').set('background', '#f00');
// sheet.add('.test').set('cssText', `
//   width:200px;
//   border:1px solid #fff;
//   color: #000;
//   background: #fff
// `);