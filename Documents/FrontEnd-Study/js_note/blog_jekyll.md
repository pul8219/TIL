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
