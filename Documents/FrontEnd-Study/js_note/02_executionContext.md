# 목차

- [실행 컨텍스트](#실행-컨텍스트)
- [1. 실행 컨텍스트의 개념](#1-실행-컨텍스트의-개념)
- [2. 실행 컨텍스트의 구성](#2-실행-컨텍스트의-구성)
  - [Execution Stack](#execution-stack)
- [`environmentRecode`와 Hoisting(호이스팅)](#environmentrecode와-hoisting호이스팅)
- [outerEnvironmentReference와 Scope](#outerenvironmentreference와-scope)
- [일급객체](#일급객체)

- [References](#references)

# 실행 컨텍스트

# 1. 실행 컨텍스트의 개념

> 💡 실행 컨텍스트
>
> - 실행할 코드에 제공할 환경 정보(...)들을 모아놓은 객체
> - 자바스크립트의 동적 언어로서의 성격을 가장 잘 파악할 수 있는 개념

자바스크립트는 실행 컨텍스트가 활성화되는 시점에 다음과 같은 일이 벌어진다.

- [호이스팅]() 발생(선언된 변수를 위로 끌어올린다)
- 외부 환경 정보를 구성한다.
- `this` 값을 설정한다.

이로 인해 다른 언어에서 발견할 수 없는 특이한 현상들이 나타난다.

# 2. 실행 컨텍스트의 구성

실행 컨텍스트는 다음과 같은 일들이 일어날 때 `call stack`에 쌓이게 된다.

- **`전역공간`은 자동으로 컨텍스트로 구성된다.**
- **`함수`를 실행할 때(호출될 때 해당 함수에 대한 실행 컨텍스트가 만들어진다.)**
- `eval()`함수를 실행할 때
- **`block`을 만들 때 (ES6+)**

일반적으로 **함수**를 이용해 실행 컨텍스트를 사용한다.

## Execution Stack

여기서 말한 call stack은 Execution stack과 같은 말이다. Execution Stack에 (LIFO: Last in, First out) 코드가 실행되면서, 만들어지는 실행 컨텍스트들이 쌓인다.

자바스크립트 엔진이 `script` 태그를 처음 만나면 전역 (실행) 컨텍스트를 만들고 현재 실행되고 있는 호출 스택에 이를 push 한다. 다른 함수가 실행되면 해당 함수에 대한 실행 컨텍스트를 생성하고 이를 스택의 제일 top에 push 한다.

자바스크립트 엔진은 실행 컨텍스트가 호출 스택의 가장 꼭대기에 있는 함수를 실행한다. 함수가 할 일을 마치면 호출 스택에서 제거된다.(pop)

---

```js
var a = 1; // 전역 컨텍스트

function outer() {
  // outer 컨텍스트
  function inner() {
    // inner 컨텍스트
    console.log(a); // undefined // ❓ 호이스팅 때문에 inner 내부의 지역변수 a가 끌어올려지기 때문
    var a = 3;
    console.log(a); // 3
  }
  inner();
  console.log(a); // 1 // 밖에선 안을 볼 수 없다.(scope)
}
outer();
console.log(a); // 1
```

```js
// 결과
// undefined
// 3
// 1
// 1
```

위와 같이 코드를 작성했을 때 실행 컨텍스트의 스택은 다음과 같은 순서로 변화한다.

- 프로그램 실행: `[전역컨텍스트]`
- outer 실행: `[전역컨텍스트, outer]`
- inner 실행: `[전역컨텍스트, outer, inner]`
- inner 종료: `[전역컨텍스트, outer]`
- outer 종료: `[전역컨텍스트]`

각각의 실행 컨텍스트가 구성될 때 생기는 것들은 다음과 같다.

- `VariableEnvironment`: 현재 컨텍스트 내 식별자(변수)들에 대한 정보 / 외부 환경 정보 / 선언 시점의 LexicalEnvironment 스냅샷(변경사항 반영 X)을 유지
- `LexicalEnvironment`: 처음엔 VariableEnvironment와 같음 / 변경사항이 실시간으로 반영됨
  - `environmentRecord`: 로 인해 `호이스팅`이 발생함
  - `outerEnvironmentReference`: 로 인해 `스코프`와 `스코프체인`이 형성됨
- `ThisBinding`: 식별자가 바라봐야 할 대상 객체

# `environmentRecode`와 Hoisting(호이스팅)

`environmentRecord`

현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.

- 매개변수 식별자
- 함수 자체
- 함수 내부의 식별자

호이스팅은 코드 해석을 좀 더 수월하게 하기 위해 environmentRecord의 수집 과정을 추상화한 개념이다.

## 예제1

변수의 경우 정의부만 호이스팅 되지만, 함수는 함수 전체가 호이스팅 된다.

```js
function a() {
  console.log(b);
  var b = 'bbb';
  console.log(b);
  function b() {}
  console.log(b);
}
a();
```

해석

```js
function a() {
  var b;
  function b() {}

  console.log(b); // f b () {}
  b = 'bbb';
  console.log(b); // bbb
  console.log(b); // bbb
}
a();
```

## 예제2

자바스크립트의 함수는 일급객체이기 때문에 함수 표현식이 가능하다.

```js
function a() {
  console.log(b);
  var b = 'bbb';
  console.log(b);
  var b = function () {}; // b에 익명함수를 할당했다.
  console.log(b);
}
a();
```

해석

```js
function a() {
  var b;
  var b;

  console.log(b); // undefined
  b = 'bbb';
  console.log(b); // bbb
  b = function () {}; // b에 익명함수를 할당했다.
  console.log(b); // f () {}
}
a();
```

# outerEnvironmentReference와 Scope

- scope(스코프)
- scope chain(스코프 체인)

outerEnvironmentReference는 현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조한다.

outerEnvironmentReference는 상위(직전) 컨텍스트의 Lexical Environment 정보를 참조한다. 스코프체인을 통해 상위 컨텍스트에 접근할 수 있다.

# 일급객체

- x를 변수에 담을 수 있다.
- x를 매개변수에 넘길 수 있다.
- x를 함수에서 반환할 수 있다.

이 모두를 만족하는 x를 일급객체라고 한다.

자바스크립트의 함수는 일급객체이므로,

- 함수를 변수에 담을 수 있다.
- 함수를 매개변수에 넘길 수 있다.
- 함수를 함수에서 반환할 수 있다.

위와 같은 조건을 만족한다.

# Reference

- [자바스크립트 실행 컨텍스트](https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context/)
- [자바스크립트의 The Execution Context (실행 컨텍스트) 와 Hoisting (호이스팅)](https://velog.io/@imacoolgirlyo/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-Hoisting-The-Execution-Context-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-6bjsmmlmgy)
