# STEP 13, 14, 15, 16

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위:

[DOM](https://gitlab.com/siots-study/topics/-/wikis/dom)

STEP 13: DOM - BOM이란?

STEP 14: DOM - DOM이란? ~ DOM tree

STEP 15: DOM - DOM API

STEP 16: DOM - DOM reflow 와 repaint

- 기한

STEP 13: 10/17(토) ~ 10/20(화) (시험기간 고려, 10/22(목)까지 연장)

STEP 14: 10/23(토) ~ 10/26(화) (시험기간 고려, 10/29(목)까지 연장)

STEP 15: 10/31(토) ~ 11/3(화)

STEP 16: 11/7(토) ~ 11/10(화)

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

> dom을 변수에 저장을 할때 네이밍에 관습적으로 `$`을 붙입니다! 특별한 문법적 의미는 없음 (from 은영)

- 바인딩의 의미는? (블랙커피 '이벤트' 문서에서 생긴 궁금증)

(from 은영)

> http://tcpschool.com/php/php_oop_binding
>
> 바인딩(binding)
> 바인딩(binding)이란 프로그램에 사용된 구성 요소의 실제 값 또는 프로퍼티를 결정짓는 행위를 의미합니다.
>
> 예를 들어 함수를 호출하는 부분에서 실제 함수가 위치한 메모리를 연결하는 것도 바로 바인딩입니다.

- DOM API 보충

- https://ko.javascript.info/searching-elements-dom
- https://ko.javascript.info/basic-dom-node-properties

---

# DOM

## 목차

- [BOM이란?](#BOM이란?)

- [DOM이란?](#DOM이란?)

- [DOM tree](#DOM-tree)

- [DOM API](#DOM-API)

- [DOM reflow 와 repaint](#DOM-reflow-와-repaint)

- [이벤트(Event)](<#이벤트(Event)>)

- [References](#References)

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

자바스크립트는 DOM API를 제공하여

DOM 객체를 탐색하고 선택된 객체(요소)의 내용 또는 속성을 조작할 수 있게 해준다.

> 자바스크립트는 이러한 객체 모델을 이용하여 다음과 같은 작업을 할 수 있다.
>
> - 새로운 HTML 요소나 속성을 추가할 수 있다.
> - 존재하는 HTML 요소나 속성을 제거할 수 있다.
> - HTML 문서의 모든 HTML 요소를 변경할 수 있다.
> - HTML 문서의 모든 HTML 속성을 변경할 수 있다.
> - HTML 문서의 모든 CSS 스타일을 변경할 수 있다.
> - HTML 문서에 새로운 HTML 이벤트를 추가할 수 있다.
> - HTML 문서의 모든 HTML 이벤트에 반응할 수 있다.
>
> 아래 문서에서 인용
>
> https://gitlab.com/siots-study/topics/-/wikis/dom

- `getElement`

- `querySelector`

- `getElements`

- `querySelectorAll`

### DOM 객체를 찾는 방법

(tag로 찾는 방법, id로 찾는 방법, className, cssSelector)

다음과 같은 html 태그가 있을 때, DOM 객체를 탐색하기 위한 여러가지 방법을 알아보자

```html
<input id="search" class="input-style" />
```

**1. tag로 찾는 방법**

**`getElementsByTagName(tag_name)`**

- 태그 이름으로 동일한 HTML 태그명을 가진 DOM 객체들을 모두 찾아 컬렉션으로 반환한다. (여기서 컬렉션은 HTML Collection 형태를 의미)

```js
const input = document.getElementsByTagName('input');

const temp = input[0]; // 컬렉션의 각 원소를 이러한 방식으로 접근 가능
```

TODO HTML Collection

**2. id로 찾는 방법**

**`getElementById(id)`**

- id 속성 값으로 DOM 객체를 선택할 수 있게 한다.
- 같은 id 속성 값을 가진 객체가 여러 개 있다면, 첫번째 요소만 반환한다.

> **HTML, CSS에서 id**
>
> 태그에 id를 지정함으로써 특정 태그에 스타일을 지정할 수 있다.(고유성을 가지도록 id값은 보통 하나만 존재)

```js
const input = document.getElementById('search');
```

> **💡 `getElementById()`와 같은 메소드는 왜 `document`의 멤버일까?**
>
> HTML 문서 전체를 대표하는 객체가 document이고 DOM tree의 루트이기 때문
>
> 도서 'HTML5 + CSS3 + Javascript'에서 인용

**3. className으로 찾는 방법**

- 동일한 class 값을 가진 요소를 모두 선택하여 컬렉션으로 반환한다.
- 공백을 사용하면 여러 개의 class를 지정할 수 있다.

```js
const input = document.getElementsByClassName('input-style');
```

**4. cssSelector로 찾는 방법**

**`document.querySelector(cssSelector)`**

- CSS 선택자로 요소를 선택
- 일치하는 첫번째 요소를 반환한다.

```js
const input = document.querySelector('.input-style');
```

**`document.querySelectorAll(cssSelector)`**

- 일치하는 모든 요소를 NodeList 형태로 반환한다.

```js
const input = document.querySelectorAll('.input-style');
```

TODO NodeList

---

### DOM 객체를 조작하는 방법

**`document.createElement(tagName)`**

- 인자로 적어준 태그이름에 해당하는 DOM 객체를 생성할 수 있다.

**`innerText`**

- 태그 내부의 텍스트를 가져오거나 수정하고싶을 때 사용한다.
- 마크업(HTML 구조)를 제외한 문자열을 반환한다.

**`innerHTML`**

- 태그 내부의 텍스트를 가져오거나 수정하고싶을 때 사용한다.
- 마크업을 포함하여 리턴한다.

```html
<body>
  <p id="main">스터디 소개 페이지 <span>환영합니다.</span></p>
  <script src="step13_domapi.js"></script>
</body>
```

💡 아래 .js 파일에서 위의 p 태그의 내용을 변경하려면 p 태그부분이 로드되어있어야하기 때문에 script문을 body의 하단에 놓아야 아래 코드가 정상적으로 작동한다.

```js
let test = document.getElementById('main');
console.log(test.innerText); // (1)
test.innerText = '안녕하세요<span>안녕</span>'; // 화면에 '안녕하세요<span>안녕</span>'가 문자열 그대로 출력된다.

console.log(test.innerHTML); // (2)
test.innerHTML = '안녕하세요<span>안녕</span>'; // 화면에 '안녕하세요안녕'이 출력된다.
```

(1) 출력 결과

![image](https://user-images.githubusercontent.com/33214449/98021026-20660400-1e47-11eb-8b92-7741d0ba0602.png)

(2) 출력 결과

![image](https://user-images.githubusercontent.com/33214449/98021074-307de380-1e47-11eb-944a-1aa81358bfe9.png)

**innerHTML을 사용하지 않고 새로운 콘텐츠를 추가하는 방법**

(https://velog.io/@seokzin/JavaScript-%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-DOM-API-%EC%A0%95%EB%A6%AC 문서에서 인용)

`createElement(tagName)`

- 태그이름을 인자로 전달하여 요소를 생성

`createTextNode(text)`

- 텍스트를 인자로 전달하여 텍스트 노드를 생성

`appendChild(Node)`

- 인자로 전달한 노드를 마지막 자식 요소로 DOM 트리에 추가

`removeChild(Node)`

- 인자로 전달한 노드를 DOM 트리에서 제거

---

## DOM reflow 와 repaint

> `reflow`와 `repaint`는 수정된 렌더 트리를 다시 렌더링하는 과정에서 발생하는 것으로 웹 애플리케이션의 성능을 떨어뜨리는 주된 요인이다. 극단적인 경우, CSS 효과로 인해 Java Script 의 실행 속도가 느려질 수도 있다.

- reflow : 생성된 DOM 노드의 레이아웃 수치(너비, 높이, 위치 등) 변경 시 영향 받은 Render Tree의 노드들의 수치를 다시 계산하는 과정

- repaint : reflow 과정이 끝난 후 재생성된 Render Tree를 다시 화면에 그리는 과정

> 하지만 reflow가 일어나야만 repaint가 일어나는 것은 아니다.
>
> `color`, `backgroud-color`, `visibility`와 같이 레이아웃에는 영향을 주지 않는 스타일 속성이 변경된 경우 repaint 과정만 일어날 수도 있다.

> 브라우저 렌더링에서 **Paint** 단계
>
> DOM 노드들의 레이아웃 계산(각 노드들의 viewport 내 위치와 크기 등을 계산)이 완료되고 실제 요소들을 화면에 그리는 단계. 레이아웃 계산이 완료된 Render Tree를 이용해 실제 픽셀 값을 채워넣어 텍스트, 색, 이미지 등이 처리되어 그려지는 과정.

[브라우저 렌더링 자세히 알아보기1](https://boxfoxs.tistory.com/408)

[브라우저 렌더링 자세히 알아보기2](https://d2.naver.com/helloworld/59361)

**reflow 가 일어나는 대표적인 경우**

- 페이지 초기 렌더링 시(최초 Layout 과정)

- 윈도우 리사이징 시 (viewport 크기 변경시)

- 노드 추가 또는 제거

- 요소의 위치, 크기 변경 (left, top, margin, padding, border, width, height, 등..)

- 폰트 변경 과(텍스트 내용) 이미지 크기 변경 시(크기가 다른 이미지로 변경했을 때)

[출처](https://boxfoxs.tistory.com/408)

**reflow 발생하는 코드 예시**

```js
function reFlow() {
  document.getElementById('container').style.width = '600px';
  return false;
}
```

당.연.히 reflow와 repaint되는 과정이 빈번할 수록 렌더링 과정이 오래 걸리고 이러한 성능 저하는 사용자 입장에서 불편하겠지! ➡️ reflow와 repaint를 줄여 성능 저하를 최소화시켜야한다!

### 성능 저하 최소화 시키기(= reflow, repaint 줄이기)

우선 reflow가 일어나면 repaint는 필연적으로 발생하므로 가능하다면 reflow가 발생하는 속성보다 repaint만 발생하는 속성을 사용하는 것이 좋다.

**1. class 변경으로 스타일을 변경할 경우, 최대한 DOM 트리 구조상 말단에 있는 노드의 class를 변경한다.**

- reflow 영향 최소화 가능

**2. 인라인 스타일 사용을 지양한다.**

- 인라인 스타일은 HTML이 다운로드될 때 레이아웃에 영향을 미치면서 추가 reflow를 발생시킨다.

**3. 애니메이션이 들어간 엘리먼트는 `position: fixed` 또는 `position: absolute`로 지정한다.**

- `absolute` 또는 `fixed` 위치인 엘리먼트는 다른 엘리먼트의 레이아웃에 영향을 미치지 않아 reflow가 아닌 repaint만 발생시킨다.(reflow가 일어나면 reflow->repaint가 일어나기 때문에 repaint만 발생하는 것이 훨씬 적은 비용임)

**4. 부드러운 애니메이션은 성능을 저하시킨다.**

- 한 번에 1px 씩 이동하는 엘리먼트는 부드러워 보이지만 reflow 발생이 커 CPU 퍼포먼스가 떨어지고, 때문에 성능이 떨어지는 디바이스는 이를 제대로 표현못할 수 있다.
- 엘리먼트를 한 프레임당 4px 씩 이동하면 덜 부드럽게 보이겠지만, reflow 가 1px만큼 이동할 때의 1/4 만큼이나 적게 발생한다.

**5. 레이아웃을 위한 `<table>` 은 피한다.**

- `<table>`은 구성된 페이지 레이아웃은 모두 로드되고 계산된 후에야 화면에 뿌려진다.
- 작은 변경만으로도 테이블의 다른 모든 노드에 대한 reflow가 발생한다.
- 레이아웃 용도뿐만 아니라 데이터 표시 용도의 `<table>`에서도 `table-layout: fixed` 속성을 주는 것이 좋다.(이렇게 하면 열 너비가 머리글 행 내용을 기반을 계산되기 때문)

**6. JavaScript를 통해 스타일 변경시 `.cssText` 사용**

```js
// bad 👎
const div = document.div;
div.style.width = '50px'; // reflow 발생
div.style.height = '100px'; // reflow 발생

// good 👍
const div = document.div;
div.style.cssText = 'width: 50px; height: 100px;'; // reflow 한 번만 발생

// good 2 👍
const div = document.div;
div.className = "changed";

// css style
.changed {
  width: 50px;
  height: 100px;
}
```

**7. 숨기고자 하는 요소에는 `visibility: invisible` 보다는 `display: none`**

- `visibility: invisible`는 레이아웃 공간을 차지하기 때문에 repaint가 발생한다. `display: none`은 레이아웃 공간을 차지하지 않고 display속성으로 숨겨진 노드는 이 노드를 표시하기 전에 숨겨지므로 reflow나 repaint가 발생하지 않는다.

**8. 리스트를 추가하는 경우 DOM Fragment를 통해 추가한다.**

3개의 리스트를 추가하는 경우, 한 번에 하나씩 추가하면 최대 7개의 reflow가 발생한다.

- `<ul>` 이 추가될 때 1번
- `<li>` 에 대해 3번
- 텍스트 노드에 대해 3번

DocumentFragment 개체를 이용하여 reflow 최소화

```js
const frag = document.createDocumentFragment();
const ul = frag.appendChild(document.createElement('ul'));

for (let i = 1; i <= 3; i++) {
  li = ul.appendChild(document.createElement('li'));
  li.textContent = `item ${i}`;
}

document.body.appendChild(frag);
```

> `document.createDocumentFragment()`
>
> - 트리 외부의 경량화된 문서 DOM을 만들 수 있는 타입. 노드들을 담을 수 있는 빈 문서 템플릿으로 생각하면 된다. DocumentFragment의 자식노드를 메모리상에서 조작한 후 라이브 DOM에 추가하는 것도 가능하다.
> - DocumentFragment를 DOM에 추가하더라도 DocumentFragment 자체는 추가되지 않으며 노드의 내용만이 추가된다.
> - `appendChild()`와 `insertBefore()` 노드 메서드의 인수로 DocumentFragment를 전달하면 DocumentFragment의 자식 노드는 메서드가 호출되는 DOM 노드의 자식 노드로 옮겨진다.
> - parentNode는 null이다.
> - 자식 노드로는 어떤 종류의 노드도 가질 수 있다.(createElement와의 차이점)

[출처](https://programmer-seva.tistory.com/60)

**9. 캐쉬를 활용한 reflow 최소화**

- 브라우저는 레이아웃 변경을 큐에 저장했다가 한 번에 실행함으로써 reflow를 최소화하는데, offset, scrollTop 과 같은 계산된 스타일 정보를 요청할 때마다 정확한 정보를 제공하기 위해 큐를 비우고, 모든 변경을 다시 적용한다.
- 이를 최소화하기 위해 수치에 대한 스타일 정보를 변수에 저장하여 정보 요청 횟수를 줄임으로써 리플로우를 최소화한다.

```js
// Bad practice
for (let i = 0; i < len; i++) {
  el.style.top = `${el.offsetTop + 10}px`;
  el.style.left = `${el.offsetLeft + 10}px`;
}

// Good practice
let top = el.offsetTop,
  left = el.offsetLeft,
  elStyle = el.style;

for (let i = 0; i < len; i++) {
  top += 10;
  left += 10;
  elStyle.top = `${top}px`;
  elStyle.left = `${left}px`;
}
```

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

[JavaScript] 자주 사용하는 DOM API 정리
https://velog.io/@seokzin/JavaScript-%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-DOM-API-%EC%A0%95%EB%A6%AC

https://velog.io/@bungouk6829/Javascript

도서 HTML5 + CSS3 + Javascript

innerText vs innerHTML
https://hi098123.tistory.com/83

https://okky.kr/article/508346

브라우저 렌더링에 관해 읽어볼만한 글(NAVER D2)
https://d2.naver.com/helloworld/59361

브라우저 렌더링 과정 - Reflow Repaint, 그리고 성능 최적화
https://boxfoxs.tistory.com/408

브라우저의 이해 #1 Reflow, Repaint에 대하여 알아봅니다.
https://falsy.me/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EC%9D%B4%ED%95%B4-1-reflow-repaint%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-%EC%95%8C%EC%95%84%EB%B4%85%EB%8B%88%EB%8B%A4/

[CSS] Reflow 원인과 마크업 최적화 Tip
https://zinee-world.tistory.com/295

offsetTop
https://kjwsx23.tistory.com/244

DOM 심화 - DocumentFragment 노드
https://programmer-seva.tistory.com/60
