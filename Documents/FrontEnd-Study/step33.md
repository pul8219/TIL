[문서 목록으로 돌아가기](README.md)

> # STEP 33
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 32 [코드스피츠 객체지향 자바스크립트 - 4회차](https://www.youtube.com/watch?v=r4vOF7WpxgM)
> - 기한: ~ 04/02(금)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

> **역할과 책임**
>
> - 책임을 진다는 건 책임에 대한 권한도 갖고 있다는 것이다.
> - 권한이 있다는 건 권한에 대한 책임도 갖고 있다는 것이다.
> - 책임이 없는데 권한이 없거나, 권한이 없는데 책임이 있으면 문제가 생긴다.

역할과 책임에 따라 코드를 적절히 분리할 줄 알아야 한다.

# ISP(인터페이스 분리 원칙)

인터페이스 분리 원칙. 객체지향에서 코드를 분해하는 가장 기본적인 방법들을 정의한 원칙이다. ISP를 ViewModel에 적용해보자.

- 기존의 ViewModel 코드

```js
const ViewModel = class extends ViewModelListener{

  static #subjects = new Set;
  static #inited = false;
  static notify(vm){
    this.#subjects.add(vm);
    if(this.#inited) return;
    this.#inited = true;
    const f =_=>{
      this.#subjects.forEach(vm => {
        if(vm.#isUpdated.size){
          vm.notify();
          vm.#isUpdated.clear();
        }
      });
      requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }


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
          v.parent = this;
          v.subKey = k;
          v.addListener(this);
        }
      } // else end
    }); // forEach end

    ViewModel.notify(this);
    Object.seal(this);
  } // constructor end

// ✏️
viewmodelUpdated(updated){
  updated.forEach(v => this.#isUpdated.add(v));
}

} // ViewModel end
```

지금까지 구현한 ViewModel은 굉장히 거대하다. 이 heavy한 코드가 ViewModel을 구성하는 데 정말 필수적인지 고민해볼 필요가 있다.

![](https://images.velog.io/images/pul8219/post/8f171534-44a7-4c48-ac87-89b5285a5dc5/image.png)

ViewModel의 원래 역할은 물리적인 View(DOM, Android, IOS, ...)를 대신해 인메모리안에 순수한 메모리 객체로서의 View(가상의 View)를 만드는 것이다. 이러한 ViewModel에 `addListener`, `removeListener`, `notify`와 같은 메소드가 필요할까 의문을 가져보자. => 관련이 없음을 알 수 있다. 이 코드들은 Observer 패턴에서의 Subject 역할에 해당한다. 분리해야한다.

행동(behavior)이 있으면 state가 있기 마련이다. 그래서 메소드가 의존하고 있는 상태(`#isUpdated`, `#listeners`)도 같이 분리를 해줘야한다.(메소드와 필드가 따로 움직일 수 없다.)

사실 애초에 코드를 짤 때부터 역할에 맞는 상태만 참조하도록 메소드를(코드를) 잘 만들어야한다. `addListener`, `removeListener`, `notify`와 같은 메소드를 보면 앞에 언급한 두 필드만을 이용하고 있음을 볼 수 있다.(의도했던 것)

> 객체지향을 클래스로 작성하는 경우
>
> behavior에 해당하는 게 메소드가 되고 state에 해당하는 게 필드가 되는데 다른언어에선 꼭 그렇지만은 않을 수도 있다.

![](https://images.velog.io/images/pul8219/post/e2e6efbd-23a3-4bd7-8ddb-8b36ba7916d9/image.png)

위 코드도 ViewModel과 관련이 없고 Observer 패턴의 Subject와 관련이 있는 코드이다. 마찬가지로 ISP 원칙에 따라 분리해줄 필요가 있다.

![](https://images.velog.io/images/pul8219/post/acfc1a91-cc38-4e36-8f75-98f76099ac83/image.png)

메소드들이 각기 다른 이유로 호출되고 있음을 알자.

`addListener`, `removeListener` 등은 Binder가 얘들을 Observer 패턴의 Subject로 인식할 때 사용하는 것이다. 나머지 메소드나 속성들은 View때문에 사용하는 것일 것이다. 오른쪽의 도식처럼 2가지 방법으로 분리할 수 있는데 두 방법 말고 아래 모델에 가까운 상속모델을 사용해서 분리할 것이다.

- Subject를 상속받는 ViewModel을 만들고 방금 언급했던 메소드들을 넣으면 됨

---

ViewModelSubject는 ViewModelListener여야 한다. ViewModel은 ViewModelListener로 만들었었는데 얘가 ViewModelSubject와 ViewModelListener를 동시에 상속받을 순 없다. (자바스크립트는 다중상속이 불가능) 그래서 어쩔 수 없이! ViewModelListener를 상속받은 ViewModelSubject를 만들고 ViewModel이 ViewModelSubject를 상속받게 해야, ViewModelSubject를 상속받은 ViewModel이 리스너이자 Subject가 될 수 있다. 나머지 코드들은 단순히 옮기면 된다. (isUpdated가 Subject에 걸맞게 info로 바뀌었음)

![](https://images.velog.io/images/pul8219/post/dd7873f1-6508-423d-bd2e-a566b4224839/image.png)

(왼) 변경 후 코드 / (오) 변경 전 코드

- add와 clear가 추가됐다.
  - 자식쪽에선 부모의(ViewModelSubject) private 속성을 직접 접근할 수 없다. 따라서 부모가 서비스로 빼주어야 하기 때문에 add, clear를 추가했다.
- `addListener`: Listener가 들어오는 순간 subject에 watch를 보낼거다. ViewModel을 만들었지만 바로 감시할 필요가 없고 리스너가 하나라도 생겼을 때 감시하면 된다는 것
- `removeListener`: 나를 구독하는 리스너가 하나도 없게 되면 다시 나를 unwatch하게 해야함(더이상 감시하지 않게)

static 부분도 옮겨줘야함

![](https://images.velog.io/images/pul8219/post/95eda9d3-74f7-486a-8040-08e7ebc01aa5/image.png)

![](https://images.velog.io/images/pul8219/post/8f5f89ea-3ae3-4f9c-8e3f-92e58ad16a94/image.png)

(왼) 변경 전 코드 / (오) 변경 후 코드

- `notify`의 `f` 함수 내부
  - #inited 값이 true일 때만 돌고, false일 땐 멈추게 된다.
- `watch` 내부
  - 현재 inited가 false라면 notify가 시작되지 않은것임. true로 만들고 notify때림.
- 리스너가 하나도 없는 ViewModel을 백만 개 만들어도 requestAnimation은 돌지 않는다. 그 ViewModel에 리스너를 등록해야지만 그 ViewModel을 감시하기 시작하고, 만약 리스너들을 다 빼내서(unwatch) 리스너들이 아무도 없어지면 requestAnimation도 멈추게 된다.

이제 ViewModel에는 defineProperty 계열의 내용만 남고 나머진 다 없어질 것이다.

notify의 메커니즘은 감추고 watch와 unwatch를 통해 interface로 제공하게 만들었다. 또한 notify는 하나의 역할만 수행하도록 하여 책임을 분산시킨다.

> 자바스크립트는 싱글스레드 기반. 그래서 이렇게 플래그 변수로 제어하기 쉬움. (#inited) 플래그 기반의 효율적인 알고리즘 짜는 것 연습해야함.

> 자바스크립트에는 static 메소드가 없다.

# 섬세한 권한 조정

이전보다 가벼워진 ViewModel에서 권한 조정을 해보자.

> 권한 조정이 필요한 이유
>
> Javascript의 기본 권한은 public이다. 따라서 개발자들이 하나하나 권한을 제한하지 않으면 public이 되서 엉망진창이 될 수 있다. getter, setter 등이 public으로 되어있으면 코드 조작이 쉬워지고 문제가 생긴다.

새로워진 ViewModel 코드

![](https://images.velog.io/images/pul8219/post/a891d337-9e1a-4631-8a5c-a9657350dced/image.png)

> - #subKey는 getter, setter의 진짜값을 보관하고 있는 배경 필드(background field). getter가 외부의 subKey를 얻으려고 하면 배경 필드인 #subKey를 줄 수 있게 된다. 이것은 public getter private setter 패턴이다. 외부에선 공개돼 읽기만 가능하고 쓰기는 private이다.
> - parent 코드. setter쓸 수 없다. setter를 쓰려면 인자가 하나만 와야하기 때문이다. parent를 결정할 땐 subKey도 같이 줘야하기 때문에 setter로 만들 수 없었다.
> - `transaction`: 여기서부터 여기까지 한꺼번에 일어나야돼! 라는 것 -> setParent 내부의 일은 함께 일어나도록 작성됐다. parent가 들어오면 나머지 작업도 같이 이루어져야 한다는 것. transaction을 코드로 표현하려면 이렇게 `함수`로 작성해야한다.

> ➕ 자바스크립트 가이드) public 메소드가 아닌 경우 `_`를 붙여 메소드를 만들길 권고한다. 내부에서 쓰는 메소드라는 것.(외부용X)

> ViewModel의 생성자도 살펴보자

![](https://images.velog.io/images/pul8219/post/7aa6e2c6-204a-477a-b240-03a6cc025b68/image.png)

> - `this.add(new ViewModelValue(this.#subKey, cat, k, v));` 이전에는 this의 isUpdated에 직접 add를 했지만, 이제는 내 속성이 아닌 부모의 속성이기 때문에 부모에 부탁해야한다.
> - 이전에는 ViewModel에게 notify로 자신을 등록했는데 이젠 그런 일이 안 일어난다. why? 생성 시점에 등록 안 할거고 addListener 시점에 등록할거고 이건 ViewModelSubject가 알아서 할거니까!

![](https://images.velog.io/images/pul8219/post/018a7edb-36f9-4181-be0d-e3f8bac95f1b/image.png)

> - else 부분
> - `if(obj instanceof ViewModel) obj.setParent(this,cat);`이전에는 직접 parent, subKey 잡아줬지만 이젠 transaction 메소드 한방으로 처리하게 바뀜. parent는 내 필드이지만 transaction 코드인 setParent를 통해서 건드려야함.

# Visitor 패턴

기존 Scanner 코드를 봐보자.

```js
const Scanner = class {
  scan(el, _ = type(el, HTMLElement)) {
    const binder = new Binder();

    this.checkItem(binder, el);

    const stack = [el.firstElementChild];
    let target;
    while ((target = stack.pop())) {
      this.checkItem(binder, target);
      if (target.firstElementChild) stack.push(target.firstElementChild);
      if (target.nextElementSibling) stack.push(target.nextElementSibling);
    }
    return binder;
  }

  checkItem(binder, el) {
    const vm = el.getAttribute('data-viewmodel');
    if (vm) binder.add(new BinderItem(el, vm));
  }
};
```

Scanner의 역할 중 핵심은 `el.getAttribute("data-viewmodel");`이다. 그런데 scan 함수에 이 핵심과 너무 관련없는 코드들이 모여있진 않은가 생각해보자. 그저 DOM에 있는 자식을 순회하는 것 뿐인데 이는 Binder의 일이 아닐까? Binder는 그림을 그릴 대상 애들을 BinderItem으로 갖고 있다가 ViewModel을 꽂아주면 이에 맞게 그림을 그리는 역할을 가지고 있다. 따라서 scan은 Binder의 일도 아니다. Scanner는 scan의 일을 누군가에게 위임해야한다. 그것이 바로 Visitor

Visitor를 만들어보자. Caretaker(보살핌을 받는애, 원본 데이터 구조), Visitor로 이루어진다. Visitor에게 자기 자신을 주면 Visitor가 이 구조를 돌아주는 것임. Caretaker가 Visitor를 소유하고 있는 것이다.

![](https://images.velog.io/images/pul8219/post/1462460b-790d-4ec8-8ab7-f81c5840c503/image.png)

```js
//
```

Visitor

> - 취할 행동 = action
> - target의 type은 알 필요 없음
> - override 안 하면 죽을 것

```js
//
```

Visitor를 상속받은 DomVisitor 생성

> - 두번째 인자인 target을 HTMLElement를 받을 것이다 확정함. 왜냐면 Dom에 대한 Visitor이기 때문! (자식에서 구체적인 형을 알게 되는 것 - 다른 언어에선 제네릭 표현과 같음 `<T>`)
> - Visitor를 호출하는 쪽이 action을 주는데 액션을 주는 그 함수가 Caretaker와 같이 상호작용할 것임.
> - `action(curr);` template method의 hook와 비슷한 역할이다.

Scanner가 DOM 순회 관련 제어를 위임한 것이다. (제어 위임을 위해 코드를 객체로 바꾸게 됨)

바뀐 Scanner

![](https://images.velog.io/images/pul8219/post/8bb09624-f86b-4fd6-9510-195a1c1abf29/image.png)

```js
//
```

> - Scanner는 ViewModel을 읽어들이기만 하면 된다.
> - DomScan은 Visitor에게 위임한다.

> 🌟 어떤 코드는 얘께 아니야! 를 찾아낼 줄 알아야함

> 설계는 **코드의 재배치**하는 것이다.

# 추상계층 불일치

- 객체 간의 계약 = 의존성
- 의존성은 계층 관계를 보고 설정해야 한다.

Scanner 코드

![](https://images.velog.io/images/pul8219/post/e2b1642f-bf60-4283-b424-95563883601a/image.png)

constructor에서는 자식 계층(DomVisitor)를 사용하고 있으나, `this.#visitor.visit(f, target)` 코드에서는 부모 계층(Visitor)을 사용하고 있다. 추상 계층이 일치하지 않는 상태이므로 이를 일치시켜줄 필요가 있다. (Visitor는 계층이 두 개이고 - Visitor, DomVisitor - Scanner는 계층이 한 개이기 때문이다.)

![](https://images.velog.io/images/pul8219/post/bd9f09f1-ebd0-44f1-b48e-e5db31fbfc9b/image.png)

파랑박스: DOM에 대한 지식

- 수정된 Scanner 관련 코드

![](https://images.velog.io/images/pul8219/post/8167793c-bba9-4b18-b69b-f719a8aad7aa/image.png)

> - Scanner에는 같은 추상화 레벨에 있는 그냥 Visitor를 갖고옴. 여기엔 DOM에 대한 지식이 없어야함.
> - scan을 override 시키기

> - DomScanner는 DomVisitor를 받음. 이를 부모에게 줌(이건 문제 없음. 자식은 부모를 대체 가능하니까)
> - 부모가 제공하는 visit 메소드 사용

이제 추상 레이어가 나뉘어졌다. 새로운 요구사항이 생겼을 때 수정이 아니라 추가함으로써 해결할 수 있다.(OCP 충족)

SOLID 원칙은 이처럼 설계를 잘 했을 때 얻어지는 결과물이라고 할 수 있다.

![](https://images.velog.io/images/pul8219/post/a2c524ae-3971-4764-ab48-26fcdcd269b7/image.png)

Scanner는 이제 아래 코드와 같이 만들면 됨

# 설계 종합

## ViewModel

- ViewModelValue를 의존하는 객체가 많다. (ViewModelValue 바꾸면 ViewModel, ViewModelSubject, ViewModelListener 다 바꿔야됨)
- 그래도 단방향 의존성만 있는 것은 장점이다.
- (ViewModelSubject가 ViewModelListener를 알기 때문에 ViewModel도 ViewModelListener를 안다.)

## Scanner

- DomScanner와 DomVisitor는 간접적으로 의존하고 있다.(어쨌든 DomScanner는 DomVisitor를 알고 있어야 한다.)

## Binder

- Binder는 상당히 위험한 객체다.
- 나가는 선이 많은 객체는 깨지기 쉬운 객체이다. 모여드는게 많은 클래스는 무거운 클래스이다. 전자는 그 객체를 알고있는 객체를 건드릴경우 깨질 수 있다. (민감한 것) 후자에서는 해당 객체가 바뀔 경우 다른애들이 영향을 받는 것이다.

![](https://images.velog.io/images/pul8219/post/f1c89b8b-ddc9-4de2-a9ab-4d07457b4be6/image.png)

- DomScanner, DomVisitor, ConcreateProcessor만 DOM에 대한 의존성이 있다. (Client에 가까운 부분)
- 나머지는 ViewModel을 만드는 것들이다.
- DomScanner, DomVisitor, ConcreateProcessor 등을 교체하면 어떤 플랫폼으로도 교체할 수 있다.
- ➕ MVVM의 핵심은 Observer Pattern이다.
- ➕ Observer Pattern의 구현과 설계가 어려워 Binder를 수동으로 calling하는 경우도 많다.

> ➕ 의존 관계 도식 그리는 연습하기
> ➕ (nextSibling 이런거 없음) json 렌더해보기

# Comment

# References

[MVVM System 개선하기(2) - 개발자 황준일](https://junilhwang.github.io/TIL/CodeSpitz/Object-Oriented-Javascript/04-ISP-Visitor/#%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%BA%E1%84%91%E1%85%A9%E1%86%B7-%E1%84%83%E1%85%A9%E1%86%A8%E1%84%85%E1%85%B5%E1%86%B8%E1%84%8C%E1%85%A5%E1%86%A8-%E1%84%80%E1%85%AE%E1%84%8C%E1%85%A9)

# 팀원들 결과물‍
