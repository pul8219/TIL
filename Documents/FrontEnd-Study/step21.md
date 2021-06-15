[문서 목록으로 돌아가기](README.md)

> # STEP 21
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/home>
> - 공부 범위: [이벤트 디스패치](https://ko.javascript.info/dispatch-events)
> - 기한: 01/02(토) ~ 01/05(화)

# 보충 필요

- trigger 트리거의 의미
  - `이벤트를 트리거하다`: trigger의 사전적 의미는 방아쇠. 이벤트를 동작하게 하는 어떤 행동, 행위를 말함
- 비동기 함수 복습
- 관련 면접 질문 생각 및 정리

# 목차

- [Event 생성자](#Event-생성자)
- [dispatchEvent](#dispatchEvent)
- [커스텀 이벤트 버블링 예시](#커스텀-이벤트-버블링-예시)
- [MouseEvent, KeyboardEvent 등의 다양한 이벤트](#MouseEvent,-KeyboardEvent-등의-다양한-이벤트)
- [커스텀 이벤트](#커스텀-이벤트)
- [event.preventDefault()](<#event.preventDefault()>)
- [이벤트 안 이벤트](#이벤트-안-이벤트)

- [References](#References)
- [팀원들 결과물](#팀원들-결과물)

# 이벤트 디스패치

이벤트는 사용자의 action에 따라 발생할 수 있다. (e.g. 마우스 버튼을 클릭하는 것, 키보드 자판을 누르는 것 등) (JavaScript에서 요소에 이벤트 리스너를 등록해 해당 요소에서 발생하는 이벤트를 제어하는 일반적인 방법을 의미)
또한 `HTMLElement.click()`와 같은 메소드를 호출하거나, 새로 정의한 이벤트를 `EventTarget.dispatchEvent()`로 보내 이벤트를 발생시키는 등 프로그래밍적으로도 이벤트를 발생시킬 수도 있다.

> 커스텀 이벤트 생성하기

## Event 생성자

Event 인터페이스는 DOM에서 일어나는 event에 해당한다.

```js
let evt = new Event(type[, eventInit_options]);
```

`Event()`

- type: 이벤트의 이름을 나타내는 문자열. 'click'와 같은 내장 이벤트나 'my-event'와 같은 커스텀 이벤트를 나타내는 문자열 등이 올 수 있다.
- eventInit_options: 다음과 같은 optional field들이 올 수 있다.

  - `bubbles`: `true`인 경우 이벤트가 버블링된다. (기본값은 `false`)
  - `cancelable`: `true`인 경우 브라우저 기본동작이 실행되지 않는다. (기본값은 `false`) / MDN 인용 `이벤트를 취소할 수 있는지를 나타내는 속성`
  - `composed`: MDN에 의하면 'shadow root 바깥의 리스너까지 이벤트가 트리거할건지를 나타내는 속성'이라고 하는데 무슨 말인지 모르겠다...!

  `composed` 관련 다음 문서를 참고해볼것! https://wit.nts-corp.com/2019/03/27/5552
  핵심은 'shadow dom`이라는 개념!

```js
let evt = new Event('my-event', { bubbles: true, cancelable: false });
document.dispatchEvent(evt); // dispatchEvent 부분에서 더 공부할 것

// event can be dispatched from any element, not only the document
myDiv.dispatchEvent(evt);
```

## dispatchEvent

- 이벤트를 실행시키는 것을 의미한다.(dispatch의 사전적 의미: 처리하다)
- 이벤트 객체를 생성한 다음, `elem.dispatchEvent(event)`를 호출해 이벤트를 실행시키는 것

아래 예시를 실행시켜보면 버튼을 클릭하지 않아도 이벤트 핸들러가 동작하는 것을 알 수 있다.

```html
<button id="myBtn" onclick="alert('클릭!');">자동으로 클릭되는 버튼</button>
```

```js
const myBtn = document.getElementById('myBtn');

let evt = new Event('click');
myBtn.dispatchEvent(evt);
```

## 커스텀 이벤트 버블링 예시

```html
<h1 id="elem">Hello from the script!</h1>
```

```js
// 커스텀 이벤트 버블링 예시
const elem = document.getElementById('elem');

// 문서에 hello 이벤트를 등록
document.addEventListener('hello', function (event) {
  //(1)
  alert('Hello from ' + event.target.tagName); // event.target은 실제 이벤트가 발생한 요소를 나타냄
});

// hello라는 이벤트를 만들고 elem에서 이벤트 디스패치
let evt = new Event('hello', { bubbles: true }); // 버블링 명시
elem.dispatchEvent(evt); // (2)

// elem.dispatchEvent(evt); 가 실행되고 이벤트가 상위 요소로 버블링되며 상위 요소에 할당된 이벤트 핸들러가 실행된다
// 즉, document에 할당된 핸들러가 동작하게 되고 메시지가 경고창에 출력된다.

// (2) 코드보다 (1)라인이 선행되어야한다. 그렇지 않으면 (2)코드에서 이벤트를 실행하려해도 그 시점에 DOM요소에 이벤트 리스너가 등록되어있지 않기 때문이다.
```

- `on<event>` 는 내장 이벤트에만 적용가능한 문법이다. 따라서 `document.onhello` 이런 식으로 작성하면 정상적으로 동작하지 않는다. 커스텀 이벤트는 `addEventListener`를 이용해 핸들링해야한다.
- `bubbles:true`를 명시적으로 설정하지 않으면 이벤트가 버블링되지 않는다.

## MouseEvent, KeyboardEvent 등의 다양한 이벤트

다음과 같은 다양한 UI 이벤트는 `new Event`로 만들면 안 되고 `new MouseEvent('click')` 처럼 별도의 생성자를 사용해야한다.

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- 등등...

```js
let event = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100,
});

alert(event.clientX); // 100
```

`Event` 생성자를 이용한 아래 코드는 제대로 동작하지 않는다.

```js
let event = new Event('click', {
  bubbles: true, // Event 생성자에선 bubbles와 cancelable 프로퍼티만 동작함
  cancelable: true,
  clientX: 100,
  clientY: 100,
});

alert(event.clientX); // undefined, 알 수 없는 프로퍼티이기 때문
```

❗ TODO 아래 MDN 문서 학습하고 MouseEvent 생성자 이용 예제 실제로 실행해보기

- https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events

> 💡 `clientX`, `clientY`
>
> `clientX`는 어플리케이션의 viewport내의 수평 좌표를, `clientY`는 viewport 내의 수직 좌표를 제공하는 `MouseEvent`의 read-only 속성이다.

> 💡 viewport
>
> 어플리케이션 현재 화면에서 보여지고 있는 영역(보통 직사각형)을 나타내는 용어이다.

## 커스텀 이벤트

- 제대로 된 커스텀 이벤트를 만드려면 지금까지 알아본 `new Event`대신 `new CustomEvent`를 사용해야한다.
- `CustomEvent`가 `newEvent`와 다른 점: `CustomEvent`의 두 번째 인수엔 객체가 들어갈 수 있고 이 객체에 `detail`이라는 프로퍼티를 추가하여 커스텀 이벤트 관련 정보를 명시하고, **이벤트에 커스텀 데이터를 전달할 수 있다.**

```js
// 커스텀 이벤트 (CustomEvent 생성자 관련)
// 추가 정보는 이벤트와 함께 핸들러에 전달된다.
const elem = document.getElementById('detailTest');

elem.addEventListener('hello', function (event) {
  // 요소에 addEventListener를 이용, 이벤트 등록
  alert(event.detail.name); // DKU-STUDY라는 메시지가 담긴 경고창이 뜬다.
});

elem.dispatchEvent(
  new CustomEvent('hello', {
    detail: { name: 'DKU-STUDY' }, // detail 프로퍼티를 이용해 커스텀 정보를 이벤트에 전달
  })
);
```

### `CustomEvent`를 사용하는 이유

- `new Event`로 일반 이벤트를 생성한 후, 추가 정보가 담긴 프로퍼티를 이벤트 객체에 추가해주면 `detail` 프로퍼티 없이도 이벤트에 커스텀 데이터를 추가할 수 있지만 다른 이벤트 프로퍼티와의 충돌을 피하기 위해서 `detail`을 사용한다.
- `new CustomEvent`를 사용하면 코드 자체로 해당 이벤트가 '커스텀 이벤트'라는 걸 명확하게 드러내는 효과가 있다.

## event.preventDefault()

- 우리가 직접 만든 커스텀 이벤트는 기본 동작이 없다. (여기서 '기본 동작'은 step20에서 학습했던 것처럼 링크를 누르면 특정 URL로 이동하는 등의 브라우저 기본 동작을 말함) 그러나 커스텀 이벤트를 만들고 디스패칭하는 코드에 원하는 동작을 넣으면 커스텀 이벤트에도 기본 동작을 설정해줄 수 있다.
- `event.preventDefault()`를 호출하면 이벤트 기본 동작을 취소할 수 있다.([step20](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step20.md) 참고)
- 이벤트의 기본 동작이 취소되면 `elem.dispatchEvent(event)` 호출시 `false`를 반환한다.

### 예제

인용 출처: https://ko.javascript.info/dispatch-events `event.preventDefault()`

```
예시엔 id가 rabbit인 요소, "hide" 이벤트를 실행시키는 함수 hide()가 있습니다. hide()는 다른 코드들이 이벤트 실행 여부를 알 수 있게 해줍니다.

rabbit.addEventListener('hide',...)를 사용하면 어떤 핸들러에서도 "hide"를 리스닝 할 수 있습니다. 그리고 필요하다면 event.preventDefault()를 사용해 "hide" 이벤트의 기본 동작을 취소할 수 있습니다. 이렇게 기본동작이 취소되면 토끼가 화면에서 사라지지 않습니다.
```

- 이벤트를 정의할 때, `cancelabel` 속성을 `true`로 설정하지 않으면, `event.preventDefault()`를 사용하더라도 이는 무시된다.

❗ TODO 아래 예제에서 기본동작의 역할을 하는 건 토끼를 숨기는 `else{rabbit.hidden=true;}` 부분을 의미하는건가?

~~❗ TODO 버튼 여러번 눌러도 토끼가 숨겨지고 나타날 수 있도록 코드 수정해보기~~

```html
<pre id="rabbit">
           |\   /|
            \|_|/
            /. .\
           =\_Y_/=
            {>o<}
</pre>
<button onclick="hide_func()">hide_func()를 호출해 토끼 숨기기</button>
```

```js
rabbit = document.getElementById('rabbit');

function hide_func() {
  let evt = new CustomEvent('hide', {
    cancelable: true, // cancelabel 속성을 true로 설정하지 않으면 preventDefault()가 동작하지 않는다.
  });
  if (!rabbit.dispatchEvent(evt)) {
    // preventDefault()가 실행되어 기본동작이 취소되었다면 dispatchEvent()의 반환값이 false일 것
    alert('기본 동작이 핸들러에 의해 취소되었습니다.');
  } else {
    rabbit.hidden = true; // 토끼를 숨김
  }
}

rabbit.addEventListener('hide', function (event) {
  if (confirm('preventDefault()를 호출하시겠습니까?')) {
    // confirm창에서 확인 누를 경우
    event.preventDefault(); // 기본 동작 취소
  }
});
```

> **코드 설명**

1. 버튼을 클릭하면 hide_func() 함수가 실행된다.

2. 변수 evt에 hide라는 커스텀 이벤트가 등록되고 if문이 실행된다.

3. `rabbit.dispatchEvent(evt)`가 실행돼 hide라는 이벤트가 발생했다. rabbit 요소에 등록된 이벤트 핸들러가 실행된다.(confirm창 나타남)

- `확인`를 누를 경우 `preventDefault()`로 기본동작이 취소되고 `rabbit.dispatchEvent(evt)`의 반환값이 `false`가 된다 -> alert창이 실행된다.

- `취소`를 누를 경우 else 블록이 실행되어 토끼를 숨기는 동작이 실행된다.

## 이벤트 안 이벤트

- 이벤트는 대개 큐에서 처리된다. 예를 들어 브라우저가 `onclick` 이벤트를 처리하고 있는데 마우스를 움직여 새로운 이벤트를 발생시키면 `onclick`에 대한 이벤트 처리가 끝난 다음에 `mousemove` 핸들러가 호출된다.
- 그러나 이벤트 안 이벤트 상황에선 위처럼 이벤트가 처리되지않고 **이벤트 안에 있는 이벤트가 즉시 처리된다.** 이벤트 안 이벤트라 함은 `dispatchEvent` 처럼 이벤트 안에 다른 이벤트가 있는 경우나 이벤트 핸들러 안에서 다른 이벤트를 트리거하는 경우 등을 의미한다.

```html
<button id="menu">메뉴(클릭!)</button>
```

```js
menu = document.getElementById('menu');

menu.onclick = function () {
  alert(1);

  // 이벤트가 버블링되어 document에 등록한 이벤트 핸들러가 동작하게 된다.
  menu.dispatchEvent(
    new CustomEvent('menu-open', {
      bubbles: true, // 버블링 명시
    })
  );

  alert(2);
};

document.addEventListener('menu-open', () => alert('중첩 이벤트'));
```

- 결과: 경고창에 '1', '중첩 이벤트', '2'가 차례대로 출력됨

  - `menu-open`이벤트가 `onclick`이벤트가 처리되는 도중에 트리거되었음을 볼 수 있다. 위 코드에서 이벤트 안의 이벤트인 커스텀 이벤트가 즉시 처리된 것이다.

- 중첩 이벤트가 즉시 처리되는걸 원치 않는 경우

  - `onclick` 끝에 `dispatchEvent`등의 이벤트 트리거 호출을 넣거나
  - 중첩 이벤트를 지연시간이 0인 `setTimeout`로 감싸는 것이 방법이 될 수 있다.

```html
<button id="menu">메뉴(클릭!)</button>
```

```js
// 중첩이벤트의 즉시 처리 막기

menu = document.getElementById('menu');

menu.onclick = function () {
  alert(1);

  setTimeout(() =>
    menu.dispatchEvent(new CustomEvent('menu-open', { bubbles: true }))
  );

  alert(2);
};

document.addEventListener('menu-open', () => alert('중첩 이벤트'));
```

❗ TODO 지연 시간이 0인 `setTimeout`으로 감싸면 중첩이벤트가 즉시 처리되지 않는 이유는?..

> 은영님 리뷰 인용
>
> setTimeout 의 지연시간이 0 이라고 하더라도, **비동기 함수**이며, 큐에 들어가기 때문에 즉시 처리되지 않습니다.
>
> 그리고 0은 최소 대기 시간이기 때문에 다른 작업들에 밀려 더 지연될 수 있습니다 !
>
> https://evan-moon.github.io/2019/08/01/nodejs-event-loop-workflow/

# References

커스텀 이벤트 디스패치

- https://ko.javascript.info/dispatch-events

MDN

- https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
- https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
- https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX

How to trigger event in JavaScript?

- https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript

JavaScript 이벤트 트리거를 사용, input 속성 커스터 마이징

- https://cbw1030.tistory.com/304

자바스크립트를 사용하여 이벤트 추가 및 제거하기

- https://webisfree.com/2017-04-18/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%B6%94%EA%B0%80-%EB%B0%8F-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0

JS/CustomEvent 자바스크립트, 커스텀 이벤트 생성하기

- https://im-developer.tistory.com/190

`addEventListener()` / 이벤트 관련 여러 개념들

- https://pathas.tistory.com/213

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step21.md)
- [@eyabc](https://eyabc.github.io/Doc/dev/core-javascript/Browser_event_custom_dispatch.html#event-%EC%9D%98-%EC%83%9D%EC%84%B1%EC%9E%90)
- [@khw970421](https://velog.io/@khw970421/%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%94%94%EC%8A%A4%ED%8C%A8%EC%B9%98step-21)
- [@JeongShin](https://www.notion.so/Custom-Event-22bcc1bfe4a5470aa93447b1d5b69e32)

# 추가

## `커스텀 이벤트 버블링 예시` 관련

### 형욱님 문서

```
만약 이부분은 {bubbles:true} 부분을 생략한다면 브라우저 로드 시 addEventListener가 발생하지않는다.

기본적으로 이벤트가 발생하면 이벤트 흐름은 document부터 시작해서 해당 위치의 이벤트 발생지점까지 캡쳐링을 하고 다시 버블링을 통해 간다면 {bubbles:true}를 삭제해도 결과가 같을거라 보는데
만약 이런 다른 결과라면 dispatchEvent는 따로 이벤트 흐름의 캡쳐링 없이 말그대로 dispatch(전송) 이므로 document부터의 전송없이 해당 이벤트 위치에 바로 도달하고 그 후 버블링을 통해 처리되지않는것이기 때문일까 개인적으로 생각을 한다. => 이에관련 내용에 의견들을 남겨주면 감사하겠습니다.
```

- 유림 리뷰

  잘 읽었습니다. `만약 이부분은 {bubbles:true} 부분을 생략한다면 브라우저 로드 시 addEventListener가 발생하지않는다.` 부분을 학습시 당연하게 받아들이기만 했는데 덕분에 생각해볼 수 있는 계기가 되었습니다. 감사합니다.
  전 `dispatchEvent`가 이벤트를 실행하게 하는거라 이해를 했습니다. `elem.dispatchEvent(event)`에서 'hello'라는 커스텀 이벤트가 '발생'한다고 생각했는데 elem이라는 해당요소까지 캡처링은 이루어지지만(이벤트 자체가 전파는 되나 핸들러는 작동하지 않음) 이벤트 정의시 {bubbles: true}를 명시해주지 않으면 버블링으로 전파되는 이벤트가 캐치되지 않게 하는 로직을 갖고있는 것은 아닐까 싶네요.. 적다보니 더 헷갈리네요 ㅋㅋ 물론 아닐 수도 있습니다!

- 유림 추가

  캡처링 단계에서 이벤트를 잡아내려면 `addEventListener`의 세번째 인자(captured속성?)를 true로 줘야하며 이렇게 되면 버블링되는 이벤트는 캐치하지 않는 듯하다. ~~이벤트 전파 학습했던거 생각해보면 이건 당연한것!~~
  이렇게 true로 하고 커스텀이벤트에 bubbles:true를 지정해도 버블링은 캐치되지 않음

- 은영 리뷰

  ```
  기본적으로 이벤트가 발생하면 이벤트 흐름은 document부터 시작해서 해당 위치의 이벤트 발생지점까지 캡쳐링을 하고 다시 버블링을 통해 간다면 {bubbles:true}를 삭제해도 결과가 같을거라 보는데 만약 이런 다른 결과라면 dispatchEvent는 따로 이벤트 흐름의 캡쳐링 없이 말그대로 dispatch(전송) 이므로 document부터의 전송없이 해당 이벤트 위치에 바로 도달하고 그 후 버블링을 통해 처리되지않는것이기 때문일까 개인적으로 생각을 한다. => 이에관련 내용에 의견들을 남겨주면 감사하겠습니다.

  형욱님의 생각을 보고 저도 버블링과 캡쳐링을 다시 공부하게 되었는데요, https://eyabc.github.io/Doc/dev/core-javascript/Browser_Bubling_Capturing.html#%EC%BA%A1%EC%B2%98%EB%A7%81

  제생각에는 버블링과 캡쳐링은 항상 일어나지만 이벤트 핸들러가 캡쳐링에서 일어나느냐 버블링에서 일어나느냐의 차이 같습니다.
  ```
