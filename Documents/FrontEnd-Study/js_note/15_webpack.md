# Webpack이란?

Webpack은 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링해주는 모듈 번들러이다. 여러 의존 모듈들이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다. 그리고 여러 자바스크립트 파일들을 하나의 파일로 번들링하므로 html 파일에서 script 태그로 수많은 자바스크립트 파일들을 로드해야 하는 번거로움도 없어진다.

![](https://images.velog.io/images/pul8219/post/f0e91771-26ae-4b23-970c-ae625a8c0fa3/image.png)

```
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
```

# Webpack, Babel로 ES6 환경 구축하기

## Webpack 설치

```bash
$ npm install --save-dev webpack webpack-cli
```

## babel-loader

Webpack이 모듈을 번들링할 때 Babel을 사용해 ES6+ 코드를 ES5 코드로 트랜스파일링하도록 `babel-loader`를 설치한다.

```bash
$ npm install --save-dev babel-loader
```

`package.js`의 `scripts`를 변경하여 Babel 대신 Webpack을 실행하도록 수정해보자.

```json
{
  // ...
  "scripts": {
    "build": "webpack -w"
  }
  // ...
}
```

## webpack.config.js

`webpack.config.js` 파일을 생성한다. 이는 Webpack이 실행될 때 참조하는 파일이다. (프로젝트 루트에 생성하기 - package.json과 동일한 위치)

```js
// 📁webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  mode: 'development',
};
```

이제 `npm script`로 Webpack을 실행함으로써 트랜스파일링 & 번들링을 실행해보자. 트랜스파일링은 Babel이, 번들링은 Webpack이 실행한다.

```bash
$ npm run build

webpack 5.42.0 compiled successfully
```

실행 결과 `dist/js` 폴더에 `bundle.js` 파일이 생성됐다. 이 파일은 `main.js`, `lib.js` 모듈이 하나로 번들링된 결과이다.

`index.html`을 생성하고 아래와 같이 작성한 다음 브라우저에서 실행해보자.

```html
<!DOCTYPE html>
<head>
</head>
<body>
    <script src="../dist/js/bundle.js"></script>
</body>
</html>
```

`bundle.js`가 브라우저에서 문제없이 실행되는 것을 볼 수 있다.

## babel-polyfill

> Polyfill
>
> 특정 기능이 지원되지 않는 브라우저를 위해 사용할 수 있는 코드 조각이나 플러그인을 의미한다. IE나 구형 브라우저에서 어떤 기능이 지원되지 않을 때 많이 사용한다.

Babel을 사용해 트랜스파일링해도 여전히 브라우저가 지원하지 않는 코드가 남아있을 수 있다. (ex. ES6에서 추가된 Promise, Object.assign, Array.from 등)

`src/js/main.js`를 아래와 같이 수정해 Promise, Object.assign, Array.from 등이 어떻게 트랜스파일링 되는지 확인해보자.

```js
// 📁src/js/main.js
// ES6 모듈
import { pi, power, Foo } from './lib';

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());

// polyfill이 필요한 코드
console.log(
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 100);
  })
);

// polyfill이 필요한 코드
console.log(Object.assign({}, { x: 1 }, { y: 2 }));

// polyfill이 필요한 코드
console.log(Array.from([1, 2, 3], (v) => v + v));
```

다시 트랜스파일링 & 번들링을 실행한 다음 `dist/js/bundle.js`를 확인해보자.

```js
// 📁dist/js/bundle.js

// ...

console.log(new Promise(function (resolve, reject) {
  setTimeout(function () {
    return resolve(1);
  }, 100);
})); // polyfill이 필요한 코드

console.log(Object.assign({}, {
  x: 1
}, {
  y: 2
})); // polyfill이 필요한 코드

console.log(Array.from([1, 2, 3], function (v) {
  return v + v;
}));
})();
```

Promise, Object.assign, Array.from 등과 같이 ES5 이하로 대체할 수 없는 기능들은 트랜스파일링 되지 않는다.

따라서 오래된 브라우저에서도 ES6+에서 새롭게 추가된 객체나 메소드를 사용하기 위해서는 `@babel/polyfill`을 설치해야 한다.

```bash
$ npm install @babel/polyfill
```

`@babel/polyfill`은 개발환경에서만 사용하는 것이 아니라, 실제 환경에서도 사용해야 하므로 `--save-dev` 옵션으로 설치하지 않도록 한다.

> npm 옵션
>
> - `-dev`: 의존성(dependency)을 개발용으로 추가하고싶을 때. `package.json`의 `devDependencies`에 추가된다.
> - `--save`: `package.json`에 추가하겠다는 것
> - `--production`으로 빌드할 경우 `devDependencies`에 있는 패키지들은 설치되지 않는다.

ES6의 import를 사용하는 경우, 진입점의 선두에서 먼저 폴리필을 로드하도록 한다.

```js
// 📁src/js/main.js
import '@babel/polyfill';
// ...
```

Webpack을 사용하는 경우, 위 방법 대신 폴리필을 `webpack.config.js` 파일의 `entry` 배열에 추가한다.

```js
// 📁webpack.config.js

const path = require('path');

module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/main.js'],
  ...
```

위와 같이 `webpack.config.js` 파일을 수정하여 폴리필을 반영해보자.

```bash
npm run build
```

```js
__webpack_require__(
  /*! ../modules/es6.string.fixed */ './node_modules/core-js/modules/es6.string.fixed.js'
);
```

`dist/js/bundle.js`를 확인해보면 위의 형식처럼 polyfill이 추가된 것을 확인할 수 있다.

## Sass 컴파일

이번엔 Webpack으로 `Sass`를 컴파일해보자. Sass를 컴파일한 결과물인 CSS를 bundle.js에 포함시키는 방법과 별도의 CSS 파일로 분리하는 방법이 있다.

> Sass
>
> Sass(Syntactically Awesome StyleSheets)는 CSS pre-processor로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장(extension)이다.

### 컴파일된 CSS를 bundle.js 파일에 포함시키는 방법

필요한 패키지를 설치하자.

- node-sass: node.js 환경에서 사용가능한 Sass 라이브러리. 실제로 Sass를 CSS로 컴파일한다.
- style-loader, css-loader, sass-loader: Webpack 플러그인

```bash
$ npm install node-sass style-loader css-loader sass-loader --save-dev
```

`webpack.config.js` 파일을 아래와 같이 수정한다.

```js
// 📁webpack.config.js
const path = require('path');

module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/main.js', './src/sass/main.scss'], // ✏️
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // ✏️
        test: /\.scss$/,
        use: [
          'style-loader', // create style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to Css, using Node Sass by default
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  mode: 'development',
};
```

테스트를 위해 3개의 Sass 파일을 `src/sass` 폴더와 `src/sass/partials` 폴더에 추가한다.

```scss
// 📁src/sass/main.scss
@import 'partials/vars';
@import 'partials/body';
```

```scss
// 📁src/sass/partials/_vars.scss
$font_color: rgb(255, 90, 90);
$font_family: Arial, sans-serif;
$font_size: 32px;
$line_height: percentage(20px / $font_size);
```

```scss
// 📁src/sass/partials/_body.scss
body {
  color: $font_color;

  // Property Nesting
  font: {
    size: $font_size;
    family: $font_family;
  }

  line-height: $line_height;
}
```

다시 빌드 명령을 실행해보자.

```bash
$ npm run build
```

CSS가 적용되는 것을 확인하기 위해 index.html을 아래와 같이 수정하자.

```html
<!DOCTYPE html>
<head>
    <script src="../dist/js/bundle.js"></script>
</head>
<body>
    Hello world!
</body>
</html>
```

그리고 index.html을 실행해보면 CSS가 적용된 것을 볼 수 있다. 컴파일된 CSS는 `dist/js/bundle.js`에 포함되어있다.

### 컴파일된 CSS를 별도의 CSS 파일로 분리하는 방법

Sass 파일이 방대해지면 자바스크립트 파일에서 분리하는 것이 효율적일 수 있다. bundle.js 파일에 컴파일된 CSS 파일을 포함시키지 말고 별도의 CSS 파일로 분리해서 하나의 파일로 번들링해보자. `mini-css-extract-plugin`을 사용하면 된다.

`mini-css-extract-plugin` 설치

```bash
$ npm install --save-dev mini-css-extract-plugin
```

`webpack.config.js` 파일 수정

```js
// 📁webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/main.js', './src/sass/main.scss'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist'), // ✏️
    filename: 'js/bundle.js', // ✏️
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'css/style.css' })],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // ✏️
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to Css, using Node Sass by default
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  mode: 'development',
};
```

다시 빌드

```bash
$ npm run build
```

아래와 같이 css 폴더가 생성되고 `style.css` 파일이 저장되었다. 컴파일되어 하나의 파일로 번들링된 CSS파일이 bundle.js파일에 포함되지 않고 별도의 파일로 분리된 것이다.

```css
/* 📁dist/css/style.css */
body {
  color: #ff5a5a;
  font-size: 32px;
  font-family: Arial, sans-serif;
  line-height: 62.5%;
}

/*# sourceMappingURL=style.css.map*/
```

이제 `index.html`에서 이 `style.css`를 로드하도록 하자.

```html
<!DOCTYPE html>
<head>
    <link href="../dist/css/style.css" rel="stylesheet" />
    <script src="../dist/js/bundle.js"></script>
</head>
<body>
    Hello world!
</body>
</html>
```

`index.html`을 실행시켜보면 CSS가 적용된 것을 볼 수 있다.

# References

- [Babel과 Webpack을 이용한 ES6 환경 구축(2) - Poiemaweb](https://poiemaweb.com/es6-babel-webpack-2)
