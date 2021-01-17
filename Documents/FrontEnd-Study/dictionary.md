# TODO

- js 내부 동작, 브라우저 렌더링
- this
- 비동기 복습
- async, defer

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

배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과로 이루어진 새로운 배열을 반환한다.

콜백함수를 이용

Q. 콜백함수 자세히

[MDN: Array.prototype.map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

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
