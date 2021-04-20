// js study step35 관련 코드

// const arrowFunc = () => {
//     console.log(this);
// };

// arrowFunc();

// ===================

// const outerThis = this;
// const arrowFunc = () => {
//     console.log(this === outerThis); // always true
// };
// // arrowFunc();

// ====================

// bind
// true 출력
// arrowFunc.bind({foo: 'bar'})(); // bind()의 thisArg 인자로 객체를 건네줘도 arrowFunc함수의 this값을 바꿀 수 없다.

// apply
// arrowFunc의 this값은 변하지 않는다.
// true 출력
// arrowFunc.apply({foo: 'bar'});

// call
// arrowFunc의 this값은 변하지 않는다.
// true 출력
// arrowFunc.call({foo: 'bar'});

// object로 호출
// const obj = { arrowFunc };
// obj.arrowFunc(); // true가 출력된다. // 부모 객체(obj)는 무시된다.

// // TypeError: arrowFunc is not a constructor
// new arrowFunc();

// =====================

// class Whatever{
//     someMethod = () => {
//         console.log(this); // 항상 Whatever 클래스의 인스턴스를 가리킨다.
//     };
//     someMethod2(){
//         console.log(this);
//     }
// }

// const instance = new Whatever();
// instance.someMethod.call({foo: 'bar'});
// // instance.someMethod2.call({foo: 'bar'});

// =============================

// class Whatever{
//     someMethod = ( () => {
//         const outerThis = this;
//         return () => {
//             // 항상 true가 출력된다.
//             console.log(this === outerThis);
//         };
//     })();
// }

// const instance = new Whatever();
// instance.someMethod();

// 위 코드는 아래 코드와 같다.

// class Whatever{
//     constructor(){
//         const outerThis = this;
//         this.someMethod = () => {
//             console.log(this === outerThis); // true가 출력된다.
//         };
//     }
// }

// const instance = new Whatever();
// instance.someMethod();


//===================

// class MyClass{
//     constructor(){
//         console.log(this.constructor === Object.create(MyClass.prototype).constructor);
//     }
// }

// // true 출력
// new MyClass();

// console.log(Object.create(MyClass.prototype));

// 위 코드는 아래 코드와 같다.

// function MyClass(){
//     console.log(this.constructor === Object.create(MyClass.prototype).constructor);
// }

// new MyClass();

// ======================

// const BoundMyClass = MyClass.bind({foo: 'bar'});
// new BoundMyClass();

// ========================

// const obj = {MyClass};
// new obj.MyClass();

// =======================

function someFunc(){
    return this;
}

const boundObj = {hello: 'world'};
const boundFunc = someFunc.bind(boundObj);

console.log(someFunc() === boundObj); // false 출력
console.log(boundFunc() === boundObj); // true 출력

console.log(boundFunc.call({foo: 'bar'}) === boundObj); // true 출력 // call로 전달된 this값은 무시된다.
console.log(boundFunc.apply({foo: 'bar'}) === boundObj); // true 출력 // apply로 전달된 this값은 무시된다.

const obj = {boundFunc};
console.log(obj.boundFunc === boundObj); // true 출력 // parent object는 무시된다(객체의 멤버로서 함수를 호출했지만 this가 obj로 바뀌지 않았다)