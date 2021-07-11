# Babel이란?

최신 자바스크립트 표준은 웹사이트에 적용되기까지 오랜 시간이 걸린다. Babel(바벨)은 최신 사양의 자바스크립트 코드를 IE나 구형 브라우저에서도 동작하는 ES5 이하의 코드로 변환해주는(트랜스파일링) **자바스크립트를 위한 컴파일러**이다. Babel을 이용하면 ES6 뿐만 아니라 React의 JSX 형식도 변환할 수 있다.

> 트랜스파일러: 최신 표준의 소스코드를 이전 표준의 코드로 변환해주는 도구를 일컫는 말

# Babel CLI 설치

명령줄에서 사용할 수 있는 Babel CLI를 설치해보자.

```bash
// 프로젝트에 따라 설정이 다를 수 있으므로 전역(global)이 아닌 로컬로 설치
// 설치하면 package.json에 Babel 관련 디펜던시가 생성된 것을 볼 수 있다.

$ npm install --save-dev @babel/core @babel/cli
```

# .babelrc 설정 파일 작성

Babel을 사용하려면 `@babel/preset-env`을 설치해야 한다. `@babel/preset-env`은 함께 사용되어야 하는 Babel 플러그인을 모아둔 것으로 Babel 프리셋이라 부른다.

> **Babel이 제공하는 공식 Babel 프리셋(Official Preset)**
>
> - @babel/preset-env
> - @babel/preset-flow
> - @babel/preset-react
> - @babel/preset-typescript

`@babel/preset-env`도 공식 프리셋의 하나이며 필요한 플러그인 들을 프로젝트 지원 환경에 맞춰서 동적으로 결정해 준다. 프로젝트 지원 환경은 `Browserslist` 형식으로 `.browserslistrc` 파일에 상세히 설정할 수 있다. 프로젝트 지원 환경 설정 작업을 생략하면 기본값으로 설정된다.

일단 기본 설정으로 진행하도록 하자. 기본 설정은 모든 ES6+ 코드를 변환한다.

```bash
# env preset 설치
$ npm install --save-dev @babel/preset-env
```

설치 후 프로젝트 루트에 `.babelrc` 파일을 생성하고 아래와 같이 작성한다. 방금 설치한 `@babel/preset-env`를 사용하겠다는 의미이다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

# 트랜스파일링

Babel을 사용해 ES6+ 코드를 ES5 이하의 코드로 트랜스파일링하는 방법에는 다음과 같은 것들이 있다.

1. Babel CLI 명령어 사용
2. npm script 사용

2번 방법으로 트랜스파일링을 해보자.

`package.json` 파일에 다음과 같이 `scripts`를 추가해보자.

```js
// 📁package.json
{
  // ...
  "scripts": {
    "build": "babel src/js -w -d dist/js",
  }
  // ...
}
```

이 스크립트의 의미는 `src/js` (타깃)폴더에 있는 모든 ES6+ 파일들을 트랜스파일링한 후, 그 결과물을 `dist/js` 폴더에 저장하겠다는 것이다.

> 옵션
>
> - `-w`: 타깃 폴더에 있는 모든 파일들의 변경을 감지하여 자동으로 트랜스파일링한다. (프로그램을 저장할 때마다 곧바로 변환해준다.)
> - `-d`: 트랜스파일링된 결과물이 저장될 폴더를 지정한다.

Babel로 트랜스파일링을 테스트하기 위해 ES6+ 파일을 작성해보자. 프로젝트 루트에서 `src/js` 폴더를 생성한 후 `lib.js`, `main.js` 파일을 추가하자.

```js
// 📁src/js/lib.js
// ES6 모듈
export const pi = Math.PI;

export function power(x, y) {
  // ES7: 지수 연산자
  return x ** y;
}

// ES6 클래스
export class Foo {
  // stage 3: 클래스 필드 정의 제안
  #private = 10;

  foo() {
    // stage 4: 객체 Rest/Spread 프로퍼티
    const { a, b, ...x } = { ...{ a: 1, b: 2 }, c: 3, d: 4 };
    return { a, b, x };
  }

  bar() {
    return this.#private;
  }
}
```

```js
// 📁src/js/main.js
// ES6 모듈
import { pi, power, Foo } from './lib';

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());
```

이제 터미널에서 아래 명령으로 트랜스파일링을 실행한다.

```bash
$ npm run build

Successfully compiled 2 files with Babel.
```

트랜스 파일링에 성공하면 프로젝트 루트에 `dist/js` 폴더가 생성되고 트랜스파일링된 `main.js`, `lib.js`가 저장된다.

트랜스파일링된 `main.js`를 실행시켜보자. 결과는 아래와 같다.

```
3.141592653589793
36.4621596072079
{ a: 1, b: 2, x: { c: 3, d: 4 } }
10
```

# 브라우저에서 모듈 로딩 테스트

앞에서 `main.js`, `lib.js`는 정상적으로 ES5로 변환되었다. ES6 모듈의 import, export 키워드도 트랜스파일링되어 모듈 기능도 정상적으로 동작한다.

하지만 이 모듈 기능은 node.js 환경에서 동작한 것이고 Babel이 모듈을 트랜스파일링한 것도 node.js에서 기본적으로 지원하는 CommonJS 방식의 모듈 로딩 시스템에 따라 이루어졌다. 그래서 `dist/js` 폴더 안에 있는 트랜스파일링된 `main.js` 파일을 브라우저에서 실행할 경우 다음과 같은 에러가 발생한다.

```
Uncaught ReferenceError: exports is not defined at lib.js:3
main.js:3 Uncaught ReferenceError: require is not defined at main.js:3
```

브라우저의 ES6 모듈 기능을 사용하도록 Babel을 설정할 수도 있으나 이 방법은 문제가 있다.(앞서 설명한 구형 브라우저 등등의 이야기를 비추어볼 때)

Webpack을 통해 이러한 문제를 해결해보도록 하자.

# References

- [Babel과 Webpack을 이용한 ES6 환경 구축(1) - Poiemaweb](https://poiemaweb.com/es6-babel-webpack-1)
