# STEP 9, 10

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위:

[모듈](https://gitlab.com/siots-study/topics/-/wikis/module)

모듈의 역사와 종류 중심으로 정리할 것

- 기한: 9/12(토) ~ 9/15(화)

# 보충 필요

- `defer`

- js에서 '와 "

# 모듈

## 목차

- [모듈이란](#모듈이란?)

- [JavaScript에서 모듈](#JavaScript에서-모듈)

- [JavaScript 모듈의 역사](#JavaScript-모듈의-역사)

- [JavaScript 모듈의 문법](#JavaScript-모듈의-문법)

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
- 현재 `Node.js`에서 이 방식을 사용하고 있다.
- 문제점:
  - 서버사이드에서는 js파일마다 독립적인 스코프를 만들기 때문에 전역 공간과 분리가 되지만 브라우저에서 동작할 때는 파일마다 단일하 스코프가 존재하지 않기 때문에 `<script>` 태그로 단순히 js 파일을 로드하면 여전히 **전역변수가 오염된다**
  - 브라우저에서 네트워크를 통해 필요한 모듈을 내려받을 동안 브라우저가 아무일도 하지 않는다는 문제점이 있다. (사용자 경험 나쁘게 만들 수 있음)

### CommonJS 문법

예정

`export` vs `module.exports`

### AMD

Asynchronous Module Definition

비동기 상황에서도 자바스크립트 모듈을 쓰기 위해 CommonJS에서 논의하다 합의점을 찾지 못하고 따로 독립한 그룹이다.

- AMD를 구현한 대표적인 모듈시스템은 `Require.js`
- 자바스크립트를 브라우저에서 쓰는 것에 중점을 둔다.
- 브라우저에서 네트워크를 통해 모듈을 내려 받는 때 장점이 많다. 브라우저에서 비동기 모듈 로딩방식으로 구현을 해놓았기 때문.
- `define` 함수(AMD 만의 특징)를 사용하여 스코프를 분리한다. 이 함수는 모듈 배열을 인자로 가지고 로드된 모듈을 콜백함수에 전달한다.
- `define` 함수의 리턴값이 곧 exports 속성이 된다.
- CommonJS와 같이 `exports` 객체로 모듈을 정의하고 모듈을 사용할 때는 `require`함수 사용한다. `require` 함수는 의존 관계를 판단해 종속성이 있는 것을 먼저 로드하기 때문에 의존성 문제도 일정 부분 해결할 수 있다.

### AMD 문법

예정

### ECMAScript 6

ECMA International 에서 정한 자바스크립트 표준이 ECMAScript이다.

ES6부터 자바스크립트 모듈화를 지원한다.

> ECMA(European Computer Manufacturer's Association)

현재 ES6 모듈을 지원하지 않는 브라우저들도 있어 SystemJS, RequireJS 등의 모듈 로더 또는 Webpack 등의 모듈번들러를 많이 사용한다.

### ESM(ECMAScript Module)

ES6부터 지원하는 자바스크립트 자체 내장 모듈 시스템

다음 예제 코드들을 보자.

아래 코드는 HTML 파일에서 모듈을 가져오는 코드를 작성한 것이다.

```html
<!-- 📁 index.html -->
<!-- HTML 파일에서 모듈 가져오기 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Module test</title>
    <!-- 404 에러 때문에 넣어준 코드 -->
    <link rel="shortcut icon" href="#" />
    <script type="module" src="lib.mjs"></script>
    <script type="module" src="app.mjs"></script>
  </head>
  <body></body>
</html>
```

ES6 모듈 파일의 확장자는 모듈인 것을 분명히 하기 위해 `.mjs` 확장자를 사용한다.

**`export`**

모듈 스코프에서 모듈 밖으로 이름들을 내보낼 때는 `export` 키워드를 사용한다.

```js
// 📁 module.mjs

export const birthday = '🍰';

export function collabo(a, b) {
  return `${a} + ${b}`;
}

export class Person {
  constructor(name) {
    this.name = name;
  }
}

// + 모듈밖으로 내보낼 때 한번에 내보내고 싶다면 위 코드에서 export 키워드를 제거한 다음, 추가로 다음과 같이 써준다.
export { birthday, collabo, Person };
```

**`import`**

모듈을 가져올 때는 `import` 키워드를 사용한다.

```js
// 📁 app.mjs

// 경우 1
import { birthday, collabo, Person } from './lib.mjs';

console.log(birthday); // 🍰
console.log(collabo('🥚', '🥗')); // 🥚 + 🥗
console.log(new Person('yurim')); // Person { name: "yurim" }

// 경우 2
// 위 코드를 아래 코드처럼 작성하여 한번에 모듈을 가져올 수도 있음

import * as lib from './lib.mjs';

console.log(lib.birthday);
console.log(lib.collabo('🥚', '🥗'));
console.log(new lib.Person('yurim'));

// 경우 3
// 모듈을 가져오며 이름 변경도 가능

import { birthday as bd, collabo as mix, Person as P } from './lib.mjs';

console.log(bd);
console.log(mix('🥚', '🥗'));
console.log(new P('yurim'));
```

**index.html 파일 실행 결과**

![image](https://user-images.githubusercontent.com/33214449/93793872-5b82ee00-fc72-11ea-9cde-799983c24614.png)

**export default**

하나의 데이터만 export 할 경우 `default` 키워드를 사용한다.

`default` 키워드를 사용할 경우, var, let, const 사용이 불가하다.

`default`로 export된 모듈은 import시 {} 없이 임의 이름으로 가져다 쓴다.

```js
// 하나의 데이터만 export할 경우 default 사용

export default functon(x){
  return x + x;
}

```

```js
// default 키워드를 사용한 모듈을 가져오는 예

import double from './lib.mjs';

console.log(double(2)); // 4
```

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
- [JS) 모듈에 대한 이해와 사용법](https://baeharam.netlify.app/posts/javascript/module)
- [ECMAScript) AMD, CommonJS의 JavaScript 모듈화](https://minjung-jeon.github.io/AMD-CommonJS-RequireJS/)
- [JavaScript)Module(CommonJS-Nodejs, RequireJS-AMD, ESM, UMD)](https://velog.io/@zeros0623/JavaScript-ModuleCommonJS-Nodejs-RequireJS-AMD-ESM-UMD)
- [로컬에서 CORS policy 관련 에러가 발생하는 이유](https://velog.io/@takeknowledge/%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-CORS-policy-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3gk4gyhreu)

# Q&A

팀원들 결과물 및 질의응답&코드리뷰

유림
은영
노원 https://github.com/quavious/hell_script/blob/master/chapter9.js
정웅 https://www.notion.so/ac4b905296634db0a7caf5ef6a0e94f0?v=c1872030fdb24eb4b08b5a428b8d3284&p=8a5fac2802f74b4cb0063455f2e3830b
형욱 https://github.com/khw970421/js-interview/blob/master/const/project9.md

---
