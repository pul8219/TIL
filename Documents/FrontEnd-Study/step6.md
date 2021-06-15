[문서 목록으로 돌아가기](README.md)

> # STEP 6
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/home>
> - 공부 범위: [Class](https://gitlab.com/siots-study/topics/-/wikis/Class) 전체
> - 기한: 8/22(토) ~ 8/25(화)

# 보충 필요

- 자바스크립트의 생성자
  new

- 자바스크립트는 프로토타입 기반 언어
  prototype 프로퍼티?

- let{...} = ?;
  이런 문법!

- 구조 분해 할당?

- ${} 문법
	${} 표현식은 처리된 값을 문자열로 반환한다.

- 엄격 모드

- 객체를 만들 때 function이 생긴다는 것? - Object Function{}

- 클래스의 호이스팅은 어떻게 되나?mdn에선 아니라하고 다른 자료에선 말을 된다고하고 혼란...

# Javascript

## 목차

- [ES6에서 도입된 Class](#ES6에서-도입된-Class)

- [Class 정의 방법](#Class-정의-방법)

- [인스턴스 생성](#인스턴스-생성)

- [생성자](#생성자)

- [Getter, Setter](#Getter,-Setter)

- [클래스 상속](#클래스-상속)

- [super](#super)

- [클래스 상속과 프로토타입 상속 비교](#클래스-상속과-프로토타입-상속-비교)

- [Q&A](#Q&A)

- [Reference](#Reference)

## 자바스크립트와 Prototype(프로토타입)

(아래 내용은 MDN에 나와있는 설명을 이해하며 정리했다.)

- 자바스크립트는 객체의 원형인 prototype을 이용하여 새로운 객체를 생성하는 prototype 기반 언어이다. '상속'이란 개념이 존재하지 않는다. 다만 자바스크립트는 클래스와 비슷하게 동작하게끔 흉내내는 여러 기법들을 가지고 있다. (ES6에서 `class` 키워드가 도입됐지만 이는 사용하기 쉽게 하기위해 도입된 것일뿐 자바스크립트는 여전히 prototype 기반의 언어이다. 따라서 클래스 기반 언어인 Java와 C++ 를 다루던 개발자에겐 자바스크립트의 이러한 방식은 다소 당황스럽게 느껴질 수 있음 ~~JS 참 알수록 궁금한 친구~~)

- 상속의 관점에서 자바스크립트의 유일한 생성자는 '객체'뿐이다. 각각의 객체는 [[Prototype]]이라는 private 속성을 가지는데 자신의 prototype이 되는 다른 객체를 가리킨다. 또한 각각 객체들은 자신의 prototype(원형이라고 이해)를 가지고 있다.

- 객체의 prototype은 다른 prototype 객체를 바라보고, 이것이 반복(prototype chain)되다가 prototype이 `null`인 객체에서 끝이 난다. `null`은 더이상의 prototype이 없다고 정의되며, prototype chain의 종점역할을 한다.

- 예를 들어, 자바스크립트의 모든 객체들은 prototype chain 최상위에 있는 `Object`의 인스턴스들로 이해할 수 있다.

prototype 이해에 도움이 많이 된 자료
<https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67>

## ES6에서 도입된 Class

- ES6 이전까지는 비슷한 종류의 객체를 많이 만들어내기 위해 **생성자**를 사용해왔음
- ES6에서 클래스 문법이 추가됨
- ES6에서도 일정 부분은 프로토타입을 활용하고 있기 때문에, ES5에 있는 클래스를 흉내내기 위한(classalike) 구현 방식은 알고 있는 것이 좋음
- 클래스는 호이스팅이 되지만 `uninitialized`로 초기화되기 때문에 선언 전에 사용하려고 하면 Reference Error가 발생한다.
- 클래스의 body는 엄격모드(strict mode)로 실행된다.
- Class의 body에서는 메서드만 선언 가능하다.(멤버변수는 선언 불가)
- JS에서 클래스는 특별한 함수이다
- prototype 기반의 상속 흉내?보다 명료하고 편의높게 사용할 수 있도록 문법을 제공하여 Syntatic Sugar 라 함

```js
// 이전에 사용하던 생성자 함수 방식
// 관례상 생성자 함수의 첫 문자는 대문자로 표기!

function Book(title, writer) {
  this.title = title;
  this.writer = writer;
}

var book1 = new Book('발칸반도', '여행가');
var book2 = new Book('쇼코의 미소', '최은영');

console.log(book1.title + '-' + book1.writer);
console.log(book2.title + '-' + book2.writer);
```

```js
// 클래스 블록에서는 별도의 문법으로 코드를 작성해야한다. 함수 혹은 객체 내부에서 사용하는 문법과 헷갈리지 않도록 주의할 것
class Person{
	console.log('hello');
}
// 에러: Unexpected token

class Person{
	name: "nana",
	email: "1234@naver.com"
}
// 에러: Unexpected token
```

## Class 정의 방법

1. class 선언식

```js
// Class 정의 방법 - 1. 클래스 선언
class Book(){
	constructor(title, writer){
		this.title = title;
		this.writer = writer;
	}
}
```

1. class 표현식

- 익명의 class도 정의 가능

```js
// Class 정의 방법 - 2. 클래스 표현식

// 익명(unnamed) 클래스 선언 예시
let Book = class {
  constructor(title, writer) {
    this.title = title;
    this.writer = writer;
  }
};

const book1 = new Book('쇼코의 미소', '최은영');
console.log(book1.title); // "쇼코의 미소"
```

```js
// 이름을 갖는 클래스
let Book = class Book1 {
  constructor(title, writer) {
    this.title = title;
    this.writer = writer;
  }
};
console.log(Book.name); //"Book1"
```

> MDN 출처
> A class expression is another way to define a class. Class expressions can be named or unnamed. The name given to a named class expression is local to the class's body. (it can be retrieved through the class's (not an instance's) name property, though).
> 첫 문장 빼고 무슨 의미?

## 인스턴스 생성

- `new` 연산자와 함께 constructor(생성자)를 호출한다.
- `new` 연산자 없이 constructor를 호출하면 타입 에러가 발생한다.

```js
class Foo {}
const foo = new Foo(); // new를 통해 인스턴스 생성

console.log(Foo === Foo.prototype.constructor); //true
```

## 생성자

= Constructor

- 생성자 메소드는 객체의 생성과 초기화를 하는 특별한 메소드로 클래스 내에 constructor 이름을 갖는 메소드는 하나여야한다.
- constructor는 인스턴스 생성과 동시에 클래스 프로퍼티의 생성과 초기화를 실행한다.

```js
class Foo {} //constructor를 생략하면 constructor() {}가 자동으로 포함된 것처럼 동작한다.

const foo = new Foo();
console.log(foo); // Foo {}

foo.num = 1; // 클래스 프로퍼티의 동적 할당 및 초기화가 가능하다
console.log(foo); // Foo { num: 1 }
```

## Getter, Setter

```js
// Getter, Setter
class Foo {
  constructor(bar) {
    this.bar = bar;
  }
  get met() {
    return this.bar;
  }
  set met(newBar) {
    this.bar = newBar;
  }
}

let foo = new Foo('hello');
console.log(foo.bar); // "hello"
console.log(foo.met); // "hello"
foo.met = 'hi';
console.log(foo.met); // "hi"
```

## 클래스 필드(class field)

클래스 블록 안에서 할당 연산자(=)를 통해 인스턴스 속성을 지정할 수 있는 문법(아직 정식 표준으로 채택된 기능은 아님)

## 클래스 상속

한 클래스를 다른 클래스가 **상속**하여 다른 클래스에서 **재사용**할 수 있음

- 자식 클래스를 통해 부모 클래스의 정적 메소드와 정적 속성을 사용할 수 있다.
- 부모 클래스의 인스턴스 메소드와 인스턴스 속성을 자식 클래스의 인스턴스에서 사용할 수 있다.

```js
// 상속
class animal {
  // 부모 클래스 Animal
  static region = 'KR';
  static jump() {
    console.log('jump!');
  }
  stop() {
    console.log('stop');
  }
}

class cat extends animal {
  // 자식 클래스 Cat
}

cat.jump(); // 자식클래스를 통해 부모클래스의 정적메소드 사용 가능
console.log(cat.region); // 자식클래스를 통해 부모클래스의 정적 속성 사용 가능

let c = new cat();
c.stop(); // 자식클래스의 인스턴스를 통해 부모클래스의 인스턴스 메소드와 인스턴스 속성을 사용 가능
```

### super

자식 클래스에 부모 클래스에 있는 속성과 같은 이름의 속성이 있는 경우 문제가 될 수 있는데, `super`를 쓰면 부모 클래스의 메소드에 직접 접근할 수 있다.

> `super` 키워드의 동작 방식 TODO

```js
// super
class writing {
  getMedia() {
    return 'book';
  }
}

class essay extends writing {
  getMedia() {
    return super.getMedia() + ' or brunch';
  }
}

let e = new essay();
console.log(e.getMedia()); // "book or brunch"
```

## 클래스 상속과 프로토타입 상속 비교

**TODO**

## Q&A

### 팀원들의 스터디 결과물

은영
<https://eyabc.github.io/Doc/dev/core-javascript/%ED%81%B4%EB%9E%98%EC%8A%A4.html#%EC%9E%AC%EC%82%AC%EC%9A%A9>

형욱
<https://github.com/khw970421/js-interview/blob/master/const/project6.js>

정웅
<https://jeongshin.github.io/JeongShin_Blog/TIL/study/JavaScript.html#step-6>

노원
<https://github.com/quavious/hell_script/blob/master/chapter6.js>

유림

### to 형욱

Q.
잘 읽었습니다. 저는 이번주 연장해서 아직 공부가 덜 되어있는 상태인데 형욱님꺼 쭉 보니까 이해도 되고 도움도 많이 됐습니다. 객체가 참조되어 값이 같이 변경되는 경우도 알아갑니다

```js
console.log(objA1.x); //객체를 복사하므로 10은 변하지않고 10으로 출력
```

혹시 위 부분에서 객체를 복사한다는 표현이 맞는 것인가요? 아니면 객체의 x 프로퍼티의 값만 복사하는 것인가요? (제가 js 왕초보라서 여쭈어봅니다...)

+++
오버워치라니... @eyabc 좋아하실 실생활 예시네요 ㅋㅋㅋㅋ신선합니다 👍

A.
console.log(objA1.x) //객체를 복사하므로 10은 변하지않고 10으로 출력

이부분 같은 경우는 정확히는 제가 조금 설명이 부족하고 잘못된것같습니다.
pul8219님 말대고 객체의 x의 값이 복사된다고 설명하는것이 맞다고 생각합니다.
따라서 정확히는

let objA1={
x:10
}
let value=objA1.x; //객체 x의 프로퍼티 값 자체를 복사하여 value에 저장(참조 x)
value=100; //value에 저장된 값 10을 100으로 수정
console.log(objA1.x) // objA1.x는 value의 변화에 영향이 없이 값은 10으로 유지
이게 맞다고생각합니다. 저도 수정을 피드백해야겠네요
감사합니다.

### to 노원

잘 봤습니다. 코드로 다양한 예제를 볼 수 있어서 좋은 것 같아요.
공부가 더 필요해서 자세한건 @eyabc 님의 위에 질문&답변 보고 많이 배우겠습니다.

### to 정웅

Step6 잘 읽었습니다!

### to 은영

클래스의 전반적인 내용, 클래스도 호이스팅이 된다는 점, 그리고 상속, super 등의 내용을 잘 이해할 수 있었습니다. 양이 정말 방대하네요👍 이렇게 높은 질의 문서를 위해서 저도 미리미리 하고 시간투자를 더 해야겠습니다

준일 리뷰)

1.  ![](https://user-images.githubusercontent.com/18749057/91419828-d2ed7980-e88e-11ea-89b6-ebb10c361888.png)
    이 부분은 잘못되었습니다.
    ![](https://user-images.githubusercontent.com/18749057/91419891-e7317680-e88e-11ea-8550-a97c1e2ead0d.png)

1.  ![](https://user-images.githubusercontent.com/18749057/91420044-1516bb00-e88f-11ea-92c8-82ceb55c0cfc.png)

정적 메서드에서도 this를 사용할 수 있습니다.

```js
class Foo {}
Foo.a = 10;
Foo.b = 20;
Foo.c = function () {
  return this.a + this.b;
};
console.log(Foo.c()); // 30
```

![](https://user-images.githubusercontent.com/18749057/91420162-39729780-e88f-11ea-9972-773c14c3dd49.png)

1.  ![](https://user-images.githubusercontent.com/18749057/91421224-a0448080-e890-11ea-8bf1-4804a307b410.png)
    참고로 private 필드와 메소드는 상속되지 않습니다
    원래 하위 클래스에서 상위 클래스의 필드와 메소드에 접근하기 위해선 protected 라는 접근제한자를 사용합니다. 그런데 JS에는 private만 있고 protected가 없기 때문에 private으로 선언된 것은 아예 상속되지 않습니다.

1.  ![](https://user-images.githubusercontent.com/18749057/91421493-f5809200-e890-11ea-9da3-077f1182ba1e.png)

참고로 super는 항상 생성자 최상단에서 사용되어야합니다.
super보다 위에 있는 구문이 있을 경우 에러가 발생합니다.

1.  ES5와 ES6가 정확히 어떻게 다른지 설명하는 글입니다.

<https://www.bsidesoft.com/5370>

핵심은 바로 "상속" 입니다.

ES5로 ES6에서 사용하는 상속을 완벽하게 흉내 내는 것은 불가능합니다.

## Reference

- [javascript와 prototype](https://medium.com/@pks2974/javascript-%EC%99%80-prototype-%ED%94%84%EB%A1%9C%ED%86%A0-%ED%83%80%EC%9E%85-515f759bff79)

- [inheritance and the prototype chain, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

- [Classes, MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)

<https://poiemaweb.com/es6-class>

<https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67>
