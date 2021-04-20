[문서 목록으로 돌아가기](README.md)

> # STEP 34
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 34 [코드스피츠 객체지향 자바스크립트 - 5회차](https://www.youtube.com/watch?v=5UUISCK6CL4)
> - 기한: ~ 04/06(화)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

지금까지 구현한 코드 참고

`ViewModelSubject`의 `notify()`를 보면 this.notifyTarget 의 this에 이를 상속받는 친구의 훅을 넘겨준다. (그렇지 않으면 ViewModel로 작동할 수 없고 확정된 ViewModelSubject만 넘어감) 이 대상이 ViewModel인 것을 상속받은 ViewModel이 `get notifyTarget()`를 통해 결정하게 된다.

추상 계층을 분리할 경우 어떤 문제를 각각의 계층에서 해결하도록 만들어야한다.

# Processor 개선

## 문제점

Processor는 확장 가능하도록 만들었으나 ViewModel을 보면 Processor의 종류를 `styles`, `attributes`, `properties` 로 제한하고 있다. (ViewModel이 특정키를 인식하게끔 작성이 되어있는 것이다.)

관련 코드

```js
styles = {};
attributes = {};
properties = {};
events = {};

// &

if ('styles,attributes,properties'.includes(cat)) {
  // ...
}

// 이 키를 없애고 일반화하는 코드를 작성하는 것이 필요하다.

// ➕
// 그리고 이 if문(들어오는 것이 Object임을 확정)과 else문에서 데이터 형식을 엄격하게 정의하고 있다. 이렇게 되면 코드를 읽지 않으면 데이터 형식을 올바르게 작성할 수 없게 된다. 데이터 형식을 자유롭게 기술할 수 있도록 수정이 필요하다.
// -> 어떤 데이터 형식이 들어와도(ex. Object가 들어오면 Object를 돌며 key, value 등을 getter, setter로 바꿔주는)  Observer와 연동된 getter, setter로 바꿀 수 있는 Parser가 있어야 한다.
```

## 개선

비정형 데이터를 동적으로 탐색하는 것을 재귀함수로 구현해볼 것이다. `define` 함수

```js
const ViewModel = class extends ViewModelSubject {
  static KEY = Symbol();
  //   static get(data) {
  //     return new ViewModel(data);
  //   }
  //   #subKey = '';
  //   get subKey() {
  //     return this.#subKey;
  //   }
  //   #parent = null;
  //   get parent() {
  //     return this.#parent;
  //   }
  //   _setParent(parent, subKey) {
  //     this.#parent = type(parent, ViewModel);
  //     this.#subKey = subKey;
  //     this.addListener(parent);
  //   }
  //   get _notifyTarget() {
  //     return this;
  //   }
  define(target, k, v) {
    if (v && typeof v == 'object' && !(v instanceof ViewModel)) {
      // null이나 undefined가 아니면 object일 것. 대신 ViewModel은 아니어야한다. 왜냐하면 ViewModel은 만들어질 때 이미 스캔을 완료했기 때문에 스캔을 안 해도 되기 때문이다.
      if (v instanceof Array) {
        target[k] = [];
        target[k][ViewModel.KEY] = target[ViewModel.KEY] + '.' + k; // 상대적인 경로 표기. key가 확장된다
        v.forEach((v, i) => this.define(target[k], i, v)); // target이 배열이 되었다. i(인덱스)와 v(값)
      } else {
        // object인 경우
        target[k] = { [ViewModel.KEY]: target[ViewModel.KEY] + '.' + k };
        Object.entries(v).forEach(([ik, iv]) => this.define(target[k], ik, iv));
      }
      Object.defineProperty(target[k], 'subKey', {
        get: (_) => target.subKey,
      });
    } else {
      if (v instanceof ViewModel) v._setParent(this, k);
      Object.defineProperties(target, {
        // target의 k에 getter, setter가지고 있는 속성을 넣어줌. k, v가 할당되는 부분
        [k]: {
          enumerable: true,
          get: (_) => v,
          set: (newV) => {
            v = newV;
            this.add(
              new ViewModelValue(target.subKey, target[ViewModel.KEY], k, v)
            );
          },
        },
      });
    }
  }
  constructor(data, _ = type(data, 'object')) {
    super();
    this[ViewModel.KEY] = 'root';
    this[ViewModel.VM] = this;
    Object.entries(data).forEach(([k, v]) => this.define(this, k, v));
    Object.seal(this);
  }
  viewmodelUpdated(vm, updated) {
    updated.forEach((v) => this.add(v));
  }
};
```

- 예를 들어 배열 안에 배열 안에 오브젝트가 있어도 이 loop만으로 돌면서 getter, setter로 바꿔주게 될 것이다.
- 배열 안에 원소가 없다. 왜냐하면 properties로 정의된 애들은 배열의 length로 환원되지 않기 때문이다. -> 후에 보완할 것
- 가장 간단한 재귀 Parser이다.

> 재귀함수
>
> - depth가 깊으면 죽을 수도 있다.

> if 조건문
>
> - if있고 나머지 있는 경우: if구문이 되면 좋고 아님 말고. Optional함
> - if, else: if인 경우 아니면 else인 경우. 이렇게 경우를 확정지은 것이다.
>
> if문을 작성할 때 해당 부분이 Optional인지 아닌지 잘 파악하고 작성해야한다.
>
> 위의 코드의 경우 else에서 더이상 재귀가 일어나지 않는 종결점이 있다는 것이다. (재귀 함수의 경우 재귀가 끝나는 조건이 필요하다.)

이렇게 ViewModel이 어떤 데이터라도 파싱할 수 있게 되었고, 생성자에 하드코딩되어있던 key를 빼내게 되었다. 이제 특정 Key를 규정하는 것은 Processor 밖에 없다.

- `baseProcessors.forEach(v=>binder.addProcessor(v));` 특정 binder가 들어오면 baseProcessors를 넣어주며 addProcessor가 실행되고 binder가 리턴됨.

# Decorator 패턴

자신이 일하고 다음 객체에 계속 일을 추가적으로 시키는 패턴(linked list 관련)

기존의 Processor는 Collection 형태로 관리되고 있었다. 따라서 의존성이 Collection에 몰려 책임이 무거워진다. Collection으로 관리되고 있는 객체들을 Decorator Pattern을 이용해 Linked list로 분산시켜야 한다.

> 컬렉션일 경우 그 객체의 책임이 무거워짐.(하나만 사고쳐도 다 무너짐) 링크드리스트인 경우 가벼운 책임을 가짐. (다음 것을 아는 것에만 책임을 지기 때문에)

> 자신이 일하고 다음번에 일을 시켰는데 일을 시킬지 말지 결정해 멈출 수 있는 패턴을 Chain of responsibility 라고 한다.

---

기존 예제에 `<ol><li>`가 들어간 예제를 만들어볼 것이다.

`data-template` 속성이 추가된 것을 눈여겨보자. 이를 이용해 리스트의 배열을 리스트에 던져주는 형태로 구현해볼 것이다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
  </head>
  <body>
    <section id="target" data-viewmodel="wrapper">
      <h2 data-viewmodel="title"></h2>
      <section data-viewmodel="contents"></section>
      <ol data-viewmodel="list">
        <li data-template="listItem" data-viewmodel="item"></li>
      </ol>
    </section>
    <script src="5.js"></script>
  </body>
</html>
```

> 코드설명
>
> - vm에 있는 template키에는 name, data가 있어야한다는 것(기본값 할당을 통해 object를 검증하는 방법을 썼음)
> - DomScanner의 scan 함수: template이면 template키는 제거하고 #template에 담음. 그리고 template이고 진짜 원소가 아니기 때문에 부모에서 제거 / template이 아닌 경우만 binderitem에 넣어줌(else)
> - class로 만들자(static으로 만들었다가 나중에 필요하면 class로 바꿔야지하지말고!)
> - 실드 패턴(black list, white list) 검증코드를 통과한 애들만 로직부분에 들어올 수 있게(white list 부분부터는 검증코드가 필요없게되는 것)
> - 리스트들은 그 안의 viewmodel과 해당 binder가 작동하는 것

View Framework들은 이렇듯 코어가 작고 플러그인들이 많다.

프로그램은 구조를 짜는 것이 중요(하나하나 세세한 코드보다 구조가 더 중요하다.)

# 전체 코드

```js
const type = (target, type) => {
  if (typeof type == 'string') {
    if (typeof target != type) throw `invaild type ${target} : ${type}`;
  } else if (!(target instanceof type))
    throw `invaild type ${target} : ${type}`;
  return target;
};
const err = (v) => {
  throw v;
};
const ViewModelValue = class {
  subKey;
  cat;
  k;
  v;
  constructor(subKey, cat, k, v) {
    this.subKey = subKey;
    this.cat = cat;
    this.k = k;
    this.v = v;
    Object.freeze(this);
  }
};
const ViewModelListener = class {
  viewmodelUpdated(target, updated) {
    throw 'override';
  }
};
const ViewModelSubject = class extends ViewModelListener {
  static #subjects = new Set();
  static #inited = false;
  static _notify() {
    const f = (_) => {
      this.#subjects.forEach((vm) => {
        if (vm.#info.size) {
          vm.notify();
          vm.clear();
        }
      });
      if (this.#inited) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }
  static _watch(vm, _ = type(vm, ViewModelListener)) {
    this.#subjects.add(vm);
    if (!this.#inited) {
      this.#inited = true;
      this._notify();
    }
  }
  static _unwatch(vm, _ = type(vm, ViewModelListener)) {
    this.#subjects.delete(vm);
    if (!this.#subjects.size) this.#inited = false;
  }
  #info = new Set();
  #listeners = new Set();
  add(v, _ = type(v, ViewModelValue)) {
    this.#info.add(v);
  }
  clear() {
    this.#info.clear();
  }
  addListener(v, _ = type(v, ViewModelListener)) {
    this.#listeners.add(v);
    ViewModelSubject._watch(this);
  }
  removeListener(v, _ = type(v, ViewModelListener)) {
    this.#listeners.delete(v);
    if (!this.#listeners.size) ViewModelSubject._unwatch(this);
  }
  notify() {
    this.#listeners.forEach((v) =>
      v.viewmodelUpdated(this._notifyTarget, this.#info)
    );
  }
  get _notifyTarget() {
    throw 'override!';
  }
};
const ViewModel = class extends ViewModelSubject {
  static KEY = Symbol();
  static get(data) {
    return new ViewModel(data);
  }
  #subKey = '';
  get subKey() {
    return this.#subKey;
  }
  #parent = null;
  get parent() {
    return this.#parent;
  }
  _setParent(parent, subKey) {
    this.#parent = type(parent, ViewModel);
    this.#subKey = subKey;
    this.addListener(parent);
  }
  get _notifyTarget() {
    return this;
  }
  define(target, k, v) {
    if (v && typeof v == 'object' && !(v instanceof ViewModel)) {
      if (v instanceof Array) {
        target[k] = [];
        target[k][ViewModel.KEY] = target[ViewModel.KEY] + '.' + k;
        v.forEach((v, i) => this.define(target[k], i, v));
      } else {
        target[k] = { [ViewModel.KEY]: target[ViewModel.KEY] + '.' + k };
        Object.entries(v).forEach(([ik, iv]) => this.define(target[k], ik, iv));
      }
      Object.defineProperty(target[k], 'subKey', {
        get: (_) => target.subKey,
      });
    } else {
      if (v instanceof ViewModel) v._setParent(this, k);
      Object.defineProperties(target, {
        [k]: {
          enumerable: true,
          get: (_) => v,
          set: (newV) => {
            v = newV;
            this.add(
              new ViewModelValue(target.subKey, target[ViewModel.KEY], k, v)
            );
          },
        },
      });
    }
  }
  constructor(data, _ = type(data, 'object')) {
    super();
    this[ViewModel.KEY] = 'root';
    this[ViewModel.VM] = this;
    Object.entries(data).forEach(([k, v]) => this.define(this, k, v));
    Object.seal(this);
  }
  viewmodelUpdated(vm, updated) {
    updated.forEach((v) => this.add(v));
  }
};
const Visitor = class {
  visit(action, target, _0 = type(action, 'function')) {
    throw 'override';
  }
};
const DomVisitor = class extends Visitor {
  visit(
    action,
    target,
    _0 = type(action, 'function'),
    _1 = type(target, HTMLElement)
  ) {
    const stack = [];
    let curr = target.firstElementChild;
    if (!curr) return;
    do {
      action(curr);
      if (curr.firstElementChild) stack.push(curr.firstElementChild);
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
    } while ((curr = stack.pop()));
  }
};
const Scanner = class {
  #visitor;
  constructor(visitor, _ = type(visitor, Visitor)) {
    this.#visitor = visitor;
  }
  visit(f, target) {
    this.#visitor.visit(f, target);
  }
  scan(target) {
    throw 'override';
  }
};
const DomScanner = class extends Scanner {
  static #templates = new Map();
  static get(k) {
    return this.#templates.get(k);
  }
  constructor(visitor, _ = type(visitor, DomVisitor)) {
    super(visitor);
  }
  scan(target, _ = type(target, HTMLElement)) {
    const binder = new Binder(),
      f = (el) => {
        const template = el.getAttribute('data-template');
        if (template) {
          el.removeAttribute('data-template');
          DomScanner.#templates.set(template, el);
          el.parentElement.removeChild(el);
        } else {
          const vm = el.getAttribute('data-viewmodel');
          if (vm) {
            el.removeAttribute('data-viewmodel');
            binder.add(new BinderItem(el, vm));
          }
        }
      };
    f(target);
    this.visit(f, target);
    return binder;
  }
};
const Processor = class {
  cat;
  constructor(cat) {
    this.cat = cat;
    Object.freeze(this);
  }
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
  _process(vm, el, k, v) {
    throw 'override';
  }
};
const Binder = class extends ViewModelListener {
  #items = new Set();
  #processors = {};
  add(v, _ = type(v, BinderItem)) {
    this.#items.add(v);
  }
  viewmodelUpdated(target, updated, _ = type(target, ViewModel)) {
    const items = {};
    this.#items.forEach((item) => {
      items[item.viewmodel] = [
        type(target[item.viewmodel], ViewModel),
        item.el,
      ];
    });
    updated.forEach((v) => {
      if (!items[v.subKey]) return;
      const [vm, el] = items[v.subKey],
        processor = this.#processors[v.cat.split('.').pop()];
      if (!el || !processor) return;
      processor.process(vm, el, v.k, v.v);
    });
  }
  addProcessor(v, _0 = type(v, Processor)) {
    this.#processors[v.cat] = v;
  }
  watch(viewmodel, _ = type(viewmodel, ViewModel)) {
    viewmodel.addListener(this);
    this.render(viewmodel);
  }
  unwatch(viewmodel, _ = type(viewmodel, ViewModel)) {
    viewmodel.removeListener(this);
  }
  render(viewmodel, _ = type(viewmodel, ViewModel)) {
    const processores = Object.entries(this.#processors);
    this.#items.forEach((item) => {
      const vm = type(viewmodel[item.viewmodel], ViewModel),
        el = item.el;
      processores.forEach(([pk, processor]) => {
        if (vm[pk])
          Object.entries(vm[pk]).forEach(([k, v]) => {
            processor.process(vm, el, k, v);
          });
      });
    });
  }
};
const BinderItem = class {
  el;
  viewmodel;
  constructor(
    el,
    viewmodel,
    _0 = type(el, HTMLElement),
    _1 = type(viewmodel, 'string')
  ) {
    this.el = el;
    this.viewmodel = viewmodel;
    Object.freeze(this);
  }
};
const setDomProcessor = ((_) => {
  const visitor = new DomVisitor();
  const scanner = new DomScanner(visitor);
  const baseProcessors = [
    new (class extends Processor {
      _process(vm, el, k, v) {
        el.style[k] = v;
      }
    })('styles'),
    new (class extends Processor {
      _process(vm, el, k, v) {
        el.setAttribute(k, v);
      }
    })('attributes'),
    new (class extends Processor {
      _process(vm, el, k, v) {
        el[k] = v;
      }
    })('properties'),
    new (class extends Processor {
      _process(vm, el, k, v) {
        el['on' + k] = (e) => v.call(el, e, vm);
      }
    })('events'),
    new (class extends Processor {
      _process(vm, el, k, v) {
        const { name = err('no name'), data = err('no data') } = vm.template;
        const template = DomScanner.get(name) || err('no template:' + name); // name을 이용해 DomScanner안의 template 객체 element를 얻으려하는 것
        if (!(data instanceof Array)) err('invaild data:' + data); // data가 배열이 아니면 kill
        // 여기까진 blacklist(실드 패턴)
        // =========================================
        // white list
        Object.freeze(data);
        visitor.visit((el) => {
          if (el.binder) {
            const [binder, vm] = el.binder;
            binder.unwatch(vm);
            delete el.binder;
          }
        }, el);
        el.innerHTML = '';
        data.forEach((vm, i) => {
          if (!(vm instanceof ViewModel)) err(`invalid Viewmodel:${i} - ${vm}`);
          const child = template.cloneNode(true);
          const binder = setProcessor(scanner.scan(child));
          el.binders = [binder, vm];
          binder.watch(vm);
          el.appendChild(child);
        });
      }
    })('template'),
  ];
  const setProcessor = (binder, _ = type(binder, Binder)) => {
    baseProcessors.forEach((v) => binder.addProcessor(v));
    return binder;
  };
  return setProcessor;
})();
const scanner = new DomScanner(new DomVisitor());
const binder = setDomProcessor(scanner.scan(document.body));
const viewmodel = ViewModel.get({
  isStop: false,
  changeContents() {
    this.wrapper.styles.background = `rgb(${
      parseInt(Math.random() * 150) + 100
    },${parseInt(Math.random() * 150) + 100},${
      parseInt(Math.random() * 150) + 100
    })`;
    this.contents.properties.innerHTML = Math.random()
      .toString(16)
      .replace('.', '');
    this.list.template.data.forEach(({ item: { styles, properties } }) => {
      properties.innerHTML = Math.random().toString(16).replace('.', '');
      styles.background = `rgb(${parseInt(Math.random() * 150) + 100},${
        parseInt(Math.random() * 150) + 100
      },${parseInt(Math.random() * 150) + 100})`;
    });
  },
  wrapper: ViewModel.get({
    styles: {
      width: '50%',
      background: '#ffa',
      cursor: 'pointer',
    },
    events: {
      click(e, vm) {
        vm.parent.isStop = true;
      },
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
  list: ViewModel.get({
    template: {
      name: 'listItem',
      data: '1,2,3,4,5,6'.split(',').map((v) =>
        ViewModel.get({
          item: ViewModel.get({
            styles: { background: '#fff' },
            properties: { innerHTML: 'item ' + v },
          }),
        })
      ),
    },
  }),
});
binder.watch(viewmodel);
const f = (_) => {
  viewmodel.changeContents();
  if (!viewmodel.isStop) requestAnimationFrame(f);
};
requestAnimationFrame(f);
//viewmodel.changeContents();
```

# Comment

# References

# 팀원들 결과물‍

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step34.md)
- [@eyabc](https://eyabc.github.io/docs/javascript/OOP_5)
- [@khw970421](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-86-%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-5%ED%9A%8C%EC%B0%A8-part1-step-34)
- [@JeongShin]()
