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

> 출처: 코드스피츠 강의

# MVC

유형1

![image](https://user-images.githubusercontent.com/33214449/111351175-3ec9ef00-86c6-11eb-9489-6ed6fd41505a.png)

✔️화살표: 누가 누굴 알고있느냐(의존성 관계)

- Controller가 Model을 적절히 가공해 View가 알아볼 수 있는 data로 View에게 전달
- View: 사용자의 인터랙션을 받아들이는 곳. 이에 따라 Model을 갱신.(View는 어떤 Model을 갱신하는지 Model에 대한 의존성을 알고 있음)

- View가 Model을 알고있는 것은 문제가 된다(둘의 의존성이 문제)

  - Model은 변경될 수 있다.(사업모델이 바뀌어서, 영업처가 늘어나서, 팀이 늘어나서) View도 모양이 안 이뻐서, 클릭환경을 바꾸려고 등등의 이유로 변경된다. 변화 요인이 굉장히 다른데 서로 의존성이 있는 것은 문제
  - 추가적으로 Model의 변화 -> Controller가 주는 data에도 영향 => 문제

- MVC는 백엔드에서 많이 씀
  - Spring Framework에서도 MVC 씀
  - 서버에서는 Model을 Controller가 가공하고 View를 만들고 던지면 끝남. View와 Model간의 관계가 없음
  - 그러나 클라이언트에서는 View->Model 로 가는 흐름 때문에 의존성 큼 -> 클라이언트에서 MVC 잘 안씀

유형2

![image](https://user-images.githubusercontent.com/33214449/111351216-4ab5b100-86c6-11eb-9d68-5e528a8b9ad1.png)

- 문제

  - Controller에 대한 의존성 너무 큼.
  - View의 변화나 Model의 변화를 Controller에 반영해야함
  - 주구장창 컨트롤러만 고치고 있게될 수도 있음(유지보수 어려움)

- MVC 요즘 잘 안씀

# MVP

![image](https://user-images.githubusercontent.com/33214449/111351271-599c6380-86c6-11eb-8f35-87c65bd36a65.png)

Model View Presenter

View가 순수한 getter, setter를 가지고 있고 로직이 없음. View가 Model을 알 필요가 없음(의존성X) Presenter는 Model 가져와서 이를 잘 해석해 View에 있는 getter, setter로 조작. Model을 View에게 줄 필요가 없음

- 제공하는 기능을 모두 getter, setter로 만들어야함
- View의 Model에 대한 의존성이 완전히 제거됐기 때문에 많이 쓰임
- View가 무거워진다는 단점 있음
- 프레임워크가 MVP를 지원하면 이를 이용하는 경우는 많지만 소규모 앱을 만들거나 할 때 잘 쓰이진 않음

# MVVM

![image](https://user-images.githubusercontent.com/33214449/111351310-66b95280-86c6-11eb-92d8-6528fee1c095.png)

Model View ViewModel

- MVVM은 Binder가 필수
- ViewModel 이해하는 것 중요
  - 그림을 그리는 View가 아니라 순수한 데이터로서 View임
  - View를 대신하는 객체
- View와 Binder가 자동으로 ViewModel의 변화를 감지해서 View를 갱신해주길 바라거나, View에 변화가 생기면 Binder를 타고서 ViewModel이 갱신되길 바람 (그래서 Binder가 필요한 것)
- ViewModel이 View를 아예 모름(둘 사이의 의존성은 없음) -> 핵심
- 양방향인 경우 Binder->View 흐름에 Observe 검 ()
- ViewModel에 대한 변화를 인지하는 방법 -> 속성들을 observation / View에 있는 속성도 observation 걸면 ViewModel로 반영됨
- 양방향을 걸지 안걸지는 그때그때 어떤 게 더 유리한가에 따라 다름.

## 실습

![image](https://user-images.githubusercontent.com/33214449/111351351-7042ba80-86c6-11eb-8b0f-305d6470eb0f.png)

observation 구현이 좀 어려움

그래서 ViewModel이 Binder를 알게 해서, 상태가 변했을 때 Binder에게 상태 바꼈다고 call 하게끔 구현할 것임

아까 observe 구조에서는 ViewModel에서 속성이 10번 바뀌면 10번의 View 갱신이 일어남
근데 call 구조에서는 속성 10개 바꾸고 call을 1번만 하면됨. 이렇게 수동이 유리한 경우도 있음.

# TypeCheck

❗ 잠깐 JavaScript 공부 시간

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

- 코드설명

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

💡 javascript는 컴파일언어가 아니기 때문에 런타임에 throw하지 않으면 오류가 계속 전파됨.(내부에 오류가 숨어있고 전파되다가 결국 실패할 수 있음. 그때서야 프로그램 죽음 문제문제)
그래서 런타임밖에 없는 언어는 에러가 발견되는 즉시 throw 던져서 멈춰야 디버깅이 가능한 것.

💡 javascript는 독특한 언어. 한국어처럼 쓰고 싶으면 많이 연습해야함. 자바스크립트 언어의 특징을 모르니까 인터넷에 돌아다니는 자바스크립트 괴담이 많은 것. 이에 휘둘리지말고 언어를 똑바로 공부하기!

- 왜 위 코드에서 ===를 쓰지 않았을까?

`typeof type == "string"`
에서 type도 string이고 뒤에도 string이여서 강제형변환을 일으키지 않기 때문

`typeof target != type`
강제형변환을 시키는 === 보다 ==가 빠르기 때문
===는 일단 형 일치 검사를 하고 equal검사를 함.(두번의 동작이 들어있음)

무조건 안전한 ===만 쓰는 건 좋은 언어 학습법이 아님

---

자바스크립트에서 `_`(언더바) 는 의미 없음
(타언어에서 `_`는 사용하지 않는 인자를 나타낼 때 사용하기도 함)

```js
// 위의 type 함수 코드에 이어서...

const test = (arr, _ = type(arr, Array)) => {
  console.log(arr);
};

test([1, 2, 3]); // 동작함
test(123); // throw 당함
```

- 자바스크립트에서 함수의 인자영역이 어떻게 해석되는지 알아야함

왼쪽에서 오른쪽으로 scope가 하나씩 만들어지며 처리됨
첫번째 arr이 인식이 되면 두번째 인자 상황에선 arr을 이미 알고 있음(이렇게 차근차근 인식)
만약 `_`에 인자 안 보냈다면 기본값이 발동할 것(`=type(arr, Array)`)
type에 첫번째 인자로 arr을 넣고 두번째로 Array를 넣음. 첫번째 인자가 Array가 아니라면 즉시 throw가 일어남.
인자가 잘못 오면 즉시 죽겠지(type 함수에 있는 에러메시지 출력하면서)
test 함수 안에서는 arr이 배열인 게 확정이 되는 것(👍)

test([1,2,3]); // 동작함
test(123); // throw 당함

우리가 구현하고자하는 것 -> 강력한 Type check를 로직 내부에서 하고 싶지 않은 것

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

// ❗ _0, _1, _2 의 의미?
```

Facebook에서 배포하고 있는 type check 클래스도 이와 비슷한 원리로 작성되어있음

형이 잘못 들어오면 바로 죽일 수 있음(큰 실수가 퍼져나가는 것을 줄일 수 있다.)

# View hook & bind

- View에 어떤 ViewModel을 매칭할지 모르니 bind가 View를 그냥 인식할 순 없음
- 따라서 어떤 ViewModel과 매칭할지에 대한 hook이 필요함

```html
<section id="target" data-viewmodel="wrapper">
  <h2 data-viewmodel="title"></h2>
  <section data-viewmodel="contents"></section>
</section>
```

- hook을 이렇게 `data-` 속성으로 만들기
  - 커스텀 속성들은 HTML5 표준 스펙에 따라 `data-`로 만들어야함(Angular나 이런 프레임워크에서도 예외는 없음)
- 이렇게 만들어 놓은 hook과 일치하는 속성이 ViewModel에 있을 것이고 Binder로 매칭해줄거임.
- Binder의 역할은 특정 View 세트를 스캔해 그 안의 hook과 ViewModel을 연결해, 바뀐 ViewModel 내용을 View에 반영하는 역할

![image](https://user-images.githubusercontent.com/33214449/111335313-9f9dfb00-86b7-11eb-8277-4d0d4a302262.png)

# Role Design

- vue.js , angular

  - 태그를 만들고 이를 스캔하게 만듦(스캔해주는 이게 바인더)
  - 모델과 view를 완전히 분리해서 관리하기가 쉬움

- react
  - 처음부터 데이터와 연결돼있는 view를 만들어 view를 꽂게 하는 컴포넌트 방식
  - 있는 뷰를 스캔하는게 아니라 자기 view를 만드는데 model과 연결해서 만듦
  - 자기 view를 자기가 직접 소유
  - 단점. 데이터가 잔뜩 들어있어 state, property 관리하는데 이 안에 view도 있는. 두 개를 같이 관리해야함. 즉 Model(state나 property를 관리하는 애)과 View를 분리해서 관리할 수 없고 합쳐서 관리해야함

MVVM의 핵심은 Binder에 있다.

![image](https://user-images.githubusercontent.com/33214449/111340709-38cf1080-86bc-11eb-8096-976caaff2d78.png)

- Binder는 ViewModel을 알고있다.
- Binder가 직접 HTMLElement를 스캔할까? ㄴㄴ Scanner를 따로둠. (why? 변화율 때문. HTMLElement의 `data-` 속성명 같은 경우 자주 바뀔 수도 있다.) 💡변화율: 일주일에 한번 바뀌는 애랑 하루에 한번 바뀌는 애는 변화율이 다름. 둘은 나눠져야함. (코드를 바꾸는 이유가 같으냐)
- Binder는 ViewModel 이용해 View를 그릴 때 코드가 바꾸면 됨. Scanner는 HTML을 해석하는 방법을 바꿀 때 바뀌어야함. 서로의 이해가 다름. 원인에 따른 **변화율** -> 바뀌는 이유를 하나로 만들고 싶은 것(SOLID 원칙의 Single Responsibility에 해당)
- Scanner가 HTML을 스캔하고, Binder가 만들어짐. Scanner가 HTML, Binder 알게됨. Binder는 HTML을 알지 않아도 되겠지!
- 결국 Binder와 HTMLElement 사이의 연결을 끊기 위해 Scanner 도입. 이렇게 됨으로써 HTMLElement에 변화 때문에 Binder가 바뀔 일을 막을 수 있음

![image](https://user-images.githubusercontent.com/33214449/111340648-2e147b80-86bc-11eb-9799-a7fa5659a409.png)

- Scanner는 HTML을 돌며 Binder 안에 BinderItem 하나하나(hook 하나하나)를 만들어 끼워주게됨.

📖 지금부터 구현할 것(정리)

html로부터 hook을 생성한 binderitem들을 소유한 binder가 만들어질 것이고 /
viewmodel을 만들어 binder에게 viewmodel 던지며 그려달라하면 binder가 스캔했던 html 잘 그려줄것임 /
viewmodel만 갱신하고 binder한테 그려달라고 하면 view가 갱신되는 것을 볼 수 있을 것

# ViewModel

- 순수하게 만든 데이터 객체

💡 javascript

`#` 으로 만든 private 속성은 class 내부에서만 접근할 수 있음. 대괄호로 접근할 수 없음. `.#private` 이런식으로 dot 이용해야함.

다음 코드에서 외부에서 생성하는 것을 막고, 오직 static get()을 통해서 인스턴스를 만들기 원한다면 다음과 같이 구현

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

        // data entries 써서 key, value 해체해서 씀
        // key에 따라 case에 들어가게
        // default 있는 라인: key에 해당하지 않는 건 this의 ViewModel로 잡아주는(커스텀)
        Object.entries(data).forEach(([k, v]) => {
            switch(k){
                case"styles": this.styles = v; break;
                case"attributes": this.attributes = v; break;
                case"properties": this.properties = v; break;
                case"events": this.events = v; break;
                default: this[k] = v;
            }
        });
        Object.seal(this); // 값을 변화시킬 수는 있지만 더이상 키는 추가하지 못하게 하려면(안정성을 위해) this에 seal을 걸면됨
    }
};

// 이렇게 ViewModel은 하나의 dom 객체를 완전히 표현 가능

```

ViewModel 의 기본적인 속성

    - 하나의 dom 객체를 대신하는 메모리 객체
    - dom을 대신해 dom의 여러가지 가지고 있을것(?)
    - 크게는 style, attribute, property, event가 있음 (기본적인 viewModel의 속성들)

- ViewModel을 조작해 View를 조작할것임. View를 직접 건드리는게 아니라
- dom을 직접 가져와 테스트할 필요가 없어 단위테스트가 쉬움. ViewModel이 잘 되어있다고 할 때, 문제가 있다면 Binder가 잘못됐겠지. ViewModel의 데이터만 깨끗한지 확인하면 단위테스트는 완료된 것.
- 어떠한 종류의 ViewModel이라 할지라도 그리는 복잡한 로직은 Binder에게 몰아넣은 것. => 제어역전(IoC) 만족! (이렇게 되면 데이터 조작하는 것만 남고 View를 다루는 코드는 신경쓰지 않아도 되겠지)

# Binder

- Binder는 View를 알고있음(그래서 ViewModel을 View에 반영할 수 있는 것)
- Binder item 하나하나는 개별 hook이 걸려있는 View를 하나하나 알고있을 것임
  - element, viewmodel(hook값)을 받을 것.

## BinderItem 구현

```js
const BinderItem = class {
  el;
  viewmodel;
  // 첫번째인자-html element, 두번째인자-string 와야함
  constructor(
    el,
    viewmodel,
    _0 = type(el, HTMLElement),
    _1 = type(viewmodel, 'string')
  ) {
    this.el = el;
    this.viewmodel = viewmodel;
    Object.freeze(this); // 바꿀 수 없다는 뜻(freeze시킴) 한번 바인딩 되면 값이 안 변했으면 좋겠고 키도 추가되면 안된다고 걸어놓는 것
  }
};
```

💡 javascript 에선 객체의 안전성 확보 위해 일반적으로 생성자에서 seal이나 freeze 많이 검.

💡 javascript는 스펙이 자꾸 추가됨. 가장 어려운 언어. 다른 언어에서 좋아보이는 것들을 다 가져와 추가됨. 스펙문서, 크롬 개발자 사이트 업데이트 되는 거 보고 이런식으로 공부하는 수밖에 없음.

Binder가 어떤 ViewModel과 결합해 그려질지 모르기 때문에 key만 가지고 있음(?)

## Binder 구현

```js
const Binder = class {
  #items = new Set();

  // Set에 외부에서 Scanner가 주입해줘야함 -> add() 메서드
  // v를 받을건데 v는 BinderItem이어야하고 이걸 items에 add
  add(v, _ = type(v, BinderItem)) {
    this.#item.add(v);
  }

  // viewmodel을 이용해 items를 그려주는 친구
  render(viewmodel, _ = type(viewmodel, ViewModel)) {
    this.#items.forEach((item) => {
      // 하나의 아이템(BinderItem)씩 꺼냄
      // viewmodel 안에 item.viewmodel 이라는 서브키 이용해서 찾은 객체도 ViewModel이길 바라는 것.(맞으면 type()은 target을 리턴할것) // 주어직 viewmodel에 hook과 연결된 내부속성이 없으면 죽어버릴거고 이 내부 속성이 있어도 그게 ViewModel이 아니면 죽을것. el은 여기서 검증할 필요 없음(el이 제대로 안됐으면 BinderItem부터 아이템이 만들어지지 않았을 것이기 때문)
      // el이 널인지 아닌지 검사안해도됨. type 첫 인자가 숫자인지 아닌지 검사안해도됨. 앞에서 type check 과정 모두 거쳤기 때문
      const vm = type(viewmodel[item.viewmodel], ViewModel),
        el = item.el;
      // ❗TODO 1:03:00~
    });
  }
};
```

#items에서 배열이 아닌 Set을 쓴 이유는?

- 객체지향은 identifier context를 지향. 즉 식별을 통해서 너와 나를 구분
- 배열에는 똑같은 객체 두번 넣을 수 있음. 객체 컨테이너를 만들 땐 무조건 Set이어야함. 배열을 쓰는 순간 나는 값 컨텐스트를 쓰는 컨테이너를 쓰고 있는 격. 객체 컨테이너는 Set을 쓰는 것.

# Comment

어렵다...

# References

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step31.md)
- [@eyabc]()
- [@khw970421]()
- [@JeongShin]()
