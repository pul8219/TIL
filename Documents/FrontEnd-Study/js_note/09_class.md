[자바스크립트 Prototype 완벽 정리](https://velog.io/@adam2/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Prototype-%EC%99%84%EB%B2%BD-%EC%A0%95%EB%A6%AC)

[JS 프로토타입을 사용하여 상속하기](https://evan-moon.github.io/2019/10/27/inheritance-with-prototype/)

[ES6 Class 파헤치기](https://jongmin92.github.io/2017/06/18/JavaScript/class/)

💡prototype 기반으로 상속 예제 (08_prototype.md 문서에 작성했음)

💡class 기반으로 상속 예제

```js
class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise`);
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(`${this.name} roars`);
  }
}

console.dir(Cat);
console.dir(Lion);

const lion = new Lion('Samba');
console.log(lion);
console.dir(lion);

lion.speak();
```

💡각각의 경우에서 자식(?) 클래스의 구조 출력해보기

# 상속 구조에서 new 동작 과정

- 해당 클래스의 constructor를 호출
- 해당 클래스에서 constructor 작성하지 않은 경우 상속한 부모클래스의 constructor가 호출됨(내부적인 프로토타입 체인으로 인해)
- 부모 클래스의 constructor에서 this는 현재의 인스턴스를 참조한다.
- 생성된 인스턴스가 반환된다.

💡상속 안했을 때 클래스의 구조 출력해보기(`__proto__` 뭐 나오는지. 예상: function?)
class, 인스턴스 모두 출력해보기(console.dir로)

# super 키워드

- 서브 클래스와 슈퍼 클래스에 같은 이름의 메소드가 존재하면 슈퍼 클래스의 메소드는 호출되지 않는다. 이때 `super` 키워드를 사용해 슈퍼 클래스의 메소드를 호출할 수 있다. (서브 클래스의 constructor에 super()를 작성하면 슈퍼 클래스의 constructor가 호출된다.)

# static 키워드

static으로 선언한 메소드는 prototype에 연결되지 않고 클래스에 직접 연결된다. 클래스의 인스턴스에서는 호출할 수 없다.

- 동일한 클래스 내의 다른 정적 메서드 내에서 정적 메서드를 호출하는 경우 키워드 this를 사용할 수 있다. ❓
