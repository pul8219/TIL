# STEP 9

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위:

[모듈](https://gitlab.com/siots-study/topics/-/wikis/module)

모듈의 역사와 종류 중심으로 정리할 것

- 기한: 9/12(토) ~ 9/15(화)

# 보충 필요

내용 없음

# 모듈

## 목차

- [모듈이란](#모듈이란?)

- [JavaScript에서 모듈](#JavaScript에서-모듈)

- [JavaScript 모듈의 역사](#JavaScript-모듈의-역사)

- [References](#References)

## 모듈이란?

모듈이란 별도로 분리된 재사용 가능한 코드 조각을 의미한다. 모듈은 세부사항을 캡슐화하고 필요한 API만을 외부에 공개한다. 모듈은 기능별로 분리되고 재사용성이 좋아 개발 효율성과 유지보수성을 높인다.

## JavaScript에서 모듈

- 원래 자바스크립트는 모듈화와 거리가 먼 언어였음

- 그런데 프론트엔드 프로젝트 규모가 커지고 자바스크립트 프로그램을 필요에 따라 가져오고, 별도의 모듈로 분할하기 위한 메커니즘 필요성이 증대. ES6에 모듈 시스템이 추가됨.

- 모듈 사용을 가능케하는 자바스크립트 라이브러리, 프레임워크의 등장(RequireJS, CommonJS, AMD, 최근에는 Webpack, Babel)

## JavaScript 모듈의 역사

자바스크립트는 스크립트 코드를 파일로 나눠 `<script>` 태그로 불러오는 방식이 초기 모듈화의 전부였다. 이 방식의 문제점은 다음과 같다.

- 전역 변수 공간이 오염될 수 있음
- 다른 사람의 코드를 이용할 때 의존성 관계 확인이 어려움
- 파일들을 로드하는 순서가 중요해짐

이러한 문제점들을 개선하기위해 모듈 기반 시스템들이 등장했다.

### CommonJS

자바스립트를 브라우저에서 뿐만아니라 **서버사이드에서도** 사용하기 위해 만들어진 모듈 스펙

- 모듈화 방법: `exports` 사용
- 모듈 불러오는(이용) 방법: `require` 사용
- 서버사이드용으로 사용할 때 장점이 많음
- 로컬 디스크에서 모듈을 로드할 때 더 빠르고 간결
- 문제점:
  - 서버사이드에서는 js파일마다 독립적인 스코프를 만들기 때문에 전역 공간과 분리가 되지만 브라우저에서 동작할 때는 파일마다 단일하 스코프가 존재하지 않기 때문에 `<script>` 태그로 단순히 js 파일을 로드하면 여전히 **전역변수가 오염된다**
  - 브라우저에서 네트워크를 통해 필요한 모듈을 내려받을 동안 브라우저가 아무일도 하지 않는다는 문제점이 있다. (사용자 경험 나쁘게 만들 수 있음)

### AMD

Asynchronous Module Definition

비동기 상황에서도 자바스크립트 모듈을 쓰기 위해 CommonJS에서 논의하다 합의점을 찾지 못하고 따로 독립한 그룹이다.

- 자바스크립트를 브라우저에서 쓰는 것에 중점을 둠
- 브라우저에서 네트워크를 통해 모듈을 내려 받는 때 더 빠르고 간결(CommonJS 내용과의 차이점)
- `define` 함수를 사용하여 스코프를 분리함. 이 함수는 모듈 배열을 인자로 가지고 로드된 모듈을 콜백함수에 전달함.
- `define` 함수의 리턴값이 곧 exports 속성이 됨
- 모듈을 사용할 때는 `require`함수 사용. 이 함수는 의존 관계를 판단해 종속성이 있는 것을 먼저 로드하기 때문에 의존성 문제도 일정 부분 해결할 수 있음.

### ECMAScript 6

ECMA International 에서 정한 자바스크립트 표준이 ECMAScript이다.

ES6부터 자바스크립트 모듈화를 지원한다.

> ECMA(European Computer Manufacturer's Association)

현재 ES6 모듈을 지원하지 않는 브라우저들도 있어 SystemJS, RequireJS 등의 모듈 로더 또는 Webpack 등의 모듈번들러를 많이 사용한다.

### Webpack

CommonJS와 AMD의 명세를 모두 지원하는 자바스크립트 모듈 번들러

1. Node.js 통해 webpack 설치
2. 컴파일(의존 관계에 있는 모듈을 엮어 하나의 번들로 만드는 작업)

- 컴파일하면서 각 모듈은 함수로 감싸진다. 따라서 각 파일의 전역 변수가 모두 지역 변수가 된다.

- Webpack 로더: 다양한 리소스를 자바스크립트에서 바로 사용가능한 형태로 로딩하는 것

  - React의 JSX 형식 사용 가능
  - ES6를 사용할 수 있게 컴파일하는 Babel 사용 가능

- Webpack 장점
  - 모듈 의존성 관리가 편리
  - 로더를 활용한 다양한 리소스의 효율적인 활용
  - 빠른 컴파일 속도

## References

- https://webfirewood.tistory.com/105
- https://yonghyunlee.gitlab.io/front/webpack/
- https://poiemaweb.com/es6-module
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules

# Q&A

팀원들 결과물 및 질의응답&코드리뷰

유림
은영
노원 https://github.com/quavious/hell_script/blob/master/chapter9.js
정웅 https://www.notion.so/ac4b905296634db0a7caf5ef6a0e94f0?v=c1872030fdb24eb4b08b5a428b8d3284&p=8a5fac2802f74b4cb0063455f2e3830b
형욱 https://github.com/khw970421/js-interview/blob/master/const/project9.md

---
