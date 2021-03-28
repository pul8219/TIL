# Vanilla Javascript로 컴포넌트 만들기

> 개발자 황준일 [Vanilla Javascript로 컴포넌트 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/) 따라하기

# 1. 컴포넌트와 상태관리

## (1) 상태관리의 탄생

- `DOM`을 직접 다루기 보다 브라우저(클라이언트) 단에서 렌더링을 하고 서버에서는 `REST API` 혹은 `GraphQL` 같이 브라우저 렌더링에 필요한 데이터만 던져주는 형태의 기술을 많이 쓴다. `상태(state)`를 기준으로 `DOM`을 렌더링 하는 형태로 발전한 것이다. `DOM`은 `State`가 변할 때 변해야 하는 것이다. 반대로 `State`가 변하지 않을 경우 `DOM`도 변하면 안 되는 것이다.
- 그래서 `CSR(Client-Side Rendering)`이라는 개념과 `상태관리` 개념이 등장하게 되었다.

[SSR, CSR 관련 정리 문서]()

## (2) 컴포넌트

> [인용]
>
> `Angular`가 `CSR`의 시작이었다면, `React`는 `컴포넌트 기반 개발`의 시작이었다. 그리고 `Angular`와 `React`의 장점을 모두 수용한 `Vue`가 나왔다.
>
> 어쨌든 중요한 점은 **현 시점의 웹 어플리케이션은 컴포넌트 단위로 설계되고 개발된다**는 것이다. 그리고 컴포넌트마다 컴포넌트를 렌더링할 때 필요한 상태를 관리하게 되었으며, `Proxy` 혹은 `Observer Pattern` 등을 이용하여 이를 구현한다.
>
> 이론에 대해 다루자면 한도 끝도 없기 때문에 이제부터는 코드로 이야기 하겠다.

# 2. state - setState - render

컴포넌트 설계의 기반이 되는 코드를 작성해보자.

## (1) 기능 구현

`setState`라는 메소드를 통해 `state`를 기반으로 `render` 해주는 코드를 만들어보자.

