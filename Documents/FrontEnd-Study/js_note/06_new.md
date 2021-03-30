# new

## new 연산자 동작순서

1. 새로 빈 객체를 생성
2. 새롭게 생성된 객체의 `__proto__`가 호출 함수의 프로토타입 오브젝트를 가리킴(프로토타입체인이 생성자 함수의 프로토타입오브젝트에 연결되는 것)
3. `this`를 새롭게 생성된 객체에 바인딩 시킴
4. 함수에서 완성된 객체가 반환될 수 있도록 `return this`를 함수의 맨 마지막 부분에 추가함. (함수가 객체를 반환하지 않는 한 1에서 생성된 객체가 반환됨)

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const first = new Student('Dong', 27);
```

위 코드를 실행시키면 다음과 같은 과정이 일어난다.

1. 새로운 객체가 만들어진다.
2. 새로 생성된 객체의 `__proto__` 가 `Person.prototype`을 가리키게된다.
3. 1에서 생성된 객체가 `this`에 바인딩된다.
4. (생성자 함수가 반환하는 값이 없다면) 새로운 객체가 반환되어 `first` 변수에 할당된다.

`new`로 단번에 객체를 생성하는 것 처럼 보이지만 JS에서 `new`는 위와 같이 동작과정을 가지고 있다.

# References

[자바스크립트 개발자라면 알아야 할 33가지 개념 #16 자바스크립트 : 'new' 연산자](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-16-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-new-%EC%97%B0%EC%82%B0%EC%9E%90-sojvdjln1q)

[javascript this의 4가지 동작 방식](https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this%EC%9D%98-4%EA%B0%80%EC%A7%80-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D)

[js study step11](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step11_object.md)

[js study step30 - 프로토타입 설명 부분](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step30.md)
