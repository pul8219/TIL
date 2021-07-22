- `_layouts/single.html` 개개 포스트 레이아웃
- `_layouts/single.html` 맨 아래에 div로 감싼 utterances 스크립트 코드 넣기
- minimal mistake 테마에서는 기본적으로 포스팅을 읽을 때 예상되는 소요시간을 표시해준다.(less than 1 minute read 이런거) 포스팅에 작성날짜를 표시하고싶다면 다음과 같이 하면된다.

`_config.yml` 파일에 `read_time: true`를 `false`로 바꿔주기
그 바로 아래에 `show_date: true`를 추가하기

https://heoseongh.github.io/gitblog/jekyll-setting-postDate/ 참고했음

참고 링크

utterances

https://absolutelyfullycapable.github.io/2021-06/jekyll-utterances

https://madplay.github.io/post/jekyll-blog-comments-with-utterances

폰트 바꾸기

`assets/css/main.scss` 에 웹폰트 링크를 import하고

`_sass/_variables.scss` 에서 폰트가 나열되어있는 변수에 import한 폰트명을 추가한다.

★
\_sass > minimal-mistakes > \_archive.scss

.archive\_\_item-teaser 클래스의 스타일에 img{width:100%;}를 조정하면 teaser 이미지 사진 크기가 조정됨

★
\_includes/archive-single.html

```
{% if include.type == "grid" and teaser %}
      <div class="archive__item-teaser">
        <img src="{{ teaser | relative_url }}" alt="">
      </div>
    {% endif %}
```

를

```
{% if include.type == "grid" or teaser %}
      <div class="archive__item-teaser">
        <img src="{{ teaser | relative_url }}" alt="">
      </div>
    {% endif %}
```

이렇게 or로 바꿔주면 teaser 이미지가 뜬다.

★
각 post의 설정부분에서

```
---
layout: single
title: "[JS] Ajax란? + XMLHttpRequest, fetch API, axios"
categories:
  - javascript
header:
  teaser: "../assets/img/JavaScript_banner.png"
---
```

처럼

```
header:
  teaser: "../assets/img/JavaScript_banner.png"
```

이렇게 teaser이미지를 추가

★
\_sass/minimal-mistakes/\_base.scss

```
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 2em 0 0.5em;
  line-height: 1.2;
  font-family: $header-font-family;
  font-weight: bold;
}
```

이부분에서 margin을 조절(맨 첫번째에 있는 값이 헤더의 윗부분 - 여길 줄였음)

★

\_sass/minimal-mistakes/\_archive.scss

```
.archive__item {
  position: relative;

  a {
    position: relative;
    z-index: 10;
  }

  a[rel="permalink"] {
    position: static;
  }

  //여기에
}
```

에서

```
border-style: none none solid;
  border-width: 1px;
  border-color: rgb(233, 232, 232);
  margin-bottom: 1.5em;
```

추가

★

블로그 첫 화면에서 게시글이 5개보다 더 보였으면 좋겠어서
`_config.yml`파일의 `paginate: 5`를 `paginate: 10`로 바꿨다.

<https://jekyllrb-ko.github.io/docs/pagination/>
