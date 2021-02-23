[문서 목록으로 돌아가기](README.md)

> # STEP 28
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 28 [Scrolling](https://ko.javascript.info/onscroll)
> - 기한: 02/20(토) ~ 02/23(화)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

> 본 문서는 [Scrolling](https://ko.javascript.info/onscroll) 문서를 기반으로 작성하였습니다.

# Scrolling

## `scroll` 이벤트

`scroll` 이벤트는 페이지나 요소를 스크롤링할 때 반응하는 이벤트이다. 다음과 같은 경우에 유용하게 활용될 수 있다.

- 추가적인 기능이나 정보를 사용자가 문서의 어느 지점에 있느냐에 따라 보여주거나/숨기고 싶을 때
- 사용자가 페이지의 끝까지 스크롤 다운할 경우에 더 많은 데이터를 로드하고 싶을 때

```js
window.addEventListener('scroll', function () {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});
```

## `scroll`을 적용해 구현가능한 예시

- 페이지 끝으로 스크롤 할 때마다 새로운 데이터, 요소 등이 불러와지는 기능

## scrolling 막기

- `onscroll` 핸들러에 `event.preventDefault()`를 사용하는 방법으로는 스크롤링을 막을 수 없다. 스크롤이 이미 진행된 이후 prevent가 트리거되기 때문이다.
- 스크롤을 유발하는, `pageUp`이나 `pageDown`과 같은 키를 눌렀을 때 발생하는 `keydown` 이벤트에 `event.preventDefault`를 적용하면 스크롤링을 막을 수 있다.
- 또한 CSS의 `overflow` 속성을 이용하면 스크롤을 초기화할 수 있다.(?)

# 과제

## 무한 스크롤(endless scroll) 구현하기

무한 스크롤이 되는 페이지를 구현해보자. 사용자가 문서의 끝으로 스크롤 할 때 현재 시간이 하단에 자동으로 나타나도록!

```html
<body>
  <article></article>
</body>
```

```js
// endless scroll
const article = document.querySelector('article');

// 문서에 스크롤을 만들어주기 위해 문서 크기만큼 미리 코드를 넣어주는 함수
const addSample = () => {
  while (window.innerHeight >= document.body.offsetHeight) {
    let today = new Date();
    article.insertAdjacentHTML('beforeend', `<div><p>Date: ${today}</p></div>`);
  }
};

window.onload = () => {
  addSample();
};

window.addEventListener('scroll', function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    let today = new Date();
    article.insertAdjacentHTML('beforeend', `<div><p>Date: ${today}</p></div>`);
  }
});
```

## 스크롤 맨 위로 가기 버튼 구현

- window height 보다 더 스크롤 되면 '맨 위로 가기' 버튼이 왼쪽 상단 코너에 나타나게 구현하라. 스크롤을 다시 올리면 버튼이 사라져야한다.
- '맨 위로 가기' 버튼을 누르면 문서 상단으로 스크롤 되도록 해야한다.

```html
<body>
  <article></article>
</body>
```

```css
.block {
  width: 200px;
  height: 200px;
  background-color: gray;
}

#go-top {
  color: red;
  position: fixed;
  display: none;
}
```

```js
// Up/down button

const article = document.querySelector('article');
const goTopBtn = document.querySelector('#go-top');

// 문서에 스크롤을 만들어주기 위해 문서 크기만큼 미리 코드를 넣어주는 함수
const addSample = () => {
  while (window.innerHeight >= document.body.offsetHeight) {
    article.insertAdjacentHTML('beforeend', `<div class='block'>Sample</div>`);
  }
};

window.onload = () => {
  addSample();
};

window.addEventListener('scroll', function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    article.insertAdjacentHTML(
      'beforeend',
      `<div class=
        block>Sample</div>`
    );
  }

  if (window.innerHeight < document.querySelector('html').scrollTop) {
    document.querySelector('#go-top').style.display = 'block';
  } else {
    document.querySelector('#go-top').style.display = 'none';
  }
});

goTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
```

## Load visible images

# Comment

# References

- Scrolling https://ko.javascript.info/onscroll

- 무한 스크롤 만들기 : Throttling https://velog.io/@hyeon930/%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0-Throttling

- 무한스크롤(Infinity Scroll) UI 구현하기 https://code-study.tistory.com/22

- offsetHeight, innerWidth 와 비슷한 속성들 정리 https://github.com/jinyowo/JS-Calendar/wiki/**offsetHeight,-innerWidth-%EC%99%80-%EB%B9%84%EC%8A%B7%ED%95%9C-%EC%86%8D%EC%84%B1%EB%93%A4-%EC%A0%95%EB%A6%AC

- 맨 위로 가기 버튼 만들기, 자바스크립트 scroll back to top https://wonderbout.tistory.com/182

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step28.md)
- [@eyabc]()
- [@khw970421]()
- [@JeongShin]()
