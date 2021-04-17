// ✨ 드림코딩 엘리 8강 배열, 배열APIs

'use strict';

// Array

// 1. Declaration
const arr1 = new Array();
const arr2 = [1, 2];

// 2. Index position
// 인덱스를 통해 배열에 접근

const fruits = ['🍎', '🍌'];
console.log(fruits);
console.log(fruits.length); // 2
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]); // undefined
console.log(fruits[fruits.length - 1]); // 배열의 마지막 원소를 찾는 법


console.clear(); // 이전까지의 출력 clear

// 3. Looping over an array
// 배열을 돌며 배열의 원소들을 출력하기
// print all fruits

// a. for (예전에 많이 썼던 방법)
for(let i = 0; i < fruits.length; i++){
    console.log(fruits[i]);
}

// b. for of
for(let fruit of fruits){
    console.log(fruit);
}

console.clear();

// c. forEach
// 🌟 API가 정의된 걸 직접 보며 코딩하는 것이 도움 많이 됨(windows에선 ctrl + 클릭)
// forEach는 배열의 요소를 돌면서 특정한 일을 수행하게 해주는 메소드이다. callback함수를 받는다.
// 그 콜백함수의 인자로는 배열의 각요소, 해당 요소의 인덱스, 배열전체를 넣을 수 있다.
fruits.forEach(function(fruit, index, array){
    console.log(fruit, index, array); // 보통 array까지 쓰진 않음
});

// 익명함수는 화살표 함수 사용 가능
// 화살표함수의 본문이 한줄인 경우에는 아래처럼 세미콜론과 {} 블록을 생략 가능
fruits.forEach((fruit, index) => console.log(fruit));



// 4. Addition, deletion, copy
// 배열에 데이터 삽입, 삭제하고 배열을 복사하는 방법

// push: add an item to the end
fruits.push('🍓', '🍉');
console.log(fruits);

// pop: remove an item from the end
fruits.pop();
console.log(fruits);


// unshift: add an item to the beginning
fruits.unshift('🍋');
console.log(fruits);

// shift: remove an item to the beginning
fruits.shift();
console.log(fruits);

// note!! shift, unshift are slower than pop, push 🌟

// splice: remove an item by index position
fruits.push('🍊', '🥝', '🍇');
console.log(fruits);
// fruits.splice(1); // 몇개나 지울건지 정의하지 않으면 지정한 인덱스뒤의 모든 데이터를 지워버림
fruits.splice(1, 1); // index1부터 1개만 지우겠다.
console.log(fruits);
fruits.splice(1, 1, '🍏', '🍍'); // index1부터 1개만 지우고 그 자리에 원하는 데이터를 넣겠다.
console.log(fruits);

// combine two arrays
// concat()
// concat을 호출하는 배열에 인자로 전달하는 배열을 합해서 새로운 배열을 반환 
const fruits2 = ['🥥', '🥭'];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);

// 5. Searching

console.clear();
console.log(fruits);

// indexOf(): find the index
console.log(fruits.indexOf('🍎')); // 사과가 몇번째 인덱스에 있는지 알고싶을 때
console.log(fruits.indexOf('🥥')); // 배열에 없는 것은 -1 출력됨

// includes()
console.log(fruits.includes('🍍')); // true
console.log(fruits.includes('🥥')); // false


// lastIndexOf
console.clear();
fruits.push('🍎'); // 배열에 사과가 한 개 더 있다면?
console.log(fruits);
console.log(fruits.indexOf('🍎')); // indexOf의 경우 처음 만난 요소의 인덱스를 반환한다.
console.log(fruits.lastIndexOf('🍎')); // lastIndexOf의 경우 제일 마지막에 있는 요소의 인덱스를 반환한다.

// 숙제

// Array 안에 interface를 읽어보기
// ex. pop()은 지워지고 난 후의 배열이 리턴되는구나~ 알기
// sort, every, some, ...