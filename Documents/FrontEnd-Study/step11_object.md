# STEP 11

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위:

[객체](https://gitlab.com/siots-study/topics/-/wikis/object)

- 기한: 9/26(토) ~ 9/29(화)

# 보충 필요

# 객체

## 목차

- [객체란?](#객체란?)

- [객체 생성 방법](#객체-생성-방법)

- [객체 다루기](#객체-다루기)

- [Object 객체](#Object-객체)

- [내장 객체](#내장-객체)

- [Prototype](#Prototype)

- [References](#References)

## 객체란?

- 키(key)와 값(value)으로 구성된 프로퍼티(property)들의 집합. `object = { key: value }`

- 객체는 자바스크립트의 데이터 타입 중 하나로 많은 기능을 내장하고 있다.

> - **프로퍼티**: 프로퍼티는 프로퍼티 키와 프로퍼티 값으로 구성된다. 프로퍼티 키로 프로퍼티를 식별할 수 있다.
>
> - **메소드**: 프로퍼티 값이 함수인 경우, 일반 함수와 이를 구분하기 위해 메소드라고 부른다.

## 객체 생성 방법

1. 객체 리터럴 이용(Object Literal syntax)
2. `new` 연산자 이용(Object Constructor syntax)

```js
const obj1 = {}; // 방법1
const obj2 = new Object(); // 방법2
```

## 객체 다루기

### 객체에 프로퍼티 추가, 삭제

자바스크립트는 데이터 타입이 Runtime(프로그램이 동작하고 있을 때)때 결정된다. 따라서 객체 선언 이후 프로퍼티를 추가하거나 삭제하는 작업이 가능하다.

```js
const judy = { name: 'judy', age: 15 };
judy.hasJob = true; // 이미 만들어진 객체에 프로퍼티 추가도 가능
// but 이렇게 코딩할 경우 유지보수 어렵고 생각지못한 에러 발생가능. 가능하면 피하기❗

delete judy.hasJob; // 객체의 프로퍼티 삭제도 가능
```

### 객체 접근 방법

(위의 코드 예제와 이어진다.)

1. dot

   ```js
   console.log(judy.name); // judy
   ```

2. 대괄호 사용 (Computed properties)

   대괄호 안에 들어가는 키는 string 형태여야 한다.

   ```js
   console.log(judy['name']); // judy
   judy['hasJob'] = true;
   console.log(judy.hasJob); // true
   ```

   대괄호를 사용하는 객체 접근 방식은 언제 사용하는게 좋을까? -> 동적으로 키에 관련된 value를 받아와야될 때 유용하다.

   ```js
   function printValue(obj, key) {
     console.log(obj[key]); // computed properties 방법은 key 값에 string이 들어갈 수 있음
     // console.log(obj.key); // 적합X. 이 코드는 객체에 'key' 라는 프로퍼티가 있으면 그 값을 가져와달라는 것임
   }

   printValue(judy, 'name'); // judy
   printValue(judy, 'age'); // 15
   ```

## Object 객체

- Object 객체는 모든 객체의 최상위 객체이다.

## 내장 객체

- 내장 객체란 자바스크립트가 기본적으로 가지고 있는 객체들을 의미한다.

- 자바스크립트의 내장 객체: Object, Function, Array, String, Boolean, Number, Math, Data, RegExp

## Prototype

- 프로토타입이란 '원형'을 의미한다.

- 객체가 자신을 생성한 객체 '원형'에 대한 숨겨진 연결을 갖는데, 이때 그 객체 원형을 **프로토타입** 이라고 한다. (어떠한 객체가 만들어지기 위해 그 **객체의 모태**가 되는 친구를 프로토타입이라고 한다.)

> ES6에서 class 문법이 추가되었지만 상속을 편리하게 구현할 수 있도록 문법이 추가된 것이지 자바스크립트는 클래스 기반 언어가 아니다. 자바스크립트는 기본적으로 **프로토타입 기반 언어**이다.

- 자바스크립트에서는 프로토타입을 이용해 상속을 흉내내어 구현할 수 있다.

```js
function Person() {
  this.eyes = 2;
  this.nose = 1;
}

let park = new Person();
let lee = new Person();

console.log(park);
console.log(lee);
```

Person()을 이용해 park, lee라는 객체 두개를 만들었다. park과 lee는 eyes, nose를 공통적으로 갖고있는데 메모리에는 eyes, nose가 각각 두 개씩 총 4개가 할당된다. 객체가 100개가 되면 200개의 변수가 메모리에 할당되는 것이다. 이러한 문제를 프로토타입으로 해결해보자.

```js
// prototype 이용
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

let park = new Person();
let lee = new Person();

console.log(park.eyes); // 2
console.log(park.nose); // 1
console.log(lee.eyes); // 2
console.log(lee.nose); // 1
```

Person.prototype이라는 빈 Object가 어딘가 존재하고, Person 함수로부터 생성된 객체(park, lee)들은 이 어디엔가 존재하는 Object에 들어있는 모든 값을 가져다 쓸 수 있다.

### 객체는 함수로 생성된다.

```js
function Person() {} // => 함수

let park = new Person(); // => 함수로 객체를 생성한 것이다.
```

```js
let obj = {}; // 이 코드는
// let obj = new Object(); // 와 같은 의미이다.
```

위 코드에서 사용한 `Object`도 사실 함수이다.

Object, Function, Array 등도 모두 함수이다.

이것이 Prototype과 무슨 관련이 있느냐하면...

함수가 정의될 때 다음 2가지 일이 동시에 이루어진다.

1. 해당 함수에 Constructor(생성자) 자격이 부여됨

   - Constructor 자격이 부여되면 `new`를 통해 객체를 만들어낼 수 있게 된다.

   ```js
   let obj = {};
   let obj_new = new obj();
   // Uncaught TypeError: obj is not a constructor
   // obj는 constructor가 아니기 때문에 new를 사용하려고 하면 오류가 발생한다.
   ```

2. 해당 함수의 Prototype Object 생성 및 연결

   - 해당 함수가 생성되는 것 뿐만 아니라 해당 함수의 **Prototype Object**도 생성된다. Prototype Object는 일반적인 객체와 같고 `constructor`와 `__proto__` 속성을 기본적으로 가진다.

   - 해당 함수.`prototype`: Prototype Object에 접근할 수 있다.

   - `constructor`: 같이 생성됐던 함수를 가리킴

   - `__proto__`: Prototype Link를 의미(뒤에서 자세히 설명할 것)

   위에서 사용된 예제를 다시보자.

   ```js
   // prototype 이용
   function Person() {}

   Person.prototype.eyes = 2;
   Person.prototype.nose = 1;

   let park = new Person();
   let lee = new Person();

   console.log(park.eyes); // 2
   console.log(park.nose); // 1
   console.log(lee.eyes); // 2
   console.log(lee.nose); // 1
   ```

   `prototype` 속성을 이용해 Prototype Object에 접근했고 eyes, nose라는 속성을 추가했다. Prototype Object도 일반적인 객체이기 때문에 속성을 추가하거나 삭제할 수 있다. 또한 객체 park과 lee는 Person 함수를 통해 생성되었기 때문에 Person.prototype을 참조할 수 있다.

   ```js
   console.log(Person.prototype);
   ```

   ![image](https://user-images.githubusercontent.com/33214449/94575398-29474100-02af-11eb-8b83-2a423bec3c34.png)

### Prototype Link

Person 함수로 생성했던 객체 park을 출력해보자

```js
console.log(park);
```

결과:

![image](https://user-images.githubusercontent.com/33214449/94574253-e042bd00-02ad-11eb-9a20-2a7f5de084af.png)

위에서 객체 park과 lee는 Person 함수를 통해 만들어졌기 때문에 Person.prototype을 참조할 수 있다고 했다. 즉 Prototype Object에 존재하는 eyes, nose 속성을 참조할 수 있는 것이다.
이것이 가능한 이유는 위 코드의 결과에서 알 수 있듯 park 객체가 `__proto__` 속성을 가지고 있기 때문이다. 위 결과는 객체 park이 객체 생성에 쓰였던 생성자 함수(즉, Person)의 Prototype Object를 가리키고 있다고 말하고 있다. 실제 결과의 **`__proto__`**를 눌러보면 아까 봤던 Person Prototype Object의 내용이 나오는 걸 볼 수 있다.

![image](https://user-images.githubusercontent.com/33214449/94575667-72979080-02af-11eb-9216-fae96c7572b5.png)

`__proto__`는 모든 객체가 가지고 있는 속성이다.(`prototype` 속성은 함수만 가진다.)

그리고 `__proto__`는 **객체가 생성될 때 조상이었던 함수의 Prototype Object**를 가리킨다. park 객체는 Person 함수를 통해 생성되었으니 park의 `__proto__` 속성은 Person 함수의 Prototype Object를 가리키고 있는 것이다.

이렇게 `__proto__`속성을 통해 해당 객체의 조상(상위 프로토타입)으로 -> 그 조상의 조상으로 -> ... 탐색해갈 수 있다. 이처럼 연결되어있는 형태를 Prototype Chain이라고 칭한다. `__proto__`가 Prototype Link라고 언급한 것도 이때문이다.

park.eyes 이런식으로 접근하고자 할 때, park 객체는 eyes 속성을 가지고 있지 않으니 eyes 속성을 찾을 때까지 상위 프로토타입을 탐색해나간다. 만약 최상위인 Object의 Prototype Object까지 탐색해도 찾지 못한 경우 undefined를 리턴한다.(모든 객체의 최상위 객체는 Object인걸 명심하자) (지금까지 예시로 든 코드에서 park의 상위 프로토타입은 Person이기 때문에 Person Prototype Object에 있는 eyes가 탐색된 것)

프로토타입 체인 구조를 통해 상위 프로토타입을 탐색하다보면 최상위 객체인 Object에 다다른다. 모든 객체는 최상위 객체가 Object이다. 따라서 객체는 Object Prototype Object에 있는 모든 속성을 사용할 수 있다. 예를 들면 toString()함수는 어떤 객체에서든지 사용가능하다. `park.toString();` 이런 식으로 말이다!

![image](https://user-images.githubusercontent.com/33214449/94580227-a1fccc00-02b4-11eb-8a94-c1f66e6aad86.png)

# 면접 질문

- function Person(){}, var person = Person(), var person = new Person() 의 차이점은 무엇입니까?

- 호스트 객체와 내장 객체의 차이점은 무엇입니까?

- 프로토타입 상속이 어떻게 작동하는지 설명하세요.

- [선택적 질문] attribute 와 property의 차이점은?

# References

- https://gitlab.com/siotsㄴ-study/topics/-/wikis/object

- https://helloworldjavascript.net/pages/180-object.html

- https://youtu.be/1Lbr29tzAA8

- https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67

- https://jongmin92.github.io/2017/03/14/JavaScript/understand-prototype/

# Q&A

팀원들 결과물 및 질의응답&코드리뷰
