[문서 목록으로 돌아가기](README.md)

# STEP 3

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)

- 작성자: Wol-dan (@pul8219)

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위: `심화1` this ~ 화살표 함수

- 기한:

# 보충 필요

- 엄격모드?(strict) 비엄격모드?

- 자바스크립트에서 객체 선언 방법

- inner

- ${}

**인터넷 자료마다 깊이에 따라 이해하기가 들쑥날쑥해서 코어자바스크립트 내용에서 이해한 것 중심으로 작성하였습니다.**

# 목차

- [this](#this)

- [명시적으로 this를 바인딩하는 방법](#명시적으로-this를-바인딩하는-방법)

- [화살표 함수](#화살표-함수)

- [Reference](#Reference)

## this

- `현재 실행 문맥`을 가리킨다.

- 실행 컨텍스트가 활성화될 때 실행 컨텍스트의 `thisBinding`에 this가 가리키는 객체가 저장된다.

- 대부분의 경우, 함수를 호출할 때 this가 결정된다.(상황에 따라 this가 달라짐) = 런타임에 this가 결정된다.

### 1. 전역 공간에서의 this

```js
브라우저에서 전역객체는 window 객체이다.
console.log(this === window); // true

var a = "js"
console.log(a, window.a, this.a); // "js" "js" "js"

this.b = "ES6"
console.log(b, window.b, this.b); // "ES6" "ES6" "ES6"

```

### 2. 메서드 호출시 메서드 내부에서의 this

#### [참고] 함수 vs 메서드

어떤 함수를 실행하는 방법은 여러 가지가 있는데, 대표적인 방법은 함수로서 호출하는 경우와 메서드로서 호출하는 경우이다.

```js
var func = function (x) {
  console.log(this, x);
};
func(1); // Window { ... } 1 => 함수로서 호출됨

var obj = {
  method: func, // obj 객체의 method 프로퍼티에 앞에서 만든 func 함수를 할당
};
obj.method(1); // { method: f } 1 => 메서드로서 호출됨
obj['method'](2); // { method: f } 2 => 메서드로서 호출됨
```

#### 2-1. 메서드 내부에서의 this

- 해당 메서드를 호출한 객체

```js
var obj = {
  methodA: function () {
    console.log(this);
  },
  inner: {
    methodB: function () {
      console.log(this);
    },
  },
};
obj.methodA(); // {inner: {…}, methodA: ƒ}  (=== obj)
obj['methodA'](); //{inner: {…}, methodA: ƒ} (=== obj)

obj.inner.methodB(); //{methodB: ƒ} (=== obj.inner)
obj.inner['methodB'](); //{methodB: ƒ} (=== obj.inner)
```

#### 2-2 함수 호출시 함수 내부에서의 this

##### 2-2-1. 함수 내부에서의 this

전역 객체를 가리킨다.

##### 2-2-2. 메서드의 내부함수에서의 this

```js
var obj1 = {
  outer: function () {
    console.log(this); // (1)
    var innerFunc = function () {
      console.log(this); //(2) (3)
    };
    innerFunc();

    var obj2 = {
      innerMethod: innerFunc,
    };

    obj2.innerMethod();
  },
};
obj1.outer();

//결과
// (1) obj1 => this는 메서드를 호출한 객체 obj를 가리킨다.
// innerFunc(); 실행시 (2) window => innerFunc(); 함수로서 호출했기 때문에 this가 지정되지 않고 자동으로 스코프 체인상 최상위 객체인 전역객체(window)가 바인딩됨
// obj2.innerMethod(); 실행시 (3) obj2 => this는 메서드를 호출한 객체 obj2를 가리킨다.
```

(2)는 outer 메서드 내부의 함수를 함수로서 호출했고, (3)은 같은 함수를 메서드로서 호출했다.(obj2.innerMethod() 이런식으로 객체로 메서드를 호출했기 때문)

### 생성자 함수 내부에서의 this

new 명령어와 함께 함수를 호출하면 해당 함수는 생성자로서 동작한다.
이 경우, 해당 함수 내부에서의 this는 곧 만들 인스턴스 자신이 된다

> **생성자**
> 구체적인 인스턴스를 만들기 위한 '틀' (프로그래밍적인 의미)

```js
var Dog = function (name, age) {
  this.bark = '멍멍';
  this.name = name;
  this.age = age;
};
var choco = new Dog('초코', 7);
var cogi = new Dog('코기', 5);
console.log(choco, cogi); // choco 인스턴스, cogi 인스턴스가 각각 출력된다.
```

## 명시적으로 this를 바인딩하는 방법

### apply(), call()

> func.apply(thisArg, [argsArray])
>
> func.call(thisArg[, arg1[, arg2[, ...]]])

- 첫번째 인자에 this를 명시적으로 지정함으로써 함수나 메서드를 호출하는 함수이다.

- `apply()`는 함수에 넘길 파라미터를 두번째 인자에 배열형태로 모두 넣어야하며, `call()`은 두번째 인자부터 콤마로 이어 작성한다는 차이점이 있다.

```js
const obj = {
  name: 'sujin',
};

const say = function (city) {
  console.log('Hello, my name is ' + this.name + ' , I live in ' + city);
};

say('seoul'); // Hello, my name is  , I live in seoul
say.call(obj, 'seoul'); // Hello, my name is sujin , I live in seoul
say.apply(obj, ['seoul']); // Hello, my name is sujin , I live in seoul
```

위 코드에서 `say("seoul")`로 `say`를 호출하면, 함수로서 호출한 것이므로 `this`가 `전역객체` window를 참조한다. 이 때 `this`의 `name` 프로퍼티는 세팅되어있지 않으므로 값이 출력되지 않는다.
`say.call(obj, "seoul");`와 `say.apply(obj, ["seoul"]);`는 첫번째 인자를 통해 `this`를 `obj`로 변경시킨다. 따라서 `obj` 객체에 있는 `name` 프로퍼티가 출력됨을 볼 수 있다.

### bind()

> func.bind(thisArg[, arg1[, arg2[, ...]]])

`bind()` 함수는 `apply()`, `call()`과 다르게 함수를 실행하지 않고 지정한 `this`값과 인자들을 이용하여 원본 함수를 복제한 결과를 리턴한다.

```js
const obj = {
  name: 'sujin',
};

const say = function (city) {
  console.log('Hello, my name is ' + this.name + ' , I live in ' + city);
};

const boundSay = say.bind(obj, 'seoul');
boundSay();
```

## 화살표 함수

this를 바인딩하지 않는 화살표 함수 (ES6에서 추가)
화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지기 때문에 상위 스코프의 this를 그대로 활용 가능

```js
var obj1 = {
		outer: function(){
			console.log(this); // (1)
			var innerFunc = () =>{ // 화살표 함수 사용
				console.log(this); //(2)
			}
			innerFunc();
	};
	obj1.outer();

//결과
// (1) outer
// (2) outer // 화살표 함수를 사용하지 않고 작성했다면 전역객체 window가 결과로 나왔을 것이다.
```

# Reference

- [코어 자바 스크립트](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158391720&orderClick=LEa&Kc=)

- [bind, apply, call](https://wooooooak.github.io/javascript/2018/12/08/call,apply,bind/)

- [bind() MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

- MDN - this https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
