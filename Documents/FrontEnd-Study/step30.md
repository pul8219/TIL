[문서 목록으로 돌아가기](README.md)

> # STEP 30
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 30 [코드스피츠 객체지향 자바스크립트 - 1회차](https://www.youtube.com/watch?v=E9NZ0YEZrYU)
> - 기한: 03/06(토) ~ 03/09(화)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

# Value context vs Identifier context

- value context
  값을 기반 어떤 변수에 저장되어있냐가 중요한게 아니라 그 안에 값이 같으면 같다고 보는
  -> 메모리 주소가 어딘지는 큰 상관이 없음

- identifier context
  identifier 기반 어떤 메모리에 있는 녀석인지가 중요
  메모리 주소를 기반으로 식별하는 identifier context

> context = 관점으로 생각

> 객체지향은 value context를 사용하지 않음 ★

> 객체지향에서 value context로,
>
> 함수형 프로그래밍하는데 identifier context 기반으로 프로그래밍하는 것은
>
> 버그 확정시키는 일
>
> 되도록 하나의 context로 프로그래밍하는 것 권장

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

// 객체지향에서 값 context를 쓰면 이미 객체지향 깨먹고 있는 것
```

> 메서드의 인자이든 메서가 리턴하는 값이든 생성해야하는 무언가가 됐든 전부 객체만 사용하는 것이 객체지향의 기본
>
> 3이라는 value를 받는게 아니라 new Count(~~) 이런식으로 받아야겠지
>
> 값을 쓸 수 있는 유일한 컨텍스트는 생성자의 인자뿐

## Value

- 끝 없는 복사본을 만들게 됨
- 상태 변화에 안전한가? ㅇㅇ 그러나 강제적으로 계속 불변하는 값을 만들어내기 때문에 안전해보이는거고 상태관리면에서 안전한 것은 아님. 3과 1을 더하면 4라는게 새로 태어나고 3과 1은 그대로 있잖여
  그래서 함수형 프로그래밍이 생긴거래
- 연산을 기반으로 로직을 전개

## Identifier

- 하나의 원본을 사용
  값이 계속 변할 수 있음. 상태가 일관성이 없어질 수 있음. 이런 일이 생기니 문제.
- 상태 변화를 내부에서 책임짐 (내부 상태에 대한 책임지는 객체를 만들어야함)
- 메시지를 기반으로 로직을 전개(메시지를 통해 문제를 해결. 우리가 배우게 될 내용임.) 내가 구현한데까지는 하고 내가 못하는건 메시지를 통해 딴 놈한테 위임하는 것이 가능해짐

# Polymorphism

다형성

- (부모는 자식을 대체할 수 없지만) 자식은 부모를 대체할 수 있다. => polymorphism

(사실 부모 자식이란 워딩은 맞지 않음)

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

- Worker를 확장한 게 HardWorker다 라는 것
- HardWorker의 부분집합이 Worker겠지. 그래서 대체가 가능한 것
- 확장된 클래스는 대상 클래스를 대체할 수 있다(polymorphism의 핵심 - '대체 가능성' 외워라!)

- HardWorker엔 print()란 메서드가 없지만, 얘한텐 없지만 타고 가서 부모인 Worker의 print 호출함. 그렇다면 Worker의 run()이 호출될까 HardWorker의 run()이 호출될까? 내가 태어날 당시에 누구냐를 항상 일관성있게 유지하기 때문에... worker 객체는 HardWorker에 의해 만들어진 객체이기 때문에 worker.print()는 HardWorker의 run()을 호출하게된다. 그니까 this가 여기선 HardWorker인거지! (약속된 것임! - '내적 일관성' : 어떠한 경우에도 태어났을 때 원본 클래스를 유지하려는 속성)

polymorphism: '대체 가능성(substitution)' + '내적 일관성(internal identity)'

## Substitution & Internal identity

- Substitution: 확장된 객체는 원본으로 대체 가능
- Internal identity: 생성 시점의 타입이 내부에 일관성 있게 참조됨.

이 다형성을 따라야 객체지향임
자바스크립트도 이 규칙을 따르는 것임.
객체지향언어를 사용한다는건 아래 두 가지가 언어 차원에서 지원된다고 믿고 쓰는 것임. 업계의 약속!

## Polymorphism of Prototype

- polymorphism을 구현하는 방식은 언어마다 다름
- 자바스크립트는 프로토타입이란 시스템을 가지고 있음. 이게

대체가능성과 내적일관성을 어떻게 구현하는지 볼 것

![image](https://user-images.githubusercontent.com/33214449/110503043-221a3e00-813f-11eb-9a58-73324e499c18.png)

아까 만들었던 HardWorker라는 클래스는 내부적으론 function으로 처리됨
function으로 처리된 모든 객체들은 안에 prototype을 가짐(이것도 객체임) 무.조.건

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

객체의 본질

객체가 진짜 해야만하는 책임, 본질적인 측면

객체지향 언어의 조건을 만족했다고 우리가 객체지향프로그래밍을 하는 것은 아님. 우리가 만든 객체가 정상작동하고 객체지향답게 움직인다는 본질적인 측면이 있어야 됨

![image](https://user-images.githubusercontent.com/33214449/110505414-79b9a900-8141-11eb-8639-2a558f3878b8.png)

```js
const EssentialObject = class {
  #name = ''; // private (#) -> 'hide state'
  #screen = null;
  constructor(name) {
    this.#name = name;
  }
  camouflage() {
    // 위장이름 만들고 싶다면
    this.#screen = (Math.random() * 10).toString(16).replace('.', '');
  }
  get name() {
    // encapsulation
    return this.#screen || this.#name;
  }
};
```

- 객체의 속성이 private 해야한다. 외부에 상태를 감추는 것(데이터 은닉) (객체의 속성을 외부에 보여주게되면 이 속성은 값으로 사용됨. value context로 움직이게되는것. 이렇게 되면 객체지향이 깨짐)

- encapsulation(캡슐화)(기능, 메서드에 하는 얘기) =/=은닉(데이터, 필드에 대한)
  안에서 무슨일이 일어나고 있는지 노출하면 안 된다는 것. 바깥에선 추상화되어있는 의미로 인식을 해야됨. 바깥쪽에선 name을 인식했자녀 바깥에선 얘가 screen을 쓰고 있는지 name을 쓰고 있는지 모름.

=> 위 두가지를 수행해야 객체임

**Object essentials**

1. 기능의 캡슐화

Encapslation of Functionality

메소드는 캡슐화된 상태로 제공되어야함. 날로제공하면 안되고.(날로제공하는 것의 예 getter, setter)

> age 필드가 있는데 set age 하면 필드 노출한 것이나 마찬가지지. 그 메서드를 왜 써야하는지 이걸 어디에 왜 쓰는지 고민해야함

2. 상태관리책임

Maintenance of State

외부에 나의 상태를 보여주지 말고, 외부에 대해서 요청이 오면 이에 적합한 상태는 내부에서 관리해야함.

=> 이 두가지로 변화에 대한 격리(Isolation of change)를 이룰 수 있음.
우리가 할 수 있는건 이러한 일 때문에 변화되는건 여기뿐. 어떤 여파가 다른데 안 가게 하는 것이 목표인 것. 해당 변화가 일어났을 때 거기만 변화가 일어나고 다른덴 여파가 안오게 하고 싶은 것이 목표임(이게 격리) (변화를 막을 수는 없기 때문)

> 연역, 귀납 반복해 추론 능력 키우기
>
> 추론 능력의 근거가되는 게 자신의 주관을 다 빼고 합리적인 일들을 찾는 훈련을 하는 것. 금방 성장함
>
> 개인적인 공감코드가 들어갈 필요가 없는 분야. 개인을 대입하면 오래걸림

# 알려진 기본 설계요령

## SOLID 원칙

### SRP(Single Responsibility) 단일책임

'얘는 이런 경우에만 수정을 할거야!'
'이 코드를 고쳐야되는 이유는 하나뿐이야'

SRP 가 지켜지지않으면 -> 산탄총 수술 - 객체 하나 건드린 것 때문에 수많은 일이 일어날 수 있음

### OCP(Open Closed) 개방폐쇄 원칙

open 확장 -> implement나 extends를 할 수 있게끔 만들어라

closed -> 다른 애가 수정해야되면 기존 클래스를 건드는게 아니라 또다른 implement, extends 클래스를 만들어서 문제를 해결할 수 있어야 함. 기존에 있는 앤 건드리지 않게끔 해라(설계할 때)

### LSP(Liskov Substitusion) 업캐스팅 안전

업캐스팅 부모쪽으로 캐스팅해 형변환하는 것

자식은 부모를 대체가능하다(대체가능성) 언제나 업캐스팅하는 것이 안전하다는 것

ex) 생물 추상층 예시

### ISP(Interface Segregation)

아까 LSP가 성립하지 않아서 인터페이스를 분리했잖아 그런게 ISP

그림 ) 객체별로 모듈을 상대하도록 분리

### DIP(Dependency Inversion)

의존성 역전의 법칙

의존성은 언제나 부모쪽으로만 흘러야함(다운캐스팅금지)

추상층

고차원 -> 더 자식 쪽
낮은층 extends가 덜 된, 추상적인
고차원 모듈이 저차원 모듈에 의존하면 안됨

### 기타

- DI(Dependency Injection) 의존성 주입
  IoC (구현체)의 일부

- DRY Don't Repeat Yourself 중복방지: 'DRY하게 짜라' 두번 나오지 않게 반복 제거

- Hollywood Principle 의존성 부패방지: 물어보지 말고 그냥 요청하라. 예를 들어 전화번호 좀 줘라고 요청하게 되면(이건 질의) 상대방에서 필드를 요청하는 격이 되기 때문에 객체지향에 맞지 않음. 시간 날 때 나한테 연락 좀 줘라고 요청하는 것이 맞음(encapsulation 충족)
- 데이터 은닉, 메소드의 capsulation 충족해야함

- Law of demeter 최소 지식
  최소한의 지식만 가지고 메소드나 필드를 만들어야함(의존성 부패를 피하기 위해서) 최소한의 지식이라함은 인자로 넘어온 객체의 타입, 내부에서 생성한 객체의 타입, 원래 그 객체가 가지고 있던 필드의 타입 의미.

  - 예를 들어 인자로 받아온 객체에 .... 써서 그 안에 있는 객체를 캐내게 되는 경우 원래 인자로 받은 타입만 알아야하는데 그 내장되있는 객체의 타입까지 다 알게되어 의존성이 복잡해짐. 이중 하나라도 바뀌면 메소드가 깨지겠지. 문제!

  classA.methodA의 최대지식한계

  - classA의 필드 객체
  - methodA가 생성한 객체
  - methodA의 인자로 넘어온 객체

  train wreck(열차전복): demeter의 법칙을 깨면 열차전복

# Message

## SRP를 준수하는 객체망이 문제를 해결

단일 책임 원칙을 준수하는 객체에게 책임 이상의 업무를 부여하면?

1. 만능 객체가 되려한다.
2. 다른 객체에게 의뢰한다. ✔️(이렇게 해야함)

다른 객체에게 의뢰하는 것 = 다른 객체에게 '메세지'를 보내는 것

1. 메세지 - 의뢰할 내용
2. 오퍼레이션 - 메세지를 수신할 객체가 제공하는 서비스
3. 메소드 - 오퍼레이션이 연결될 실제 처리기

➕

- 객체망: 서로 역할을 분담해서 문제를 해결하는 집합

  객체망이 메시지를 통해 문제를 해결한다.

- 오퍼레이터가 실제로 연결될 것은 메서드라고함

  아까 Worker, HardWorker 예제에서 봤던 run()은 일종의 오퍼레이터, 그런데 내부적으로 어떤 메서드를 처리할지는 런타임 구성에 따라 달라진다.

  오퍼레이터가 런타임에 어떤 메서드랑 매핑될지 결정하는 방식을 동적바인딩이라함. 자바스크립트는 프로토타입으로 동적바인딩을 지원함

# Dependency

핵심⭐

가장 중요한 '격리'의 문제

의존성이 있으면 의존되는 애들의 영향을 그대로 받기 때문에 문제!

너무 많이 알게하면 만능 객체가 생기게되서 문제, 너무 적게 알면 (다같이 위임) 한 놈 휴가가면 다 안됨 -> 적당히 의존성을 가지면서 적당히 분리도 되어있어야함. 설계가 어려운 이유!

1. 객체의 생명 주기 전체에 걸친 의존성

- 상속(extends)

  부모 바뀌면 다 망가질 수 있음.

  한번 정해지면 영구적으로 의존됨

- 연관(association)

  클래스에 A라는 필드에 멤버 클래스를 잡았다면 이 클래스의 인스턴스를 만들면 이게 없어질 때까지 멤버는 이 클래스에 연관될 것

  소유하는 방식

2. 각 오퍼레이션 실행시 임시적인 의존성(1의 의존성보단 약한 의존)

- 의존(dependency) <- 지향하는 쪽으로 가는 중

  오퍼레이션 실행시에만 의존이 됨. ex) 메서드안에서 만들어진 객체나 인자로 들어온 객체는 메서드를 호출하지 않으면 의존성이 없는거고 호출이 끝나면 의존성이 깨짐. 메서드 단위로만 의존성이 생겼다가 없어지기도 함.

- 의존성이 높으면

  - 1. 수정의 여파 규모가 증가 ex) 의존성이 높으면 클래스가 한번 배포되고나면 어떤 필드를 고칠경우 어디까지 영향을 미칠지 그 규모를 셀 수도 없을 수 있음
  - 2. 수정하기 어려운 구조 생성
  - 3. 순환 의존성
       의존성은 단계별로 끊지 않으면 순환 의존성에 의해 모두 한 가족이 될 수도 있다;-;

- 객체지향을 배우는 이유

  - 객체지향 방법론을 이용해 격리 구간을 세우고 의존성을 관리하기 위해서
  - 의존성은 격리를 위해 관리. 변화에 대한 격리를 하기 위해서(어떤 변화는 여기까지만 여파가 올 것이다. 나머진 격리되어있으니까! 같은 코드를 만들고 싶은 것)

## Dependency Inversion

의존성 역전

쉽게 말하면, 어떠한 경우에도 다운캐스팅을 하지말라는 것
항상 추상 인터페이스(polymorphism) 사용하기(어떤 객체를 직접인식하지말고 그 객체의 추상인터페이스를 인식하도록)

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
```

# Inversion of Control

DIP도 IoC를 위한 것.

- 제어 역전이란?

  Control = flow control(흐름제어) (프로그램이 움직이는 흐름을 제어) 동기흐름제어, 비동기 흐름제어 등

  역전이란? 역으로 걜 대체해주는 것을 만들겠다는 것. 내가 직접 안 하고 위임하겠다는 것을 의미.

- 문제점

1. 흐름제어는 상태와 결합하여 진행됨
2. 상태 통제와 흐름제어 = 알고리즘
3. 변화에 취약하고 구현하기도 어려움

- 대안

1. 제어를 추상화하고 (제어를 한번만 짜라. 감이 안온다,, 똑같은 걸 만들고 차이점만 공급해주는 식으로 만들면 됨)
2. 개별 제어의 차이점만 외부에서 주입받는다.

## 예제

Renderer은 특정한 view를 받아서 그림을 그려주는 친구
