# TODO

- js 내부 동작, 브라우저 렌더링
- this
- 비동기 복습
- async, defer
- 클래스, 객체, new operator 복습
  - MDN - new operator https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/new
- 콜백함수, 프로미스, 클로저 복습
- 모듈화
- 컴포넌트

# ECMAScript

# JavaScript VScode 디버깅 방법

- https://velog.io/@seolgang/vscode-%EC%97%90%EC%84%9C-javascript-%EB%94%94%EB%B2%84%EA%B9%85-%ED%95%98%EA%B8%B0

# JavaScript Array(배열) 관련 속성 및 내장 메소드

- JavaScript 자료구조 - Array(배열) https://velog.io/@ryu/JavaScript-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-Array%EB%B0%B0%EC%97%B4

# for, forEach, map

for, forEach, map

- https://m.blog.naver.com/wideeyed/221877912230

for in

# map()

배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과로 이루어진 새로운 배열을 리턴한다. (이렇게 배열을 리턴하기 때문에 리턴할 것이 없다면 `map()` 대신 `forEach`나 `for ...of`를 사용하기)

- 콜백함수를 이용

Q. 콜백함수 자세히

[MDN: Array.prototype.map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```js
const arr = ['tiger', 'rabbit', 'mouse'];
const newArr = arr.map((elem) => 'Animal: ' + elem);
console.log(newArr);
// [ 'Animal: tiger', 'Animal: rabbit', 'Animal: mouse' ]
```

# Math.

## pow()

거듭제곱

# console.dir()

# Element 객체

`Element` 객체는 엘리먼트를 추상화한 객체
DOM은 HTML만을 제어하기 위한 모델이 아니고 HTML 뿐만 아니라 XML, SVG, XUL과 같은 마크업 언어를 제어하기 위한 규격이다. Element도 마크업 언어의 일반적인 규격에 대한 속성을 정의하고 있음 (HTML에만 Element가 있는게 아니라는 것!)
각각의 구체적인 언어(HTML, XML, SVG)를 위한 기능은 HTMLElement, SVGElement, XULElement와 같은 객체를 통해 추가해서 사용하고 있음

HTML에서 `Element.tagName`로 DOM 요소의 태그명을 가져올 때는 원본 문서에 정의된 태그명과 달리 대소문자를 무시한, 대문자로만 이루어진 값을 가져온다.

```html
<div id="item1">box1</div>
```

```js
let item1 = document.getElementById('item1');
console.log(item1.tagName); // 'DIV' 라고 출력된다.
```

# HTML 인코딩, lang의 의미

## `meta charset`

문자 인코딩은 문자나 기호들의 집합을 컴퓨터에 저장할 목적으로 부호화하는 것을 의미한다. 예전엔 아스키(ASCII) 코드 방식이 많이 사용되었으나 다국어 표현에 한계가 있어 확장용 인코딩들이 생겨나게 되었다.
UTF-8, 유니코드 방식은 가변길이 문자 인코딩 방식 중 하나로 현재 웹 페이지를 만들 때 다국어를 표현하기 위해 많이 사용되고 있다.
HTML5 에서는 유니코드(UTF-8)를 기본 문자 인코딩 방식으로 채택하고 있다.

## `lang` 속성

웹 접근성을 향상시키기 위해 필요한 속성

시각 장애인이 스크린리더나 점자정보단말기등 을 통해 웹문서를 이용하는 경우 `lang="주언어"`가 명시되어있으면 해당 언어네 맞게 웹문서가 번역될 수 있다.
문서가 주로 한글로 쓰인 경우, 예를 들어 `lang="ko"`로 지정했다면 스크린 리더는 영어를 자동 변환하여 제공하지만 en으로 지정했을 경우 한글은 자동으로 변환되지 않는다.
`lang="en"`으로 명시한 후 한글이 쓰여진 태그에 lang="ko"을 추가하면 해당 태그 내용은 한글로 읽힐 수 있다

참고 출처:

- https://mygumi.tistory.com/52
- https://blog.naver.com/pjh445/220012102876

# Number 내장 객체

객체를 숫자값으로 작업할 수 있게 해주는 래퍼(Wrapper) 객체이다. 다른 타입의 값들은 `Number()`를 이용하여 숫자로 변환할 수 있다. 자바스크립트의 `Number`는 자바나 C#의 `double`과 같이 길이가 64비트인 IEEE double precision(배정도) 형식의 부동소수점값이다. 소수점이 있는 값을 표현할 수 있지만 숫자엔 제한이 있다는 것.

- `Number(value)` 문법을 이용하여 문자열이나 다른 값들을 Number type으로 변환하고 만약 변환할 수 없는 경우 `NaN`을 리턴한다.

```js
new Number(value);
var a = new Number('123'); // a === 123은 false
var b = Number('123'); // b === 123은 true
a instanceof Number; // true
b instanceof Number; // false
```

```js
// Literal syntax
123 === 123.0; // true

// Function syntax
Number('123'); // returns the number 123
Number('123') === 123; // true

Number('unicorn'); // NaN
Number(undefined); // NaN
```

- 참고 출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

# `sort()`

## `sort((a,b) => {return a-b})` 관련 궁금증

- https://fluorite94.tistory.com/220
- https://stackoverflow.com/questions/39202616/difference-between-sort-sortfunctiona-breturn-a-b-and-sortfunctiona
- https://forum.freecodecamp.org/t/arr-sort-a-b-a-b-explanation/167677/2
- https://dudmy.net/javascript/2015/11/16/javascript-sort/
- https://opentutorials.org/course/50/109

# 삼항연산자

## 구문

`condition? exprIfTrue : exprIfFalse`

- `condition`: 조건문
- `exprIfTrue`: 조건문이 truthy 값이면 이 값을 반환
- `exprIfFalse`: 조건문이 falsy 값이면 이 값을 반환

삼항 조건 연산자, MDN https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

# Array.prototype.push()

`push()` 배열의 끝에 하나 또는 하나 이상의 요소를 추가하는 메서드. 추가된 요소를 포함한 배열의 길이를 리턴한다.

# Node, Element 관련

# 전개 연산자 `...` (Spread syntax)

배열 표현과 같이 iterable, string to be expanded in places where zero or more arguments (for function calls), 요소(배열 리터럴 같은), 0개 또는 그 이상의 key-value쌍인 객체 표현 에 사용가능(?)

```js
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// output: 6

console.log(sum.apply(null, numbers));
// output: 6
```

배열을 이어붙일 때도 유용하다.

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arrWrap = [...arr1, ...arr2];

console.log(arrWrap); // [1, 2, 3, 4, 5, 6]
```

기존 배열 요소에 값을 추가할 때도 유용하다.

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// arr1.push(arr2); // [1, 2, 3, [4, 5, 6]] // arr2 배열 전체가 들어가 2차원 배열이 되어버렸다.
// Array.prototype.push.apply(arr1, arr2); // [1, 2, 3, 4, 5, 6] // 원하는 결과이나 코드가 복잡하다.

arr1.push(...arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
```

객체도 마찬가지

```js
const obj1 = {
  a: 'A',
  b: 'B',
};
const obj2 = {
  c: 'C',
  d: 'D',
};
const newObj = { obj1, obj2 };
console.log(newObj); // (1)
```

```js
// (1) 결과
// 객체 각각의 값이 아니라 객체 자체가 들어가 2차원 객체가 되었다.
{
  obj1: {
    a: 'A',
    b: 'B'
  },
  obj2: {
    c: 'C',
    d: 'D'
  }
}
```

```js
const obj1 = {
  a: 'A',
  b: 'B',
};
const obj2 = {
  c: 'C',
  d: 'D',
};
const newObj = { ...obj1, ...obj2 };
console.log(newObj); // (2)
```

```js
// (2) 결과
// 객체 자체가 아니라 객체 각각의 값이 할당된다.
{
    a: 'A',
    b: 'B',
    c: 'C',
    d: 'D'
}
```

기존 배열을 보존해야할 때 유용하다.

```js
const arr1 = [1, 2, 3];
const arr2 = arr1.reverse();

console.log(arr1); // [3, 2, 1]
console.log(arr2); // [3, 2, 1]
```

```js
// 전개 연산자를 이용해 기존 배열이 보존되도록 작성
const arr1 = [1, 2, 3];
const arr2 = [...arr1].reverse();

console.log(arr1); // [1, 2, 3]
console.log(arr2); // [3, 2, 1]
```

참고

- https://velog.io/@recordboy/%EC%A0%84%EA%B0%9C-%EC%97%B0%EC%82%B0%EC%9E%90Spread-Operator

# 구조 분해 할당

- 구조 분해 할당(Destructuring assignment) MDN, https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

## 객체 (다중 프로퍼티 사용)

```js
// 객체 다중프로퍼티 사용 destructing

let person1 = {
  firstName: 'Suyeon',
  lastName: 'Park',
  hobby: 'game',
};

// bad👎
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  return `${lastName} ${firstName}`;
}

// good👍
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${lastName} ${firstName}`;
}

