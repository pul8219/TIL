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

- JS에서 클래스는 특별한 함수이다 ->?



## Reference
- [javascript와 prototype](https://medium.com/@pks2974/javascript-%EC%99%80-prototype-%ED%94%84%EB%A1%9C%ED%86%A0-%ED%83%80%EC%9E%85-515f759bff79)

- [inheritance and the prototype chain, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

- [Classes, MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)