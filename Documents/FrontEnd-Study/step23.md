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

id가 `#out_div`인 `div`안에 id가 `#in_div`인 `div`가 들어있는 경우를 생각해보자. `mouseover`과 `mouseout` 이벤트 핸들러를 `#out_div`에만 적용했다. 해당 이벤트가 핸들러가 바인딩된 요소에 발생할 때 **발생한 이벤트 타입**과 **`event.target` 요소의 id**가 하단에 (누적되며) 출력된다.

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

`#out_div`에만 이벤트 핸들러를 바인딩했는데 왜 `#in_div` 요소에서도 `mouseover` 에 대한 핸들러가 동작할까?
이는 `mouseover`, `mouseout` 이벤트의 경우 부모에 할당된 이벤트핸들러가 자식에서도 동작하기 때문이다.
정확히 말하면 이벤트가 버블링되기 때문이다.
`#out_div`에서 `#in_div`로 마우스를 이동할 때 `#out_div`의 자식요소인 `#in_div`에서 `mouseover`이벤트가 발생한다. 다만 해당 자식 요소에서 발생한 `mouseover` 이벤트에 대한 이벤트핸들러가 없을 뿐이다. 그런데 `mouseover`, `mouseout`의 경우 이벤트는 버블링 되기 때문에(버블링은 [STEP 13 문서](step13_dom.md) 참고) `#in_div`에서 발생한 `mouseover` 이벤트 자체가 부모 요소로 버블링되어 `#out_div`에 할당된 이벤트 핸들러가 실행되는 것이다. 이때 이벤트가 실제로 발생한 곳은 `#in_div`이기 때문에 `event.target.id`로는 `#in_div`가 출력된다.

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

2. `mouseover`, `mouseout` 대신 `mouseenter`, `mouseleave` 사용

# Event delegation

`mouseenter`, `mouseleave` 이벤트는 유용하지만 버블링되지 않아서 이 이벤트를 사용할 시 **이벤트 위임**을 활용할 수가 없다.(이벤트 위임은 [STEP 19 문서](step19.md) 를 참고)
테이블의 셀들에 대해 마우스 enter/leave 동작을 핸들링하고 싶다고 해보자. (심지어 그 셀들은 수백개가 된다고 가정해보자) 만약 `<table>`에 핸들러가 지정되어있을 때, `mouseenter/leave` 이벤트를 쓸 경우 이는 버블링되지 않는다. `<td>`에 이벤트가 일어나도 핸들러는 `<table>` 전체에 대한 enter/leave만 잡아낸다. `mouseenter/leave` 대신 `mouseover/out`을 사용하여 원하는 방식으로 구현해보자.

## 예제 코드

다음은 버블링이 되는 `mouseover/out`을 이용하여 요소에 마우스를 놓았을 때 요소가 하이라이트 되게한 간단한 예제이다.

```html
<table id="table">
  <tr>
    <th colspan="3"><em>Mandal-Art</em> 2021 Plan</th>
  </tr>
  <tr>
    <td class="nw"><strong>건강</strong> <br />물 2L 마시기</td>
    <td class="n"><strong>자기계발</strong> <br />토익 점수 취득</td>
    <td class="ne"><strong>스트레스 관리</strong> <br />명상</td>
  </tr>
  <tr>
    <td class="w"><strong>공부</strong> <br />자바스크립트</td>
    <td class="c"><strong>Wol-dan</strong> <br />Better me!</td>
    <td class="e"><strong>재테크</strong> <br />앱테크 하기</td>
  </tr>
  <tr>
    <td class="sw"><strong>습관</strong> <br />7시 기상</td>
    <td class="s"><strong>네트워킹</strong> <br />연락</td>
    <td class="se"><strong>취미</strong> <br />노래듣기</td>
  </tr>
</table>

<textarea id="text"></textarea>

<input type="button" onclick="text.value=''" value="Clear" />
```

```css
/* index4.html, step23_4.js 관련 */
#text {
  display: block;
  height: 100px;
  width: 456px;
}

#table th {
  text-align: center;
  font-weight: bold;
}

#table td {
  width: 150px;
  white-space: nowrap;
  text-align: center;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 12px;
  cursor: pointer;
}

#table .nw {
  background: rgb(255, 0, 0);
  color: #fff;
}

#table .n {
  background: rgb(255, 123, 0);
  color: #fff;
}

#table .ne {
  background: rgb(230, 208, 14);
  color: #fff;
}

#table .w {
  background: rgb(29, 231, 11);
  color: #fff;
}

#table .c {
  background: rgb(197, 197, 197);
  color: #fff;
}

#table .e {
  background: #09f;
  color: #fff;
}

#table .sw {
  background: rgb(17, 0, 255);
  color: #fff;
}

#table .s {
  background: rgb(153, 0, 255);
  color: #fff;
}

#table .se {
  background: rgb(255, 0, 170);
  color: #fff;
}

#table .highlight {
  background: rgb(58, 58, 58);
}
```

```js
table.onmouseover = function (event) {
  let target = event.target;
  target.classList.toggle('highlight');
  // target.style.background = 'pink';

  text.value += `over -> ${target.tagName}\n`;
  text.scrollTop = text.scrollHeight;
  // console.log(text.scrollTop);
  // console.log(text.scrollHeight);
};

table.onmouseout = function (event) {
  let target = event.target;
  target.classList.toggle('highlight');
  // target.style.background = '';

  text.value += `out <- ${target.tagName}\n`;
  text.scrollTop = text.scrollHeight;
};
```

