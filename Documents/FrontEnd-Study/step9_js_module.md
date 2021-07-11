[문서 목록으로 돌아가기](README.md)

> # STEP 9, 10
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/home>
> - 공부 범위: [모듈](https://gitlab.com/siots-study/topics/-/wikis/module) 모듈의 역사와 종류 중심으로 정리할 것(STEP 9) + 모듈 문법(STEP 10)
> - 기한: 9/12(토) ~ 9/15(화) (STEP 9), 9/18(토) ~ 9/22(화) (STEP 10)

# 보충 필요

- js에서 '와 "
- 모듈 레벨 스코프
- export 하는 모듈은 항상 “use strict” 이다.
- [브라우저 모듈](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%AA%A8%EB%93%88.html) 문서 참고
- export default

# 목차

- [모듈이란?](#모듈이란?)
- [JavaScript에서 모듈](#JavaScript에서-모듈)
- [JavaScript 모듈의 역사와 문법](#JavaScript-모듈의-역사와-문법)
- [References](#References)

# 모듈이란?

- 모듈이란 별도로 분리된 재사용 가능한 코드 조각을 의미한다.
- 쉽게 말하면 파일 하나를 의미한다. 스크립트 하나는 모듈 하나이다.
- 모듈은 세부사항을 캡슐화하고 필요한 API만을 외부에 공개한다.
- 모듈은 기능별로 분리되고 재사용성이 좋아 개발 효율성과 유지보수성을 높인다.

# 자바스크립트에서 모듈

- 원래 자바스크립트는 모듈화와 거리가 먼 언어였다.
- 그런데 프론트엔드 프로젝트 규모가 커지고 자바스크립트 프로그램을 필요에 따라 가져오고, 별도의 모듈로 분할하기 위한 메커니즘 필요성이 증대. ES6에 모듈 시스템이 추가됨.
- 모듈 사용을 가능케하는 자바스크립트 라이브러리, 프레임워크의 등장(RequireJS, CommonJS, AMD, 최근에는 Webpack, Babel)

# 모듈 스코프

- 모듈 내에서 선언된 변수들은 모듈 내부의 가장 바깥 스코프에서 선언했더라도 전역 스코프/전역 변수에 저장되지 않고 모듈 스코프 내에서 선언되기 때문에 **전역 변수가 오염될 걱정은 하지 않아도 된다.**
- 모듈 스코프에 선언된 이름은 해당 모듈을 export 하지 않을 경우, 해당 모듈 내부에서만 접근할 수 있다.

# 자바스크립트 모듈의 역사와 문법

자바스크립트는 스크립트 코드를 파일로 나눠 `<script>` 태그로 불러오는 방식이 초기 모듈화의 전부였다. 이 방식의 문제점은 다음과 같다.

- 전역 변수 공간이 오염될 수 있음
- 다른 사람의 코드를 이용할 때 의존성 관계 확인이 어려움
- 파일들을 로드하는 순서가 중요해지며 이를 해결해야 했음

이러한 문제점들을 개선하기위해 모듈 기반 시스템들이 등장했다.

## `<script>`태그로 도배하는 것의 문제점

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <script src="./foo.js"></script>
    <script src="./bar.js"></script>
    ...
  </head>
  <body></body>
</html>
```

```js
// foo.js

let num = 1;
```

```js
// bar.js

let num = 2;
```

1. 브라우저 스코프 문제

`foo.js`, `bar.js` 파일을 스크립트 태그로 불러오고 각각의 파일에서 같은 이름의 변수를 쓴다고 해보자. 이렇게 작성하게 되면, 가장 뒤에 쓰인 스크립트 기준으로 변수이름이 적용되어 `foo.js`에서 사용한 변수 `num`은 씹히게 된다.

2. 의존성 관리 문제

모듈의 의존성 순서를 전부 고려해 스크립트 태그를 적절한 곳에 위치시켜야 한다.

예를 들어 모듈 A가 모듈 B에 의존한다면, 모듈 B가 로드되고나서 모듈 A가 로드되어야 한다. 그런데 만약 수십, 수백개의 모듈들에 대해 의존성 관리를 해야 한다면 생산성이 떨어질 것이다.

3. 로드 시간

스크립트 태그는 새로운 HTTP 커넥션을 필요로 한다. `HTTP/2`(2015)가 등장하기 전에는 HTTP 커넥션이 병렬이 아닌 직렬적으로 로드됐기 때문에 script 태그에 파일 한개씩 총 100개의 script 태그가 있었다면 100번의 HTTP 커넥션이 필요했다. HTTP 커넥션을 통해 자바스크립트 모듈을 다운받을 때마다 클라이언트 유저의 브라우저는 하얗게 멈춰있게 된다. 스크립트 태그가 많다면 유저는 더 기다려야 한다. (`HTTP/2`는 멀티플렉싱을 통해 병렬적으로 로드)

`1`, `2`, `3`번에서 제시된 문제와 `웹페이지를 방문한 유저의 대기 시간 최소화`를 위한 모듈화 표준을 위해 CommonJS가 (절반의) 해결책을 제시했다.

## CommonJS

자바스립트를 브라우저에서 뿐만아니라 **서버사이드에서도** 사용하기 위해 만들어진 모듈화 표준

- 서버사이드용으로 사용할 때 장점이 많음
- 로컬 디스크에서 모듈을 로드할 때 더 빠르고 간결
- 현재 `Node.js`에서 이 방식을 사용하고 있다.

모듈화의 3요건을 충족시킴:

- 모듈 파일마다 스코프가 설정되므로 각 모듈을 불러오는 상위 파일 내에서 변수 충돌이 없다면 이 시스템에서는 변수 충돌이 일어나지 않는다.
- 파일 덩어리를 임포터하는 게 아니라 필요한 함수나 변수를 가져올 수 있게 되었다.
- `module.exports`, `require`를 통해 의존되어있는 파일, 패키지들을 관리할 수 있게 되었다.

문제점:

- 서버사이드에서는 js파일마다 독립적인 스코프를 만들기 때문에 전역 공간과 분리가 되지만 브라우저에서 동작할 때는 파일마다 단일한 스코프가 존재하지 않기 때문에 `<script>` 태그로 단순히 js 파일을 로드하면 여전히 **전역변수가 오염된다**
- 브라우저에서 네트워크를 통해 필요한 모듈을 내려받을 동안 브라우저가 아무일도 하지 않는다는 문제점이 있다. (사용자 경험 나쁘게 만들 수 있음)
- CommonJS는 blocking 방식이라 브라우저에서 활용할 시 너무 느리다는 단점이 있다.

> ```js
> // main.js
>
> const foo = require('foo.js');
> const bar = require('bar.js');
> ```
>
> require 함수가 blocking 함수이기 때문에 위 코드에서 자바스크립트 인터프리터는 require('foo.js')라인에서 잠시 > 멈추었다가 컨텍스트를 바꿔 require() 안의 과정을 모두 끝내고 그 리턴값을 foo에 받고 나서야 그 다음 코드라인을 읽는다.
>
> 웹 브라우저에서는 서버에 request를 날려 파일들을 읽어오게 되는데 이때 속도 측면에서 문제가 있다. `foo.js`를 require할 > 때 HTTP request 한 번, `bar.js`를 require할 때 HTTP request 한 번 하게 되어 통신 비용이 많이 발생한다. 이것이 > 서버사이드 방식을 웹 환경에 적용하기 어려운 이유다.
>
> 다행히 2008년에 V8 크롬 엔진이 도입되어 event loop를 사용하면서, async하게 돌아갈 수 있는 환경이 만들어졌다. async 하다는 것은 non-blocking이라서 실행될 때까지 기다리지 않고 함수를 큐에 담아 여러 개의 작업들을 동시적으로 수행한다는 것이다.

## CommonJS 문법

- 모듈화 방법: `module.exports`
- 모듈 불러오는(이용) 방법: `require`

```js
// foo.js

module.exports.foo = function () {
  // ...
};
```

```js
// bar.js

var foo = require('./foo.js').foo;
```

### `export` vs `module.exports`

예정

- [module.exports와 exports이해하기](https://uroa.tistory.com/57)

## AMD

> Asynchronous Module Definition

**비동기** 상황에서도 자바스크립트 모듈을 쓰기 위해 CommonJS에서 논의하다 합의점을 찾지 못하고 따로 독립한 그룹이다. 브라우저의 non-blocking, async 성질을 적극 활용해 웹에 적합한 모듈화 시스템을 만드려는 목표를 가지고 있었다.

- AMD를 구현한 대표적인 모듈시스템은 `Require.js`
- 자바스크립트를 웹 브라우저에서 쓰는 것에 중점을 둔다.
- 브라우저에서 네트워크를 통해 모듈을 내려 받는 때 장점이 많다. 브라우저에서 비동기 모듈 로딩방식으로 구현을 해놓았기 때문.
- `define` 함수(AMD 만의 특징)를 사용하여 스코프를 분리한다. 이 함수는 모듈 배열을 인자로 가지고 로드된 모듈을 콜백함수에 전달한다.
- `define` 함수의 리턴값이 곧 exports 속성이 된다.
- CommonJS와 같이 `exports` 객체로 모듈을 정의하고 모듈을 사용할 때는 `require`함수 사용한다. `require` 함수는 의존 관계를 판단해 종속성이 있는 것을 먼저 로드하기 때문에 의존성 문제도 일정 부분 해결할 수 있다.

문제점:

- 서버사이드에서 사용하려고 만든 함수를 브라우저에서 쓰려면 AMD 형식에 맞춰 다 바꿔주어야 하는 번거로움이 있다.
- AMD가 제안된지 얼마 되지 않아 npm(Node Package Manager)이 등장하고 많은 개발자들이 node.js에 (대부분) CommonJS 형식으로 만들어진 멋진? 모듈들을 업로드하기 시작하면서 CommonJS 형식으로 만든 코드를 AMD 스타일로 변환해야할 상황들이 많아졌다. (서버사이드의 코드 따로, AMD 형식 코드 따로 이렇게 짜는 과정을 하나로 줄이고 이런 문제를 해결하기 위해 모듈 번들러가 등장했다.)

## AMD 문법

예정

## ECMAScript 6에서 추가된 모듈화 기법

- ES6부터 자바스크립트 모듈화를 지원한다. (`import/export`를 사용하는 모듈화의 표준)
- 현재 ES6 모듈을 지원하지 않는 브라우저들도 있어 SystemJS, RequireJS 등의 모듈 로더 또는 Webpack 등의 모듈 번들러를 많이 사용한다.

> - ECMA(European Computer Manufacturer's Association) International 에서 정한 자바스크립트 표준이 `ECMAScript`이다.
> - ES6(ECMAScript 6)은 ECMA 2015라고도 불린다.

ES6에서 표준화된 모듈 가져오기는 다음과 같다. `main.js`에서 `foo.js` 파일에 있는 `foo` 함수를 가져오는 코드이다.

```js
// main.js

import foo from 'foo';
foo();
```

```js
// foo.js
function foo() {
  console.log('foo');
}

export default { foo };
```

> ### 모듈화의 기본적인 요건들
>
> - 독립된 스코프가 존재해야 한다.(전역 변수 영역을 더럽히지 않도록!)
> - 파일 덩어리나 하나 전부를 모듈로 가져오는 것이 아니라(ex.`<script>` 태그로 모듈을 가져오는 경우) 파일에서 함수나 객체를 가져올 수 있어야 한다.(가독성을 높임)
> - 의존성 관리가 수월해야 한다.(그래야 확장이 쉽다)

## ESM(ECMAScript Module)

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

# References

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

## 유림

step 9, 10
https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step9_js_module.md

## 은영

step9

- [모듈](https://eyabc.github.io/Doc/dev/core-javascript/%EB%AA%A8%EB%93%88.html)
- [모듈의 변화](https://eyabc.github.io/Doc/dev/core-javascript/JS%20%EB%AA%A8%EB%93%88%EC%9D%98%20%EB%B3%80%ED%99%94.html)

step10

- [브라우저 모듈](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%AA%A8%EB%93%88.html#%EB%8B%A8-%ED%95%9C%EB%B2%88%EB%A7%8C-%ED%8F%89%EA%B0%80%EB%90%A8)
- [ESM](https://eyabc.github.io/Doc/dev/core-javascript/ESM.html)

`동일한 모듈이 여러 곳에서 사용되더라도 모듈은 최초 호출 시 단 한번만 실행된다.`

`type="module" 의 특징` > `지연실행`

`import.meta` 설명 부분의 코드내에 보면 import.meta.url을 쓸시에 `인라인 스크립트가 위치해 있는 html 페이지의 URL` 이라 작성되어 있는데 혹시 인라인 스크립트가 무엇인가요?.. 결국 이 alert 문에서 출력되는 결과가 무엇인지 잘 모르겠어서 질문드립니다.

## 노원

step9
https://github.com/quavious/hell_script/blob/master/chapter10.js

step10
https://github.com/quavious/hell_script/blob/master/chapter9.js

잘 읽었습니다.
유저의 특정한 동작에 모듈이 작동되도록 하여 모듈 로드 시간을 줄이는 부분은 정리하지 못했는데 도움이 됐습니다.!!

`모듈은 기본적으로 엄격모드이다.`

const module... 및 import module... 와 같은 정적 import 문은 모든 모듈을 불러오고 나서 코드가 실행된다.
반대로 유저의 특정한 동작에 모듈이 작동되도록 할 수 있다.
전체 모듈 로드 시간을 줄일 수 있다.

```js
//<script type="module">
(async () => {
  const foo = './lib.mjs';
  const { func1, func2 } = await import(foo);
  await func2();
  func1();
  const { func3 } = require('./onemodule.js');
  await func3();
  console.log('Module loaded dynamically');
})();
//</script>
```

```
현재 웹 브라우저는 ES6 모듈을 지원하고 있지 않다.
script 태그에 type="text/module"을 명세하거나
Webpack, Browserify 등의 라이브러리를 사용해야 한다.


예)
React도 create-react-app으로 실행해서 리액트 프로젝트를 생성 후 열어보았을 때
Webpack 라이브러리가 설치되어 있는 것을 확인할 수 있다.
```

## 정웅

step9
https://www.notion.so/ac4b905296634db0a7caf5ef6a0e94f0?v=c1872030fdb24eb4b08b5a428b8d3284&p=8a5fac2802f74b4cb0063455f2e3830b

step10

## 형욱

step9
https://github.com/khw970421/js-interview/blob/master/const/project9.md

step10
https://github.com/khw970421/js-interview/blob/master/const/project10.md

## 잘 읽었습니다! `export default` 문법 설명부를 보니 제가 썼던 애매모호한 설명의 수정에 도움이 될 것 같습니다. 감사합니다.
