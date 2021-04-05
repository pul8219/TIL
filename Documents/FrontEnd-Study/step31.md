[문서 목록으로 돌아가기](README.md)

> # STEP 31
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 31 [코드스피츠 객체지향 자바스크립트 - 2회차](https://www.youtube.com/watch?v=RT38Za1pkdI&t=4539s)
> - 기한: 03/13(토) ~ 03/16(화)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

저번시간은 객체지향 원리 설명. 이번 시간엔 객체지향 연습

MVVM의 핵심을 담은 간단한 모델을 만들어볼것

의존성 분리가 필요할 때, TypeCheck 하는 방법, 몇몇 프레임워크에서 취하는 MVVM 패턴의 개요 중심으로 공부

> 출처: 코드스피츠 강의

# MVC

Model View Controller

## MVC 1

`Model - View - Controller`를 사용하며, 주로 백엔드(Server-side)에서 사용된다.

![image](https://user-images.githubusercontent.com/33214449/111351175-3ec9ef00-86c6-11eb-9489-6ed6fd41505a.png)

✔️화살표: 누가 누굴 알고있다는 것(의존성이 있다는 것)

- Controller: Model을 적절히 가공해 View가 알아볼 수 있는 data로 View에게 전달
- View: 사용자의 인터랙션을 받아들이는 곳. 이에 따라 Model을 갱신.(View는 어떤 Model을 갱신하는지 Model에 대한 의존성을 알고 있음)
- Model: 비즈니스에 관계된 것을 변경

View가 Model을 알고있는 것은 문제가 된다(의존성이 문제)

- Model은 변경될 수 있다.(사업모델이 바뀌어서, 영업처가 늘어나서, 팀이 늘어나서 등의 이유로) View도 모양이 안 이뻐서, 클릭환경을 바꾸려고 등등의 이유로 변경된다. 변화 요인이 굉장히 다른데 서로 의존성이 있는 것은 문제
- 추가적으로 Model의 변화 -> Controller가 주는 data에도 영향 => 문제

> 변화율

- 서버에서는 Model을 Controller가 가공하고 View를 만들고 던지면 끝남. View와 Model간의 관계가 없음
- 그러나 클라이언트에서는 View->Model 로 가는 흐름 때문에 의존성 큼 -> 클라이언트에서 MVC 잘 안씀

> MVC를 사용하는 Server-side Framework
>
> - Spring Framework
> - Python Django
> - PHP Laravel
> - .NET Framework
> - Ruby On Rails

## MVC 2

제왕적 Controller MVC 모델

![image](https://user-images.githubusercontent.com/33214449/111351216-4ab5b100-86c6-11eb-9d68-5e528a8b9ad1.png)

`MVC 1` 모델처럼 View가 Model을 알고있진 않지만 View가 Controller를 알게 되었다.

문제

- Controller에 대한 의존성이 너무 크다.
- View의 변화나 Model의 변화를 Controller에 반영해야함
- 주구장창 컨트롤러만 고치고 있게될 수도 있음(유지보수 어려움)
- MVC 요즘 잘 안씀
- 이러한 의존성들을 해결하는 방법이 MVC 패턴 자체에서는 없다.

# MVP

Model View Presenter

![image](https://user-images.githubusercontent.com/33214449/111351271-599c6380-86c6-11eb-8f35-87c65bd36a65.png)

View가 순수한 getter, setter를 가지고 있고, View에 그림을 그리는 로직이 없음. **View가 Model을 알 필요가 없음(의존성X)**

Presenter는 Model을 가져와 잘 해석해 View에 있는 getter, setter를 통해 조작. Model을 View에게 줄 필요가 없음

- 제공하는 기능을 모두 getter, setter로 만들어야함
- View의 Model에 대한 의존성이 완전히 제거됐기 때문에 많이 쓰임
- 많은 getter, setter를 만들어야해서 View가 무거워진다는 단점이 있음
- 프레임워크가 MVP를 지원하면 이를 이용하는 경우는 많지만 소규모 앱을 만들거나 할 때 잘 쓰이진 않음

# MVVM

`MVVM(Model - View - ViewModel)`

![image](https://user-images.githubusercontent.com/33214449/111351310-66b95280-86c6-11eb-92d8-6528fee1c095.png)

MVVM의 핵심은 `Binder`와 `ViewModel`이다.

- `ViewModel`: View를 대신하는 순수한 데이터 구조체이다. 순수한 인메모리 객체라고 볼 수 있다.
- `Binder`: ViewModel을 감지하여 View에 반영한다.
  - 속성들을 Observing하여 ViewModel에 대한 변화를 인지한다.
  - 양방향 바인딩의 경우 Binder가 View에도 Observing을 한다. (양방향을 걸지 안 걸지는 상황에 어떤 게 유리한가에 따라 다르다.)

> MVVM의 핵심
>
> - ViewModel이 View를 아예 모른다.(둘 사이의 의존성은 없음)
> - ViewModel을 잘 만들면 테스트, 유지보수가 매우 간단하다.

## 실습

![image](https://user-images.githubusercontent.com/33214449/111351351-7042ba80-86c6-11eb-8b0f-305d6470eb0f.png)

Observer를 이용하여 구현하기가 힘들다. 그래서 다음과 같이 Observer 대신 `Call`을 사용하여 MVVM 시스템을 만들어볼 것이다.

위 그림에서처럼 Call을 사용하면 상태가 변했을 때 ViewModel이 Binder에게 변화를 알리게 된다.(ViewModel이 Binder를 알게 해서) 자동으로 감지하는 방식(Observer)에서 수동으로 감지를 알리는 방식(Call)을 사용하는 것이다.

Observer 구조에서는 ViewModel에서 속성이 10번 바뀌면 10번의 View 갱신이 일어나는데, Call을 적용한 구조에서는 속성 10개 바꾸고 Call을 1번만 하면된다. 이처럼 수동이 유리한 경우도 있다.

정리하자면 다음과 같다.

1. ViewModel의 순수한 데이터 갱신
2. Binder에 알림(Call)
3. Binder가 View를 갱신
4. 결론적으로 ViewModel은 View를 모르는 상태로 유지한다.

# TypeCheck

MVVM 시스템 구현에 앞서 TypeCheck를 담당하는 코드를 만들어야 한다.

❗ JavaScript 공부 시간

```js
const type = (target, type) => {
  if (typeof type == 'string') {
    if (typeof target != type) throw `invalid type ${target} : ${type}`;
  } else if (!(target instanceof type))
    throw `invalid type ${target} : ${type}`;
  return target;
};

type(12, 'number');
type('abc', 'string');
type([1, 2, 3], Array);
type(new Set(), Set);
type(document.body, HTMLElement);
```

**코드설명**

type이란 함수 정의. target이 type을 만족하지 않으면 throw 하는 함수

첫번째 if문
typeof 로 체크할 때 string으로 체크해야함
String, Number, Boolean은 instanceof로 체크할 수 없음(객체가 아니기 때문에) -> typeof로 체크해야함

if문 내부의 if문
두번째인자가 문자열로 오는 경우(두번째인자가 String, Number, Boolean 이런 게 오면) ~
typeof로 type을 조사한 값이 type과 일치하는지 확인 ~ (일치 안하면 throw던짐)

else if문
만약 두번째 인자가 문자열이 아니라면, 객체가 왔다는거고 instanceof로 검사함

return
다 됐으면 원래 줬던 target값 반환

**type 은 자바스크립트의 특징을 잘 살린 함수이다.**

> 💡 javascript는 컴파일언어가 아니기 때문에 런타임에 throw하지 않으면 오류가 계속 전파된다.(내부에 오류가 숨어있고 전파되다가 결국 실패할 수 있음. 그때서야 프로그램 죽음 -> 문제) 그래서 런타임에서 실행되는 언어는 에러가 발견되는 즉시 throw를 던져서 멈춰야 디버깅이 가능하다.

> 💡 javascript는 독특한 언어이다. 한국어처럼 쓰고 싶으면 많이 연습해야한다. 자바스크립트 언어의 특징을 모르니까 인터넷에 돌아다니는 자바스크립트 괴담이 많은 것이다. 이에 휘둘리지말고 언어를 똑바로 공부하기!

## `===`이 아닌 `==`를 사용하는 이유

`===`: 형 일치 검사 + `==`(equal) 검사 (이렇게 두번의 동작을 하기 때문에 느리다.)

- `typeof type == "string"`

  - type도 string이고 뒤에도 string이여서 강제형변환을 일으키지 않음

- `typeof target != type`

  - 강제형변환을 시키는 `===` 보다 `==`가 빠르기 때문
  - `===`는 일단 형 일치 검사를 하고 equal검사를 함.(두번의 동작이 들어있어 느림)

무조건 `===`가 안전하니까 쓰는 것은 자바스크립트를 정확히 모르는 것. 또한 좋은 언어 학습법이 아님

> 자바스크립트에서 `==`의 동작원리
>
> `==`: 비교 대상이 서로 다른 타입일 경우 타입을 강제로 변환하지만 같은 타입일 경우에는 데이터 타입을 변환하지 않는다.
> `===`: 타입까지 검사한다.

## 자바스크립트에서의 `_`(underbar)

- 자바스크립트에서 `_`(언더바) 는 의미 없음
- (타언어에서 `_`는 사용하지 않는 인자를 나타낼 때 사용하기도 함)

## type 함수의 사용

```js
// 위의 type 함수 코드에 이어서...

const test = (arr, _ = type(arr, Array)) => {
  console.log(arr);
};

test([1, 2, 3]); // 동작함
test(123); // throw 당함
```

### 자바스크립트에서 함수의 인자영역이 해석되는 방식

- 왼쪽에서 오른쪽으로 scope가 하나씩 만들어지며 처리됨
- 따라서 두번째 인자는 첫번째 인자의 값을 이미 알고 있게됨.

> - 첫번째 arr이 인식이 되면 두번째 인자 상황에선 arr을 이미 알고 있음(이렇게 차근차근 인식)
> - 만약 `_`에 인자 안 보냈다면 기본값이 발동할 것(`=type(arr, Array)`)
> - type에 첫번째 인자로 arr을 넣고 두번째로 Array를 넣음. 첫번째 인자가 Array가 아니라면 즉시 throw가 일어남.
> - 인자가 잘못 오면 즉시 죽겠지(type 함수에 있는 에러메시지 출력하면서)
> - test 함수 안에서는 arr이 배열인 게 확정이 되는 것(👍)

```js
test([1, 2, 3]); // 정상 동작함
test(123); // 오류. throw로 인해 멈춤
```

우리가 구현하고자하는 것: 강력한 Type check를 로직 내부에서 하고 싶지 않은 것

```js
// a,b,c 인자가 있을 때
// 0번째에서 string인지 검사
// 1번째에서 number인지 검사 (= 두번째 인자는 b인데 number인지 검사)
// 2번째에서 boolean인지 검사
const test2 = (
  a,
  b,
  c,
  _0 = type(a, 'string'),
  _1 = type(b, 'number'),
  _2 = type(c, 'boolean')
) => {
  console.log(a, b, c);
};

test2('abc', 123, true); // 여기서 type 틀리면 바로 죽겠지

// ❓ _0, _1, _2 의 의미?
```

이렇게 type을 check하면 (type이 잘못 들어올 경우 바로 죽일 수 있으므로)큰 실수가 퍼져나가는 것을 막을 수 있다.

➕ Facebook에서 배포하고 있는 type check 클래스도 이와 비슷한 원리로 작성되어있음

> Javascript에서 TypeCheck가 필요한 이유
>
> - 코드 오염에 대한 일부 책임을 TypeCheck에게 맡긴다.
> - 오류의 전파를 막아 안전한 프로그램을 만든다.

# Role Design

MVVM의 핵심은 ViewModel, 더 정확히는 `Binder`에 있다.

그리고 Binding에는 두 가지 방식이 있다.

- Template Scan: Vue나 Angular에서 사용한다.
  - 태그를 만들고 이를 Binder가 스캔함
  - 모델과 view를 완전히 분리해서 관리하기가 쉬움
- Template과 State의 결합: React에서 사용한다.
  - Data와 연결돼있는 View를 만들고 binder가 이 view를 직접 가지고 있는 컴포넌트 방식이다.
  - state, property 뿐만 아니라 view도 관리해야한다. 즉 Model(state, property 관리)과 View를 분리해서 관리할 수 없다.(단점)

Scan을 사용한 방식이 더 간단하기 때문에 Scan 방식을 이용할 것이다.

![image](https://user-images.githubusercontent.com/33214449/111340709-38cf1080-86bc-11eb-8096-976caaff2d78.png)

Binder와 HTMLElement는 코드가 변경되는 이유가 다르기 때문에 Binder에서 Scanner를 분리하여 관리하는 게 좋다. (SRP, 단일책임 원칙) 이를 위해 Binder가 HTML을 인식하는 부분을 밖으로 빼야 하며 이 때 Scanner가 사용된다.

Scanner의 역할은 Binder와 HTMLElement 사이의 연결을 끊는 것이다.

> ➕ 설명
>
> - Binder는 ViewModel을 알고있다.
> - Binder가 직접 HTMLElement를 스캔할까? ㄴㄴ Scanner를 따로 둔다. (why? `변화율` 때문. HTMLElement의 `data-` 속성명 같은 경우 자주 바뀔 수도 있다.)
> - Binder는 ViewModel 이용해 View를 그릴 때만 코드로직이 바뀌면 됨. Scanner는 HTML을 해석하는 방법을 바꿀 때 바뀌어야함. 서로의 이해가 다름. 원인에 따른 `변화율` 즉 바뀌는 이유를 하나로 만들고 싶은 것(SOLID 원칙의 SRP; Single Responsibility 원칙에 해당)
> - Scanner가 HTML을 스캔하고, Binder가 만들어짐. Scanner가 HTML, Binder 알게됨. Binder는 HTML을 알지 않아도 되겠지!
> - 결국 Binder와 HTMLElement 사이의 연결을 끊기 위해 Scanner를 도입하는 것임. 이렇게 됨으로써 HTMLElement의 변화 때문에 Binder가 바뀌는 일을 막을 수 있음

> 핵심
>
> - 코드의 변화율에 따라 객체를 분리하여 관리해야 한다.
> - 혹은 코드를 바꾸는 이유가 같은지의 여부에 따라 관리해야 한다.
>
> 💡변화율: 일주일에 한번 바뀌는 애랑 하루에 한번 바뀌는 애는 변화율이 다름. 둘은 나눠져야함. (코드를 바꾸는 이유가 같으냐의 문제)

![image](https://user-images.githubusercontent.com/33214449/111340648-2e147b80-86bc-11eb-9799-a7fa5659a409.png)

Scanner는 HTML을 돌며 Binder 안에 BinderItem 하나하나(hook 하나하나)를 만들어 끼워주게됨.(hook을 각각 binderItem으로 만든다.)

📖 지금부터 구현할 것(정리)

- html로부터 hook을 생성한 binderitem들을 소유한 binder가 만들어질 것이고
- viewmodel을 만들어 binder에게 viewmodel 던지며 그려달라하면 binder가 스캔했던 html 잘 그려줄것임
- viewmodel만 갱신하고 binder한테 그려달라고 하면 view가 갱신되는 것을 볼 수 있을 것

# Class 작성

구현에 필요한 Class들을 만들어보자.

# HTMLElement

`View hook & bind`

View에 어떤 ViewModel을 매칭할지 모르니 bind가 View를 그냥 인식할 순 없다. 따라서 어떤 ViewModel과 매칭할지에 대해 알려주는 hook이 필요하다.

```html
<section id="target" data-viewmodel="wrapper">
  <h2 data-viewmodel="title"></h2>
  <section data-viewmodel="contents"></section>
</section>
```

- hook을 `custom attribute`를 사용하기 위해서 이렇게 `data-**` 속성으로 만든다.
  - 커스텀 속성들은 HTML5 표준 스펙에 따라 `data-**`로 만들어야함(Angular나 이런 프레임워크에서도 예외는 없음)
- 이렇게 만들어 놓은 hook과 일치하는 속성이 ViewModel에 있을 것이고 Binder로 매칭
- Binder의 역할은 특정 View 세트를 스캔해 그 안의 hook과 ViewModel을 연결해, 바뀐 ViewModel 내용을 View에 반영하는 역할

![image](https://user-images.githubusercontent.com/33214449/111335313-9f9dfb00-86b7-11eb-8277-4d0d4a302262.png)

# ViewModel

ViewModel은 순수한 Data Object(인메모리 객체)이기 때문에 만들기 쉽다.

> 다음 코드에서 외부에서 생성하는 것을 막고, 오직 static get()을 통해서 인스턴스를 만들기 원한다면 다음과 같이 구현

```js
const ViewModel = class{
    static #private = Symbol();
    static get(data){
        // this, 즉 이 클래스에 있는 #private과 data를 ViewModel에 넘기고 있음
        return new ViewModel(this.#private, data);
    }
    styles = {}; attributes = {};, properties = {}; events = {};

    // constructor 부분
    // 외부에서는 첫번째 인자에 절대로 static #private 속성을 넘길 수 없기 때문에 무조건 throw가 일어날 것
    // 이렇게 손쉽게 외부에서의 생성을 막을 수 있음(private constructor 만든 것)
    constructor(checker, data){
        // throw 부분
        // static get() 써라. 누가 new 쓰래!
        // 여기까지는 private constructor를 만드는 연습을 한 것
        if(checker != ViewModel.#private) throw "use ViewModel.get()!";

        // entries 써서 data를 key, value 해체해서 씀
        // key에 따라 case에 들어가게
        // default 있는 라인: styles 이런 key에 해당하지 않는 건 그냥 key로 잡아줌. this의 ViewModel로 잡아주는(커스텀)
        Object.entries(data).forEach(([k, v]) => {
            switch(k){
                case "styles": this.styles = v; break;
                case "attributes": this.attributes = v; break;
                case "properties": this.properties = v; break;
                case "events": this.events = v; break;
                default: this[k] = v;
            }
        });
        Object.seal(this); // Value를 바꿀 순 있지만 Key를 추가할 순 없다. (안정성을 위해)
    }
};

// 이렇게 ViewModel은 하나의 DOM 객체를 완전히 표현 가능

```

- ViewModel 의 기본적인 속성

  - 하나의 DOM 객체를 대신하는 메모리 객체
  - DOM을 대신해 DOM의 여러가지 가지고 있을것(?)
  - 크게는 style, attribute, property, event가 있음 (기본적인 viewModel의 속성들)

- View를 직접 건드리는게 아니라 ViewModel을 조작해 View를 조작할것임.
- DOM을 직접 가져와 테스트할 필요가 없어 단위테스트가 쉬움. ViewModel이 잘 되어있다고 할 때, 문제가 있다면 Binder가 잘못됐겠지. ViewModel의 데이터만 깨끗한지 확인하면 단위테스트는 완료된 것.
- **어떠한 종류의 ViewModel이라 할지라도 Draw(혹은 Rendering) 로직은 Binder에게 위임한다. => 제어역전(IoC) 만족!** (이렇게 되면 데이터 조작하는 것만 남고 View를 다루는 코드는 신경쓰지 않아도 되겠지)

> 💡 javascript
>
> `#` 으로 만든 private 속성은 class 내부에서만 접근할 수 있음. 대괄호로 접근할 수 없음. `.#private` 이런식으로 dot 이용해야함.

# Binder

- Binder는 View를 알고있다.(그래서 ViewModel을 View에 반영할 수 있는 것)
- Binder item 하나하나는 개별 hook이 걸려있는 View를 하나하나 알고있을 것이다.
  - element, viewmodel(hook값)을 받을 것.

## BinderItem 구현

Binder를 만들기 전에, BinderItem을 만들어야 한다.

```js
const BinderItem = class {
  el;
  viewmodel;
  // 첫번째인자: html element / 두번째인자: string 와야함
  constructor(
    el,
    viewmodel,
    _0 = type(el, HTMLElement),
    _1 = type(viewmodel, 'string')
  ) {
    this.el = el;
    this.viewmodel = viewmodel;
    Object.freeze(this); // 아예 불변 객체로 만듦. 바꿀 수 없다는 뜻(freeze시킴) 한번 바인딩 되면 값이 안 변했으면 좋겠고 키도 추가되면 안된다고 걸어놓는 것
  }
};
```

Binder가 어떤 ViewModel과 결합해 그려질지 모르기 때문에 key만 가지고 있음(?)

> 💡 javascript 에선 객체의 안전성 확보 위해 일반적으로 생성자에서 seal이나 freeze 많이 검.
>
> 💡 javascript는 스펙이 자꾸 추가됨. 가장 어려운 언어. 다른 언어에서 좋아보이는 것들을 다 가져와 추가함. 스펙문서, 크롬 개발자 사이트 업데이트 되는 거 보며 공부하는 수밖에 없음.

## Binder 구현

이제 Binder를 만들 차례이다.

```js
const Binder = class {
  #items = new Set();

  // Set에 외부에서 Scanner가 데이터를 주입해줘야함 -> add() 메서드
  // v를 받을건데 v는 BinderItem이어야하고 이걸 items에 add
  add(v, _ = type(v, BinderItem)) {
    this.#item.add(v);
  }

  // viewmodel을 이용해 items를 그려주는 친구
  render(viewmodel, _ = type(viewmodel, ViewModel)) {
    this.#items.forEach((item) => {
      // BinderItem들이 들어있는 #items를 가지고 있음
      // 하나의 아이템(BinderItem)씩 꺼냄
      // BinderItem에는 viewmodel이란 키가 있음
      // render에 주어진 viewmodel 안에 item.viewmodel 이라는 서브키 이용해서 찾은 객체도 ViewModel이길 바라는 것.(맞으면 type()은 target을 리턴할것) // (type의 인자 2개 설명) 주어진 viewmodel에 hook과 연결된 내부속성이 없으면 죽어버릴거고 이 내부 속성이 있어도 그게 ViewModel이 아니면 죽을것. el은 여기서 검증할 필요 없음(el이 제대로 안됐으면 BinderItem에서 걸러져서 아이템이 만들어지지 않았을 것이기 때문)
      // el이 널인지 아닌지 검사안해도됨. type 첫 인자가 숫자인지 아닌지 검사안해도됨. 앞에서 type check 과정 모두 거쳤기 때문
      // #items은 private이라 add로만 추가될 수 있는데, 여기에 들어가는 v는 BinderItem인걸 add에서 보장했음. 그리고 BinderItem이려면 el은 htmlelement를 보장해야되고, viewmodel은 string인걸 보장해야됨.
      const vm = type(viewmodel[item.viewmodel], ViewModel),
        el = item.el;
      // 이제 진짜 element를 그려야함
      // viewmodel엔 styles 가 있었음. 엔트리 돌면서 el의 style에 key, value를 넣어주면 됨
      Object.entries(vm.styles).forEach(([k, v]) => (el.style[k] = v));
      Object.entries(vm.attributes).forEach(([k, v]) => el.setAttribute(k, v));
      Object.entries(vm.properties).forEach(([k, v]) => (el[k] = v));
      // event는 on을 붙여서 넣어줄것임
      // event listener에 이벤트객체(e)가 들어오는데
      // 강제로 call을 호출해 el을 바인딩함. => 이 리스너는 언제나 this를 호출하면 이 el이 나오게 강제한 것임. => this는 항상 확정되서 들어올 것. 반드시 그 element. 그래서 this 확정되있으니 currentTarget 이나 target으로 검사 안 해도 됨
      // e(이벤트객체), viewmodel 이렇게 인자 2개 받게 만듦
      Object.entries(vm.events).forEach(
        ([k, v]) => (el['on' + k] = (e) => v.call(el, e, viewmodel))
      );
    });
  }
};

// Binder는 해당 ViewModel의 4가지 속성을 이용해 실제 element를 그려주는 (제어 역전이 되어있는) 그림 그리는 방법을 일반화 시켜서 작성한 코드임
// View를 직접 다루는 코드는 안 나옴. 위처럼 작성한 Binder 덕분에!
```

`#items`에서 배열이 아닌 Set을 쓴 이유는?

- 객체지향은 identifier context를 지향. 즉 식별을 통해서 너와 나를 구분
- 배열에는 똑같은 객체 두번 넣을 수 있음. 객체 컨테이너를 만들 땐 무조건 Set이어야함. 배열을 쓰는 순간 값 컨텍스트를 쓰는 컨테이너를 쓰고 있는 격. 객체 컨테이너는 Set을 쓰는 것.

# Scanner

DOM 순회 한방에 됨.

Scanner: 특정 HTML 건네주면 스캔해서 hook 찾아 BinderItem을 만들어 Binder에 껴주는게 Scanner가 하는 일 => 그래서 Scanner의 결과는 Binder가 됨(리턴)

```js
const Scanner = class {
  scan(el, _ = type(el, HTMLElement)) {
    const binder = new Binder();

    // 인자로 준 el 도 check 해야함
    this.checkItem(binder, el);

    // 가장 빠른 DOM Loop임 *
    const stack = [el.firstElementChild];
    let target;
    while ((target = stack.pop())) {
      this.checkItem(binder, target);
      if (target.firstElementChild) stack.push(target.firstElementChild);
      if (target.nextElementSibling) stack.push(target.nextElementSibling);
    }
    return binder; // scan의 결과로 Binder를 리턴해야함
  }

  checkItem(binder, el) {
    const vm = el.getAttribute('data-viewmodel'); // hook이 있으면
    if (vm) binder.add(new BinderItem(el, vm)); // binder에 새로운 binderItem(element와 viewmodel hook값을 넣은)을 넣어주기
  }
};

// 다 검사해서 만약 data-viewmodel 속성 있으면 checkItem에서 처리. 이 checkItem 로직은 Binder와 무관하고 Scanner의 로직임. "data-viewmodel" 부분을 바꾸면 html 스펙을 바꿔줄 수 있음.(html 스펙을 바꾸면 여기만 고치면 된다는 것)
```

## 재귀함수와 스택루프

재귀적으로 돌기 싫으면 스택머신을 사용하게 되는데, 재귀함수를 스택 루프로 바꿀 수 있는 훈련을 해야함

재귀: 함수가 함수를 부르는 행위. 함수를 부를 때마다 함수 콜 한번에 해당하는 스택이 생김.(임시메모리) 이 임시메모리가 자꾸 쌓이면 스택오버플로우가 일어날 수 있음. => 해결) 재귀적 문제를 배열로 별도의 스택을 만들어 이걸 파일로 돌면서 처리하면됨.

동적으로 스택을 빼가면서 처리(관련 - 동적계획법. 동적프로그래밍)

`*` 부분 코드 설명

// element의 첫번째 자식을 넣음 (첫번째 스택)

// 스택에서 하나 뺌(이게 타겟이 됨)
// 그 첫번째 자식에 첫번째 자식이 있는지 확인 -> 자식이 있으면 스택에 넣음

// 그 첫번째 자식의 형제가 있는지 확인. -> 있으면 스택에 넣음

// 그 다음 스택에서 또 꺼내겠지(pop)

// 이 과정이 이어지며 쫙 펴져서 요소가 다 들어옴. 스택머신을 이용해 손쉽게 HTML 전체를 순회 가능. 어떤 html element를 보내면 그 안의 자식을 이 로직을 이용해 싹 순회할 것임. (???균형트리 만들 때 루프랑 비슷한 로직)

💡 똑같은 문제도 여러번 풀어보는 것이 중요.

💡 어려운 과제를 여러번 반복해서 풀어서 익숙해져 아무때나 풀 수 있게끔 해야 실력이 늘음. 그냥 푸는데 성공하는 것만으로는 실력이 늘지 않음.

💡 컴퓨터 사이언스도 깊은 학문. 많이 수련할 것. 어려운 문제 쉬운 문제 할 것없이 내 것이 될 때까지 숙련하는 것이 중요.

# Client

3개의 hook이 Viewmodel로 이루어져있음.

순수한 모델임.

viewmodel은 view를 모름. 코드가 익숙해보이겠지만 view와 전혀 관련이 없음. viewmodel은 순수한 인메모리 객체임.

react native의 원리 - viewmodel만 만들고 어떤 view에 매핑할지는 binder가 결정.

```html
<section id="target" data-viewmodel="wrapper">
  <h2 data-viewmodel="title"></h2>
  <section data-viewmodel="contents"></section>
</section>
```

```js
// ViewModel은 get()으로 만들어야함(아까 내용 참고)
const viewmodel = ViewModel.get({
  wrapper: ViewModel.get({
    styles: {
      width: '50%',
      background: '#ffa',
      cursor: 'pointer',
    },
  }),
  title: ViewModel.get({
    properties: {
      innerHTML: 'Title',
    },
  }),
  contents: ViewModel.get({
    properties: {
      innerHTML: 'Contents',
    },
  }),
});

const scanner = new Scanner();
// scanner에 target을 넣어서 scan을 호출하면 binder가 리턴될 것 -> binder에는 data-viewmodel을 포함한 요소 3개가 담겨있을 것임
const binder = scanner.scan(document.querySelector('#target'));

// binder에 viewmodel을 주고 그림을 그리게 시키면 화면처럼 결과가 나타날 것
binder.render(viewmodel);
```

viewmodel binder scanner 사이에 view에 대한 그림을 그리는 로직이 없는데 그림이 그려짐. 제어가 binder의 render에 모두 있기 때문임.

## viewmodel 개선

changeContents() 메서드 생성

여기서 this가 viewmodel이겠지!

```js

// viewmodel을 바꿈(순수한 데이터를 바꿈) 그림을 그리기 위해서 view를 바꾸지 않아도됨
const viewmodel = ViewModel.get({
  isStop:false, // ViewModel 코드에서 default구문 생각(그냥 커스텀 키로 들어감)
  changeContents(){
    // 100~250 랜덤 나오는 rgb값 생성. 색상 랜덤으로 바뀌라고(100을 주는 이유는 색상 너무 어둡지 않게하려고)
    this.wrapper.styles.background = `rgb(${parseInt(Math.random()*150) + 100}, ${...}, ${...})`;
    // A~0, replace로 . 없애고
    this.contents.properties.innerHTML = Math.random().toString(16).replace(".", "");

  },
  wrapper: ViewModel.get({
    styles:{
      width: "50%",
      background: "#ffa",
      cursor: "pointer"
    },
    events:{
      click(e, vm){
        vm.isStop = true; //vm니까 isStop 속성이 있을것(false->true로 바뀔 것) // ❓vm은 어떻게 전달되나
      }
    }
  }),
});

const f = _ => {
  viewmodel.changeContents();
  // 속성 바꾸고 observe 하지않고 (이렇게 2개의 속성을 바꾸는 경우 observe를 쓰면 2개의 render를 해야한다) 수동으로 binder를 알게 해서 call했음(rendering을 한번만 함)
  binder.render(viewmodel);
  if(!viewmodel.isStop) requestAnimationFrame(f); // isStop이 true일 때 멈출 것임
};
requestAnimationFrame(f);
```

이렇게 Binder를 통해서 그림그리는 것을
Model Render라고 부름. (모델을 바꿔서 렌더링하기 때문에)

view를 갱신하는 코드는 쓰지 않아도됨. 순수한 인메모리 객체인 model을 갱신해서 render를 하면 얘가 알아서 다 그려줌

모델 렌더의 속도 빠름
브라우저는 작업의(?) 97% 이상을 렌더링에 쓴다(그림그리는데). 배열, 데이터 구조, 알고리즘 최적화하는데는 3% 정도밖에 안씀. binder.render()가 열심히 데이터를 돌아 일을 해봤자 이건 부하에 영향을 거의 미치지 않음.(순수한 데이터를 루프돌게 작성했음.)

인메모리 객체 데이터를 루프하는데 시간이 많이 들지 않음. 렌더링에(그리는데)시간 많이 걸림. 이것이 MVVM을 쓰는 이유. View를 조작하는 코드의 오류를 줄일 수 있음. Binder 로직만 잘 쓰면됨. 제어가 Binder에 몰려있음. 제어가 안정화됨.

💡 MVVM을 구축하는 과정보다 MVVM이라는 프레임워크 자체의 객체 구조를 이해하는 것이 객체관리에 도움이 됨.

- model이 바뀔 때마다 view가 영향을 받는 의존성의 문제
- view마다 view를 그리는 로직들을 mvc에서 하나하나 다 만들어줘야하는 문제들

제어역전, view를 직접적으로 알지 못하게 하는 모델을 만들어서 해결

생명주기(수정주기or변화율)이 다른 객체들간의 의존성이 문제임. (갱신하는 주기, 이유, 변화율이 다른데 의존성이 있으면 문제가 됨) 이를 분리하는 것이 핵심.

# Comment

# References

- [개발자 황준일 - MVVM 만들기](https://junilhwang.github.io/TIL/CodeSpitz/Object-Oriented-Javascript/02-MVVM/)

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step31.md)
- @eyabc
  - [Design Patterns](https://eyabc.github.io/docs/javascript/OOP_design_patterns)
  - [TypeCheck](https://eyabc.github.io/docs/javascript/OOP_type_check)
  - [MVVM Role Design](https://eyabc.github.io/docs/javascript/OOP_mvvm_role_design)
- @khw970421
  - [part1](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-86-%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-2%ED%9A%8C%EC%B0%A8-part1-step-31)
  - [part2](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-86-%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-2%ED%9A%8C%EC%B0%A8-part2-step-31)
- [@JeongShin]()
