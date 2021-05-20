# 목차

# this

- `현재 실행 문맥`을 가리킨다.
- 실행 컨텍스트가 활성화될 때 실행 컨텍스트의 `thisBinding`에 `this`가 가리키는 객체가 저장된다.
- 대부분의 경우, 함수를 호출할 때 `this`가 결정된다.(상황에 따라 this가 달라짐) = **런타임에 this가 결정된다.**

# this는 현재 실행 문맥이다.

호출자가 누구인지를 따지면 된다.

```js
alert(this === window); // true, 호출자: window

const caller = {
  f: function () {
    alert(this === window);
  },
};

caller.f(); // false, 호출자: caller 객체
```

첫번째는 함수 호출, 두번째는 메소드 호출이라고 말하는데 이러한 구분은 오히려 혼란을 야기한다. 첫번째 라인의 `alert()`는 `window.alert()`와 같기 때문에 window 객체의 메소드를 호출한 것으로 봐도 무방하다.

(다만, `strict-mode`에서는 전역 객체냐 일반 객체냐에 따라 함수내부의 this값이 다르다는 차이가 있다. 그러나 이 문제 또한 window를 함수 호출 앞에 붙여주면 해결된다. ??? ⬇️)

```js
function nonStrictMode() {
  return this;
}

function strictMode() {
  'use strict';
  return this;
}

console.log(nonStrictMode()); // window
console.log(strictMode()); // undefined
console.log(window.strictMode()); // window
```

# Global context에서의 this

전역 실행 컨텍스트에서 `this`는 **전역 객체**이다. (엄격모드인지 아닌지에 상관없이)

# 엄격모드, 비엄격모드에 따른 this

❗ 보충필요

- 비엄격모드(non-strict mode) 에서는, 항상 객체를 참조한다(?)
- 엄격모드(strict mode)에서는, 전역 객체인지 일반 객체인지에 따라 함수내부의 this 결과가 다르다.

# 생성자 함수 / 객체 에서의 this

- `new` 키워드와 함께 함수를 호출하면 해당 함수는 생성자로서 동작한다.
- 이 경우, 해당 함수 내부에서의 `this`는 곧 만들 인스턴스(객체) 자신이 된다.

```js
const Dog = function (name, age) {
  this.name = name;
  this.age = age;
  this.isWindow = function () {
    return this === window;
  };
};

const dog1 = new Dog('초코', 7);
console.log(dog1.name); // 초코
console.log(dog1.age); // 7
console.log(dog1.isWindow()); // false
const dog2 = new Dog('코기', 5);
console.log(dog2.name); // 코기
console.log(dog2.age); // 5
console.log(dog2.isWindow()); // false
```

위 코드에서 `new` 키워드가 없으면 어떻게 될까? `new` 키워드가 없으면 일반적인 함수 실행과 동일하게 동작하므로, `Dog` 함수 내의 `this`는 `window`객체가 된다. 하지만 `withoutNew`에는 함수 실행의 결과값이 담기므로 각 property를 가져올 수 없다. 아래 코드에서 확인해보자.

```js
const Dog = function (name, age) {
  this.name = name;
  this.age = age;
  this.isWindow = function () {
    return this === window;
  };
};

const withoutNew = Dog('nana', 11);
console.log(withoutNew); // undefined
// console.log(withoutNew.name); // error
// console.log(withoutNew.age); // error
// console.log(withoutNew.isWindow()); // error
```

❗TODO❗ [this - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) 에 `Derived classes` 부분 이해 필요

# bind(), 화살표 함수

생성자 함수 안에 또 다른 함수가 있는 경우를 살펴보자

```js
function Family(firstName) {
  this.firstName = firstName;
  const names = ['bill', 'mark', 'steve'];
  names.map(function (lastName, index) {
    console.log(lastName + ' ' + this.firstName);
    console.log(this);
  });
}

const kims = new Family('kim');

// 결과

// bill undefined
// window
// mark undefined
// window
// steve undefined
// window
```

`Family`라는 생성자 함수 안에서 `map` 메소드를 호출한다. (`map` 메소드의 첫번째 인자로는 콜백함수가 들어간다) 이를 `서브루틴`이라 불러보자.(자바스크립트의 함수와 메소드를 구분하기 위함)

이 서브루틴에서 lastName 들을 담은 `names` 배열에 `map` 메소드를 이용해 lastName과 this의 firstName을 같이 출력하고자 한다. 그러나 실행해보면 예상과 다르게 동작한다. kim이 출력될 것 같은 위치에 `undefined`가 출력되었다. 그 이유는 map 메소드의 서브루틴은 호출될 때 map의 context(this)로 바인드 되지 않기 때문이다. 바인드 되지 않았다는 것은 실행 컨텍스트가 **전역** 이라는 것이고 이는 (비엄격모드에서) 서브루틴 내 `this`가 `window`라는 것이다.

