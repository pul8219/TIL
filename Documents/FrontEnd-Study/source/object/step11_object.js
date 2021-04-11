// ✨ 드림코딩 엘리 7강 Object

// Objects
// one of the JavaScript's data types.
// a collection of related data and/or functionality.
// Nearly all objects in JavaScript are instances of Object
// object = {key: value}; // object는 key와 value의 집합체. 우리가 접근할 수 있는 변수인 키(key)와 값(value)로 이루어짐
'use strict';

// 1. Literals and properties

const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object constructor' syntax - class를 이용

// JavaScript는 Type이 Runtime(프로그램이 동작하고 있을 때)때 동적으로 결정됨

const judy = { name: 'judy', age: 15 };
judy.hasJob = true; // 이미 만들어진 객체에 프로퍼티 추가도 가능 - but 이렇게 코딩할 경우 유지보수 어렵고 생각지못한 에러 발생가능. 가능하면 피하기
delete judy.hasJob; // 객체의 프로퍼티 삭제도 가능

// 2. Computed properties
// key should be always string
console.log(judy.name);
console.log(judy['name']); // Computed properties 방법
judy['hasJob'] = true;
console.log(judy.hasJob);

// 그렇다면 Computed properties 방식은 언제 쓰는게 좋은가?
// 동적으로 키에 관련된 value를 받아와야될 때 사용!

function printValue(obj, key) {
  console.log(obj[key]); // computed properties 방법은 key 값에 string이 들어갈 수 있음
  // console.log(obj.key); // 적합X. 이 코드는 객체에 'key' 라는 프로퍼티가 있으면 그 값을 가져와달라는 것임
}

printValue(judy, 'name');
printValue(judy, 'age');

// 3. Property value shorthand
// 프로퍼티가 중복되는 객체를 여러번 만들 때
const person1 = { name: 'grace', age: 20 };
const person2 = { name: 'duby', age: 23 };
const person3 = { name: 'dubab', age: 22 };
const person4 = makePerson('judy', 15);

console.log(person4);

// 방법 1
function makePerson(name, age) {
  return {
    // 프로퍼티와 값을 받아오는 변수 이름이 같을 때 이렇게 줄여쓸 수 있음
    name,
    age,
  };
}

// 방법 2 👍 Constructor Function

// 첫문자는 보통 대문자로 작성
function Person(name, age) {
  // this = {}; // 을 생략한 것으로 이해
  this.name = name;
  this.age = age;
  // return this; //을 생략한 것으로 이해
}

const person5 = new Person('nana', 10);
console.log(person5);

// 5. in operator
// 객체에 특정 key가 있는지 확인할 수 있는 키워드
console.log('name' in judy); // true
console.log('age' in judy); // true
console.log('random' in judy); // false (정의하지 않은 key에 접근)

// 6. for..in vs for..of

// for(key in obj)
// 객체의 key가 블록을 돌 때마다 key라는 지역변수에 담김
console.clear(); // 이전의 로그들을 지우고싶을 때
for (const key in judy) {
  console.log(key);
}

// for(value of iterable)
const array = [1, 2, 3];

/*
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
*/

// 위 방법을 이렇게 간단하게 바꿀 수 있음
for (const value of array) {
  console.log(value);
}

// 7. Fun cloning
// Object.assign(dest, [obj1, obj2, obj3,...])
const user = { name: 'grace', age: 22 };
console.log(user); // {name: "grace", age: 22}
const user2 = user; //user2도 user 객체가 가리키는 프로퍼티들을 참조하게된다.
//user2.name = 'ellie'; // 이렇게 코드를 작성하면 user, user2 두 객체가 모두 참조하고 있는 name 프로퍼티의 내용이 바뀌게됨
//console.log(user); // {name: "ellie", age: 22}

// 객체를 정말 '복제'하려면 어떻게 해야할까
// old way
const user3 = {}; // 빈 객체 생성
for (const key in user) {
  user3[key] = user[key];
}
console.clear();
console.log(user); // {name: "grace", age: 22}
console.log(user3); // {name: "grace", age: 22}

// 다른 방법
// const user4 = {};
// Object.assign(user4, user);

const user4 = Object.assign({}, user);
console.log(user4); // {name: "grace", age: 22}

// another example
const coffee1 = { shot: 2 };
const coffee2 = { shot: 1, size: 'regular' };
const coffee3 = { shot: 2, size: 'venti' };

const mixed = Object.assign({}, coffee1, coffee2); // 결과가 어떻게 될까?
console.log(mixed); // {shot: 1, size: "regular"} // coffee2로 덮어써진다.

const mixed2 = Object.assign({}, coffee1, coffee2, coffee3); // 결과가 어떻게 될까?
console.log(mixed2); // {shot: 2, size: "venti"} // coffee2로 덮어써지고 coffee3로 덮어써진다.
