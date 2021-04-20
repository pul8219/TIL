[문서 목록으로 돌아가기](README.md)

> # STEP 35
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 35 [naver/fe-news 2021 4월호의 관심있는 주제 아티클](https://github.com/naver/fe-news/blob/master/issues/2021-04.md)
> - 기한: 04/17(토) ~ 04/20(화)

# 보충 필요

# 목차

- [화살표 함수일 경우](#화살표-함수일-경우)
- [함수나 클래스가 `new`로 호출되었다면?](함수나-클래스가-new로-호출되었다면)
- [함수가 바인드된 `this`값을 가지고 있다면?](함수가-바인드된-this값을-가지고-있다면)

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

# Javascript에서 `this`의 의미

![](https://images.velog.io/images/pul8219/post/0a2a58d6-339e-41a6-b058-477568289d4b/image.png)

> 본 문서는 [JavaScript: What is the meaning of this?](https://web.dev/javascript-this/#arrow-functions), [번역](https://hyperflow.dev/Frontend/Javascript-this) 문서를 정리한 내용입니다.

# 화살표 함수일 경우

```js
const arrowFunc = () => {
  console.log(this); // Window { ... }
};

arrowFunc();
```

화살표 함수의 경우 `this`값은 **항상** 부모 scope의 `this`와 같다. (`this`값을 바꿀 수 없다)

```js
const outerThis = this;
const arrowFunc = () => {
  console.log(this === outerThis); // always true
};
arrowFunc();
```

화살표 함수의 장점은 내부의 `this`값이 변하지 않고 항상 바깥의 `this`값과 같다는 점이다.

## 다른 예제

- 화살표 함수의 `this`값은 `bind`로 바뀔 수 없다.

```js
// arrowFunc가 위의 예시와 같다고 가정해보자
// true가 출력된다.
arrowFunc.bind({ foo: 'bar' })(); // bind()의 thisArg 인자로 객체를 건네줘도 arrowFunc함수의 this값을 바꿀 수 없다.
```

- 화살표 함수의 `this`값은 `call`이나 `apply`로도 바뀔 수 없다.

```js
// arrowFunc의 this값은 변하지 않는다.
// true 출력
arrowFunc.apply({ foo: 'bar' });

// arrowFunc의 this값은 변하지 않는다.
// true 출력
arrowFunc.call({ foo: 'bar' });
```

> `apply()`, `call()`는 함수를 실행하고, `bind()`는 함수를 실행하지 않고 원본함수를 복제한 결과를 리턴한다는 차이점이 있다. [문서](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step3.md) 참고

- 화살표 함수가 다른 객체의 멤버로 호출되더라도 `this`는 변하지 않는다.

```js
const obj = { arrowFunc };
obj.arrowFunc(); // true가 출력된다. // 부모 객체(obj)는 무시된다.
```

- 화살표 함수는 생성자가 아니므로 생성자처럼 호출해 `this`의 값을 바꿀 수도 없다.

```js
// TypeError: arrowFunc is not a constructor
new arrowFunc();
```

- 인스턴스의 메소드로 바인드된 경우

인스턴스 메소드에서 `this`가 항상 클래스의 인스턴스를 가리키도록 하고 싶다면 화살표 함수를 클래스 필드로 사용하면 된다.

```js
class Whatever {
  someMethod = () => {
    console.log(this); // 항상 Whatever 클래스의 인스턴스를 가리킨다.
  };
}

const instance = new Whatever();
instance.someMethod.call({ foo: 'bar' }); // 전달한 thisArg는 무시된다.
```

이러한 패턴은 인스턴스 메서드를 컴포넌트의 이벤트 리스너로 쓸 때 유용하다.(React 컴포넌트나 웹 컴포넌트처럼)

위 예제가 화살표함수에서 "`this`는 부모 스코프의 `this`와 항상 같다"는 규칙을 깨는 것처럼 보이지만, 클래스 필드를 생성자에서 값을 세팅하는 syntactic sugar라고 생각한다면 이해가 될 것이다.

> **Syntactic Sugar**
>
> 기존에 존재하던 기능에 문법을 추가해 간편하게 쓸 수 있게해주는 것을 의미한다. (ES6에서 추가된 class를 Syntactic Sugar라 볼 수 있다. 완전히 새로 만들어진 기능을 의미하는 것이 이니다.) Babel은 이런 새로운 문법을 이전 버전으로 바꿔주는 transpiler이다.(Babel: ES5+ 코드를 이전 버전과 호환되는 Javascript버전으로 변환하는 데 쓰이는 무료 오픈 소스)

```js
class Whatever {
  someMethod = (() => {
    const outerThis = this;
    return () => {
      // 항상 true가 출력된다.
      console.log(this === outerThis);
    };
  })();
}

const instance = new Whatever();
instance.someMethod();

// 위 코드는 아래 코드와 같은 말이다.

class Whatever {
  constructor() {
    const outerThis = this;
    this.someMethod = () => {
      console.log(this === outerThis); // true가 출력된다.
    };
  }
}

const instance = new Whatever();
instance.someMethod();
```

# 함수나 클래스가 `new`로 호출되었다면?

```js
new Whatever();
```

위의 코드는 `Object.create(Whatever.prototype)`의 결과로 설정된 `this`와 함께 `Whatever`를 호출한다. (Whatever이 클래스라면 생성자를 호출할 것이다.)

> `Object.create()`
>
> 인자로 전달된 프로토타입 객체를 프로토타입으로 갖는 새 객체를 생성하는 메소드이다.

```js
class MyClass {
  constructor() {
    console.log(
      // 둘이 같다면 true가 출력될 것이다.
      this.constructor === Object.create(MyClass.prototype).constructor
    );
  }
}

new MyClass(); // true 출력
```

위 코드는 생성자 함수를 사용(old style)해도 같은 결과를 얻는다.

```js
function MyClass() {
  console.log(
    this.constructor === Object.create(MyClass.prototype).constructor
  );
}

new MyClass();
```

## 다른 예제

- `new`로 호출될 때, `bind`를 통해 `this`값을 바꿀 수 없다.

```js
const BoundMyClass = MyClass.bind({ foo: 'bar' });
new BoundMyClass(); // bind를 통해 this값이 바뀌지 않았고 true가 출력된다.
```

- `new`로 호출될 때, 다른 객체의 멤버로 함수를 호출해도 `this`값은 바뀌지 않는다.

```js
const obj = { MyClass };
new obj.MyClass(); // parent object는 무시된다.(this는 바뀌지 않았다.) true가 출력된다.
```

# 함수가 바인드된 `this`값을 가지고 있다면?

```js
function someFunc() {
  return this;
}

const boundObj = { hello: 'world' };
const boundFunc = someFunc.bind(boundObj);
```

`boundFunc`가 호출될 때마다, `this`값은 `bind`로 전달된 object가 된다.(`boundObj`)

```js
console.log(someFunc() === boundObj); // false 출력
console.log(boundFunc() === boundObj); // true 출력
```

> 주의
>
> 바깥의 `this`를 함수에 바인딩하기 위해 `bind`를 사용하는 것을 지양해야한다. 대신, 화살표 함수를 사용하자! (`this`의 값을 보다 명확히 알 수 있다.)
>
> 부모 object와 관련없는 특정 값에 `bind`를 사용해 `this`값을 지정하는 것을 지양하자. 이는 코드를 예측 불가능하게 만들고 개발자의 `this`에 대한 평판이 떨어지기도 하는 이유이다. 대신 인자로 값을 전달하는 것을 고려하자. 이 방법이 더 분명하고 화살표 함수와도 같이 사용할 수 있는 방법이다.

## 다른 예제

- 바인딩된 함수를 호출할 때, `call`이나 `apply` `this`값을 바꿀 수 없다.

```js
console.log(boundFunc.call({ foo: 'bar' }) === boundObj); // true 출력 // call로 전달된 this값은 무시된다.
console.log(boundFunc.apply({ foo: 'bar' }) === boundObj); // true 출력 // apply로 전달된 this값은 무시된다.
```

- 바인딩된 함수를 호출할 때, 다른 객체의 멤버로 함수를 호출해도 `this`값을 바꿀 수 없다.

```js
const obj = { boundFunc };
console.log(obj.boundFunc === boundObj); // true 출력 // parent object는 무시된다(객체의 멤버로서 함수를 호출했지만 this가 obj로 바뀌지 않았다)
```

# Comment

# References

# 팀원들 결과물