// best👍👍
function getFullName({ firstName, lastName }) {
  return `${lastName} ${firstName}`;
}

console.log(getFullName(person1));
```

## 배열 구조 분해 할당

```js
// 구조 분해 할당 예시 (배열)
const arr = [10, 20];

// bad👎
// let a = arr[0];
// let b = arr[1];

// good👍
let [a, b] = arr; // 선언과 할당을 동시에 하는 방식
console.log(a); // output: 10

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest); // output: [30, 40, 50]
```

# 비교 연산자 `==` `===`

![image](https://user-images.githubusercontent.com/33214449/106169759-113aec00-61d3-11eb-9593-4be5da9e711e.png)

참고

- https://velog.io/@filoscoder/-%EC%99%80-%EC%9D%98-%EC%B0%A8%EC%9D%B4-oak1091tes

- 자바스크립트에서 == 동작원리 http://blog.kazikai.net/?p=142

- 자바스크립트 개발자라면 알아야 할 33가지 개념 #5 == vs === 3분만에 배우기 (번역) https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-5-vs-3%EB%B6%84%EB%A7%8C%EC%97%90-%EB%B0%B0%EC%9A%B0%EA%B8%B0-%EB%B2%88%EC%97%AD

- MDN - 비교 연산자 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Comparison_Operators

- MDN - 동치 비교 및 동일성 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Comparison_Operators

# `JSON.stringify()` `JSON.parse()`

참고

- MDN - `JSON.stringify()` https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

- MDN - `JSON.parse()` https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

- javascript 의 json.parse()와 json.stringify() 사용법 https://wikim.tistory.com/225

- json.stringify() 사용방법 - json 가독성 높이기 https://jamesdreaming.tistory.com/172

# localStorage

브라우저 상에 데이터를 저장할 수 있게하는 웹 API. `window.localStorage` = `localStorage`

## localStorage vs sessionStorage

웹 스토리지(Web storage)에는 `logcalStorage`(로컬스토리지)와 `sessionStorage`(세션스토리지)가 있다.

`localStorage`

`sessionStorage`

# innerHTML innerText textContent outerHTML

- 당신이 innerHTML을 쓰면 안되는 이유 https://velog.io/@raram2/%EB%8B%B9%EC%8B%A0%EC%9D%B4-innerHTML%EC%9D%84-%EC%93%B0%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0

- 웹 어쩌고 할 때 innerHTML 주의 https://til-devsong.tistory.com/m/101

- Javascript: value vs textContent, innerHTML, innerText https://velog.io/@minjae-mj/Javascript-value-vs-textContent-innerHTML-innerText

## innerHTML

`Element.innerHTML`

- 태그 내부의 텍스트를 가져오거나 수정하고싶을 때 사용한다.
- 마크업(HTML 구조)을 포함하여 리턴한다. 마찬가지로 마크업 구조를 삽입할 수도 있다.
- 위와 같은 이유 때문에 XSS(Cross-site scripting) 공격에 취약하다. 보안상 문제

> XSS(Cross-site scripting) 공격
>
> 웹 페이지에 악성 스크립트를 삽입할 수 있는 취약점을 이용한 공격

## innerText

`HTMLElement.innerText`

- 태그 내부의 텍스트를 가져오거나 수정하고싶을 때 사용한다.
- 마크업(HTML 구조)를 제외한 문자열을 반환한다.
- 마크업 언어가 적용된, 최종적으로 사용자에게 보이는 "human-readable"한 text만 읽는다.(`textContent`와의 차이점)
- `hidden` 스타일링이 적용된 요소의 text를 읽을 수 없다.(`textContent`와의 차이점)
- 연속되는 공백은 하나의 공백으로 처리

## `textContent`

`Node.textContent`

- `Node` 인터페이스의 속성으로 해당 노드와 그 자식의 (마크업을 제외한) text 내용을 나타낸다.
- `textContent`와 `innerText`를 많이 헷갈리곤 하는데, 둘은 명백한 차이가 있다.
- 가질 수 있는 값은 문자열이나 `null`
- `<script>`나 `style`과 같은 요소를 포함한 모든 요소의 내용을 가져올 수 있다.(`innerText`와의 차이점)
- HTML을 파싱할 필요가 없기 때문에 `innerHTML`에 비해 더 나은 성능을 보인다.(`innerHTML`과의 차이점)
- 공백이 그대로 표현된다.

`textContent`의 값은 상황에 따라 다르다.

- 노드가 `document` 혹은 [Doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype)일 때: `null`
- 노드가 `CDATA section`❓, 주석, `processing instruction`❓, `text node`일 때: 노드 안의 text값. 다시 말해 `Node.nodeValue`와 같음 ❓
- 다른 노드 타입들에 대해서는: 모든 자식 노드의 `textContent` 값을 이어서 리턴함. (주석이나 processsing instructions은 제외하고) (노드가 자식을 가지고 있지 않을 때엔 빈 문자열이다. ❓어떤게 빈 문자열이라는 거지)

참고

Node.textContent - MDN https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent

## outerHTML

- 해당 요소의 태그까지 함께 가져온다.

## 💡`innerHTML` vs `innerText` vs `textContent`

```html
<div id="user1">
  Hello my name is <strong>Wol-dan</strong>
  <span style="display:none">editing...</span>
