[문서 목록으로 돌아가기](README.md)

> # STEP 1
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: `심화1`의 const와 let의 차이 ~ 네스팅된 스코프(Nested scopes)에서의 렉시컬 스코핑(Lexical scoping)
> - 기한:

# 보충 필요

# 목차

- [var](#var)
- [const와 let](#const와-let)
- [Scope](#Scope스코프)
- [Lexical Scope](#Lexical-Scope)
- [Hoisting](#Hoisting)
- [궁금증](#공부하면서-생긴-궁금증)
  - 기타, 전역 객체 `window`, 화살표 함수, 즉시 실행 함수

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

# var

- 재선언 가능
- `function-level-scope` (함수 스코프)를 갖는다.
- 전역 스코프에서 선언된 var 변수는 전역변수이다.
- 선언 전에 참조 가능하다.(그러나 이 때 값은 `undefined`이다.) 선언 전에 참조가 가능하다니... `var` 사용은 예상치 못한 버그를 일으킬 수 있다. 사용을 지양하자.
- `var`로 변수 생성시 선언과 초기화가 동시에 이루어지기 때문에 [호이스팅 현상](#Hoisting) 이 나타난다.

```js
var x = 0;
{
  var x = 1;
  console.log(x); // 1
}
console.log(x); // 1 👈 코드 블록({})내에 선언된 var변수 x는 함수 스코프이기 때문에 {}에 구애 받지 않고 전역변수가 된다.
```

```js
var sum = 0;
for (var i = 0; i < 10; i++) {
  sum += i;
}
console.log(sum);
console.log(i); // 10 출력 👈 var는 함수 스코프이기 때문에 for문 안에서 선언된 변수는 for block 밖에서도 유효한 전역 변수가 된다.
```

# const와 let

## const와 let의 공통점

- `block-level-scope` (블록 스코프)
- 재선언 불가
- const와 let은 변수가 선언되기 전에 참조할 수 없다.

```js
let foo = 123;
{
  let foo = 456; // 지역 변수 👈 전역에서 선언된 변수 foo와는 다른 별개의 변수이다.
  let bar = 456; // 지역 변수
}
console.log(foo); // 123
console.log(bar); // ReferenceError: bar is not defined 👈 전역에서는 코드 블록 내에 선언된 bar 변수를 참조할 수 없다. let은 블록 레벨 스코프이기 때문!
```

> 💡 [참고] `let`은 전역 스코프에서 선언되더라도 전역 변수가 아니다.
>
> `let`은 전역 변수가 아니고 따라서 window 객체에도 담기지 않으며 `지역 변수`이다.

```js
var foo = 123;
var foo = 456; // 중복 선언 가능

let bar = 123;
let bar = 456; // Uncaught SyntaxError 👈 재선언 불가
```

> [참고] `함수 스코프`와 `블록 스코프`
>
> 함수 스코프: 함수 단위로 범위를 지정
>
> 블록 스코프: 중괄호({}) 단위로 범위를 지정

## const와 let의 차이점

- `let`은 재할당 가능, `const`는 재할당 불가 (변하지 않는 값에는 `const`(상수)를 사용하자)
- `const`는 선언과 할당을 **동시에** 해줘야 한다.

```js
let x; // 이렇게 초기화하지 않으면 undefined가 할당된다.
// const x; // const 키워드는 선언과 할당을 동시에 해야하기 때문에 이렇게 작성하면 에러가 발생한다.
```

# Scope(스코프)

Scope(스코프, 유효범위)는 참조 대상 식별자(identifier, 변수, 함수의 이름 등)를 찾아내기 위한 규칙이다. 어떤 변수에 접근할 수 있는지를 정의한다.

- Scope A의 외부에서 선언한 변수는, A의 외부/내부에서 모두 접근 가능하다.
- A의 내부에서 선언한 변수는 오직 A의 내부에서만 접근할 수 있다.

## Scope 종류

- 전역 스코프
- 지역 스코프
  - 함수 스코프: 함수 내부에서 변수를 선언할 경우, 해당 변수는 선언한 함수 내부에서만 사용이 가능하다.
  - 블록 스코프: 중괄호 `{}` 내부에서 `const` 또는 `let`으로 변수를 선언할 경우, 해당 변수들은 중괄호 블록 내부에서만 사용이 가능하다.

[Scope 더보기](https://tyle.io/blog/54)

## Scope Chain(스코프 체인)

식별자의 유효범위를 검색해나가는 일련의 과정이다. 변수가 스코프 안에 선언되지 않았다면, 그 변수를 찾기 위해 부모 스코프로 올라가고, 거기에도 없다면 또 그 부모 스코프에 올라가서 찾는다.

스코프 체인을 가능하게 하는 것은 `outerEnvironmentReference`이다. ([실행 컨텍스트]('./js_note/02_executionContext.md')의 `Lexical Environment` 참고)

# Lexical Scope

자바스크립트에서는 함수를 어디에 **선언**했는지에 따라 상위 스코프가 결정된다.

다음 예제를 보자.

```js
var x = 1;

function foo() {
  var number = 10;
  bar();
}

function bar() {
  console.log(number);
}

foo(); // ?
bar(); // ?
```

위 예제의 결과 `10`과 `1`이 출력되는 것이 아닌, `1`과 `1`이 출력된다. 자바스크립트는 Lexical Scope를 따르기 때문에 함수의 호출이 아닌 함수의 선언에 따라 상위 스코프가 결정된다. 위 코드에서 `bar()` 함수의 상위 스코프는 전역을 가리키기 때문에 전역 변수인 x값인 `1`이 두번 출력되었음을 알 수 있다. 만약 `bar()` 함수가 `foo()`함수 내에 선언되어있었다면 `bar()`함수의 상위 스코프는 `foo()`함수일 것이다.

> [참고] Dynamic Scope
>
> 함수의 호출에 따라 상위 스코프가 정해지는 것

# Hoisting

- `호이스팅`은 끌어올려진다는 의미 -> 무엇이 끌어올려지나?

  변수의 `선언부` 또는 함수가 현재 [스코프](#Scope) 의 최상단으로 끌어올려진다!

- 변수의 경우, 함수내에서 정의되었을 경우엔 선언이 함수의 최상단으로, 함수 바깥에서 정의되었을 경우는 전역 영역의 최상단으로 끌어올려진다.

```js
hoisting();

function hoisting() {
  console.log(x);
  var x = 'hello';
}
```

위 예제를 실행하면 오류가 발생하지 않고 `undefined`가 출력된다. 그 이유는 자바스크립트엔진 내부적으로 위 코드를 다음과 같이 해석하기 때문이다.

```js
hoisting();

function hoisting() {
  var x; // 👈 변수 선언을 끌어올린다.(변수 호이스팅) 이 시점의 var값은 할당 전이고, var의 특성상 선언과 초기화가 동시에 이루어지기 때문에 undefined로 초기화된다.
  console.log(x); // undefined 출력
  x = 'hello'; // 여기서 undefined에서 'hello'로 할당이 이뤄진다.
}
```

## 함수 호이스팅

함수 선언문 방식도 호이스팅된다. (단, 함수 표현식과 new 키워드를 이용한 함수 정의시엔 호이스팅 안됨)

```js
// 함수 선언문의 경우 - 호이스팅, 에러 발생X
hoisting();
function hoisting() {
  console.log(x);
  var x = 'hello';
}

// 함수 표현식의 경우 - 호이스팅X, 에러 발생
hoisting();
var hoisting = function () {
  console.log(x);
  var x = 'hello';
};

// new 함수 객체 생성 - 호이스팅X, 에러 발생
hoisting();
var hoisting = new Function('', console.log('hello'));
```

## const와 let은 호이스팅이 될까?

yes!

- const, let 변수는 호이스팅시 `uninitialized`로 초기화된다.

- 변수가 초기화되기 전에 접근하려고 하면 `undefined`가 출력되는게 아니라, `ReferenceError`가 발생한다.

  - **Why?** const, let은 `TDZ`에 의해 제약받기 때문이다.

```js
console.log(x); // ReferenceError: x is not defined
const x = 'hello';
```

- **TDZ란?**

  - `Temporal Dead Zone(일시적 사각지대)`
  - 변수의 선언부터 변수 초기화 사이에 변수에 접근할 수 없는 지점을 의미
  - `const`와 `let`의 경우, 변수 생성시 `ReferenceError`가 바인딩된다. (자세한 바인딩 시점은 모름) 👉 이는 다음과 같은 규칙을 지키기 위함
    - `let`: 값 할당 전에 변수가 선언되어 있어야 한다는 규칙
    - `const`: 선언과 동시에 초기화되어야 한다는 규칙

다음 예제로 `const`와 `let`을 사용할 때 `TDZ`의 제약을 받는 상황을 생각해보자.

```js
const test = '123';
function a() {
  console.log(test);
  let test = '456';
}
a(); // ?
```

`호이스팅`이 일어나지 않았다면 `a()` 함수 호출의 결과로 `123`이 출력될 것이다.
그러나 위 코드를 실행하면 `123`이 출력되는 것이 아니라 `ReferenceError`가 발생한다. `const`와 `let`은 초기화되기 전까지는 액세스할 수 없는 `TDZ`현상이 일어나기 때문이다. 위 코드가 실행되는 내부적인 과정은 다음과 같다.

```js
const test = '123';
function a() {
  // let test; // 호이스팅에 의해 변수 선언부가 스코프 상단으로 끌어올려진다.
  // 변수가 선언됐지만 아직 초기화 구문을 만나지 않았다.
  // 그러므로 아래 test = '456';에서 할당이 이뤄지기 전까지 TDZ구간이 형성된다.
  console.log(test); // Reference Error 발생! 👈 TDZ 구간에서는 해당 변수를 액세스할 수 없다.
  let test = '456'; // 변수가 할당된 시점부터는 TDZ 상태를 떠나게되고, 변수를 사용할 수 있게 된다.
}
a();
```

# 공부하면서 생긴 궁금증

## 기타

- 자바스크립트에서는 `중첩(nested) 함수`가 흔히 사용된다.

## 전역 객체 window

- 자바스크립트에서의 전역 변수
- 유일하며 어떤 컨텍스트가 실행되기 전에 먼저 생성된다.
- 내부적 생성자가 없다. new를 쓸 수 없다.

window 객체

- BOM 브라우저의 요소, JS 엔진, 변수, 객체, 탭, 주소창, 즐겨찾기, 툴바
- DOM Document 객체

> [참고] Node.js에서의 전역 객체
>
> node에서의 전역 객체: **global**
>
> [Node.js에서의 전역 객체](https://park0422.tistory.com/28)

## Arrow Function(화살표 함수) (ES6 문법)

- 항상 익명이다.

```js
// 일반 함수
var foo = function () {
  console.log('foo');
};

// 화살표 함수
var bar = () => console.log('bar'); // 매개변수가 없는 경우
```

- [화살표 함수 더보기(1)](https://velog.io/@ki_blank/JavaScript-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98Arrow-function)
- [화살표 함수 더보기(2)](https://www.w3schools.com/js/js_function_definition.asp)

## 즉시 실행 함수

함수를 정의하고 바로 실행하는 방식

- 기본 형태

```js
(function () {
  // statements
})();
```

- [즉시 실행 함수 더보기](https://beomy.tistory.com/9)

# Comment

# Reference

- [삽질하는 개발자 Javascript](https://eyabc.github.io/Doc/Dev/JavaScript%20%EA%B8%B0%EC%B4%88.html)
- [let, const란? 그리고 왜 써야만 하는가?(ES6)](https://happycording.tistory.com/entry/let-const-%EB%9E%80-%EC%99%9C-%EC%8D%A8%EC%95%BC%EB%A7%8C-%ED%95%98%EB%8A%94%EA%B0%80-ES6)
- [let과 const는 호이스팅될까?](https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365)
- [Hoisting](https://velog.io/@marcus/Javascript-Hoisting)
- [Scope와 Hoisting을 알아보자](https://web-front-end.tistory.com/23)
- [var를 사용할 때 발생하는 문제들](https://www.daleseo.com/js-var-issues/)
- [Lexical Scope](https://medium.com/@yeon22/javascript-lexical-scope-static-scope-and-dynamic-scope-c4a9e941fab3)
- [호이스팅, TDZ(1)](https://thisblogbusy.tistory.com/entry/Hoisting), [호이스팅, TDZ(2)](https://nenara.tistory.com/86)
- [Scope chain이란?](https://web-front-end.tistory.com/23)

# 팀원들 결과물

- [@pul8219]()
- [@eyabc]()
- [@khw970421]()
- [@JeongShin]()

# 면접 질문

- **Q.** 호이스팅이란?

  - 변수의 선언부나 함수가 현재 스코프의 최상단으로 끌어올려지는 현상을 의미한다. 실제로 끌어올려지는 것은 아니나 js가 그렇게 해석된다는 것이다.

  - **Q.** `function foo(){}`와 `var foo = function(){}` 사이에서 foo 사용법의 차이에 대해 설명하시오

    함수선언문인 전자의 경우 호이스팅이 되기때문에 이 함수선언문 전에 foo를 호출해도 에러가 발생하지 않는다. 반면 함수 표현식을 사용한 후자의 경우 호이스팅이 되지 않기 때문에 이 함수 표현식 이전에 foo를 호출할 경우 에러가 발생한다.

- **Q.** let, var 또는 const 사용하여 생성된 변수들의 차이점은 무엇인가요?

  var는 재선언이 가능하며 함수 스코프를 갖는 변수이다. 선언 전에 참조가 가능하기 때문에 사용을 지양해야한다.
  let, const는 재선언이 불가하며 블록 스코프를 갖는 변수이다. let은 재할당 가능하나, const는 재할당이 불가능한 상수이다. 또한 const는 선언과 할당을 동시에 해야 에러가 나지 않는다.(let은 초기화없이 선언만 하면 에러가 나진 않고 undefined가 자동으로 할당된다.)

---

- 클로저가 무엇이고 왜 쓰는지 설명하고 간단하게 코드로 구현해보아라
- 화살표 함수와 일반함수와의 차이점은?
- 자바스크립트에서 this는 무엇인가?

```
전역 공간에서 window
함수 내부에서 window
메소드 호출 시 메소드 호출 주체
콜백에서 window - 하지만 this를 명시하거나 this를 바인딩해서 넘기면 그에 따른다.
생성자 함수에서 인스턴스
```

- Function.prototype.bind에 대해 설명하시오.

- 엄격모드가 무엇이고 어떻게 사용하는 것인지?

- 고차 함수의 정의는 무엇입니까?