```html
<div id="app"></div>
<script>
  const $app = document.querySelector('#app');

  let state = {
    items: ['item1', 'item2', 'item3', 'item4'],
  };

  const render = () => {
    const { items } = state;
    $app.innerHTML = `
            <ul>
                ${items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
            <button id="append">추가</button>

        `;
    document.querySelector('#append').addEventListener('click', () => {
      setState({ items: [...items, `item${items.length + 1}`] });
    });
  };

  const setState = (newState) => {
    // state와 newState는 items라는 같은 키값을 가지고 있기 때문에 아래코드에서 state객체의 값은 newState로 덮어써진다.
    state = { ...state, ...newState };
    render();
  };

  render();
</script>
```

![](https://images.velog.io/images/pul8219/post/0876bb5e-d14f-4490-b016-a23a9bbebfb9/image.png)

- `state`가 변경되면 `render`를 실행한다.
- `state`는 `setState`로만 변경해야 한다.

이렇게 코드를 작성하면, 브라우저에 출력되는 내용은 무조건 `state`에 종속된다. `DOM`을 직접 다룰 필요가 없어진다.

## (2) 추상화

앞서 작성한 코드를 `class` 문법으로 추상화해보자.

```html
<div id="app"></div>
<script>
  // class에서의 this는 클래스의 인스턴스를 가리킨다. (맞는 말인지 확인 필요) ❗
  class Component {
    $target;
    $state;
    // 생성자
    constructor($target) {
      this.$target = $target;
      this.setup(); // 그냥 실행하는겨!
      this.render();
    }
    setup() {}
    template() {}
    render() {
      this.$target.innerHTML = this.template();
      this.setEvent();
    }
    setEvent() {}
    setState(newState) {
      this.$state = { ...this.$state, ...newState };
      this.render();
    }
  }

  class App extends Component {
    setup() {
      this.$state = { items: ['item1', 'item2'] };
    }
    template() {
      const { items } = this.$state;
      return `
                <ul>
                    ${items.map((item) => `<li>${item}</li>`).join('')}
                </ul>
                <button>추가</button>
            `;
    }
    setEvent() {
      this.$target.querySelector('button').addEventListener('click', () => {
        const { items } = this.$state;
        this.setState({ items: [...items, `item${items.length + 1}`] });
      });
    }
  }

  new App(document.querySelector('#app'));
</script>
```

![](https://images.velog.io/images/pul8219/post/e843d369-5de3-4a06-9198-32a9e8401ae4/image.png)

- 컴포넌트 코드의 사용방법을 강제할 수 있기 때문에 코드를 유지보수하고 관리하기 쉽다.

## (3) 모듈화

앞서 작성한 코드를 다음과 같이 분할해보자.

```
.
│  index.html
│
└─src
    │  app.js             # ES Module의 entry file
    │
    ├─components          # Component 역할을 하는 파일
    │      Items.js
    │
    └─core                # 구현에 필요한 코어들
            Component.js
```

- `index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple Component 2</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./src/app.js" type="module"></script>
  </body>
</html>
```

- `src/app.js`

```js
import Items from './components/Items.js';

class App {
  constructor() {
    const $app = document.querySelector('#app');
    new Items($app);
  }
}

new App();
```

- `src/components/Items.js`

```js
import Component from '../core/Component.js';

export default class Items extends Component {
  setup() {
    this.$state = { items: ['item1', 'item2'] };
  }
  template() {
    const { items } = this.$state;
    return `
                  <ul>
                      ${items.map((item) => `<li>${item}</li>`).join('')}
                  </ul>
                  <button>추가</button>
              `;
  }
  setEvent() {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });
  }
}
```

- `src/core/Component.js`

```js
export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
```

# 3. 이벤트 처리

## (1) 불편함을 감지하기

지금까지의 코드를 보면 `render`를 실행할 때마다 이벤트가 새로 등록된다. 뿐만 아니라 반복적인 요소에 대해 각각 이벤트를 등록해야 할 때 이런 방식은 불편하다.

일단 각각의 아이템에 대한 `삭제` 기능을 추가해보자.

- 변경된 `src/components/Items.js` 코드

```js
import Component from '../core/Component.js';

export default class Items extends Component {
  setup() {
    this.$state = { items: ['item1', 'item2'] };
  }
  template() {
    const { items } = this.$state;
    return `
        <ul>${items
          .map(
            (item, key) => `
          <li>${item}
          <button class="deleteBtn" data-index="${key}">삭제</button></li>
          `
          )
          .join('')}
        </ul>
        <button class="addBtn">추가</button>
        `;
  }
  setEvent() {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });

    this.$target.querySelectorAll('.deleteBtn').forEach((deleteBtn) =>
      deleteBtn.addEventListener('click', ({ target }) => {
        const items = [...this.$state.items];
        items.splice(target.dataset.index, 1); // 삭제할 아이템의 index를 이용해 해당 요소만 제거
        this.setState({ items });
      })
    );
  }
}
```

![](https://images.velog.io/images/pul8219/post/625a6e53-005a-4986-a2b3-f885d2784c9c/image.png)

- 반복적인 요소인 `삭제` 버튼에 이벤트를 매번 등록하고 있다.

## (2) 이벤트 버블링

위에서 살펴본 불편함을 해결하기 위해서 `이벤트 버블링`을 사용하면 직관적으로 처리할 수 있다.

- 변경된 `src/components/Items.js` 코드

```js
import Component from '../core/Component.js';

export default class Items extends Component {
  setup() {
    /* 생략 */
  }
  template() {
    /* 생략 */
  }
  setEvent() {
    // 모든 이벤트를 this.$target에 등록하여 사용한다.(이벤트 버블링 사용)

    this.$target.addEventListener('click', ({ target }) => {
      const items = [...this.$state.items];

      if (target.classList.contains('addBtn')) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }

      if (target.classList.contains('deleteBtn')) {
        items.splice(target.dataset.index, 1); // 삭제할 아이템의 index를 이용해 해당 요소만 제거
        this.setState({ items });
      }
    });
  }
}
```

기존의 `setEvent`는 `render`를 할 때 마다 실행되기 때문에 `src/core/Component.js`에 `라이프 사이클` 또한 변경해준다.

- 변경된 src/core/Component.js 코드

```js
export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent(); // ✏️ constructor에서 한 번만 실행한다.
    this.render();
  }
  setup() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
    // ✏️ 원래 있었던 setEvent() 코드가 사라졌다.
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
```

- event를 각각의 하위 요소가 아니라 **component의 target 자체에 등록**하게 바뀌었다.
- 따라서 component가 생성되는 시점에만 이벤트 등록을 해놓으면 추가로 등록할 필요가 없다.

## (3) 이벤트 버블링 추상화

➕ 이벤트 버블링을 통한 이벤트 등록 과정을 **메소드로 만들어서 사용**하면 코드가 더욱 깔끔해진다.

- 변경된 src/core/Component.js 코드

```js
export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  // ✏️ 추가된 addEvent() 메소드
  addEvent(eventType, selector, callback) {
    const childeren = [...this.$target.querySelectorAll(selector)];
    // selector에 명시한 것보다 더 하위 요소가 선택된 경우엔
    // closest를 이용하여 처리한다.

    /* childeren 내부에 요소가 있으면 바로 끝나고, 
      해당 요소와 무관한 부분이 target일 때는 closest 해도 null을 반환해 if문에서 걸러지고
      해당 요소보다 더 하위 요소가 선택된 경우에는 children 안에는 없지만 target.closest를 통해 가까운 해당 선택자 요소를 찾게한다.
      */
    const isTarget = (target) =>
      childeren.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
```

이렇게 작성한 메소드는 다음과 같이 사용한다.

- 변경된 src/component/Items.js 코드

```js
import Component from '../core/Component.js';

export default class Items extends Component {
  setup() {
    this.$state = { items: ['item1', 'item2'] };
  }
  template() {
    const { items } = this.$state;
    return `
        <ul>${items
          .map(
            (item, key) => `
          <li>${item}
          <button class="deleteBtn" data-index="${key}">삭제</button></li>
          `
          )
          .join('')}
        </ul>
        <button class="addBtn">추가</button>
        `;
  }

  // ✏️ 변경된 setEvent() 메소드 내부
  setEvent() {
    this.addEvent('click', '.addBtn', ({ target }) => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });

    this.addEvent('click', '.deleteBtn', ({ target }) => {
      const items = [...this.$state.items];
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });
  }
}
```

# 4. 컴포넌트 분할하기

이제 컴포넌트 단위로 구분하는 코드를 작성해보자.

## (1) 기능 추가

현재까지의 코드는 컴포넌트를 분리할 이유가 없는 상태이다. 그래서 `Items` 컴포넌트에 `toggle`, `filter` 등의 기능을 추가했을 때 어떤 문제점이 있는지 먼저 알아야한다.

## (2) 폴더 구조

## (3) Component Core 변경

## (4) Entry Point 변경

## (5) 컴포넌트 분할

# 마치며

# References

@eyabc

[브라우저 모듈](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%AA%A8%EB%93%88.html#%EB%8B%A8-%ED%95%9C%EB%B2%88%EB%A7%8C-%ED%8F%89%EA%B0%80%EB%90%A8)

[this](https://eyabc.github.io/Doc/dev/core-javascript/this.html#%EB%9F%B0%ED%83%80%EC%9E%84%EC%97%90-%EA%B2%B0%EC%A0%95%EB%90%98%EB%8A%94-this-%EC%9D%98-%EC%9E%A5%EB%8B%A8%EC%A0%90)

[class](https://eyabc.github.io/Doc/dev/core-javascript/%ED%81%B4%EB%9E%98%EC%8A%A4.html#class-syntax)
