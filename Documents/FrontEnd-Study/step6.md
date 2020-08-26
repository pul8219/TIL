# STEP 6

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위: [Class](https://gitlab.com/siots-study/topics/-/wikis/Class)

- 기한: 8/22(토) ~ 8/25(화)

- 보충 필요

    - 자바스크립트의 생성자
    new
    
    - 자바스크립트는 프로토타입 기반 언어
    prototype 프로퍼티?
    
    - let{...} = ?;
    이런 문법!
    
    - 구조 분해 할당?
     
    
# Javascript

## 목차

- []()

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

- JS에서 클래스는 특별한 함수이다
- Class의 body에서는 메서드만 선언 가능하다.
- 호이스팅
-super
- prototype 기반의 상속 흉내?보다 명료하고 편의높게 사용할 수 있도록 문법을 제공하여 Syntatic Sugar 라 함

```js
// 이전에 사용하던 생성자 함수 방식
// 관례상 생성자 함수의 첫 문자는 대문자로 표기!

function Book(title, writer){
	this.title = title;
	this.writer = writer;
}

var book1 = new Book("발칸반도", "여행가");
var book2 = new Book("쇼코의 미소", "최은영");

console.log(book1.title + "-" + book1.writer);
console.log(book2.title + "-" + book2.writer);
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


## Class 선언
1. class 선언식
1. class 표현식

## 인스턴스 생성

## 클래스 상속
### super

## 클래스 상속과 프로토타입 상속 비교


- 객체를 만들 때 function이 생긴다는 것? - Object Function{}
- 클래스의 호이스팅은 어떻게 되나?



## Q&A

### 팀원들의 스터디 결과물

은영

형욱
<https://github.com/khw970421/js-interview/blob/master/const/project6.js>

정웅

노원

유림


### to 형욱
잘 읽었습니다. 저는 이번주 연장해서 아직 공부가 덜 되어있는 상태인데 형욱님꺼 쭉 보니까 이해도 되고 도움도 많이 됐습니다. 객체가 참조되어 값이 같이 변경되는 경우도 알아갑니다

```js
console.log(objA1.x)    //객체를 복사하므로 10은 변하지않고 10으로 출력
```

혹시 위 부분에서 객체를 복사한다는 표현이 맞는 것인가요? 아니면 객체의 x 프로퍼티의 값만 복사하는 것인가요? (제가 js 왕초보라서 여쭈어봅니다...)

+++
오버워치라니... @eyabc 좋아하실 실생활 예시네요 ㅋㅋㅋㅋ신선합니다 👍 

## Reference
- [javascript와 prototype](https://medium.com/@pks2974/javascript-%EC%99%80-prototype-%ED%94%84%EB%A1%9C%ED%86%A0-%ED%83%80%EC%9E%85-515f759bff79)

- [inheritance and the prototype chain, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

- [Classes, MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)



<https://poiemaweb.com/es6-class>

<https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67>