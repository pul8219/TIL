'use strict';

// Prototype

// 1.상속을 흉내내기

// // old way
// function Person() {
//   this.eyes = 2;
//   this.nose = 1;
// }

// let park = new Person();
// let lee = new Person();

// console.log(park);
// console.log(lee);

// prototype 이용
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

let park = new Person();
let lee = new Person();

console.log(park.eyes); // 2
console.log(park.nose); // 1
console.log(lee.eyes); // 2
console.log(lee.nose); // 1

// obj는 constructor가 아니기 때문에 아래 문장들은 에러를 발생시킨다.
// let obj = {};
// let obj_new = new obj();

console.log(Person.prototype);

console.log(park);
