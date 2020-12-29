## ECMAScript

## map()

배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과로 이루어진 새로운 배열을 반환한다.

콜백함수를 이용

Q. 콜백함수 자세히

[MDN: Array.prototype.map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## Math.

### pow()

거듭제곱

## console.dir()

## Element 객체

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
