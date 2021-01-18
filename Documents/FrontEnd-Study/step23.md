[문서 목록으로 돌아가기](README.md)

# STEP 23

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)

- 작성자: Wol-dan (@pul8219)

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위: STEP 23 [Moving the mouse: mouseover/out, mouseenter/leave](https://ko.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave)

- 기한: 01/16(토) ~ 01/19(화)

# 보충 필요

# 목차

# Moving the mouse: mouseover/out, mouseenter/leave

> [Moving the mouse: mouseover/out, mouseenter/leave](https://ko.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave) 내용을 정리하였습니다.

# `mouseover`/`mouseout` 이벤트와 `relatedTarget`

![image](https://user-images.githubusercontent.com/33214449/104907307-386e0e00-59c8-11eb-82a2-bc544c92001c.png)

출처: https://ko.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave

> - `mouseover`:마우스 커서가 요소 밖에 있다가 요소 안으로 움직일 때 발생하는 이벤트
> - `mouseout`: 마우스 커서가 요소 위에 있다가 요소 밖으로 움직일 때 발생하는 이벤트
>
> 두 이벤트 모두 해당 이벤트 핸들러가 적용된 요소의 자식 요소에게도 적용된다. ([STEP 22](step22.md)에서 살펴봤다.)

## `relatedTarget`

`mouseover`과 `mouseout` 이벤트는 `relatedTarget`이라는 특별한 프로퍼티를 가진다. 이 프로퍼티는 `target` 프로퍼티를 보완한다. (+ `mouseenter`, `mouseleave` 이벤트도 `relatedTarget` 프로퍼티를 가진다.) 마우스가 어떤 요소를 떠날 때 그 중 하나는 `target`이 되고 다른 하나는 `relatedTarget`이 된다.

`mouseover`의 경우,

- `event.target` -> 마우스가 온 요소를 가리킴
- `event.relatedTarget` -> 마우스가 떠나온 요소를 가리킴
- 마우스의 이동: `relatedTarget` -> `target`)

`mouseout`의 경우, (`mouseover`의 경우와 반대)

- `event.target` -> 마우스가 떠난 요소를 가리킴
- `event.relatedTarget` -> 새로 도착한 요소
- 마우스의 이동: `target` -> `relatedTarget`)

> `event.target` 속성이 **실제 이벤트가 발생한 요소**를 뜻하는 것을 기억하면 위의 내용을 쉽게 이해할 수 있을 것이다.

참고: [MouseEvent.relatedTarget, MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)

> ⚠️ `relatedTarget` 은 `null`이 될 수 있다.
>
> 다른 요소로부터 온 게 아니거나, window 밖에서 온 경우 `relatedTarget`은 `null`값을 가진다.
>
> `relatedTarget`을 사용하는 코드에서 `null`일 경우에 대비해 예외처리를 해줘야 한다.

# Skipping elements

![image](https://user-images.githubusercontent.com/33214449/104914964-437a6b80-59d3-11eb-89a2-04914aa5e76b.png)

출처: https://ko.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave

`mousemove` 이벤트는 마우스가 이동할 때 트리거되는데, 모든 픽셀에서 이벤트를 일으키는 것은 아니다. 브라우저는 때때로(생각하는 것보단 천천히?) 마우스의 위치를 체크하고 변화를 알아채면 그때 이벤트를 트리거한다. 이 말은, 마우스를 매우 빠르게 움직일 때 몇개의 DOM 요소는 건너뛰어질 수 있다는 것이다.

> ℹ️ `mouseover` 이벤트가 트리거되면, `mouseout`도 반드시 일어난다.
>
> 마우스 포인터가 어떤 요소 위로 들어가 `mouseover`이 발생했다면 떠날 땐 반드시 `mouseout`이 발생

# `mouseover`, `mouseout` 와 자식 요소 관련

`mouseover`와 `mouseout`은 자식 요소로 해당 이벤트가 발생할 때도 동작한다고 [STEP 22](step22.md)에서 학습했다. 예제 코드를 통해 더 자세히 알아보자.

## `mouseover`, `mouseout` 예제

id가 `#out_div`인 `div`안에 id가 `#in_div`인 `div`가 들어있는 요소가 있다고 해보자. `mouseover`과 `mouseout` 이벤트 핸들러를 `#out_div`에만 적용했다. 해당 이벤트가 핸들러가 바인딩된 요소에 발생할 때 **발생한 이벤트 타입**과 **`event.target` 요소의 id**가 하단에 (누적되며) 출력된다.

```html
<!-- html -->
<div id="out_div">
  <div id="in_div"></div>
</div>

<input id="clearbtn" type="button" value="clear" />
<div id="result"></div>
```

```css
/* css */
#out_div {
  background: rgb(153, 113, 185);
  height: 100px;
  width: 100px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

#in_div {
  background: rgb(255, 255, 141);
  height: 50px;
  width: 50px;
  display: inline-block;
}
```

```js
// js
const div = document.getElementById('out_div');
const clearbtn = document.getElementById('clearbtn');
const result = document.getElementById('result');

div.addEventListener('mouseover', (event) => {
  result.innerHTML += `<div>${event.type} ${event.target.id}</div>`;
});

div.addEventListener('mouseout', (event) => {
  result.innerHTML += `<div>${event.type} ${event.target.id}</div>`;
});

clearbtn.addEventListener('click', (event) => {
  result.innerHTML = '';
  count = 0;
});
```

결과:

![js1_gif](https://user-images.githubusercontent.com/33214449/104936934-8bf45200-59f0-11eb-89d8-c438d20abec4.gif)

`#out_div`에서 `#in_div`로 마우스를 이동하면 아래와 같은 결과가 출력된다.

```
mouseout out_div
mouseover in_div
```

`#out_div`에만 이벤트 핸들러를 바인딩했는데 왜 `#in_div` 요소에서도 `mouseover` 이벤트가 발생할까?
이는 `mouseover`, `mouseout` 이벤트의 경우 부모에 할당된 이벤트핸들러가 자식에서도 동작하기 때문이다.
정확히 말하면 이벤트가 버블링되기 때문이다.
`#out_div`에서 `#in_div`로 마우스를 이동할 때 `#out_div`의 자식요소인 `#in_div`에서 `mouseover`이벤트가 발생한다. 다만 해당 자식 요소에서 발생한 `mouseover` 이벤트에 대한 이벤트핸들러가 없을 뿐이다. 그런데 `mouseover`, `mouseout`의 경우 이벤트는 버블링 되기 때문에([STEP 13 문서](step13_dom.md) 참고) `#in_div`에서 발생한 `mouseover` 이벤트 자체가 부모 요소로 버블링되어 `#out_div`에 할당된 이벤트 핸들러가 실행되는 것이다. 이때 이벤트가 실제로 발생한 곳은 `#in_div`이기 때문에 `event.target.id`로는 `#in_div`가 출력되는 것이다.

## `mouseenter`, `mouseleave`

html, css 코드는 위의 `mouseover`, `mouseout` 예제 코드와 같다.

```js
const div = document.getElementById('out_div');
const clearbtn = document.getElementById('clearbtn');
const result = document.getElementById('result');

div.addEventListener('mouseenter', (event) => {
  result.innerHTML += `<div>${event.type} ${event.target.id}</div>`;
});

div.addEventListener('mouseleave', (event) => {
  result.innerHTML += `<div>${event.type} ${event.target.id}</div>`;
});

clearbtn.addEventListener('click', (event) => {
  result.innerHTML = '';
  count = 0;
});
```

결과:

![js2_gif](https://user-images.githubusercontent.com/33214449/104941105-fb207500-59f5-11eb-8663-6080063152db.gif)

`mouseover`, `mouseout`와 달리 `mouseenter`, `mouseleave`는 이벤트가 버블링되지 않는다. 이벤트 핸들러가 등록된 `#out_div`에 마우스가 들어갔다 나올 때만 핸들러가 동작하는 것을 볼 수 있다. `#out_div`에서 하위요소인 `#in_div`로 들락날락해도 결과를 보면 전혀 반응이 없는 것을 볼 수 있다.

## `mouseover`, `mouseout` 버블링 관련 이슈

`mouseover, mouseout 예제` 코드와 같이 부모 요소 안에 자식 요소가 겹쳐져 있는 상황에서, 부모 요소를 떠나면 특정 애니메이션이 실행되는 프로그램을 만들고 싶다면 어떻게 해야할까?
`#out_div`(부모) 에서 `#in_div`(자식)요소로 마우스가 이동할 때는 부모 요소의 더 안쪽으로 들어간 것이지 부모 요소를 완전히 떠난 것이 아니다. 이를 반영하여 코드를 작성하기 위해서는 아래 방법들을 이용한다.

1. `relatedTarget`값 체크

편의상 `#out_div` -> `#parent`, `#input_div` -> `#child` 로 변경

```html
<div id="parent">
  <div id="child"></div>
</div>

<input id="clearbtn" type="button" value="clear" />
<div id="result"></div>
```

```css
#parent {
  background: rgb(153, 113, 185);
  height: 100px;
  width: 100px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

#child {
  background: rgb(255, 255, 141);
  height: 50px;
  width: 50px;
  display: inline-block;
}

#red_box {
  background: rgb(255, 0, 0);
  height: 100px;
  width: 100px;
  text-align: center;
}
```

```js
const div = document.getElementById('parent');
const clearbtn = document.getElementById('clearbtn');
const result = document.getElementById('result');

// id가 parent인 div를 떠나면(parent 내부의 child로 가는 것은 떠나는 것 아님) 하단에 빨간 박스를 띄우고 싶다고 해보자.

div.addEventListener('mouseout', (event) => {
  if (event.target.id == 'parent' && event.relatedTarget.id !== 'child') {
    // parent를 떠난 것이면서 child로 들어간 경우는 제외해야한다.
    result.innerHTML += `<div id='red_box'></div>`;
  }
});

clearbtn.addEventListener('click', (event) => {
  result.innerHTML = '';
  count = 0;
});
```

결과:

![js3_gif](https://user-images.githubusercontent.com/33214449/104944056-fcec3780-59f9-11eb-94f0-aa76af3cd94e.gif)

# Event delegation

# References

- [Moving the mouse: mouseover/out, mouseenter/leave](https://ko.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave)

- [Javascript] 마우스 이벤트(event) 종류 https://hianna.tistory.com/492
