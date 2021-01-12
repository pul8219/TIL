[문서 목록으로 돌아가기](README.md)

# STEP 22

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)

- 작성자: Wol-dan (@pul8219)

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위: STEP 22 [마우스 이벤트](https://ko.javascript.info/mouse-events-basics)

- 기한: 01/09(토) ~ 01/12(화)

# 보충 필요

...

# 목차

- [마우스 이벤트 종류](#마우스-이벤트-종류)

- [마우스 이벤트 순서](#마우스-이벤트-순서)

- [마우스 버튼](#마우스-버튼)

- [shift, alt, ctrl, meta 프로퍼티](#shift,-alt,-ctrl,-meta-프로퍼티)

- [clientX, clientY와 pageX, pageY](#clientX,-clientY와-pageX,-pageY)

- [mousedown 이벤트와 선택 막기](#mousedown-이벤트와-선택-막기)

- [References](#References)

- [팀원들 결과물](#팀원들-결과물)

> ❗ https://ko.javascript.info/mouse-events-basics 에서 많은 내용을 인용하고 참고하여 정리한 문서입니다.

# 마우스 이벤트

- 마우스 이벤트는 마우스 뿐만 아니라 핸드폰, 태블릿과 같은 장치에서도 발생한다.

## 마우스 이벤트 종류

- `mousedown`, `mouseup`: 요소 위에서 마우스 왼쪽 버튼을 누를 때, 마우스 버튼을 누르고 있다가 뗄 때 발생 (어떤 마우스 버튼이든 발생 가능)
- `mouseover`, `mouseout`: 마우스 커서가 요소 밖에 있다가 요소 안으로 움직일 때, 커서가 요소 위에 있다가 요소 밖으로 움직일 때 발생. 해당 이벤트 핸들러가 적용된 요소의 자식 요소에게도 적용됨.
- `mousemove`: 마우스를 움직일 때 발생
- `click`: 마우스 왼쪽 버튼을 사용해 요소 위에서 `mousedown` 이벤트와 `mouseup` 이벤트를 연달아 발생시킬 때 실행됨(요소를 왼쪽 버튼으로 계속 누르고 있기만 하고 떼지 않으면 click에 따른 동작이 이루어지지 않는 경험을 해봤을 것)
- `dblclick`: 동일한 요소를 두번 클릭할 때 발생(더블 클릭)
- `contextmenu`: 마우스 오른쪽 버튼을 눌렀을 때 발생. context menu가 화면에 보이기 전에 발생(특별한 단축키를 눌러도 마우스 오른쪽 버튼을 눌렀을 때처럼 컨텍스트 메뉴가 나타나게 할 수 있지만 이는 `contextmenu`라는 마우스 이벤트와 동일하진 않음)
- `auxclick`: 마우스 왼쪽버튼(주요 버튼)을 제외한 다른 버튼을 클릭했을 때 작동(ex. 오른쪽 버튼, 휠 버튼, 다른 매크로 버튼 등)
- `select`: text가 선택(드래그)됐을 때 동작. 요소가 input태그이고 태그의 type이 text, textarea일 때만 동작.
- `wheel`: 휠을 작동시킬 때 발생

참고: https://developer.mozilla.org/en-US/docs/Web/Events#Mouse_events

## 마우스 이벤트 순서

- 마우스 왼쪽 버튼을 클릭하면 `mousedown`, `mouseup`, `click` 이벤트가 발생한다. 이렇듯 사용자는 하나의 동작을 했어도 발생하는 이벤트는 여러가지일 수 있다.
- 이렇게 여러 이벤트가 실행될 때 실행 순서는 내부 규칙에 따른다.

ex)

- 마우스 왼쪽 버튼 클릭시 `mousedown` - `mouseup` - `click` 순으로 이벤트 발생
- 마우스 왼쪽 버튼 더블클릭시 `mousedown` - `mouseup` - `click` - `mousedown` - `mouseup` - `click` - `dblclick` 순으로 이벤트 발생

<https://ko.javascript.info/mouse-events-basics#ref-134> 에서 발생 순서에 대해 테스트 가능

## 마우스 버튼

### `button` 프로퍼티

- 클릭과 관련된 이벤트는 정확히 마우스의 어떤 버튼에서 이벤트가 발생했는지 알려주는 `button` 프로퍼티를 지원한다.
- `click`은 마우스 왼쪽 버튼을, `contextmenu`는 마우스 오른쪽 버튼을 눌렀을 때 발생하기 때문에 이와 관련해서는 `button`프로퍼티를 보통 사용하지 않는다.
- `mousedown`, `mouseup` 등의 이벤트는 어떤 버튼에서든 발생가능하기 때문에 해당 이벤트 핸들러에 `event.button`을 명시해야한다. 그래야 어떤 버튼에서 이벤트가 발생했는지 명확히 알 수 있다.

| 버튼                 | `event.button` |
| -------------------- | -------------- |
| 왼쪽(주요 버튼)      | 0              |
| 가운데(보조 버튼)    | 1              |
| 오른쪽(두 번째 버튼) | 2              |
| X1(뒤로 가기 버튼)   | 3              |
| X2(앞으로 가기 버튼) | 4              |

- `buttons` 프로퍼티: 여러 개의 버튼을 한꺼번에 눌렀을 때 해당 버튼들에 대한 정보를 정수 형태로 저장하는 프로퍼티

참고: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons

- `event.which` 프로퍼티는 지원하지 않는 오래된 코드이므로 사용하지 말 것

## shift, alt, ctrl, meta 프로퍼티

- 마우스 이벤트는 이벤트가 발생할 때 함께 누른 보조키가 무엇인지 알려주는 프로퍼티를 지원한다.
- 마우스 이벤트가 발생하는 도중에 어떤 키가 함께 눌러졌다면 해당 키와 관련된 프로퍼티 값이 `true`가 된다.

> 보조키 별로 지원하는 프로퍼티

- `shiftKey`: `Shift`키
- `altKey`: `Alt`키
- `ctrlKey`: `Ctrl`키
- `metaKey`: MacOS에서 `Cmd`키

**예제**

```html
<button id="button">Alt, Shift 키를 누른 상태에서 클릭</button>

<script>
  button.onclick = function (event) {
    if (event.altKey && event.shiftKey) {
      // event.altKey, event.shiftKey 프로퍼티의 값이 둘다 true일 때 // Alt, Shift 키를 누른 상태에서 클릭을 했다면
      alert('Success!');
    } else {
      alert('Error!');
    }
  };
</script>
```

> MacOS에서의 `Cmd`키

![image](https://user-images.githubusercontent.com/33214449/104317415-48e23c80-5521-11eb-81a9-5338fe5bf848.png)

Windows와 Linux처럼 MacOS도 `Alt`, `Ctrl`, `Shift`키를 지원하고 추가로 `Cmd`키를 지원한다. 이 키에 해당하는 프로퍼티로 `metaKey`가 있다. 응용 프로그램 대부분은 Windows, Linux에선 주로 `Ctrl`을 사용해 단축키를 조합하지만 MacOS는 `Cmd`키를 사용해 단축키를 조합하곤 한다. Windows의 `Ctrl+Enter`나 `Ctrl+A`가 MacOS에선 `Cmd+Enter`나 `Cmd+A`로 눌러야 제대로 동작한다는 뜻이다.

따라서 MacOS 사용자도 지원하는 프로그램을 만드려면 예를 들어 `Ctrl`키 + `click`이벤트가 발생했을 때 나타나는 동작이 MacOS에서 `Cmd`키 + `click`이벤트가 발생했을 때도 똑같이 나타나도록 코드를 작성해야 한다. MacOS 사용자가 `Ctrl`키와 클릭을 동시에 하도록 강제할 수도 있지만 MacOS에서는 `Ctrl`키와 마우스 왼쪽 버튼을 함께 누른 것을 마우스 오른쪽 버튼을 누른 것으로 해석하기 때문에 문제가 발생한다. (Windows, Linux에선 `click`이벤트로 해석되는 동작이 MacOS에선 `contextmenu` 이벤트로 해석되는 것!)

운영체제 종류에 상관없이 사용자가 동일한 경험을 하게 하려면 이를 고려하여 아래 예시처럼 코드를 작성하는 것이 바람직하다.

```js
if(event.ctrlKey || event.metaKey){ // ctrlKey 프로퍼티를 사용하는 코드엔 metaKey 조건도 함께 넣어주기
    ...
}
```

> 모바일 장치

- 사용자가 키보드가 있는 기기를 사용할 경우 단축키를 지원하면 사용자 경험을 상승시킬 수 있다.
- 그러나 모바일 장치같이 기기에 키보드가 없는 경우 이를 사용하는 사용자를 지원하는 방법도 고려하며 프로그래밍 해야한다.

## clientX, clientY와 pageX, pageY

### `clientX`, `clientY` (클라이언트 좌표)

- `clientX`: 어플리케이션의 **viewport내**의 **수평 좌표**를 제공하는 마우스 이벤트의 좌표 속성
- `clientY`: 어플리케이션의 **viewport내**의 **수직 좌표**를 제공하는 마우스 이벤트의 좌표 속성

> - `clientX`와 `clientY`는 현재 화면에서 보여지고 있는 웹문서를 기준으로 각각 왼쪽으로부터, 위로부터 얼마나 떨어져 있는지를 나타낸다.
>
> - 페이지가 스크롤되어도 값이 변하지 않는다.

> [추가] viewport💡
>
> 어플리케이션 현재 화면에서 보여지고 있는 영역(보통 직사각형)을 나타내는 용어이다.

### `pageX`, `pageY` (페이지 좌표)

- `pageX`: **페이지 창 왼쪽**을 기준으로 얼마나 떨어져 있는지를 나타내는 마우스 이벤트의 좌표 속성
- `pageY`: **페이지 창 위쪽**을 기준으로 얼마나 떨어져 있는지를 나타내는 마우스 이벤트의 좌표 속성

> - 페이지를 스크롤하면 값도 변한다.

## mousedown 이벤트와 선택 막기

### 예제

- 1️⃣ 글자 위에서 마우스를 더블클릭하면 글자가 선택된다.
- 2️⃣ 글자 위에서 마우스 왼쪽 버튼을 누른 채 커서를 이리저리 움직이면 글자가 선택(드래그)된다.
- `dblclick` 이벤트가 발생하면 `alert` 창을 띄우고 싶다고 가정해보자. 사용자 경험을 해칠 수 있어 위 두가지 동작(1️⃣, 2️⃣)이 일어나지 않게 하고 싶다면? 여러가지 방법을 적용해서 해결할 수 있다.([참고](https://ko.javascript.info/selection-range))
- 그 중 하나로, `mousedown` 이벤트가 발생할 때 나타나는 브라우저 기본 동작을 막는 방법이 있다. why? 글자 요소 위에서 `mousedown` 이벤트가 발생하면 브라우저 기본 동작으로 글자가 선택되기 때문이다. (그리고 아까 학습했듯 더블클릭 이벤트 과정에서는 `mousedown` 이벤트가 필연적으로 발생한다. 그래서 더블클릭할 때 글자가 선택되는 일도 막을 수 있는 것!)
- [브라우저 기본 동작 관련 내용은 이 링크를 참고](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step20.md)

> `mousedown` 이벤트의 브라우저 기본 동작 **막기 전 코드**

```html
<span id="test1">이곳을 더블클릭</span>
```

```js
let test1 = document.getElementById('test1');
test1.addEventListener('dblclick', function () {
  // 요소에 더블 클릭 이벤트가 발생하면
  alert('dblclick'); // alert 창을 띄움
});
```

> `mousedown` 이벤트의 브라우저 기본 동작 **막는 코드를 적용한 예시**

```html
<span id="test1">이곳을 더블클릭</span>
```

```js
let test1 = document.getElementById('test1');
test1.addEventListener('mousedown', function (event) {
  event.preventDefault();
});
test1.addEventListener('dblclick', function () {
  alert('dblclick');
});
```

> `event.preventDefault()`
>
> 브라우저 기본 동작을 취소할 수 있는 `event` 객체에 구현된 메소드이다.
> 자세한 내용은 [링크](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step20.md) 참고

혹은

```html
...
<b ondblclick="alert('클릭!')" onmousedown="return false"> 이곳을 더블클릭 </b>
...
```

> `return false;` 에 관해서도 같은 [링크](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step20.md) 참고

- `mousedown` 이벤트에 수반되는 브라우저 기본 동작을 막았기 때문에 글씨를 더블클릭해도 단어가 선택되지 않고, 글자를 드래그해도 글자가 선택되지 않는다.
- 다만 `b` 태그가 쓰인 예제에서 `...`에 해당하는 부분부터 시작해 드래그를 하면 기본동작을 막았음에도 불구하고 `이곳을 더블클릭`이라는 글씨를 포함한 글자들을 여전히 선택가능하다는 것을 알 수 있다.

> [추가] 복사 막기💡
>
> ```html
> <div oncopy="alert('복사가 허용되지 않은 컨텐츠입니다.'); return false">
>   이 편지는 영국에서 최초로 시작되어 일년에 한 바퀴 돌면서 받는 사람에게
>   행운을 주었고 지금은 당신에게로...blah blah...
> </div>
> ```
>
> 태그 내 text를 선택한 후 복사하려고하면 `return false`를 이용하여 `oncopy`의 브라우저 기본동작을 막아놨기 때문에 복사가 안되는 것을 확인할 수 있다.
>
> 페이지 소스 보기를 할 수 있는 사용자라면 이러한 방법은 소용이 없겠지만 모든 사용자가 소스 보기를 할 수 있는 것은 아니기 때문에 무단 복제를 어느정도 막을 수 있다.

![image](https://user-images.githubusercontent.com/33214449/104325342-e0e52380-552b-11eb-9245-9baf8316e032.png)

# References

- 마우스 이벤트 https://ko.javascript.info/mouse-events-basics

- [Javascript] Mouse Events 정리 https://kangth97.tistory.com/4

- MDN
  - 마우스 이벤트 종류 https://developer.mozilla.org/en-US/docs/Web/Events#Mouse_events
  - KeyboardEvent.metaKey https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step22.md)
- [@eyabc]()
- [@khw970421]()
- [@JeongShin]()