비슷한 현상을 다른 예제에서 살펴보자.

```js
const testObj = {
  outer: function () {
    console.log(this); // outer
    const inner = function () {
      console.log(this); // window
    };
    inner();
  },
};

testObj.outer();
```

outer가 외부에서 실행(`testObj.outer()`)되면 이때 `this`는 메서드를 호출한 `testObj`가 된다. 그리고 outer 내부에서 inner를 호출할 때는 그 어떤 실행 문맥도 지정하지(바인드되지) 않고 함수로서 호출했다. 이는 전역 context에서 실행됐다는 것이다. 이게 바로 (비엄격모드에서) inner의 this가 window가 되는 이유이다.

생성자 함수 `Family` 예제로 돌아가보자. map 메서드의 서브루틴에서 `this`가 `window`가 된다는 건 위에서 다른 예제를 통해 설명했다. 그러나 생성자 함수 안의 특정 변수를 서브루틴 내에서 사용할 수 있는 방법이 없는 건 아니다.

> [방법 1] 별도의 상수를 지정
>
> 원하는대로 출력되지만, 항상 `that`이라는 상수를 만들어줘야한다는 단점이 있다.

```js
function Family(firstName) {
  this.firstName = firstName;
  const names = ['bill', 'mark', 'steve'];
  const that = this;
  names.map(function (lastName, index) {
    console.log(lastName + ' ' + that.firstName);
  });
}

const kims = new Family('kim');

// 결과

// bill kim
// mark kim
// steve kim
```

> [방법 2] `bind()` 사용
>
> 상수를 추가한 방법1 보다는 간편해졌으나 여전히 `.bind(this)`를 항상 붙여줘야한다는 단점이 있다.

```js
function Family(firstName) {
  this.firstName = firstName;
  const names = ['bill', 'mark', 'steve'];
  names.map(
    function (lastName, index) {
      console.log(lastName + ' ' + this.firstName);
    }.bind(this)
  );
}

const kims = new Family('kim');

// 결과

// bill kim
// mark kim
// steve kim
```

> [방법 3] 화살표 함수 사용✨
>
> - 화살표 함수는 this를 바인딩하지 않는다. 따라서 상위 스코프의 this를 그대로 활용할 수 있다.
> - Babel을 이용해 확인해보면, 내부적으로는 [방법 1]에서 that을 사용했을 때와 같게 동작한다.
> - 이처럼 서브루틴 내에서 바깥의 this를 사용하려고할 때 화살표 함수를 이용하면 간단하게 해결할 수 있다.
>
> (화살표 함수는 ES6부터 지원한다.)

```js
function Family(firstName) {
  this.firstName = firstName;
  const names = ['bill', 'mark', 'steve'];
  names.map((lastName, index) => {
    console.log(lastName + ' ' + this.firstName);
  });
}

const kims = new Family('kim');

// 결과

// bill kim
// mark kim
// steve kim
```

# Function context(함수 문맥)

함수 내에서 `this`값은 함수를 어떻게 호출하느냐에 따라 달라진다.

## 비엄격모드일 때

아래 예제에서 `this`값이 호출에 의해 정해지지 않았으므로 `this`는 기본적으론 전역객체가 된다.

```js
function f1() {
  return this;
}

// In a browser:
console.log(f1() === window); // true

// In a Node:
console.log(f1() === globalThis); // true
```

## 엄격모드일 때

엄격모드일 땐 얘기가 달라진다. 아래처럼 어떤 객체의 메소드나 속성으로 호출되지 않고 바로 호출된 경우 `this`값은 `undefined`이다. (단 어떤 브라우저에서는 이렇게 작동하지 않고 전역 객체를 리턴할 수도 있다.)

`window.f2()` 이렇게 호출하면 `window`가 출력된다.

```js
function f2() {
  'use strict';
  return this;
}

console.log(f2() === undefined); // true

console.log(window.f2() === window); // true
```

# Class context(클래스 문맥)

클래스 내의 모든 non-static 메소드는 `this`의 프로토타입에 추가된다.(정적 메소드는 추가되지 않는다. 정적 메소드는 클래스 자체의 속성이기 때문이다. - 인스턴스로 호출할 수 없다.)

# References

- [javascript this의 4가지 동작 방식](https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this%EC%9D%98-4%EA%B0%80%EC%A7%80-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D)
- [You Don't Know JS - this](https://ian-note.dev/javascript/this/)
- [this는 어렵지 않습니다](https://blueshw.github.io/2018/03/12/this/) 도움 많이 됨!
- [this - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
