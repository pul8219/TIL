# Prototype

- `__proto__`: 객체가 생성될 때 그 객체의 조상(부모)인 함수의 프로토타입 오브젝트를 가리키는 것

# Object.create() & Prototype 기반 상속 구현

> 프로토타입 객체 및 속성을 갖는 새 객체를 만들어준다.

```js
// Super class
function Cat(name) {
  this.name = name;
}

Cat.prototype.speak = function () {
  console.log(`${this.name} makes a noise`);
};

// Subclass
function Lion(name) {
  Cat.call(this, name); // Super class의 생성자 호출(& call로 this 지정)
}
```

현재 상태에서 console.log를 확인해보자.

```js
console.log(Lion.prototype);
// {constructor: f}
//      ▶️ constructor: ƒ Lion(name)
//      ▶️ __proto__: Object
```

Object.create() 함수를 사용하고 console.dir을 출력한 후 위에서 나온 결과와 비교해보자.

```js
Lion.prototype = Object.create(Cat.prototype);

console.log(Lion.prototype);
// Cat {}       -> 빈 객체. 즉 새 객체가 만들어졌다.
//      ▶️ __proto__: Object // Cat prototype object를 가리키고 있다.

console.log(Lion.prototype.__proto__);
// {speak: f, constructor: f}
//      ▶️ speak: f()
//      ▶️ constructor: f Cat(name)
//      ▶️ __proto__: Object
```

Object.create()를 사용할 경우 새로 만들어진 객체에는 constructor 프로퍼티가 없다. constructor 프로퍼티를 만들고 그 프로퍼티가 자신을 생성한 함수를 가리키도록 할당해줘야한다.

```js
function Cat(name) {
  this.name = name;
}

Cat.prototype.speak = function () {
  console.log(`${this.name} makes a noise`);
};

function Lion(name) {
  Cat.call(this, name);
}

Lion.prototype = Object.create(Cat.prototype);
Lion.prototype.constructor = Lion;

console.log(Lion.prototype);
// Cat {constructor: ƒ}     -> 아까와 달리 빈 객체가 아니다.
//      ▶️ constructor: ƒ Lion(name)     -> 새로 할당해준 constructor
//      ▶️ __proto__: Object
console.log(Lion.prototype.__proto__);
// {speak: ƒ, constructor: ƒ}
//      ▶️ speak: ƒ ()
//      ▶️ constructor: ƒ Cat(name)
//      ▶️ __proto__: Object
```

# References

[자바스크립트 Prototype 완벽 정리](https://velog.io/@adam2/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Prototype-%EC%99%84%EB%B2%BD-%EC%A0%95%EB%A6%AC)

[](https://velog.io/@thms200/Object.create-#objectcreate)

[](https://jongmin92.github.io/2017/06/18/JavaScript/class/)
