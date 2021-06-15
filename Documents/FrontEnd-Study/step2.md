[문서 목록으로 돌아가기](README.md)

> # STEP 2
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/home>
> - 공부 범위: `심화1`의 전역 객체 window ~ 래퍼 객체
> - 기한: 7/11(토) ~ 7/14(화)

# 보충 필요

- window의 js엔진에는 무엇이 있을까
- 참조 자료형의 특징
- `typeof`, `instanceof`
- `undeclared`
- 자료형, 소수점표현 관련(프로그래밍 기본)
- `==`과 `===`
- 강제형변환
- **Javascript 정리된 글을 그냥만 봐서는 모르는 단어가 너무 많다... 엔진 작동 방식, 자료형, 형변환 등의 기본적인 내용 병행 필요**

# 목차

- [전역 객체 window](#전역-객체-window)
- [원시 타입과 참조 타입](#원시타입과-참조타입)
- [래퍼 객체](#래퍼-객체)

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

# 전역 객체 window

- 전역 객체(글로벌 객체)라고 한다.
- 브라우저 요소들, 자바스크립트 엔진, 모든 변수 등을 담고 있는 객체
  - DOM: document
  - BOM: navigator, screen, location, history, ...
  - Object, Array, Function, String, Boolean 등
- 모든 객체의 조상

```
window.alert('경고');

alert('경고');

// 위 두 줄은 같은 의미
// alert(), setTimeout()와 같은 메서드도 전역 객체 안에 포함되어있는 것이므로 `window`를 생략하여 쓸 수 있음
```

# 자바스크립트의 자료형

**원시타입**과 **참조타입**이 있다.

## 1. 원시타입(Primitive type)

원시타입 종류

- 숫자(Number)
- 문자열(String)
- 불리언(Boolean)
- Null
- Undefined
- Symbol (ES6에서 추가됨)

특성

- 불변성

```
var a = 'abc'
a = a + 'def'

var b = 5;
var c = 5;
b = 7;
```

> 자바스크립트에서 함수 매개변수는 `undefined`가 기본값이다.

## 2. 참조형(Reference type)

- **객체(Object)**
  - 배열(Array)
  - 함수(Function)
  - 날짜(Date)
  - 정규표현식(RegExp)
  - Map, WeakMap, Set, WeakSet 등(ES6에서 추가됨)

> 함수(Function)도 객체(Object)이다.
>
> - 함수는 name 속성을 가진다.(함수명이 name에 들어감)
> - 함수를 출력해보면 `length` 속성도 가진다는 걸 알 수 있다.(인자의 개수를 나타냄)
> - `console.dir()`로 함수를 출력해보면 함수가 접근가능한 변수도 알 수 있다.(스코프)

## 보충

- `var a;`

  **의미**: 메모리에 저장된 값을 재할당할 수 있는 변수를 선언. 변수는 데이터가 담길 수 있는 공간, 그릇으로 생각. 이 데이터의 식별자는 a로 한다!

- `var a = 'abc;`

**데이터 할당의 전체 흐름**

    변수 영역에서 빈 공간을 확보해 식별자를 a로 지정

    데이터 영역의 빈 공간에 문자열 'abc'를 저장

    위에서 지정한 변수 영역 공간에 저장한 문자열이 있는 주소를 대입

**불변값은 상수와 같은 개념이 아니다**

- 변수와 상수

  구분 기준: 변수 영역 메모리를 변경 가능한지 (즉, 한 번 데이터 할당이 이뤄진 변수 공간에 다른 데이터를 재할당할 수 있는지 여부)
  변수는 변경 가능, 상수는 변경 불가

- 불변성

  데이터 영역 메모리에 이미 담겨있는 값을 변경하지 않는다는 것이 불변값의 개념이다.

  ```
  var a = 'abc';
  a = a + 'def';
  ```

  위 코드를 보면 변수 a에 'abc'를 할당했다가 'abcdef'를 할당함을 알 수 있다. 이는 기존의 'abc'가 'abcdef'로 변경되는 것이 아니라 'abcdef'라는 새로운 값을 만들어 그 주소를 변수 a에 저장한 것이다. 기존의 'abc'값은 변하지 않았으며 데이터 영역에 그대로 있다.(가비지 컬렉터가 수거하지 않는한) = 불변성

  [불변성에 대해 자세히 알아보기](https://evan-moon.github.io/2020/01/05/what-is-immutable/) '불변성은 변하지 않는 상태를 유지하는 방법'

# 래퍼 객체

- 원시 타입(primitive type)을 감싸는 형태의 객체
- Number, String, Boolean, Symbol 제공

- 래퍼 객체를 이용해 원시 타입 값도 객체 안 프로퍼티를 사용할 수 있다.

  예를 들어, `var s = "abc";` 에서 변수 s는 원시 타입인데 내부적으로 래퍼 객체로 감싸지므로 객체의 프로퍼티를 사용할 수 있게 된다.(마치 `new String` 호출한 것 처럼)

  ```
  var s = "abc";
  s.substring(1, 2);
  ```

# 스터디 Q&A

## by 은영

- Q.전역 객체 window 가 자바스크립트 엔진 을 담고 있다고 되어있는데 window의 js엔진에는 무엇이 있을까요?

- Q.참조 자료형의 종류들에 대한 특징을 더 설명하기

- Q.변수에 대한 설명관련 보충

```
var a;
의미: 변할 수 있는 데이터를 만든다. 이 데이터의 식별자는 a로 한다!
변수는 변경 가능한 데이터가 담길 수 있는 공간 또는 그릇
```

위 내용에서, 변할 수 있는 데이터를 만든다기보다는, 메모리의 저장된 값을 재할당할 수 있다 표현이 더 어울리지 않을까요? 예를 들어, 원시값의 경우 불변성(변경할 수 없는 데이터)이기 때문이죠!

## to 정웅

- Q. `null`뿐만 아니라 `undefined` 원시값도 `falsy`한 값에 포함되나요?

=> yes!

- `falsy` 값: Boolean 문맥에서 false로 평가되는 값
- false, 0, -0, 0n, "", null, undefined, NaN 등은 `falsy`한 값이다.

> **0n**
>
> BigInt를 나타내며 numbers larger than 253-1 범위의 수
> 혹은 Number.Max_SAFE_INTEGER 상수로 표현

## by 준일

- JS의 발전
  모바일 웹이 등장
  앱에 웹 뷰를 통해서 웹으로 만든 것들을 보여주려고 시도 하려고 하다보니까 Single Page Application이라고 해서 어플과 비슷한 사용자 경험을 제공해주는 개발 패러다임이 나왔고,
  그 과정에서 Vue, React, Angular 같은 프레임워크도 나왔고,
  저런 프레임워크를 잘 사용하기 위해서 Webpack, Babel, Typescript 같은 것도 생기고,
  시장의 요구가 반영되며 발전!

      - 이 언어를 공부해서 어떻게 어디에 잘 사용할 수 있을지를 명확하게 알고 있기!
      스마트폰이 생겼다 -> 어플 개발이 뜬다 -> 어플 개발로만 어플을 만들고 서비스하기엔 한계가 있다 -> 어플에서 웹을 보여준다 -> 웹에서 어플과 비슷한 퍼포먼스를 가진 기술이 필요하다 -> 웹에서 사용하는 언어인 JS가 발전한다 -> JS가 발전하면서 각종 프레임워크, 서드파티 도구 등이 생긴다 -> JS 개발자의 수요가 많아진다

# Comment

# Reference

- [코어 자바 스크립트](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158391720&orderClick=LEa&Kc=)
- [window객체와 BOM](https://www.zerocho.com/category/JavaScript/post/573b321aa54b5e8427432946)
- [자바스크립트의 자료형](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)

# 팀원들 결과물

# 면접 질문

- 불변성이 무엇이며 이를 해결하기 위한 방법을 제시하라

- 자바스크립트의 원시타입을 전부 말하시오

- `==`와 `===`의 차이

```
== 연산자는 동등연산자. 피연산자가 서로 다른 타입이면 타입을 강제로 변환하여 비교한다.
=== 연산자는 일치연산자. 형변환을 하지 않고 비교. 더 엄격한 비교
```
