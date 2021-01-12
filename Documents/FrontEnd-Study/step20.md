[문서 목록으로 돌아가기](README.md)

# STEP 20

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)

- 작성자: Wol-dan (@pul8219)

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위: STEP 20 [브라우저 기본 동작 이벤트](https://ko.javascript.info/default-browser-action)

- 기한: 12/26(토) ~ 12/29(화)

# 보충 필요

...

# 목차

- [브라우저 기본 동작을 막는 방법](#브라우저-기본-동작을-막는-방법)

- [addEventListener의 'passive' 옵션](#addEventListener의-'passive'-옵션)

- [event.defaultPrevented](#event.defaultPrevented)

- [정리](#정리)

- [References](#References)

- [팀원들 결과물](#팀원들-결과물)

# 브라우저 기본 동작

## 브라우저의 기본 동작을 막는 방법

브라우저의 기본 동작(ex. 링크 클릭시 해당 URL로 이동되는 것 / 폼 전송 버튼 클릭시 서버에 폼이 전송되는 것 / 마우스 버튼을 누른 채로 글자 위에서 커서를 움직이면 글자가 선택되는 것 등) 대신 자바스크립트를 사용해 동작을 직접 구현해야하는 경우가 있다. 이 때 브라우저의 기본 동작을 취소할 수 있는 방법은 다음과 같이 두 가지가 있다.

1. `event` 객체에 구현된 `event.preventDefault()` 메서드를 사용

```html
<!-- 링크를 클릭해도 해당 URL로 이동하지 않는다. -->
<a href="https://www.naver.com" onclick="event.preventDefault()"
  >클릭해주세요</a
>
```

2. 이벤트 핸들러가 `addEventListener`가 아닌 `on<event>`를 사용해 할당된 경우 `false`를 반환하게 하는 방법

```html
<!-- href="#"를 사용하면 현재 페이지의 상단으로 이동한다.(페이지 자체 이동X) 아래 코드는 hello가 적힌 대화상자를 띄우고 페이지 상단으로 이동한다.-->
<a href="#" onclick="alert('hello')">test1</a>

<!-- hello가 적힌 대화상자를 띄우고 return false로 인해 href가 수행되지 않아 페이지가 상단으로 이동하지 않는다.-->
<a href="#" onclick="alert('hello'); return false;">test2</a>
```

---

전문, 코드 참고: https://ko.javascript.info/default-browser-action

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
  <li><a href="https://www.naver.com">네이버</a></li>
</ul>
```

많은 사람이 사용하는 '마우스 오른쪽 버튼을 클릭' 후 `새 창에서 열기`는
`<a>` 태그로 버튼을 만들었을 때 가능하다. `<button>`이나 `<span>`으로는 이 기능을 쓸 수 없다.

> `<a>`태그로 버튼을 만드는 또다른 이유 중 하나는
> 검색 엔진은 인덱싱(색인)을 하는 동안 `<a href="...">` 링크를 따라가기 때문이다. (💡TODO)

위에서 살펴봤던 것과 마찬가지로 `return false`를 이용하면 `<a>` 태그를 눌러도 페이지 이동이 이루어지지 않고 원하는 동작을 수행할 수 있도록 브라우저 기본 동작을 막을 수 있다.

```js
let menu = document.querySelector('.menu');

menu.onclick = function (event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert(href); // 서버에서 데이터를 읽어오거나, UI를 새로 만든다거나 하는 등 원하는 작업이 여기에 들어감

  return false; // 브라우저 동작을 취소(URL로 넘어가지 않음)
};
```

(이벤트 위임 적용)

## addEventListener의 'passive' 옵션

- 모바일 기기에는 사용자가 스크린에 손가락을 대고 움직일 때 발생하는 `touchmove`와 같은 이벤트 있음. 이 이벤트는 기본적으로 스크롤링을 발생시킴
- `preventDefault()`를 사용하면 스크롤링을 막을 수 있음
- 브라우저는 스크롤링을 발생시키는 이벤트 감지시, `preventDefault()`가 어디에서도 호출되지 않았음을 확인한 후에야 스크롤링을 진행함. 이때 불필요한 지연이 생기고 화면이 덜덜 떨리는 현상 발생
- addEventListener의 'passive' 속성에 true값을 주면 핸들러가 `preventDefault()`를 호출하지 않겠다는 것을 알리는 역할을 함. 이렇게 되면 불필요한 지연을 방지할 수 있음.(Firefox, Chrome과 같은 몇몇 브라우저에서 passive의 기본값은 true임)

## event.defaultPrevented

### 예시로 알아보기

- 브라우저에서 마우스 오른쪽 버튼을 클릭하면 `contextmenu`라는 이벤트가 발생함. 이 이벤트가 발생하면 컨텍스트 메뉴가 뜸

![image](https://user-images.githubusercontent.com/33214449/103303279-e67d3c80-4a48-11eb-8bc3-8fa60766836d.png)

```html
<!-- 기본적으로 제공되는 컨텍스트 메뉴가 뜬다-->
<button>기본 컨텍스트 메뉴</button>
<br />

<!-- 그런데 컨텍스트 메뉴 대신 이렇게 다른 걸 띄울 수도 있다-->
<!-- return false로 oncontextmenu의 기본동작을 막은 것임-->
<button oncontextmenu="alert('커스텀 메뉴'); return false;">
  커스텀 메뉴 표시
</button>
<br />
```

---

```html
<h1>문서</h1>
여백에서 오른쪽 마우스를 눌러보세요
<br />

<!-- event.preventDefault()를 이용하여 기본 동작을 막음(자바스크립트 코드 참고)-->
<button id="elem">버튼 레벨 컨텍스트 메뉴</button>
<br />
```

```js
elem = document.getElementById('elem');

elem.oncontextmenu = function (event) {
  event.preventDefault();
  alert('버튼 컨텍스트 메뉴');
};

document.oncontextmenu = function (event) {
  event.preventDefault();
  alert('문서 컨텍스트 메뉴');
};
```

이렇게 버튼에서 뿐만 아니라 문서 레벨에서도 커스터마이징한 컨텍스트 메뉴를 띄울 수 있음
그러나 위 코드의 경우 `버튼 컨텍스트 메뉴`(`elem`)를 클릭했을 때 버튼 레벨의 컨텍스트 메뉴와 문서 레벨의 컨텍스트 메뉴가 모두 떠버린다. 이는 지난 시간 학습한 `이벤트 버블링` 때문!
이 문제를 해결하기 위해 `event.stopPropagation()`을 이용, 버블링을 적절하게 중단시켜보자

> `event.stopPropagation()`: 버블링이나 캡쳐링 단계에서 그 다음으로 이벤트를 전파하고 싶지 않을 때 사용하는 메서드
>
> but 꼭 필요한 경우를 제외하고는 버블링을 막지 않는 것이 좋다.
>
> `stopPropagation`을 쓰지 않고도 커스텀 이벤트를 사용해 핸들러의 `event` 객체에 데이터를 저장함으로써 이벤트 버블링을 통제할 수도 있다.
>
> `event.stopImmediatePropagation()` : 해당 이벤트 핸들러를 마지막으로 그 뒤에 실행 예정이었던 이벤트 핸들러를 실행되지 않도록 함

다음은 변경된 자바스크립트 코드이다.

```js
elem = document.getElementById('elem');

elem.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  alert('버튼 컨텍스트 메뉴');
};

document.oncontextmenu = function (event) {
  event.preventDefault();
  alert('문서 컨텍스트 메뉴');
};
```

`event.stopPropagation()`을 사용하여 코드 변경 후,
버튼에서 마우스 오른쪽 버튼을 클릭하면 버튼 레벨의 컨텍스트 메뉴만 뜬다. 문서 레벨의 컨텍스트메뉴도 떠버리는 문제는 해결되었다.
그러나 외부 코드를 사용해 마우스 우클릭에 대한 정보를 얻을 수 없다는 문제가 생긴다. ~~(💡TODO - 문제의 구체적인 예시가 뭔지 감이 안 온다)~~

-> 사용자가 발생시킨 이벤트 등 행동패턴 등을 분석하고자하는 경우 버블링 되는 이벤트도 감지해 분석해야하기때문에 버블링을 막으면 문제가 될 수 있음

> 참고: https://ko.javascript.info/bubbling-and-capturing `꼭 필요한 경우를 제외하곤 버블링을 막지 마세요!`

다시 자바스크립트 코드를 수정해보자

```js
elem = document.getElementById('elem');

elem.oncontextmenu = function (event) {
  event.preventDefault();
  alert('버튼 컨텍스트 메뉴');
};

document.oncontextmenu = function (event) {
  // event.defaultPrevented 값이 true이면 return
  if (event.defaultPrevented) return;
  event.preventDefault();
  alert('문서 컨텍스트 메뉴');
};
```

기본 동작을 막은 경우 `event` 객체의 `defaultPrevented` 속성 값이 `true`가 되고,
그렇지 않은 경우는 속성 값이 `false`이다.

버튼에 오른쪽 마우스를 클릭할 경우 버튼 레벨의 컨텍스트 메뉴가 뜨고
이벤트는 상위 요소인 document까지 버블링되어 이벤트가 전달되고, document에 대한 이벤트 핸들러도 실행된다.
그런데 이때 `event`객체의 `defaultPrevented`값은 이미 true이기 때문에 `if (event.defaultPrevented) return;` 코드에서 리턴된다. 이처럼 버블링을 의도적으로 중단하지 않고도 버튼에서 오른쪽 마우스를 눌렀을 때 문서 레벨의 컨텍스트 메뉴는 뜨지 않게 할 수 있다.

> `event.preventDefault()`: 이벤트의 기본 동작을 막을 수 있는 메서드
>
> `event.defaultPrevented`: 기본 동작을 막은 경우 true, 그렇지 않은 경우 false값을 갖는 event 객체의 속성

## 정리

- 자바스크립트를 이용해 이렇게 브라우저 기본동작을 명시적으로 막을 수 있다.
- 다만 HTML 태그 요소의 의미를 해치면서까지 기본동작을 막는 방식을 남용하지말 것

# References

- https://ko.javascript.info/default-browser-action

return false

- https://ggmouse.tistory.com/418

- https://lalwr.blogspot.com/2016/08/a-onclick-return-false.html

stopPropagation vs stopImmediatePropagation 제대로 이해하기 (다시 읽어볼 것)

- https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/stoppropagation-vs-stopimmediatepropagation-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-75edaaed7841

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step20.md)
- [@eyabc](https://eyabc.github.io/Doc/dev/core-javascript/Browser_Default_Action.html)
- [@khw970421](https://velog.io/@khw970421/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EA%B8%B0%EB%B3%B8-%EB%8F%99%EC%9E%91-%EC%9D%B4%EB%B2%A4%ED%8A%B8step-20)
- [@JeongShin](https://www.notion.so/0f431e9e16af4351aebe0a0d80624467)
