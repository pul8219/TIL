# STEP 13, 14

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위:

[DOM](https://gitlab.com/siots-study/topics/-/wikis/dom)

STEP 13: DOM - BOM이란?

STEP 14: DOM - DOM이란? ~ DOM tree

- 기한

STEP 13: 10/17(토) ~ 10/20(화) (시험기간 고려, 10/22(목)까지 연장)

STEP 14: 10/23(토) ~ 10/26(화) (시험기간 고려, 10/29(목)까지 연장)

# 보충 필요

- `$stationAddButton` 에서 `$`의 의미?

```js
function onAddStationHandler() {
  // 이벤트 처리 로직을 구현한다.
}
// 지하철 역 추가 버튼의 요소를 가져온다.
const $stationAddButton = document.querySelector('#station-add-btn');
// 클릭 이벤트가 발생했을 때 onAddStationHandler함수가 실행되도록 바인딩 한다.
$stationAddButton.addEventListener('click', onAddStationHandler);
```

- 바인딩의 의미는? (블랙커피 '이벤트' 문서에서 생긴 궁금증)

---

# DOM

## 목차

- [BOM이란?](#BOM이란?)

- [DOM이란?](#DOM이란?)

- [DOM tree](#DOM-tree)

- [DOM API](#DOM-API)

## BOM이란?

BOM(Browser Object Model: 브라우저 객체 모델)

웹브라우저의 구성요소들이 객체화되어있는데 이 객체들을 모아놓은 모델을 의미한다. 이를 통해 웹브라우저를 제어할 수 있다.

- 웹 브라우저의 버튼, URL 주소창, 타이틀 바 등 웹브라우저 창 및 웹페이지 일부분을 제어할 수 있게끔 한다. BOM은 window 객체를 통해 접근이 가능하다.

TODO 정의된 표준이 없어 브라우저마다 구현이 다르다는데 정확히 알아보기!

![](https://user-content.gitlab-static.net/51032eabfd2ef6cb86cddb0d834edfb3a3e1bcd5/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f393939424444333335394344423037343131)

### 대표적인 BOM 객체들

1. window 객체: 브라우저 전체를 담당하는 객체 (전역 객체)

window 객체 아래에 location, navigator와 같은 BOM객체와 DOM 객체들이 포함됨

`alert()`, `confirm()`, `prompt()` 는 window 객체의 메서드들이다.

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- alert() -->
    <input
      type="button"
      onclick="alert(window.location)"
      value="alert(window.location)"
    />

    <!-- confirm() -->
    <input type="button" value="confirm" onclick="func_confirm()" />
    <script>
      function func_confirm() {
        if (confirm('삭제하시겠습니까?')) {
          alert('삭제되었습니다.');
        } else {
          // alert('cancel');
        }
      }
    </script>

    <!-- prompt() -->
    <input type="button" value="prompt" onclick="func_prompt()" />
    <script>
      function func_prompt() {
        if (prompt('ID를 입력하세요') === 'yurim') {
          alert('welcome');
        } else {
          alert('Access denied');
        }
      }
    </script>

    <input
      type="button"
      onclick="window.open('index.html')"
      value="window.open('index.html')"
    />
  </body>
</html>
```

2. location 객체: 브라우저의 URL 주소를 다루는 객체
3. navigator 객체: 웹 브라우저 및 브라우저 환경 정보를 다루는 객체
4. screen 객체: 웹 브라우저 화면이 아닌, 사용자의 모니터 정보를 제공하는 객체
5. history 객체: 현재 브라우저가 접근했던 URL history

TODO BOM 객체들의 각종 속성, 메소드 내용 추가 필요

---

## DOM이란?

💡 TODO DOM이 왜 필요한지 검색창 예로 들어 설명하기

문서 객체 모델(Document Object Model)

![](https://user-content.gitlab-static.net/113105a138e66a7c211ab8a3aee6ced116c33723/68747470733a2f2f706f69656d617765622e636f6d2f696d672f636c69656e742d7365727665722e706e67)

웹 문서는 텍스트(ex. HTML) -> 브라우저의 렌더링 엔진은 로드-파싱 과정을 거쳐 웹 문서를 브라우저가 이해할 수 있는 구조로 메모리에 적재해야함

➡️ 이를 가능하게 하는 것은 DOM!

문서의 구조화된 표현을 제공하는 인터페이스라고 볼 수 있다. DOM은 JavaScript 같은 프로그래밍언어가 문서의 구조에 접근할 수 있는 방법을 제공하고 문서 구조, 스타일, 내용 등을 변경할 수 있게 해준다.

- 브라우저가 HTML 문서를 로드할 때 이 문서에 대한 모델(구조)을 메모리에 생성하는 데, 이 때 모델은 `DOM tree`로 구성된다. (`DOM tree`는 [DOM tree](#DOM-tree)에서 자세히 설명할 것)

- `DOM API`를 통해 DOM에 접근하고 DOM을 변경하면 웹페이지의 요소를 동적으로 변경할 수 있다.

---

## DOM tree

DOM tree는 브라우저가 HTML 문서를 로드한 후 생성하는 모델을 의미한다. (객체의 트리로 구조화되어있음)

![](https://user-content.gitlab-static.net/daa86090fb37ef79db7704396f4aaaa87928faf0/687474703a2f2f7463707363686f6f6c2e636f6d2f6c656374757265732f696d675f6a735f68746d6c646f6d2e706e67)

아래 예제 코드를 DOM tree로 나타내보자.

```js
<!DOCTYPE html>
<html>
<head>
    <style>
    .red  { color: #ff0000; }
    .blue { color: #0000ff; }
    </style>
</head>
<body>
    <div>
    <h1>Cities</h1>
    <ul>
        <li id="one" class="red">T-shirt</li>
        <li id="two" class="red">pants</li>
        <li id="three" class="blue">bag</li>
        <li id="four">sunglass</li>
    </ul>
    </div>
</body>
</html>

```

![](https://user-content.gitlab-static.net/721553510994dc1580bdf261f311713c8cdc9951/68747470733a2f2f706f69656d617765622e636f6d2f696d672f646f6d2d747265652e706e67)

- 문서 노드: 트리의 최상위 계층인 document 객체. 문서 전체를 가리키며 웹페이지를 접근하는 시작점이다.

- 요소 노드: HTML 태그에 해당하는 요소들. 속성 노드와 텍스트 노드를 자식으로 가질 수 있다.

- 텍스트 노드: HTML 태그 안에 있는 텍스트들. 요소 노드와 달리 자식 노드를 가질 수 없다.

---

## DOM API

`getElement`

`querySelector`

`getElements`

`querySelectorAll`

DOM 객체를 찾는 방법: tag, id, className, cssSelector

---

# 이벤트(Event)

💡 TODO 이벤트가 왜 필요한지

어떤 사건을 의미. 브라우저에서 사건이란 사용자가 요소를 클릭했을 '때', 스크롤 했을 '때', 텍스트를 입력했을 '때'와 같은 것을 의미한다.

`beforeunload` 이벤트를 사용하면 페이지를 벗어날 때 확인 창을 띄울 수 있다. (단, 크롬에서는 경고창에 지정한 문구가 나타나진 않음)

```js
window.onbeforeunload = function () {
  return '작성 중인 메시지가 있습니다.';
};
```

---

# References

https://gitlab.com/siots-study/topics/-/wikis/dom

https://opentogether.tistory.com/110

https://www.zerocho.com/category/JavaScript/post/573b321aa54b5e8427432946

https://velog.io/@bungouk6829/Javascript

https://iwantadmin.tistory.com/108

https://medium.com/@wooder2050/%EC%9D%B4%EB%A1%A0-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-dom-%ED%8A%B8%EB%A6%AC-96ca3008a474
