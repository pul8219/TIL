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