[문서 목록으로 돌아가기](README.md)

> # STEP 32
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 32 [코드스피츠 객체지향 자바스크립트 - 3회차](https://www.youtube.com/watch?v=D450fPGffTg)
> - 기한: 03/20(토) ~ 03/23(화)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

model의 값의 변화를 자동으로 인식하진 않고 수동으로 binder를 call했던 저번 모델을 binder가 model이 변하면 자동으로 변화하게 하고싶음 -> observer pattern 적용 필요

> 출처: 코드스피츠 강의

# Strategy

`Strategy(전략)`이란 프로그램을 짰을 때, 어떤 문제를 해결하기 위한 핵심적인 **지식, 부분**을 의미한다.

- binder의 내부 구조 관련 문제(strategy가 아님)

이전 step에서 구현한 [MVVM 시스템](step31.md) 의 `Binder`를 분해해보면 다음과 같다.

![image](https://user-images.githubusercontent.com/33214449/112159711-cb2b6300-8c2c-11eb-96b8-ca9e6203633a.png)

![image](https://user-images.githubusercontent.com/33214449/112159923-fdd55b80-8c2c-11eb-96a7-8bb5ec0973aa.png)

`Strategy`를 코드에서 분리하고 싶은데 `Strategy`는 `Structure`를 가지고 있어야 작동한다. 이를 `Composite Pattern`을 이용해 해결한다. Strategy Pattern을 사용한다는 건 **알고리즘이 사용된 코드를 Object(객체)로 바꾸는 것**이라고 할 수 있다. 그리고 이렇게 되면 Binder는 Strategy에 대한 Dependency가 생기게 된다.

> **부연설명**
>
> - `Strategy` 부분을 코드에서 분리하고 싶은데 이 부분은 `structure` 와 떼려야 뗄 수 없음. 따라서 structure에 대한 포인터가 있어야됨
>
> - `composition`: code->object 로 바꾸기(클래스나 인터페이스와 같은 형으로 도출해야한다. 그래야만 형에 대한 규격에 따라 코드가 반응할 수 있게끔 할 수 있음)
>
> - 객체 또한 어떤 객체인지 알 방법이 필요 -> `type`을 정의해야함
>
> - strategy를 외부의 객체로 해결하고 싶고 (이유는 그렇게 하지 않으면 변화 생길 때마다 코드를 고쳐야하기 때문) 코드부분을 객체로 바꿔주면 binder는 그 객체에 대한 의존성이 생김. (객체 의존성)
>
> - 이 의존성을 내부에서 type의 subtype을 만들어내는 것이 아니라 외부에서 공급받아야함. 그래야 내부에는 형에 대한 의존성만 있고 특정 객체에 대한 의존성이 없어짐 (Dependency Injection)
>
> - Dependency가 만들어지는 순간 Dependency Injection도 따라와야함

> 여기서 `연역적 추리` 필요
>
> 다양한 현상으로부터 추상화가 되는 일반성을 도출해내는 것

## Dependency Injection 의존성 주입

> [객체지향의 기본 이론](https://junilhwang.github.io/TIL/CodeSpitz/Object-Oriented-Javascript/01-Intro/) 인용
>
> Dependency가 발생하는 이유와 Dependency Injection
>
> 객체지향에서는 자신이 가지고 있는 문제를 외부에 있는 객체의 도움(Strategy)을 통해 해결하기 때문에 자연스럽게 Dependency가 생기게 된다. 반대로 외부 객체의 도움이 없다면 스스로 문제를 해결해야 한다는 것인데, 그 의미는 코드의 수정이 빈번하게 일어난다는 것이다.
>
> 의존성이 생겼을 때 내부에 Sub Type을 만드는 경우가 있고, 외부에서 Type을 공급(Injection) 받는 경우가 있다. Sub Type 사용시 계속에서 code를 수정 하게 되기 때문에 code에서 object로 변경한 의미가 없어지게 된다. 따라서 type은 외부에서 주입 받아야 한다. 이것을 DI(Dependency Injection) 라고 한다. 그래서 Strategy를 도출하는 순간 자동으로 Dependency Injection이 생기게 된다. 반대로 Dependency는 있는데 DI가 생기지 않았다면 그것은 잘못된 것이다.

## Dependency Injection(주입)의 방향

1. 외부에서 객체를 직접 주입받는 것

2. 자식과의 injection을 성립시키는 것(내부에서 자식한테 위임시키는 방법) = 템플릿 메소드

아래 코드에선 2의 방법을 사용했음

![image](https://user-images.githubusercontent.com/33214449/112165410-1005c880-8c32-11eb-8dde-9090c5f27746.png)

> - 외부에선 process(템플릿)로 보이지만, 내부에선 자식 쪽에 의존하고있는 메소드(훅)에 의존하고 있음(`_process`)
>
> - 이 클래스는 process를 외부에 노출하고 있는데 process를 호출하면 `_process`를 호출할 것이다. 근데 그 `_process`를 호출하면 throw 당한다. 즉 이 클래스를 확장한 (오버라이드한) `_process`를 갖고있는 클래스의 인스턴스만 무사히 프로세스를 처리할 수 있다는 것이다. -> 추상 클래스를 가정하고 있는 것

## process와 structure의 연결

![image](https://user-images.githubusercontent.com/33214449/112165499-257af280-8c32-11eb-8a2a-a83f18d2aa17.png)

> - 카테고리 이름(cat)을 받아 불변값으로 처리
>
> - styles라는 키를 갖는 `_process`는 이렇게 처리할 것이라는 것
>
> - class를 값으로 넘겨줌 -> 이 클래스의 인스턴스를 **하나**만 만들게 하려고 의도한 것(익명 (상속된)클래스의 장점)
>
> - 이 네 가지 인스턴스들이 process라는 형으로 인식되게 되었다. (binder의 render는 이들을 process로 인식할 것)

```js
// Binder의 Strategy가 될 Class
const Processor = class {
  cat;
  constructor(cat) {
    this.cat = cat;
    Object.freeze(this);
  }
  // template method
  process(
    vm,
    el,
    k,
    v,
    _0 = type(vm, ViewModel),
    _1 = type(el, HTMLElement),
    _2 = type(k, 'string')
  ) {
    this._process(vm, el, k, v);
  }

  // hook method
  _process(vm, el, k, v) {
    throw 'override';
  }
};
```

코드를 보면 process 메소드의 책임을 `_process` 메소드에게 위임한다. 이 때 processor class를 상속받아 `_process`를 구현하게 되는 데, 구현되는 메소드(`_process`)를 `Hook method`라고 하고, Hook method에 책임을 위임하게 되는 메소드(process)를 `Template Method`라고 한다.

그리고 이를 Template Method Pattern(템플릿 메소드 패턴) 이라고 한다.

## binder 개조

`Processor`를 작성했으면 `Binder`를 수정해야한다.

아래 스크린샷은 `structure` 관련 코드만 표시된 것임

![image](https://user-images.githubusercontent.com/33214449/112177263-19942e00-8c3c-11eb-9367-c5493b5a1331.png)

![image](https://user-images.githubusercontent.com/33214449/112177364-2fa1ee80-8c3c-11eb-9210-6fab232528ef.png)

> - `#processors` 정의 - processor들을 담을 수 있는 그릇
> - `this.#processors[v.cat] = v;` 카테고리 당(ex. styles) 하나의 프로세서만 등록할 수 있도록 이렇게 짠 것(v.cat이 같은 애가 오면 v로 덮어써버리겠지)
> - v.cat 이 외부에 노출됐고 문자열이라 (값 사용) binder의 processor를 담는 그릇은 set이 될 수 없었던 것(담아도 소용 없음) 카테고리가 값(value)이니까 ❓
> - binder가 processor랑 계약했기 때문에 processor의 cat, process를 쓸 수 있게 되었음 (💡알고리즘의 일반화; 제네릭 알고리즘 - 복잡한 코드들의 공통점을 모아 객체를 형으로 뺀 뒤에 그 형과 계약하고 형에서 계약된 내용으로 알고리즘을 바꾸는 것을 의미.) binder와 processor 사이의 관계처럼 (`processores.forEach(([pk, processor]))` ~ 부분)
> - 이제 형인 processor이 바뀌지 않는한 코드가 바뀌지 않을 것

- 수정된 Binder 코드

```js
const Binder = class {
  #items = new Set();
  #processors = {}; // category당 한 개의 processor를 사용하게 하기 위함 // 예를 들어 #processors 안에 styles 카테고리는 하나밖에 없을 것임
  // 자료형

  add(v, _ = type(v, BinderItem)) {
    this.#items.add(v);
  }

  // Strategy를 주입받는다.
  addProcessor(v, _ = type(v, Processor)) {
    this.#processors[v.cat] = v;
  }

  // Render에서 주입받은 Strategy를 사용한다.
  render(viewmodel, _ = type(viewmodel, ViewModel)) {
    const processors = Object.entries(this.#processors);
    this.#items.forEach((item) => {
      const vm = type(viewmodel[item.viewmodel], ViewModel),
        el = item.el;
      processors.forEach(([pk, processor]) => {
        Object.entries(vm[pk]).forEach(([k, v]) => {
          processor.process(vm, el, k, v);
        });
      });
    });
  }
};
```

> **알고리즘의 일반화(Generic Algorithm)**
>
> - Structure를 남기고 Strategy를 type으로 내보낸다.
> - Binder는 processor의 프로토콜을 알고 있다. = Binder -> Processor로 의존성이 생긴 것
> - 이러한 과정을 알고리즘의 일반화라고하며 제일 어려운 개념이다.

- 기존의 render와 비교해보기

![image](https://user-images.githubusercontent.com/33214449/112178699-514fa580-8c3d-11eb-8350-7e7f22508042.png)

(왼)Strategy를 주입하는 Client Code

![image](https://user-images.githubusercontent.com/33214449/112179475-139f4c80-8c3e-11eb-9e62-e43e5acb8318.png)

> binder가 processor를 의존하게 되었다. (화살표는 의존하고 있는 쪽이 의존대상을 향해 가리킴) processor는 binder가 뭘하든 아무 영향이 없음

## 정리

- structure(구조적인 부분)와 strategy 부분을 분리한다.
- strategy를 뽑기 위한 공통점 찾아낸다.
- strategy와 어떻게 관계를 맺고 있는지 찾는다.
- 앞에서 도출된 형(type, class, interface)을 가지고 알고리즘을 고친다.

# Observer

![](https://images.velog.io/images/pul8219/post/392850c5-3d5d-405f-b95f-457c79fe7cc0/image.png)

기존에는 Observer 대신에 Call을 사용했다. 이제 Binder가 ViewModel의 변화를 알아서 알아차릴 수 있는 Observer Pattern을 이용하는 방식으로 바꿔야 한다. Binder가 ViewModel을 observe하고 ViewModel은 Binder에게 notify(알리다) 해야 한다.(사실 이 경우 변화를 감시하는 Observer의 책임이 막중할 것 같지만 컴퓨터 세계에선 감시자가 아닌 감시 당하는 쪽이 할 일이 더 많다. 그래서 감시 당하는 쪽을 구현하는게 더 힘들기도 하다.)

즉 감시 당하는 쪽(Subject)이 변화가 생기면 Observer(Listener)에게 변화의 내용을 알려줘야 하는 것이다.(Notify)

감시 당하는 쪽인 ViewModel이 스스로 변화를 감지하기(되게 어려운 일) 위해서 사용할 수 있는 다음과 같은 API가 있다.

- `Proxy`: Babel로 Converting이 되지 않는다. ES6 이상의 환경이어야 쓸 수 있다.(안드로이드 갤럭시 s3, s4, 노트3 등을 버린다는 것) = 실무에서 사용할 때 제약이 있다.
- `defineProperty`: ES5 까지 지원한다. = 실무 상 사용 가능

이러한 이유로 defineProperty를 이용하여 만들어볼 것이다.

> window7은 ie9. ie11 없음. (ie11 되는 컴은 크롬, 엣지 다 되서 ie 신경 안써도 되지만) 이를 고려해야함.

> 강의에서 Object defineProperty 라는 static method는 안다는 가정하에 진행할 것(ES5 스펙) ❗공부하세요

## Listener

Observer를 수행하는 것도 `형`으로 정의해야한다. (함수로 등록하는 게 아니라. 객체지향을 배우는 것이기 때문에 객체로 정의해야함)

```js
const ViewModelListener = class {
  viewmodelUpdated(updated) {
    throw 'override';
  }
};
```

> - ViewModelListener라는 객체, 형을 정의하고 viewmodelUpdated라는 메소드가 있을 것임
> - ViewModelListener가 형으로 들어왔을 경우 걔한테 viewmodelUpdated라는 메소드를 호출해서 Observe를 통과할 수 있다는 것

Binder가 Listener를 상속받아 사용할 것이다.

```js
const Binder = class extends ViewModelListener {
  // ... 생략
};
```

기존의 ViewModel 코드를 수정해보자

> - switch문의 case문들이 중복인 것을 발견할 수 있어야 한다.
> - ViewModel은 Subject이기 때문에 Listener들을 거느리고 있어야 Notify 행동이 가능하다. 따라서 관련 코드를 추가한 것이다. `#isUpdated`, `#listeners` listeners에 리스너들을 받아들여 얘네한테 notify하기 위해서임
> - listener를 추가하고 삭제하는 코드를 작성
> - notify. listener들은 ViewModelListener이기 때문에 viewmodelUpdated라는 메소드가 있을 것임. 여러개가 업데이트 되었을 수도 있으니 #isUpdated 라는 Set을 인자로 넘기는 것임.

ViewModel의 constructor 등 수정

> - `styles,attributes,properties includes(k)` 이 중 키가 있으면.. 이라는 의미이다.
> - defineProperty를 적용해야 한다.
> - object를 돌며 k, v 나올텐데 이 배열을 reducing 할 것. reduce의 두번째인자는 객체. accumulator(r) ❓reduce() 공부
> - Object.entries는 obj의 k, v를 배열로 하는 2차원 배열을 만듦. 이를 reduce 하려는 것. 원소 하나는 k, v로 나눠질 것. 얘가 accumulator로 삼고 있는 건(?) 두번째인자인 객체({})겠지. 이 통째의 결과물이 하나의 object가 될 것임.
> - defineProperity는 타겟이 되는 object와 (`obj`) 결과 object를 받아서 내용을 해석해 프로퍼티 세팅을 다 해줌
> - v값을 그냥 넣지 않고 getter, setter로 넣음. 열거 가능하게 만듦 (enumerable값을 true로)
> - get에선 v값을 그냥 반환하면 됨.
> - set에선 newV를 v에 넣어줌. `+` vm에 있는 #isUpdated에 뭔갈 추가해주는 작업을 작성. 속성을 set으로 건들때마다 #isUpdated라는 Set에 key가 바뀌었다는 것을 알려주고 싶은 것임. ViewModelValue라는 객체를 만들어서 add마다 이 인스턴스를 Set에 넣어주기. (isUpdated를 수신하는 쪽에서는 style에 background가 빨간색으로 바뀌었네~ 이런 걸 알 수 있음) 변화분이 속성이 setter될 때마다 자동으로 isUpdated에 쌓이는 것이다.
> - 원래 ViewModel의 `default: this[k] = v;` 부분은 else일 때 구문 안에 작성했다. 단일값이기 때문에 defineProperty(s없음)를 사용한다.

```js
const ViewModel = class{
  static get(data){
    return new ViewModel(data);
  }
  styles = {}; attributes = {};, properties = {}; events = {};
  #isUpdated = new Set;
  #listeners = new Set;
  addListener(v, _ = type(v, ViewModelListener)){
    this.#listeners.add(v);
  }
  removeListener(v, _ = type(v, ViewModelListener)){
    this.#listeners.delete(v);
  }
  notify(){
    this.#listeners.forEach(v => v.viewmodelUpdated(this.#isUpdated));
  }
  constructor(checker, data, _ = type(data, "object")){
    super(); // ❓
    Object.entries(data).forEach(([k, obj]) => {
      if("styles,attributes,properties".includes(k)){
        this[k] = Object.defineProperties({},
          Object.entries(obj).reduce((r, [k, v]) => {
            r[k] = {
              enumerable: true,
              get: _ => v,
              set: newV => {
                v = newV;
                vm.#isUpdated.add(new ViewModelValue(cat, k, v));
              }
            };
            return r;
          }, {})); // defineProperties end
      } // if end
      else{
        Object.defineProperty(this, k, {
          enumerable: true,
          get: _ => v,
          set: newV => {
            v = newV;
            this.#isUpdated.add(new ViewModelValue("", k, v));
          }
        });
      } // else end
    }); // forEach end
  }

}

const ViewModelValue = class{
  cat; k; v;
  constructor(cat, k, v){
    this.cat = cat;
    this.k = k;
    this.v = v;
    Object.freeze(this);
  }
}
```

이 코드의 핵심은 setter를 통해 값을 대체한 다음 isUpdated에 변경된 사항을 추가하는 것에 있다.

> ➕ Javascript는 객체들의 메소드가 매우 많은 언어이다.

# Composite

문제점: 이전까지 짠 ViewModel엔 안에도 ViewModel이 있었다.(sub) Binder는 겉에 큰 ViewModel과 계약을 하지 안의 Sub ViewModel까지 계약을 하진 않음. 따라서 ViewModel이 변경됐을 때도 알려야하지만 Sub에 있는 ViewModel의 변화도 Listener에게 알려줘야할 책임이 있음.
(디렉토리구조에서 검색할 때 현재 있는 폴더뿐 아니라 더 하위에서도 계속 찾아내는 것과 유사)

Composite Pattern은 위임을 반복하여 취합한다.

객체지향에선 이 문제를 (동적계획법, 트리 탐색)이 아닌 동적 위임으로 해결한다.

> - else문으로 wrapper처럼 styles, attributes가 아닌 것들이 들어올 때 ViewModel이 들어오는 경우도 처리해줘야한다.
> - ViewModel일 땐, 이 변화가 Set으로 변화 보고를 할 때 내 부모가 일으킨 변화인지 자식이 일으킨 변화인지 알아야함. 예를 들어 wrapper의 styles인지, title의 style인지 구분할 수 있어야함
> - subKey가 ''일 때는 자신이 root라는 것. ❓ `if(v instanceof ViewModel)` 코드 이해X
> - subKey와 parent는 원래 null이지만 누군가의 자식인게 확정되면 값이 들어온다는 것.
> - 내가 보고할 땐 나의 subKey를 보고하면 그만임. 자식 객체는 자기 변화가 일어날 때 자신의 subKey와 함께 보고해주면 부모에 있는 updated가 이를 수신해 넣어주면 안에 vm엔 subKey가 wrapper라던지 title이라던지 등이 들어있을 것임 ❓
> - 이렇게 짠 Composite Pattern은 계속 보며 연습해야 이해할 수 있음

```js
const ViewModel = class extends ViewModelListener{ // ✏️ ViewModel이 ViewModelListener를 상속받게 수정함(Composition)

// ✏️
// 내부에서 쓰는 애들이라 typecheck 안 하는 것
  static #subjects = new Set; // Observer에 통보할 Subject 들을 Set으로 선언
  static #inited = false; // initialize하면 true로 바뀔 것.
  static notify(vm){
    this.#subjects.add(vm); // subject에 추가(Set이니 중복추가 안 될것)
    if(this.#inited) return; // 초기화 이미 됐다면
    this.#inited = true; // 초기화 안 됐다면
    const f =_=>{
      this.#subjects.forEach(vm => {
        if(vm.#isUpdated.size){ // 0 이 아니면 // 뭔가 업데이트 됐다는 얘기임 // 그럼 if문 내부가 실행됨
          vm.notify(); // 내가 가진 리스너들에게 Updated Set을 보내는 작업
          vm.#isUpdated.clear(); // isUpdated notify로 보냈으니 clear 시킴
        }
      });
      requestAnimationFrame(f); // 발동
    };
    requestAnimationFrame(f);
  }
  // => requestAnimationFrame 당 나한테 등록된 모든 vm을 돌며 얘네들이 업데이트 된게 있다면 notify를 해주는 코드인 것임. 속성이 많이 바껴도 프레임당 한번만 notify해주면 되겠지.


  static get(data){
    return new ViewModel(data);
  }
  styles = {}; attributes = {};, properties = {}; events = {};
  #isUpdated = new Set;
  #listeners = new Set;
  addListener(v, _ = type(v, ViewModelListener)){
    this.#listeners.add(v);
  }
  removeListener(v, _ = type(v, ViewModelListener)){
    this.#listeners.delete(v);
  }
  notify(){
    this.#listeners.forEach(v => v.viewmodelUpdated(this.#isUpdated));
  }

  // ✏️
  subKey = ""; parent = null;

  constructor(checker, data, _ = type(data, "object")){
    super(); // ❓

    Object.entries(data).forEach(([k, obj]) => {
      if("styles,attributes,properties".includes(k)){
        this[k] = Object.defineProperties({},
          Object.entries(obj).reduce((r, [k, v]) => {
            r[k] = {
              enumerable: true,
              get: _ => v,
              set: newV => {
                v = newV;
                vm.#isUpdated.add(new ViewModelValue(cat, k, v));
              }
            };
            return r;
          }, {})); // defineProperties end
      } // if end
      else{
        Object.defineProperty(this, k, {
          enumerable: true,
          get: _ => v,
          set: newV => {
            v = newV;
            this.#isUpdated.add(new ViewModelValue(this.subKey, "", k, v));
          }
        });

        // ✏️
        if(v instanceof ViewModel){
          v.parent = this // 역참조할 수 있어야 한다.
          v.subKey = k;
          v.addListener(this); // 자식의 리스너가 된다.
                                // 자식이 변화했을 때 변화를 알아차린다.
                                // ViewModel은 Subject이자 Listener인 경우가 많다.⭐
        }
      } // else end
    }); // forEach end

    // notify를 속성이 바뀔 때마다 호출하면 Binder에 render가 미친듯이 일어날 것. requestAnimationFrame 한번당 notify 한번만 때리면됨. ViewModel.static method 사용하는 이유가 이것임.(코드 상단 참고)
    ViewModel.notify(this);
    Object.seal(this);
  } // constructor end

// ✏️
viewmodelUpdated(updated){
  updated.forEach(v => this.#isUpdated.add(v));
}

} // ViewModel end

// Observer가 받는 info 객체(이 객체의 설계도 어렵다.)
// ⭐이 info 객체를 잘 짜서 Subject를 몰라도 되게 해야 한다.
const ViewModelValue = class{
  subKey; cat; k; v;
  constructor(subKey, cat, k, v){
    this.subKey = subKey; // 내껀지 내 자식껀지 알아야하기 때문에
    this.cat = cat;
    this.k = k;
    this.v = v;
    Object.freeze(this);
  }
}
```

# Observer

Observer 역할을 하는 Binder의 입장도 들어보자.

```js
const Binder = class extends ViewModelListener {
  // extends 추가

  #items = new Set();
  #processors = {};

  add(v, _ = type(v, BinderItem)) {
    this.#items.add(v);
  }

  addProcessor(v, _ = type(v, Processor)) {
    this.#processors[v.cat] = v;
  }

  render(viewmodel, _ = type(viewmodel, ViewModel)) {
    const processors = Object.entries(this.#processors);
    this.#items.forEach((item) => {
      const vm = type(viewmodel[item.viewmodel], ViewModel),
        el = item.el;
      processors.forEach(([pk, processor]) => {
        Object.entries(vm[pk]).forEach(([k, v]) => {
          processor.process(vm, el, k, v);
        });
      });
    });
  }

  // ✏️
  // unwatch하면 자기 빼내고, watch하면 자신 등록. 최초에 등록될 때는 notify되는게 없으니 render 한번 해준다.(없던 ViewModel이 왔으니까)
  // 내가 특정 viewmodel에 listener로 등록되고 말고를 결정하는 코드
  watch(viewmodel, _ = type(viewmodel, ViewModel)) {
    viewmodel.addListener(this);
    this.render(viewmodel);
  }
  unwatch(viewmodel, _ = type(viewmodel, ViewModel)) {
    viewmodel.removeListener(this);
  }

  // 공포의 listener 구현하기
  // 인자 updated는 Set으로 들어온다. Set 안에는 viewmodel value가 들어있는데 여기엔 subKey, category, key, value이런거 들어있고!
  // #items는 set이기 때문에 loop를 forEach로 돌 수 밖에 없다.

  viewmodelUpdated(updated) {
    const items = {};

    // #items에 담긴걸 그냥 오브젝트인 items에 담도록 하는 코드임
    this.#items.forEach((item) => {
      items[item.viewmodel] = [
        type(viewmodel[item.viewmodel], ViewModel),
        item.el,
      ];
    });
    updated.forEach((v) => {
      if (!items[v.subKey]) return;
      const [vm, el] = items[v.subKey],
        processor = this.#processors[v.cat];
      if (!el || !processor) return;
      processor.process(vm, el, v.k, v.v);
    });
  }
  // render에도 processor가 작동, 여기서도 processor 작동
  // 두군데 이상의 알고리즘에 개입하는, 외부에서 공급되는 전략을 **비지터**라고함
};
```

> ➕ 시간을 더 쓰면 메모리를 줄일 수 있고, 메모리를 더 쓰면 시간을 줄일 수 있다.

# Client

![](https://images.velog.io/images/pul8219/post/7859e4f8-d006-4194-a935-aa8c94f0fc8c/image.png)

![](https://images.velog.io/images/pul8219/post/aebfd377-6fcd-4aa8-80e3-fc08be1bf609/image.png)

- `binder.render`가 없어짐

# 정리

strategy, template method, observer, composite 패턴만 알아도 많은 것 할 수 있음.

# Comment

- MVVM과 객체지향 철학을 이해한다는 생각으로 공부하기
- 코드스피츠 85기 거침없는 자바스크립트: js에 대해 아는 부분 많을 수록 재밌을 강의
- 코드스피츠 76기(css rendering), 78기 추천

# References

[MVVM System 개선하기 (1) - 개발자 황준일](https://junilhwang.github.io/TIL/CodeSpitz/Object-Oriented-Javascript/03-Strategy-Observer/#strategy-pattern)

# 팀원들 결과물

- [@pul8219]()
- [@eyabc]()
- [@khw970421]()
- [@JeongShin]()