</div>
```

```js
const $divElem = document.querySelector('#user1');

console.log($divElem.innerHTML); // Hello my name is <strong>Wol-dan</strong><span style="display:none">editing...</span>

console.log($divElem.innerText); // Hello my name is Wol-dan

console.log($divElem.textContent); // Hello my name is Wol-dan editing...

console.log($divElem.outerHTML); // <div id="user1">Hello my name is <strong>Wol-dan</strong><span style="display:none">editing...</span></div>
```

# HTML 공백

HTML에서 텍스트가 보여질 때 공백 여러 개는 하나로 표현된다.

https://www.everdevel.com/CSS/white-space/ 첫 문단 참고

# String.prototype.trim()

- `trim()` 메서드는 문자열 양 끝의 공백을 제거한 새로운 문자열을 반환한다.
- 공백이란 모든 공백 문자(space, tab, NBSP❓), 모든 개행문자를 의미
- 원본 문자열에는 영향을 주지 않는다.

# Element.insertAdjacentHTML()

참고

- https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML

# HTML `input`

- `input` 태그는 닫는 태그가 없다.
- `value` 속성: 사용자에 의해 입력된 데이터나 초기값을 나타낸다.
- `input` 태그와 같은 폼요소의 값을 가져올 때는 `value` 속성을 사용한다.

참고

input태그와 그 속성 type, value, name - 입력태그 https://yangbari.tistory.com/28

# Doctype

HTML에서 Doctype은 `<!DOCTYPE html` 이라는 필수적인 서문으로 모든 문서의 최상단에 존재한다. 이는 브라우저가 문서를 렌더링할 때 [quirks mode](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)로 바뀌지 않도록 방지하는 역할을 갖는다. 즉 이런 Doctype 정의는 브라우저가 일부 스펙과 맞지 않는 렌더링 모드를 사용하는 것이 아니라 적절한 스펙을 따르도록 한다.

Doctype - MDN https://developer.mozilla.org/ko/docs/Glossary/Doctype

# z-index

참고

- <CSS> z-index (태그들이 보이는 순위 정하기) https://grace-go.tistory.com/38

# `append()` vs `appendChild()`

# 이벤트 핸들러 안에 이벤트 핸들러

동작방식이나 순서 궁금

# Javascript 웹통신 HTTP

- [js] 자바스크립트 fetch API 사용하기 https://hogni.tistory.com/142

# `window.onload`

- `onload`는 `Window`, `XMLHttpRequest`, `<img>`요소 등을 load하는 이벤트핸들러이다. `target.onload = functionRef;` (`functionRef`는 load 이벤트가 트리거될 때 호출되는 핸들러 함수)
- 주어진 자원에 포함된 모든 콘텐츠(e.g. DOM, image, scripts, links, ...)가 로드되고 나서 실행되기 때문에 불필요한 로딩 시간이 걸릴 수 있다.
- `DOMContentloaded`, `DOMFrameContentLoaded`처럼 `EventTarget.addEventListener()`와 함께 쓰는 방식을 사용하면 DOM만 기다리고 실행되기 때문에 `onload`를 쓸 때보다 좀 더 빠르다.

참고

- GlobalEventHandlers.onload - MDN https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload#notes

- 문서의 로드시점 - onload, DOMContentLoaded https://webdir.tistory.com/515

# dataset

- MDN - data 속성 사용하기 https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%86%8D%EC%84%B1_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

- data-xxx 속성으로 요소 검색하기(jQuery 없이) https://stackoverflow.com/questions/7084557/select-all-elements-with-a-data-xxx-attribute-without-using-jquery

# element.firstChild

- MDN - element.firstChild https://developer.mozilla.org/ko/docs/Web/API/Node/firstChild

# Object 객체

[JavaScript] Object(객체) https://velog.io/@hyenees/JavaScript-Object%EA%B0%9D%EC%B2%B4

# `||`, `&&`를 이용한 최적화

- [Javascript] &&(AND)연산자와 ||(OR)연산자 https://satisfactoryplace.tistory.com/112 이해👍

- [JavaScript TIPs] && 과 || 를 이용한 powerful한 JavaScripting https://4urdev.tistory.com/13

# 현재 날짜, 시간 구하기

참고

- https://hianna.tistory.com/325

# JavaScript의 위치 관련 속성들

참고

- offsetHeight, innerWidth 와 비슷한 속성들 정리 https://github.com/jinyowo/JS-Calendar/wiki/**offsetHeight,-innerWidth-%EC%99%80-%EB%B9%84%EC%8A%B7%ED%95%9C-%EC%86%8D%EC%84%B1%EB%93%A4-%EC%A0%95%EB%A6%AC

- Window.scrollY https://developer.mozilla.org/ko/docs/Web/API/Window/scrollY

- HTMLElement.offsetHeight https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight

MDN 문서의 HTMLElement... 와 Element...의 차이점은?

- Element.scrollTop https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop

# CSS `overflow` 속성

참고

- https://offbyone.tistory.com/296

# 무한 스크롤 관련 링크, 프로그래머스 웹 프론트엔드 과제

- 무한 스크롤 만들기 : Throttling(프로그래머스 2020 Dev-Matching : 웹 프론트엔드 과제 복기) https://velog.io/@hyeon930/%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0-Throttling

# 브라우저 동작 방식

브라우저가 html, css, js 받는 과정 등 알기

## CSR(Client Side Rendering)

웹 프레임워크 React, Vue는 CSR 방식으로 동작

## 관련 개념

- 웹 어플리케이션 서버(WAS) (일종의 API 서버)
- API
- 자바스크립트 엔진 동작 방식

# className vs classList

class 다루기(CSS)

## `className`

```html
<body class="main page">
  <script>
    alert(document.body.className); // "main page"
  </script>
</body>
```

`className`에 어떤 값을 대입하면 클래스 문자열 전체가 바뀐다. 클래스가 하나일 때는 문제가 없지만 클래스는 여러개일 수도 있다. 클래스 속성값 전체를 바꾸는 게 아니고 클래스 하나만 추가하거나 하나만 제거하고 싶은 경우는 `classList`를 이용하자.

## `classList`

- 개별 클래스를 추가하거나 삭제하고 싶을 때는 `classList`를 사용하자
- `classList`는 iterable 객체라 `for...of`를 사용해 클래스를 나열할 수 있다.

메서드

- `elem.classList.add/remove("class")`: `class` 추가 or 제거
- `elem.classList.toggle("class")`: `class`가 존재할 경우 `class`를 제거하고, 그렇지 않은 경우에는 추가
- `elem.classList.contains("class")`: `class` 존재 여부에 따라 `true/false`를 반환

```html
<body class="main page">
  <script>
    // 클래스 추가
    document.body.classList.add('article');

    alert(document.body.className); // main page article
  </script>
</body>
```

참고

- 스타일과 클래스 https://ko.javascript.info/styles-and-classes

# splice

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
