[문서 목록으로 돌아가기](README.md)

> # STEP 25
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 25 [드래그 앤 드롭과 마우스 이벤트](https://ko.javascript.info/mouse-drag-and-drop)
> - 기한: 01/30(토) ~ 02/02(화)

# 보충 필요

# 목차

- [드래그 앤 드롭](#드래그-앤-드롭)
- [드래그 앤 드롭과 마우스 이벤트](#드래그-앤-드롭과-마우스-이벤트)
- [잠재적 드롭 대상](#잠재적-드롭-대상)

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

> 본 문서는 [드래그 앤 드롭과 마우스 이벤트](https://ko.javascript.info/mouse-drag-and-drop) 문서를 기반으로 작성하였습니다.

# 드래그 앤 드롭

## 드래그 앤 드롭이 필요한 때

- 파일 관리시, 파일을 복사해 이동시키며 추가하는 기능
- 주문하려는 제품을 장바구니에 드롭하는 기능

## 기본 드래그 이벤트의 한계

- 특정 영역에서 드래그하는 것을 막을 수 없다.
- 수평이나 수직으로만 드래그하는 기능을 만들 수 없다.
- 모바일 환경에서의 지원 부족

# 드래그 앤 드롭과 마우스 이벤트

마우스 이벤트를 사용해 드래그 앤 드롭을 구현함으로써 기본 드래그 이벤트의 한계를 극복할 수 있다.

1. `mousedown` 에서 움직임이 필요한 요소를 준비. 기존 요소의 복사본을 만들거나 해당 요소에 클래스를 추가하는 방식으로 작성한다.
2. 그 다음, `mousemove`에서 `position:absolute`의 `left·top`을 변경한다.
3. `mouseup`에서는 드래그 앤 드롭 완료와 관련된 모든 작업을 수행한다.

공을 드래그하는 코드를 구현해보자.

```js
const $ball = document.getElementById('ball');

$ball.addEventListener('dragstart', onDragStart);
$ball.addEventListener('mousedown', onMouseDown);

// 브라우저 자체적으로 이미지나 요소에 대한 드래그 앤 드롭을 지원하기 때문에 자동실행된다. 이와 아래 구현한 드래그 앤 드롭 로직이 충돌하는 걸 막기 위해서 'dragstart' 이벤트에 대해 아래와 같은 핸들러를 등록해야한다.
function onDragStart() {
  event.preventDefault();
}

function onMouseDown() {
  // 1. absolute와 zIndex 속성을 이용해, 공을 z-index 상 가장 위에서 움직이도록 하기 위한 코드
  $ball.style.position = 'absolute';
  $ball.style.zIndex = 1000;

  // 현재 위치한 부모에서 body로 직접 이동하여 body를 기준으로 위치를 지정함
  document.body.append($ball);

  // 공을 pageX, pageY 좌표 중앙에 위치시킴
  function moveAt(pageX, pageY) {
    $ball.style.left = pageX - $ball.offsetWidth / 2 + 'px';
    $ball.style.top = pageY - $ball.offsetHeight / 2 + 'px';
  }

  // 포인터 아래로 공을 이동시킴
  moveAt(event.pageX, event.pageY);

  // ===============

  function onMouseMove() {
    moveAt(event.pageX, event.pageY);
  }

  // 2. mousemove로 공을 움직임
  // $ball이 아닌 document에서 `mousemove`를 추적해야하기 때문에 이렇게 작성한다.
  document.addEventListener('mousemove', onMouseMove);

  // =============

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    $ball.onmouseup = null;
  }

  // 3. 공을 드롭하고, 불필요한 핸들러 제거
  $ball.addEventListener('mouseup', onMouseUp);
}
```

> z-index
>
> - <CSS> z-index (태그들이 보이는 순위 정하기) https://grace-go.tistory.com/38

> `append()`
>
> - MDN - ParentNode.append() https://developer.mozilla.org/ko/docs/Web/API/ParentNode/append

> CSS `position` 속성
>
> - `static`: (기본값) 요소를 일반적인 문서 흐름에 따라 배치
> - `relative`: 위치 계산시 static일 때 자기 자신의 위치를 기준으로 계산. `top`, `right`, `bottom`, `left` 값에 따라 위치 설정 가능
> - `absolute`: 요소를 일반적인 문서 흐름에서 제거하고(static일 때 위치 안 따른다는 것), 가장 가까운 조상 요소에 대해 상대적으로 배치됨
> - `fixed`: 요소를 일반적인 문서 흐름에서 제거하고, 원래 위치와 상관없이 위치 지정 가능. 상위 요소에 영향을 받지 않는다. 화면이 바뀌더라도 고정된 위치를 설정할 수 있다. viewport의 상대 위치를 기준으로 위치가 결정된다.
>
> https://developer.mozilla.org/ko/docs/Web/CSS/position
>
> https://electronic-moongchi.tistory.com/26

## 예제 코드 수정

```js
$ball.style.left = pageX - $ball.offsetWidth / 2 + 'px';
$ball.style.top = pageY - $ball.offsetHeight / 2 + 'px';
```

위의 예제에서 공은 항상 포인터 중앙의 아래로 이동한다. 그런데 이처럼 코드를 작성하게 되면 공의 가장자리를 눌렀을 때 마우스 포인터 아래로 공이 점프되는 문제가 발생한다. 이를 개선해보자.

- 사용자가 공을 눌렀을 때(`mousedown` 이벤트가 발생했을 때), 포인터와 공의 왼쪽 끝, 위쪽 끝까지의 거리를 각각 기억한다. 공을 드래그하는 동안 이 거리를 유지하도록 한다. 이는 포인터 좌표에서 공의 왼쪽, 위쪽 좌표를 각각 빼서 구할 수 있다.

  ![image](https://user-images.githubusercontent.com/33214449/106633632-593a8400-65c2-11eb-8782-208a2b51c976.png)

  ```js
  // onMouseDown()
  let shiftX = event.clientX - $ball.getBoundingClientRect().left;
  let shiftY = event.clientY - $ball.getBoundingClientRect().top;
  ```

  > `Element.getBoundingClientRect()`
  >
  > 요소의 크기와 viewport를 기준으로 한 요소의 상대적인 위치 정보를 담은 `DOMRect` 객체를 반환하는 메서드

  - [JavaScript] 요소의 절대좌표 상대좌표 구하기 https://mommoo.tistory.com/85

- 공을 드래그하는 동안 포인터를 기준으로 같은 위치에 공이 이동되게 하자.

  ```js
  // onMouseMove()

  $ball.style.left = event.pageX - shiftX + 'px';
  $ball.style.top = event.pageY - shiftY + 'px';
  ```

- 수정사항이 반영된 전체 코드 (수정된 라인은 ✏️로 표시했다.)

  ```js
  const $ball = document.getElementById('ball');

  $ball.addEventListener('dragstart', onDragStart);
  $ball.addEventListener('mousedown', onMouseDown);

  function onDragStart() {
    event.preventDefault();
  }

  function onMouseDown() {
    let shiftX = event.clientX - $ball.getBoundingClientRect().left; // ✏️
    let shiftY = event.clientY - $ball.getBoundingClientRect().top; // ✏️

    // 1.
    $ball.style.position = 'absolute';
    $ball.style.zIndex = 1000;

    document.body.append($ball);

    // 공에 클릭된 포인터의 위치를 고려한 로직
    function moveAt(pageX, pageY) {
      $ball.style.left = pageX - shiftX + 'px'; // ✏️
      $ball.style.top = pageY - shiftY + 'px'; // ✏️
    }

    moveAt(event.pageX, event.pageY);

    // =============

    function onMouseMove() {
      moveAt(event.pageX, event.pageY);
    }

    // 2.
    document.addEventListener('mousemove', onMouseMove);

    // =============

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      $ball.onmouseup = null;
    }

    // 3.
    $ball.addEventListener('mouseup', onMouseUp);
  }
  ```

# 잠재적 드롭 대상

지금까지 작성했던 예제 코드에서는 공을 '어디서나' 드롭할 수 있었다. 그러나 '파일'을 '폴더'에 가져다 놓는 것 처럼 실질적으로는 한 요소를 다른 요소에 드롭하는 경우가 많다. 이를 구현하려면 어떻게 해야할까?

잠재적으로 놓을 수 있는 요소에 `mouseover·mouseup` 이벤트 핸들러를 설정하면 어떨까. 그러나 이렇게 하면 동작하지 않는다. 드래그하는 동안 드래그 할 수 있는 요소가 항상 다른 요소보다 위에 있다.(z-index 생각) 마우스 이벤트의 맨 위 요소에서만 이벤트가 발생하고 그 아래에는 이벤트가 발생하지 않는다.

예를 들어 아래 예제처럼 파란색 `<div>`요소 전체를 덮는 빨간색 `<div>`요소가 있다고 해보자. 빨간색 요소가 제일 위에 있어서 파란색 요소의 이벤트를 잡을 수 없을 것이다.

```html
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('never works')"></div>
<div style="background:red" onmouseover="alert('over red!')"></div>
<!-- 빨간색 요소로 mouseover 하면 over red!만이 출력된다 -->
```

드래그할 수 있는 요소였던 공을 빨간색 요소라고 생각해보자. 공은 항상 다른 요소보다 위에 있어 이벤트가 발생하지만 하위 요소에 설정한 핸들러는 동작하지 않는다. 그렇다면 어떻게 해야할까

- 주어진 윈도우 기준 좌표에서 가장 많이 중첩된 요소를 반환하는 `document.elementFromPoint(clientX, clientY)` 메서드를 사용하여 마우스 이벤트 핸들러에서 포인터 아래에 드롭 가능성을 감지하게 한다.

```js
// 마우스 이벤트 핸들러에서
$ball.hidden = true; // 드래그하는 요소를 숨김 // 공을 제외하고 가장 많이 중첩된 요소를 찾아야하기 때문

// elemBelow는 드롭할 수 있는 공의 '아래 요소'이다.
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

$ball.hidden = false;
```

아래 전체 코드를 실행하면 공을 축구 골대 위로 드래그 했을 때 골대가 강조 표시된다.

수정사항이 반영된 전체 코드 (수정된 부분은 🌟로 표시했다.)

```js
let currentDroppable = null; // 🌟

const $ball = document.getElementById('ball');

$ball.addEventListener('dragstart', onDragStart);
$ball.addEventListener('mousedown', onMouseDown);

function onDragStart() {
  event.preventDefault();
}

function onMouseDown() {
  let shiftX = event.clientX - $ball.getBoundingClientRect().left;
  let shiftY = event.clientY - $ball.getBoundingClientRect().top;

  // 1.
  $ball.style.position = 'absolute';
  $ball.style.zIndex = 1000;

  document.body.append($ball);

  function moveAt(pageX, pageY) {
    $ball.style.left = pageX - shiftX + 'px';
    $ball.style.top = pageY - shiftY + 'px';
  }

  moveAt(event.pageX, event.pageY);

  // ===============

  function onMouseMove() {
    moveAt(event.pageX, event.pageY);

    // 🌟 추가~~
    $ball.hidden = true;
    // 좌표가 윈도우 밖에 있으면 elemFromPoint() 메서드는 null을 반환한다
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    $ball.hidden = false;

    // 공을 윈도우 밖으로 드래그하는 경우는 제외시켜줘야한다.
    if (!elemBelow) return;

    // null이다가 골대로 드래그 되면 골대 요소가 담기겠지(closest는 자기 자신부터 탐색 -> 부모 요소)
    let droppableBelow = elemBelow.closest('.droppable');

    if (currentDroppable != droppableBelow) {
      // 들어오거나 날리거나...
      // 참고: 두 값 모두 null일 수 있다.
      //   currentDroppable=null 이벤트 전에 놓을 수 있는 요소 위에 있지 않다면(예: 빈 공간)
      //   droppableBelow=null 이벤트 동안 놓을 수 있는 요소 위에 있지 않다면

      // '날아가는 것'을 처리 (강조 제거)
      if (currentDroppable) leaveDroppable(currentDroppable);
      currentDroppable = droppableBelow;

      // '들어오는 것'을 처리
      if (currentDroppable) enterDroppable(currentDroppable);
    }
    // 🌟 ~~추가
  }

  // 2.
  document.addEventListener('mousemove', onMouseMove);

  // =============

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    $ball.onmouseup = null;
  }

  // 3.
  $ball.addEventListener('mouseup', onMouseUp);
}

// 🌟
function enterDroppable(elem) {
  elem.style.background = 'pink';
}

// 🌟
function leaveDroppable(elem) {
  elem.style.background = '';
}
```

# Comment

# References

- 드래그 앤 드롭과 마우스 이벤트 https://ko.javascript.info/mouse-drag-and-drop#ref-2068

- <CSS> z-index (태그들이 보이는 순위 정하기) https://grace-go.tistory.com/38

- MDN - z-index 적용 https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Adding_z-index

- [JavaScript] 요소의 절대좌표 상대좌표 구하기 https://mommoo.tistory.com/85

- MDN - Element.getBoundingClientRect() https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

- MDN - ParentNode.append() https://developer.mozilla.org/ko/docs/Web/API/ParentNode/append

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step25.md)
- [@eyabc](https://eyabc.github.io/Doc/dev/core-javascript/Browser_event_mouse-drag-and-drop.html#drag-drop-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)
- [@khw970421](https://velog.io/@khw970421/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD%EA%B3%BC-%EB%A7%88%EC%9A%B0%EC%8A%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8-step-25)
- [@JeongShin](https://www.notion.so/Mouse-Event-2b76e384694845949f67b536e78282a1)
