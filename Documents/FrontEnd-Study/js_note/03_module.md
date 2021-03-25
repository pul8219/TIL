@eyabc [브라우저 모듈](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%AA%A8%EB%93%88.html#type-module-%EC%9D%98-%ED%8A%B9%EC%A7%95)

[모던 자바스크립트 - 모듈](https://ko.javascript.info/modules-intro)

https://velog.io/@widian/%EC%9B%B9%EC%97%90%EC%84%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

❓궁금증

`type="module" 의 특징` 파트의 다음 코드에서 `typeof button`은 DOM 요소를 어떻게 식별하는건지? button이라는 이름이 id인지 태그명인지?

```js
<script>
  alert(typeof button);
</script>

<button id="button">Button</button>
```

# 모듈

# 모듈의 핵심 기능

## 1. 항상 '엄격 모드'로 실행된다.

## 2. 모듈 레벨 스코프

- 모듈은 자신만의 스코프가 있어서, 모듈 내부에서 정의한 변수, 함수는 다른 스크립트에서 접근할 수 없다.
- 외부에 공개하려는 모듈은 `export`, 내보내진 모듈을 사용하려면 `import` 해줘야 한다.

## 3. 단 한 번만 평가된다.

- 동일한 모듈이 여러 곳에서 사용되더라도 **모듈은 최초 호출 시 단 한 번만 실행된다.**

```js
// 📁 alert.js
alert('모듈이 평가됨');

// 📁 1.js
import './alert.js';
console.log('1.js');

// 📁 2.js
import './alert.js';
console.log('2.js');
```

```html
<script src="./1.js" type="module"></script>
<script src="./2.js" type="module"></script>
```

```
결과

'모듈이 평가됨' 메시지가 적힌 alert창이 뜬다.
'1.js' 출력됨
'2.js' 출력됨
```

- 실행된 모듈은 모듈을 가져오는 곳에 모두 공유된다.

```js
// 📁 admin.js
export let admin = { name: 'Bob' };
export function sayHi() {
  alert(`${admin.name}님, 안녕하세요.`);
}

// 📁 init.js
import { admin } from './app.js';
admin.name = 'Pete';

// 📁 other.js
import { admin, sayHi } from './app.js';
alert(admin.name); // "Pete"
sayHi(); // "Pete님, 안녕하세요!"
```

최초로 실행되는 `init.js` 에서 `admin.name`을 설정해주면 `admin.js`를 포함한 외부 스크립트에서 `admin.name`에 저장된 정보를 볼 수 있다.

```html
<script src="./init.js" type="module"></script>
<script src="./other.js" type="module"></script>
```

# `export`

> **클래스나 함수를 내보낼 때 세미콜론을 붙이지 마세요**
>
> 자바스크립트 스타일 가이드에 따라 클래스(class)나 함수(function)를 `export`로 내보낼 때 선언 끝에 `;(세미콜론)`을 붙이지 않는 것을 권장한다.

`export`로 모듈을 내보내는 방법에는 두 가지가 있다. `named`와 `default`. `named` 방식을 이용하면 모듈마다 여러개의 `export`를 할 수 있지만 `default`는 하나만

## export named

- named 방식은 여러 값을 내보낼 때 유용하다.
- named로 내보낸 개체들을 가져올(import)때는 내보낸 이름과 동일한 이름을 사용해야한다.

```js
// 먼저 선언한 식별자 내보내기
export { myFunc, myVar };

// 각각의 식별자 내보내기 (변수, 상수, 함수, 클래스 모두 가능)
export let myVar = 'myVar';
export function myFunc() {
  //...
}
```

## export `default`

- `default` 내보내기는 하나만 가능하다.
- 내보낼 개체에 이름이 없더라도 괜찮다. (단, `default` 내보내기가 아닌 경우, 개체에 이름이 없으면 에러가 발생한다.)

```js
// 먼저 선언한 식별자 내보내기
export { myFunc as default };

// 각각의 식별자 내보내기
export default function () {
  // ...
}
```

모듈은 크게 두 종류로 나뉜다.

1. 복수의 함수가 있는 라이브러리 형태의 모듈
2. 개체 하나만 선언되어있는 모듈

대개 두 번째 방식으로 모듈을 만드는 걸 선호하는데, 이렇게 모듈을 만들다 보면 자연스레 파일 개수가 많아진다. 그렇더라도 모듈 이름을 잘 지어주고 폴더에 파일을 잘 나눠 프로젝트를 구성하면 코드 탐색이 어렵지 않다.

모듈은 `export default`라는 특별한 문법을 제공한다. 이를 사용하면 해당 모듈엔 개체가 하나만 있다는 사실을 명확히 할 수 있다.

파일 하나엔 대개 `export default`가 하나만 있다.

`default`를 붙여 모듈을 내보내면 중괄호 `{}`없이 모듈을 가져올 수 있다.

named export와 default export를 같은 모듈에서 동시에 사용해도 문제는 없으나 보통 실무에서는 이렇게 쓰는 사례는 드물다. 한 파일엔 named export나 default export 둘 중 하나만 사용한다.

# References

@eyabc

- [브라우저 모듈과 ESM](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%AA%A8%EB%93%88.html#%EB%B9%8C%EB%93%9C-%ED%88%B4)

모던 자바스크립트

- [모듈 소개](https://ko.javascript.info/modules-intro)
- [모듈 내보내고 가져오기](https://ko.javascript.info/import-export)

MDN

- [export](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export)
- [import](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import)
