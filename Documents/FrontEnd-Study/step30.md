[문서 목록으로 돌아가기](README.md)

> # STEP 30
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: [코드스피츠 객체지향 자바스크립트 - 1회차](https://www.youtube.com/watch?v=E9NZ0YEZrYU)
> - 기한: 03/06(토) ~ 03/09(화)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

# Value context vs Identifier context

- Value Context

  - 함수지향
  - 값 기반
  - (어떤 변수**에** 저장되어있냐가 중요한게 아니라 그 안에 값이 같으면 같다고 보는)
  - 메모리 주소가 어딘지는 상관이 없고 값 자체를 본다.

- Identifier Context
  - 객체지향
  - identifier 기반
  - (어떤 메모리에 있는지가 중요)
  - 값이 아닌 메모리 주소를 기반으로 식별

> `context = 관점`으로 생각하기

> 객체지향은 value context를 사용하지 않음 ★

> 객체지향에서 value context로, 함수형 프로그래밍하는데 identifier context 기반으로, 프로그래밍을 하는 것은 버그 확정시키는 일이다. 되도록 하나의 context로 프로그래밍하는 것 권장한다.

```js
const a = {
  a: 3,
  b: 5,
};
const b = {
  a: 3,
  b: 5,
};

console.log(a === b); // false (메모리 주소가 다르니까)
// identifier

console.log(JSON.stringify(a) === JSON.stringify(b)); // true // 문자열로 바꿨음 // 값이 같음 // 값으로 보는 것!
// value context

// 객체지향에서 값 context를 쓰면 이미 객체지향 깨고 있는 것
```

객체지향은 항상 Identifier를 인자로 받아야한다. 즉, 숫자를 받으면 안 된다.

객체지향에서 값을 받는 것은 오직 `생성자`밖에 없다.

> 메서드의 인자이든 / 메서드가 리턴하는 값이든 / 생성해야하는 무언가가 됐든 / 전부 객체만 사용하는 것이 객체지향의 기본이다.
>
> 3이라는 value를 받는게 아니라 new Count(~~) 이런식으로 받아야된다.
>
> 값을 쓸 수 있는 유일한 컨텍스트는 생성자의 인자뿐

## Value의 특징

- 끝 없는 복사본을 만들게 됨
- 상태 변화에 안전
  - 상태가 변할 수 없기에 안전해보이는 것이다.
  - `3 + 1 = 4`: 3과 1은 그대로 있고 4가 새로 만들어짐
  - 그래서 함수형 프로그래밍이 생긴 것
- 연산을 기반으로 로직을 전개

## Identifier의 특징

- 하나의 원본을 사용
  - 값이 계속 변할 수 있음 (상태가 일관성이 없어질 수 있음. 이런 일이 생기니 문제.)
- 상태 변화를 내부에서 책임짐 (내부 상태에 대해 책임지는 객체를 만들어야함)
- 메시지를 기반으로 로직을 전개
  - 로직 위임 가능(내가 구현한데까지는 하고 내가 못하는건 메시지를 통해 딴 친구에게 위임하는 것이 가능해짐)

# Polymorphism

(부모는 자식을 대체할 수 없지만) 자식은 부모를 대체할 수 있다. => Polymorphism(다형성)

polymorphism: '대체 가능성(substitution)' + '내적 일관성(internal identity)'

이 규칙을 따라야 객체지향이라 할 수 있다.

> (사실 부모 자식이란 워딩은 맞지 않음)

```js
const Worker = class {
  run() {
    console.log('working');
  }
  print() {
    this.run();
  }
};

const HardWorker = class extends Worker {
  run() {
    console.log('hardWorking');
  }
};

const worker = new HardWorker();
console.log(worker instanceof Worker); // true
worker.print();
```

위 코드에 대한 객체지향의 개념은 다음과 같다.

## 대체가능성(substitution)

확장된 클래스는 대상 클래스를 대체할 수 있다.(자식은 부모를 대체할 수 있다)

```js
console.log(worker instanceof Worker); // true. 대체가능성
```

> Worker를 확장한 게 HardWorker다 라는 것. 이에 따르면 HardWorker의 부분집합이 Worker겠지. 그래서 대체가 가능한 것

## 내적일관성(internal identity)

어떠한 경우에도 태어났을 때의 원본 클래스를 유지한다. (생성 시점의 타입이 내부에 일관성 있게 참조됨)

```js
worker.print(); // HardWorker의 print가 실행됨. 내적일관성
```

> HardWorker엔 print()란 메서드가 없지만, 얘한텐 없지만 타고 가서 부모인 Worker의 print 호출함. 그렇다면 Worker의 run()이 호출될까 HardWorker의 run()이 호출될까? 내가 태어날 당시에 누구인지를 항상 일관성있게 유지하기 때문에 / worker 객체는 HardWorker에 의해 만들어진 객체이기 때문에 / worker.print()는 HardWorker의 run()을 호출하게된다. 그니까 this가 여기선 HardWorker인거지!

## Polymorphism of Prototype

- Polymorphism을 구현하는 방식은 언어마다 다르다.
- 자바스크립트는 프로토타입(Prototype)이라는 시스템을 가지고 있음.

이게 어떻게 대체가능성과 내적일관성을 구현하는지 볼 것

![image](https://user-images.githubusercontent.com/33214449/110503043-221a3e00-813f-11eb-9a58-73324e499c18.png)

아까 만들었던 HardWorker라는 클래스는 내부적으로 function으로 처리된다. function으로 처리된 모든 객체들은 무.조.건 안에 prototype을 가짐(이것도 객체임)

HardWorker로 만들었던 worker 객체도 `__proto__`라는 속성이 무조건 있음. new를 했던 함수의 프로토타입을 가리키고 있음.
근데 HardWorker도 객체라 `__proto__`가 있고, 함수의 프로토타입은 constructor라는 속성이 무조건 잇음. 이건 자기 자신을 가리킴

상속구조니까
HardWorker의 `__proto__`는 부모인 Worker의 prototype를 가리키게됨. Worker Prototype의 `__proto__`는 또 Worker의 부모를 가리키게 되겠지
`__proto__`를 따라가다 최상위 객체까지가면 null이 됨.

프로토타입 체인은 자기가 찾는 메서드나 속성이름이 있으면 자기 자신을 먼저 찾아보고 가장 가까운 `__proto__`를 타고 가서 탐색, 없으면 또 타고 가고. 이것의 반복
이것을 통해 내적 일관성을 달성하게 됨!(내가 태어날 때 가장 가까운것 부터 탐색하기 때문에)

A instanceof B
는 어떻게 동작할까?
B는 클래스나 함수이름이 오게됨(둘 다 어차피 함수니까)
A 객체의 `__proto__`를 타고가서 constructor 탐. 그게 B랑 일치하는지 확인
worker instanceof Worker 도 true가 나왔던 이유는 일치하는게 나오지 않으면 `__proto__`가 null일 때까지 계속 타고가기 때문. (대체 가능성도 `__proto__` 경로로 계속 성립하고 있는 것임)

> 자바스크립트는 객체지향언어인가?
>
> yes. polymorphism이 성립하니까! (객체지향 언어냐 아니냐는 polymorphism이 언어차원에서 지원되냐 안되냐에 달려있음)

# Object essentials

- 객체의 본질
- 객체가 진짜 해야만하는 책임, 본질적인 측면
- Java나 Javascript는 객체지향언어의 조건을 만족하고 있다.
- 하지만 객체지향 언어의 조건을 만족했다고 해서 객체지향프로그래밍인 것은 아니다. 객체가 정상작동하고 객체지향답게 움직이는 본질적인 측면이 있어야 된다.

![image](https://user-images.githubusercontent.com/33214449/110505414-79b9a900-8141-11eb-8639-2a558f3878b8.png)

```js
const EssentialObject = class {
  #name = ''; // private (#) -> 'hide state' 내부의 상태를 감춘다 = 데이터 은닉
  #screen = null;
  constructor(name) {
    this.#name = name;
  }
  camouflage() {
    // 위장 이름 만들고 싶다면
    this.#screen = (Math.random() * 10).toString(16).replace('.', '');
  }

  // 캡슐화(encapsulation). 안에서 무슨 일이 일어나는지 노출하면 안 된다.
  get name() {
    return this.#screen || this.#name;
  }
};
```

## 데이터 은닉(hide state)

`Maintenance of State` 상태 관리 책임

- 내부의 상태를 (외부에) 감춘다. (= identifier context를 사용해야한다.) private
- 객체의 속성을 외부에 보여주는 것은 그 속성을 value context로 사용하겠다는 것이다. value context는 객체지향에서 버그를 만들고 결국 value context를 사용하는 객체지향은 언젠간 깨지게 된다.
- 외부에 내부의 상태를 보여주지 말고, 외부에 대해서 요청이 오면 이에 적합한 상태는 내부에서 관리해야함.

## 캡슐화(encapsulation)

`Encapslation of Functionality` 기능의 캡슐화

- 내부에서 무슨 일이 일어나는지 노출하면 안 된다.(객체 메소드에서 일어나는 일을 외부에서 알면 안 된다)
- encapsulation(캡슐화)(기능, 메서드에 하는 얘기) =/=은닉(데이터, 필드에 대한)
- 메소드는 캡슐화된 상태로 제공되어야한다. 날로 제공하면 안됨(날로 제공하는 것의 예 getter, setter)
- 예를 들어 `setAge`라는 메소드는 캡슐화에 위배될 수 있다.( age 필드가 있는데 set age 라고 네이밍하면 필드를 노출한 것이나 마찬가지) `setChild`, `setAdult`와 같은 메소드로 캡슐화한다.
- 캡슐화를 위해선 메소드의 역할, 책임에 대해 고민해야 한다.(왜 쓰는지, 어디에 쓰는지)

> 안에서 무슨일이 일어나고 있는지 노출하면 안 된다는 것. 바깥에선 추상화되어있는 의미로 인식을 해야됨. 위 코드에서 바깥쪽에선 name을 인식했지만 바깥은 안에서 screen을 쓰고 있는지 name을 쓰고 있는지 모르는 것 처럼.

=> 위 두가지를 수행해야 **객체**(Object essentials)임

## 변화에 대한 격리(Isolation of change)

위 두 가지(데이터 은닉, 캡슐화)로 `Isolation of change`를 이룰 수 있다.

- 소프트웨어는 변한다. 우리는 프로그램의 변화를 막을 수 없다.
- `격리`를 통해 어떤 변화의 여파가 다른 코드로 전이되지 않도록 해야한다.
- 이를 가능하게 하는 것이 데이터 은닉과 캡슐화이고 이 둘이 무너지면 객체지향이 무너진다.

> ➕ 연역, 귀납 반복해 추론 능력 키우기
>
> - 추론 능력의 근거가되는 게 자신의 주관을 다 빼고 합리적인 일들을 찾는 훈련을 하는 것. 금방 성장함
> - 개인적인 공감코드가 들어갈 필요가 없는 분야. 개인을 대입하면 오래걸림

# SOLID 원칙

> [객체지향의 기본 이론](https://junilhwang.github.io/TIL/CodeSpitz/Object-Oriented-Javascript/01-Intro/) 인용
>
> - 로버트 마틴이 2000년대 초반에 명명한 객체 지향 프로그래밍 및 설계의 다섯 가지 기본 원칙이다.
> - 프로그래머가 시간이 지나도 유지 보수와 확장이 쉬운 시스템을 만들고자 할 때 이 원칙들을 함께 적용할 수 있다.
> - SOLID 원칙들은 소프트웨어 작업에서 프로그래머가 소스 코드가 읽기 쉽고 확장하기 쉽게 될 때까지 소프트웨어 소스 코드를 리팩터링하여 코드 냄새를 제거하기 위해 적용할 수 있는 지침이다.
> - [애자일 소프트웨어 개발](https://ko.wikipedia.org/wiki/%EC%95%A0%EC%9E%90%EC%9D%BC_%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%EA%B0%9C%EB%B0%9C)과 [적응적 소프트웨어 개발](https://en.wikipedia.org/wiki/Adaptive_software_development)의 전반적 전략의 일부다.

## SRP(Single Responsibility, 단일책임) 원칙

코드를 수정을 하는 원인(이유)이 오직 하나만 있어야 한다.

SRP를 지키지 않으면 산탄총 수술이 일어난다. (객체 하나 건드린 것 때문에 수많은 일이 일어날 수 있음)

## OCP(Open Closed, 개방폐쇄) 원칙

- Open(확장): implements나 extends를 할 수 있게 만들어야 한다.
- Closed: 새로운 문제를 만들거나 해결할 때 기존의 클래스를 건드리는 게 아니라 implement, extends 로 클래스를 만들어 구현해야 한다. (설계시 기존에 있는 앤 건드리지 않게끔 하라는 것)

## LSP(Liskov Substitusion, 업캐스팅 안전) 원칙

- 업캐스팅: 부모쪽으로 캐스팅해 형변환하는 것

자식은 부모를 대체가능하다(대체가능성) 언제나 업캐스팅하는 것이 안전하다는 것

ex) 생물 추상층 예시

> [객체지향의 기본 이론](https://junilhwang.github.io/TIL/CodeSpitz/Object-Oriented-Javascript/01-Intro/) 인용
>
> 추상층의 정의가 너무 구체적이면 구상층의 구현에서 모순이 발생한다. 다음 예를 통해 이해해보자.
>
> - 추상층
>
>   - 숨을 쉰다
>   - 다리로 이동한다
>
> - 구상층(구현)
>   - 사람 ok
>   - 타조 ok
>   - 아메바 no
>   - 독수리 no
>   - 고래 no
>
> 위에서 `다리로 이동한다` 라는 메소드 때문에 구현의 문제가 발생한다. 그래서 이것을 다음과 같이 고쳐야 한다.
>
> - [추상층] 생물
>   - 숨을 쉰다
>
> 그런데 분명히 다리로 이동하는 생물도 있다. 그래서 다음과 같이 `인터페이스` 라는 것을 만들어야 한다.
>
> - [인터페이스] 다리로 이동하는 생물 extends 생물
>   - 다리로 이동한다.
>
> 이렇게 정의된 추상층과 인터페이스를 가지고 다음과 같은 생물은 만들어낼 수 있다.
>
> - 사람 implements 다리로 이동하는 생물
> - 타조 implements 다리로 이동하는 생물
> - 아메바 extends 생물
> - 독수리 extends 생물
> - 고래 extends 생물

이러한 상태를 `업캐스팅이 안전`하다고 볼 수 있다.

## ISP(Interface Segregation, 인터페이스 분리)

아까 LSP가 성립하지 않아서 인터페이스를 분리한 경우같은 걸 ISP라고 한다.

그림) 객체별로 모듈을 상대하도록 분리

## DIP(Dependency Inversion, 다운캐스팅 금지) 원칙

<u>의존성 역전의 법칙</u> 이라고도 한다. 의존성은 언제나 부모쪽으로만 흘러야한다는 것이다. (다운캐스팅금지)

> [객체지향의 기본 이론](https://junilhwang.github.io/TIL/CodeSpitz/Object-Oriented-Javascript/01-Intro/) 인용
>
> - 고차원의 모듈은 저차원의 모듈에 의존하면 안 된다. 두 모듈 모두 추상화된 것에 의존해야 한다.
> - 추상화 된 것은 구체적인 것에 의존하면 안 된다. 구체적인 것이 추상화된 것에 의존해야 한다.

## 기타

- DI(Dependency Injection, 의존성 주입). IoC(Inversion of control, 제어역전) (구현체)의 일부
- DRY(Don't Repeat Yourself, 중복방지): 'DRY하게 짜라' 두번 나오지 않게 반복 제거
- Hollywood Principle(의존성 부패방지): 물어보지 말고 그냥 요청하라. 예를 들어 전화번호 좀 줘라고 요청하게 되면(이건 질의) 상대방에서 필드를 요청하는 격이 되기 때문에 객체지향에 맞지 않음. 시간 날 때 나한테 연락 좀 줘라고 요청하는 것이 맞음(encapsulation 충족) 이것이 지켜지지 않으면 데이터 은닉, 메소드의 capsulation가 지켜지지 않은 것
- Law of demeter(최소 지식)
  - 최소한의 지식만 가지고 메소드나 필드를 만들어야함(의존성 부패를 피하기 위해서) 최소한의 지식이라함은 인자로 넘어온 객체의 타입, 내부에서 생성한 객체의 타입, 원래 그 객체가 가지고 있던 필드의 타입 의미.
  - 예를 들어 인자로 받아온 객체에 .... 써서 그 안에 있는 객체를 캐내게 되는 경우 원래 인자로 받은 타입만 알아야하는데 그 내장되있는 객체의 타입까지 다 알게되어 의존성이 복잡해짐. 이중 하나라도 바뀌면 메소드가 깨지겠지. 문제임
  - classA.methodA의 최대지식한계
    - classA의 필드 객체
    - methodA가 생성한 객체
    - methodA의 인자로 넘어온 객체
  - Law of demeter가 지켜지지 않을 경우 train wreck(열차전복) 상태라고 한다.

# Message

객체지향은 Message를 기반으로 전개한다.

## 단일책임원칙(SRP)를 준수하는 객체망이 문제를 해결

단일 책임 원칙(SRP)을 준수하는 객체에게 책임 이상의 업무를 부여하면?

1. 만능 객체가 되려한다.
2. 다른 객체에게 의뢰한다. ✔️(이렇게 해야함)

다른 객체에게 의뢰하는 것 = <u>다른 객체에게 '메세지'를 보내는 것</u>

1. 메세지: 의뢰할 내용
2. 오퍼레이션: 메세지를 수신할 객체가 제공하는 서비스

- 내부적으로 어떤 메서드를 처리할지는 런타임 구성에 따라 달라진다.
- (아까 봤던 Worker, HardWorker 예제에서 run()은 일종의 오퍼레이터이다.)
- 오퍼레이터가 런타임에 어떤 메소드랑 매핑될지 결정하는 것을 `동적바인딩`이라고 한다.
- (Javascript는 프로토타입으로 동적바인딩을 지원한다.)

3. 메소드 - 오퍼레이션이 연결될 실제 처리기

➕

- 객체망: 서로 역할을 분담해서 문제를 해결하는 집합. 객체망이 메시지를 통해 문제를 해결한다.

# Dependency

핵심⭐

- 의존성은 격리(가장 중요함)의 문제이다.

> 의존성이 있으면 의존되는 애들의 영향을 그대로 받기 때문에 문제이다. 의존성이 아예 없으면(혼자 너무 많이 알면) 만능 객체가 생기게 되서 문제, 의존성이 매우 강하면(너무 적게 알면) 한 명에게 문제가 생기면 나머지에도 문제가 생긴다. -> 적당히 의존성, 적당한 분리가 되어있어야함. (설계가 어려운 이유)

## Dependency의 종류

1. 객체의 생명 주기 전체에 걸친 의존성

- 상속(extends): 상속 받는 모든 객체가 부모 객체를 쓸 경우 반드시 망가진다.(한번 정해지면 영구적으로 의존되기 때문에 의존성 강력)
- 연관(association): 다른 객체를 알고 있다(소유하고 있다)

  > 클래스에 A라는 필드에 멤버 클래스를 잡았다면 이 클래스의 인스턴스를 만들면 이게 없어질 때까지 멤버는 이 클래스에 연관될 것 ❓

- 상속을 연관(소유)방식으로 바꿔라

2. 각 오퍼레이션 실행시 임시적인 의존성(1의 의존성보단 약한 의존)

- 의존(dependency) <- 지향하는 쪽으로 가는 중

  메소드 호출이 끝나면 의존성 종료

  오퍼레이션 실행시에만 의존이 됨. ex) 메서드안에서 만들어진 객체나 인자로 들어온 객체는 메서드를 호출하지 않으면 의존성이 없는거고 호출이 끝나면 의존성이 깨짐. 메서드 단위로만 의존성이 생겼다가 없어지기도 함.

- 의존성이 높을 경우

  - 수정의 여파 규모가 증가 ex) 의존성이 높으면 클래스가 한번 배포되고나면 어떤 필드를 고칠경우 어디까지 영향을 미칠지 그 규모를 셀 수도 없을 수 있음
  - 수정하기 어려운 구조 생성
  - 순환 의존성: 의존성은 단계별로 끊지 않으면 순환 의존성에 의해 모두 한 가족이 될 수도 있다;-;

- 객체지향을 배우는 이유

  - 객체지향 방법론을 이용해 격리 구간을 세우고 의존성을 관리하기 위해서이다. 변화에 대한 격리를 위해 객체지향을 하는 것이다.
  - 의존성은 격리를 위해 관리. 변화에 대한 격리를 하기 위해서(어떤 변화는 여기까지만 여파가 올 것이다. 나머진 격리되어있으니까! 같은 코드를 만들고 싶은 것)

## Dependency Inversion(의존성 역전)

- DIP(다운캐스팅금지): 쉽게 말하면, 어떠한 경우에도 다운캐스팅을 하지말라는 것
- Polymorphism(추상인터페이스 사용): 항상 추상 인터페이스(polymorphism) 사용하기(어떤 객체를 직접 인식하지말고 그 객체의 추상인터페이스를 인식하도록)

![image](https://user-images.githubusercontent.com/33214449/110657092-e6957780-8203-11eb-9dd5-b86ce8726291.png)

```js
// every 모두 통과해야만 true
// Worker 맞으면 모두 부하직원으로 삼는? 코드
// Worker로만 검사했음. HardWorker를 polymorphism 대체가능성을 이용해 추상클래스로 본 것임. 하위 클래스를 인식하지 않음으로써 Worker의 패밀리이기만 하면 모두 받아주겠다는 것.
// 더 많은 extension을 만들 수 있으니까 open extends 확장에 열려있고, 확장시마다 instanceof Worker 이런 코드를 건들 필요가 없으니 변화엔 close된 것임. OCP 만족 -> 의존성 역전이 자연스럽게 달성됨.

// Manager는 Worker에 의존성을 가지고 있는데 보다 구체화된쪽이 아니라 보다 추상화된 쪽을 가지고 있음 => DIP(의존성 역전의 법칙)
// -> Worker 레벨의 메서드를 쓰게 되겠지

// 마지막 코드 결과
//working 과 hardWorking이 차례대로 출력되겠지

const Worker = class {
  run() {
    console.log('working');
  }
  print() {
    this.run();
  }
};

const HardWorker = class extends Worker {
  run() {
    console.log('hardWorking');
  }
};

const Manager = class {
  #workers;
  constructor(...workers) {
    if (workers.every((w) => w instanceof Worker)) this.#workers = workers;
    else throw 'invalid workers';
  }
  doWork() {
    this.#workers.foreach((w) => w.run());
  }
};
```

# IoC(Inversion of Control, 제어역전)

<u>IoC(제어역전)은 객체지향의 궁극적인 목표이다. 모든 원칙을 달성해야 도달가능하다.</u>

- 제어 역전이란?

  - Control = flow control(흐름제어)
  - 흐름제어란 프로그램이 움직이는 흐름을 제어(프로그램 실행 통제)
  - 동기 흐름제어, 비동기 흐름제어 등이 있다.

- 역전(Inversion)이란?

  - 역으로 걜 대체해주는 것을 만들겠다는 것. 내가 직접 안 하고 위임하겠다는 것을 의미.

- 제어 흐름이 어려운 이유(문제점)

1. 흐름제어는 상태와 결합하여 진행됨

- 루프가 진행될수록 루프가 다루는 상태를 예측하기 어렵다.

2. 상태 통제와 흐름제어 = 알고리즘
3. 변화에 취약하고 구현하기도 어려움

- 제어문을 만들기도 힘든데, 제어문을 유지보수 하는 것은 더 어렵다.

- 대안

1. 제어를 추상화하고 한 번만 만들자.(제어를 한번만 짜라. 감이 안온다,, ❓ 똑같은 걸 만들고 차이점만 공급해주는 식으로 만들면 됨)
2. 개별 제어의 차이점만 외부에서 주입받는다.

## 예제

Renderer은 특정한 view를 받아서 그림을 그려주는 친구

baseElement에 view가 주는 내용을 넣어 그려주는 것

```js
const View = class {
  getElement(data) {
    throw 'override!';
  }
  initAni() {
    throw 'override!';
  }
  startAni() {
    throw 'override!';
  }
};

const Renderer = class {
  #view = null;
  #base = null;
  constructor(baseElement) {
    this.#base = baseElement;
  }
  set view(v) {
    if (v instanceof View) this.#view = v;
    else throw `invalid view: ${v}`;
  }
  render(data) {
    const base = this.#base,
      view = this.#view; // base와 view를 가져오고
    if (!base || !view) throw 'no base or view'; // base나 view 둘 중 하나라도 없으면 에러를 띄움
    let target = base.firstElementChild; // base의 첫번째 자식을 가져와 target 변수에 담고
    do base.removeChild(target);
    while ((target = target.nextElementSibling)); // base 안에 자식들을 다 없앰(새로 그려줘야 하니까)
    base.appendChild(view.getElement(data)); // render()시에 받은 data를 가지고 view에 있는 getElement로 view를 받음. 데이터에 합당한 element를 만들어줄것 -> view에는 getElement라는 메서드가 필요하겠지(단 View는 추상클래스이니 그냥 호출하면 죽이게 하고 상속받아서 쓰게 할 것)
    view.initAni(); // 애니메이션 초기화
    view.startAni(); // 애니메이션 시작
  }
};

// => 내용을 비우고 새로운 자식을 만든다음 애니메이션을 처리하는 제어가 render안에 있음. 제어는 render()가 하고 제어에 해당하는 부속만 개별 공급해주는 View 객체를 구성하면 됨. View가 가져야될 제어를 render에 역전한 것

// 진짜 renderer

const renderer = new Renderer(document.body);
renderer.view = new (class extends View {
  // View를 상속받은 클래스를 만들고 이 클래스의 객체를 만들고 있는 중(익명클래스로 객체 바로 만드는 코드)
  #el;

  // 3개의 메서드를 오버라이드
  getElement(data) {
    this.#el = document.createElement('div');
    this.#el.innerHTML = `<h2>${data.title}</h2><p>${data.description}</p>`;
    this.#el.style.cssText = `width: 100%; background:${data.background}`;
    return this.#el; // 새로 만든 div를 반환
  }
  initAni() {
    const style = this.#el.style;
    style.marginLeft = '100%';
    style.transition = 'all 0.3s';
  }
  startAni() {
    requestAnimationFrame((_) => (this.#el.style.marginLeft = 0));
  }
})();

renderer.render({
  title: 'title test',
  description: 'contents...',
  background: '#ffffaa',
});
```

제어는 renderer에 몰려있고 View들은 일부만 공급
render 메서드에 제어가 있기 때문에 수정시 여기만 고치면 됨(다른 애들은 제어에 대한 책임이 없어진 것. initializeAnimation이 뭔지 getElement가 뭔지 제어의 부속에 대한 관심만 갖게 되고 실제 제어는 다 render가 가져가는 것. )

- 라이브러리 vs 프레임워크

  - 라이브러리(Library): 제어역전에 대한 책임이 없다.
  - 프레임워크(Framework): 제어역전을 담당한다. ex) 나한테 미리 상속되어있는 메서드들 일부만 구해다 주기만 하면 내가 그걸 제어해줄게! 예를들어 안드로이드 개발할 때도 Activity라는 걸 만들어야되고 이건 OS가 지정한 메서드를 구현하는 것만 할 수 있음. 언제 앱이 뜨고 이런거 다 OS가 함

## 제어역전 실제 구현

가장 소극적인 제어 역전 -> 보다 넓은 범위의 제어 역전을 실현함

전략 패턴 & 템플릿 메소드 패턴 < 컴포지트 패턴 < 비지터 패턴

- 추상팩토리메소드 패턴

  아까 코드에선 View를 만들 수는 없었음(생성자로 View를 넘겨주기만했음)(메서드를 갖다 쓸 순 있었어도)
  만들 수 있게까지 하는게 추상팩토리메소드 패턴(만들어주는 팩토리가 필요!)
  왼쪽 패턴은 이미 만들어진 객체의 행위를 제어역전에 참여시킬 수 있지만 참여할 객체 자체를 생성할 수 없음.
  참여할 객체를 상황에 맞게 생성하고 행위까지 위임하기 위해 추상팩토리 메소드를 사용함.
  추상 팩토리 메소드 패턴은 비지터 패턴과 같이 사용될 수 밖에 없다.

(관련. 디자인패턴)

# References

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step30.md)
- [@eyabc](https://eyabc.github.io/docs/javascript/OOP_value_and_identifier_context)
- [@khw970421]()
- [@JeongShin]()