결과:

![js_last_1](https://user-images.githubusercontent.com/33214449/105059600-d04c2480-5aba-11eb-880c-0e465707cfeb.gif)

그런데 이렇게 되면 `<td>` 내의 `<strong>`같은 요소나 제목의 `<em>`과 같은 요소도 마우스를 대면 하이라이팅된다. 이들은 걸러내고 표의 셀만 하이라이팅 하고 싶다면 다음과 같이 코드를 수정하여 이외의 경우들을 제외시켜야 한다.

1. `mouseover` 발생시, 여전히 현재 `<td>`안에 마우스가 있다면 무시
2. `mouseout` 발생시, 현재 `<td>`를 떠난게 아니라면 무시

> 💡 새로 알게된 점
>
> - js코드에서 table 을 입력하면 `<table>` 요소가, 특정 `id`를 입력하면 해당 요소가 출력된다. 예제 코드의 js 코드에 `table`, `text`를 보면 알 수 있음
>
> - `Element.closest`: 엘리먼트에서 가장 가까운 조상 반환(없다면 null값 반환)
>
> - `Node.contains`: 인자가 주어진 노드의 자손인지 아닌지 Boolean값 리턴
>
> - `Element.scrollTop` 프로퍼티: 요소의 내용이 수직적으로 스크롤된 픽셀값을 의미하며 읽을 수도, 지정할 수도 있음.
>
>   요소를 스크롤할 수 없다면 `scrollTop`은 `0`일 것.
>
>   참고: [Element.scrollTop, MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)
>
> - `Element.scrollHeight` 프로퍼티: read-only. overflow로 인해 화면에 표시되지 않는 콘텐츠를 포함하여 요소의 콘텐츠 높이를 측정한 값임. padding은 포함하나 border, margin, 수평 스크롤바는 포함하지 않음
>
>   참고: [Element.scrollHeight, MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)
>
> ❓ 코드에 `scrollTop = scrollHeight` 식으로 작성되어있는데 이게 마우스 이벤트핸들러가 발생할 때마다 textarea에 결과를 출력하는 것을 스크롤을 내리며 쫓아가기 위해서 작성한 것이란 건 알겠다. 근데 값이 이해가 안됨... scrollTop에 scrollHeight를 대입하는데, 둘을 출력해보면 그 값이 다름. scrollTop은 스크롤된 정도(그니까 요소의 top부터 스크롤되서 안보이는 부분도 포함하면서 보이기 시작하는 딱 그 부분까지의 거리값)이고 scrollHeight은 요소의 콘텐츠의 높이(스크롤로 안보이는 부분 모두 포함)인 듯 한데 헷갈린다

![image](https://user-images.githubusercontent.com/33214449/105045645-7abc4b80-5aab-11eb-945e-875708ecdd41.png)

## 수정된 코드

html, css 코드는 위의 예제 코드와 같다.

❗ TODO 코드 더 이해 필요

```js
let currentElem = null;

table.onmouseover = function (event) {
  // 새로운 요소에 들어가기 전에, 마우스는 항상 이전 것을 떠난다.
  // 만약 currentElem이 지정됐다면, <td>를 떠난 것은 아니다.
  // mouseover이 <td>안에 있는 것이라는 거고 이벤트를 무시
  if (currentElem) return;

  // 이벤트가 발생한 엘리먼트에서 가장 가까운 조상인 td 반환(없다면 null값 반환)
  let target = event.target.closest('td');

  // <td> 안으로 이동한게 아니라면 무시
  if (!target) return;

  // <td>로 이동했으나, 테이블 밖의 <td>인 경우(중첩 테이블에서 가능함) 무시 // td가 table의 자손이 아니라는 것 -> 중첩테이블일 수 있다는 것
  if (!table.contains(target)) return;

  // 드디어 새로운 <td>로 들어왔다!
  currentElem = target;
  onEnter(currentElem);

  // target.classList.toggle('highlight');

  //text.value += `over -> ${target.tagName}\n`;
  //text.scrollTop = text.scrollHeight;
};

table.onmouseout = function (event) {
  // <td>밖에 있다면 무시 ex) tr->tr
  if (!currentElem) return;

  // mouseout은 떠난거니까 향하는 곳은 relatedTarget 프로퍼티 안에 있을 것 // 마우스 떠나서 어디로 향하는가?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // 부모 체크 - 여전히 currentElem에 있는 거라면 무시하기 위해 // td->같은 td면 무시해야되니까
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // <td> 완전히 떠난 것 확인된 것! really!
  onLeave(currentElem);
  currentElem = null;
};

function onEnter(elem) {
  elem.style.background = 'gray';

  // textarea에 출력하는 부분
  text.value += `over -> ${elem.tagName}.${elem.className}\n`;
  //text.scrollTop = text.scrollHeight;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // textarea에 출력하는 부분
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
```

결과:

![js_last_2](https://user-images.githubusercontent.com/33214449/105059707-eb1e9900-5aba-11eb-84fc-cd263bcdfc11.gif)

# References

- [Moving the mouse: mouseover/out, mouseenter/leave](https://ko.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave)

- [Javascript] 마우스 이벤트(event) 종류 https://hianna.tistory.com/492

- textarea 자동 높이값 https://velog.io/@imim/textarea-%EC%9E%90%EB%8F%99-%EB%86%92%EC%9D%B4%EA%B0%92
