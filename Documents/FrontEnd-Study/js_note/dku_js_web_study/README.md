# js-study-lv1

## 들어가기 전에

### Editor 혹은 IDE

- [VSCode](https://code.visualstudio.com/)
  - 대부분의 프론트엔드 개발자가 사용하는 **무료** `에디터`
  - 장점
    - 강력한 플러그인 지원
    - 직관적인 UI
    - 빠름
  - 단점
    - 설치 직후 다운 받아야 하는 것들이 너무 많음
    - 즉, 커스텀이 힘듦
- [Intellij](https://www.jetbrains.com/ko-kr/idea/)
  - 대부분의 개발자가 사용하는 **유료** `IDE`
  - 장점
    - 학생 이메일이 있을 경우 무료로 `Ultimate` 사용 가능
    - 필요한 모든 기능이 탑재되어 있음
  - 단점
    - 기본적으로 기능이 너무 많아서 헷갈림
    - 고사양 PC가 아닐 경우 버벅임

### git

> git 명령어에 대해 이해해야 합니다.

- [git download](https://git-scm.com/)
- [git 간편 안내서](https://rogerdudler.github.io/git-guide/index.ko.html)

### git 명령어 요약

`git` 설치가 완료되었다면

- `mac`의 경우 terminal을 열어서 `git`을 입력하여 설치 되었음을 확인
- `window`의 경우 폴더 혹은 바탕화면에서 마우스 우클릭으로 `git bash` 존재 여부 확인

```bash

########## 설치한 직후에 email, name 설정 ##########
$ git config --global user.name "junilhwang"          # 본인의 github id 입력
$ git config --global user.email "junil.h@kakao.com"  # 본인의 github email 입력
#################################################

# 프로젝트 코드 가져오기
$ git clone https://github.com/DKU-STUDY/js-study-lv1

# 프로젝트 폴더로 이동하기
$ cd js-study-lv

# 원격 저장소 존재 여부 확인
$ git remote
> origin # origin은 `https://github.com/DKU-STUDY/js-study-lv1`의 별칭으로 등록된 원격 저장소

# 테스트 파일 추가
$ echo "테스트 파일 추가" > test.txt

# git 파일 추가
$ git add test.txt

# 파일에 대한 커밋 로그 작성
$ git commit -m "테스트 파일 추가"

# 커밋 로그를 원격 저장소에 업로드
$ git push origin main

# 위의 명령어는 다음 명령어와 똑같음
$ git push https://github.com/DKU-STUDY/js-study-lv1 main
```

- 잘 이해가 되지 않을 경우 디스코드 채널에 질문 남겨주세요!

### Github

- Github Pull Request에 대해 이해해야 합니다.
- 이 [동영상](https://youtu.be/pR5SNFyzdg8)을 보면서 튜토리얼을 진행해주세요.

## 스터디 과정

- [1주차: [워밍업] Todo List 만들기](./step1)
- [2주차: Webpack + TodoList 리팩토링](./step2)
- [3주차: ExpressJS로 API 서버 만들기](./step3)
- [4주차: API 연동](./step4)
- [5주차: 배포하기](./step5)

# 1주차: [워밍업] Todo List 만들기

## 📣 요구사항

- [x] 아이템 추가
  - [x] 아이템 추가 `input`에 텍스트를 입력 후 `Enter`를 누르거나 `생성 버튼`을 클릭하여 아이템을 추가할 수 있다.
  - [x] 입력한 내용이 없을 때 아이템 추가를 시도할 경우 `아이템 이름을 입력해주세요` 라고 경고창을 띄워야 한다.
- [x] 아이템이 추가 성공 시 TodoList에 반영된다.
- [x] 아이템 수정
  - [x] 아이템 내용 옆에 `수정` 버튼이 존재한다.
  - [x] `수정` 버튼을 클릭할 경우 아이템의 내용이 포함된 `input`으로 `DOM`이 변경된다.
  - [x] 수정 `input`에 내용을 입력 후 `Enter`를 누르거나 `완료 버튼`을 클릭하면 아이템의 내용이 수정된다.
  - [x] 수정 `input`에서 `esc`를 누르거나 `취소 버튼`을 클릭할 경우 수정이 취소된다.
- [x] 아이템 삭제
  - [x] 아이템 내용 옆에 `삭제` 버튼이 존재한다.
  - [x] `삭제` 버튼을 클릭할 경우 아이템이 삭제된다.
- [x] Todo 아이템 Toggle
  - [x] 아이템 내용 왼쪽에 체크박스가 존재한다.
  - [x] 체크박스를 클릭할 경우 아이템의 색상이 파란색으로 변경된다.

## 👀 구현에 필요한 지식

### DOM (Document Object Model)

> 문서 객체 모델(Document Object Model, DOM)은 웹 페이지 내의 모든 콘텐츠를 객체로 나타내줍니다.

```js
console.log(document); // HTML 문서의 root
console.log(document.head); // HTML 문서의 head 태그에 대한 객체 정보
console.log(document.body); // HTML 문서의 body 태그에 대한 객체 정보
```

- 원하는 DOM 객체 선택하기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>h1 태그 선택하기</title>
  </head>
  <body>
    <h1>문서의 제목입니다.</h1>
    <p id="firstParagraph">첫 번째 문장입니다.</p>
    <p id="secondParagraph">두 번째 문장입니다.</p>
    <ul>
      <li class="red">class가 red인 list 태그입니다.</li>
      <li class="red">class가 red인 list 태그입니다.</li>
      <li class="blue">class가 blue인 list 태그입니다.</li>
      <li class="blue">
        class가 blue인 list 태그입니다.
        <a href="#">list 내부에 있는 a 태그입니다.</a>
      </li>
    </ul>
    <script>
      // 태그 이름으로 선택하기
      console.log(document.getElementsByTagName('h1'));

      // id로 선택하기
      console.log(document.getElementById('firstParagraph'));
      console.log(document.getElementById('secondParagraph'));

      // class로 선택하기
      console.log(document.getElementsByClassName('red'));
      console.log(document.getElementsByClassName('blue'));

      // querySeletor로 선택하기
      console.log(document.querySelector('h1'));
      console.log(document.querySelectorAll('h1'));
      console.log(document.querySelector('#firstParagraph'));
      console.log(document.querySelector('#secondParagraph'));
      console.log(document.querySelector('#firstParagraph'));
      console.log(document.querySelector('#secondParagraph'));
      console.log(document.querySelectorAll('red'));
      console.log(document.querySelectorAll('blue'));
    </script>
  </body>
</html>
```

- 참고링크: https://ko.javascript.info/document

### 이벤트

> 이벤트(event)는 무언가 일어났다는 신호입니다. 모든 DOM 노드는 이벤트를 발생시킵니다.

브라우저는 사용자의 상호작용을 이용하여 다양한 기능을 만들 수 있습니다.

- 마우스 이벤트
  - 태그를 클릭(`click`)했을 때
  - 마우스 커서가 태그에 진입(`mouseover`, `mouseenter`) 했을 때
  - 마우스 커서가 태그에서 벗어났을 때(`mouseout`, `mouseleave`)
  - 마우스를 누를 때(`mousedown`), 뗄 때(`mouseup`)
- 키보드 이벤트
  - 키보드를 누를 때 (keydown)
  - 키보드를 누르고 있을 때 (keypress)
  - 키보드를 뗄 때 (keyup)
- input tag 관련 이벤트
  - 값을 입력 할 때 (input)
  - 값이 변경 되었을 때 (change)
  - input에 포커싱 되었을 때 (focus)
  - input을 벗어날 때 (blur)
- form 관련 이벤트
  - 폼이 전송될 때 (submit)

가령 form이 전송 되는 시점(submit)에 input의 값을 검사하여 빈 칸이 있을 경우 전송을 취소하는 등의 작업을 할 수 있습니다.

- 참고링크: https://ko.javascript.info/events

# 2주차: TodoList 리팩토링 + 번들링

## 📣 요구사항

- [ ] 리팩토링
  - [ ] ECMAScript에 대한 조사
    - [ ] ECMAScript, Javascript 용어 정리
    - [ ] ES5 vs ES6 차이점 정리
  - [ ] 파일을 기능 단위로 분리해본다.
    - [ ] core: 어플리케이션의 베이스 코드
    - [ ] components: 컴포넌트 코드
    - [ ] utils: 유틸리티 성향의 코드
    - [ ] constants: 상수
    - [ ] app.js (entry point)
  - [ ] 다음과 같은 규칙을 지켜가며 코딩한다.
    - [ ] 한 메소드(함수)에 indent(tab)는 최대 2depth로 유지하기
    - [ ] else 예약어(keyword)를 쓰지 않는다.
    - [ ] 상수를 적극적으로 사용한다.
    - [ ] 한 줄에 점을 하나만 찍는다.
    - [ ] 줄여쓰지 않는다 (축약 금지)
- [ ] 번들러 조사 및 적용
  - [ ] 번들러에 대해 알아보기
    - [ ] javascript 번들링
    - [ ] 번들링을 하는 이유, 필요한 이유
    - [ ] 번들러로 할 수 있는 일들
  - [ ] 번들러 종류 알아보기
    - [ ] parcel
    - [ ] webpack
    - [ ] rollup
    - [ ] vite
  - [x] 모듈 시스템에 대해 알아보기
    - [x] CommonJS
    - [x] AMD
    - [x] RequireJS
    - [x] ESM
  - [x] 브라우저 모듈에 대해 알아보기
  - [x] 번들러 적용
    - [x] 번들러 설치를 위해 nodejs + npm 설치
    - [x] Parcel, Webpack, Rollup, Vite 중 택 1

## 파일 분리 예시

- [Vanilla Javascript로 컴포넌트 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/)
- 사실 위의 포스트만 볼 경우 굉장히 혼란스러울 수 있다.
- 이 부분은 온라인 세션에서 설명할 예정

## 코딩 규칙 예시

참고링크

- [객체지향 생활 체조 학습하기](https://7942yongdae.tistory.com/8)
- [[Java] 객체지향 생활 체조 원칙 9가지 (from 소트웍스 앤솔러지)](https://jamie95.tistory.com/99)

### 한 메소드(함수)에 indent(tab)는 최대 2depth로 유지하기

- 한 함수에 들여쓰기가 여러 개 존재한다면, 해당 함수는 여러가지 일을 하고 있을 가능성이 높다.
- 함수가 맡은 일이 적을수록(잘게 쪼갤수록), 재사용성이 높고 디버깅도 용이하다.

```js
function 단웅이_10번씩_5줄_반복() {
  let str = '';
  const raw = 10;
  const repeat = 5;
  for (let i = 0; i < raw; i++) {
    for (let j = 0; j < repeat; j++) {
      str += '단웅이';
      str += ' ';
    }
    str += '\n';
  }
  return str;
}
```

위의 코드를 다음과 같이 표현할 수 있다.

```js
function 단웅이_10번씩_5줄_반복() {
  const raw = 10;
  const repeat = 5;
  return 단웅이_줄바꿈_반복(raw, repeat);
}

function 단웅이_줄바꿈_반복(raw, repeat) {
  let str = '';
  for (let i = 0; i < raw; i++) {
    str += 단웅이_반복(repeat);
    str += '\n';
  }
  return str;
}

function 단웅이_반복(repeat) {
  let str = '';
  for (let i = 0; i < repeat; i++) {
    str += '단웅이 ';
  }
  return str;
}
```

다시 위의 코드는 `Array`와 `Map`을 이용하여 다음과 같이 표현할 수 있다.

```js
function 단웅이_10번씩_5줄_반복() {
  const raw = 10;
  const repeat = 5;
  return 단웅이_줄바꿈_반복(raw, repeat);
}

function 단웅이_줄바꿈_반복(raw, repeat) {
  return Array(repeat).fill(단웅이_반복(repeat));
}

function 단웅이_반복(repeat) {
  return Array(repeat).fill('Jamie ');
}
```

### else 예약어(keyword)를 쓰지 않는다.

- 조건문은 복제의 원인이 되기도 하며 가독성도 좋지 않다.
- 참고링크: https://woowacourse.github.io/javable/post/2020-07-29-dont-use-else/

```js
function 단웅이의_일과(hour, isStudy) {
  let status = '';
  if (hour > 4 && hour <= 12) {
    status = '취침';
  } else {
    if (isStudy) {
      status = '공부';
    } else {
      status = '여가';
    }
  }
  return status;
}
```

위의 코드는 다음과 같이 표현할 수 있다.

```js
function 단웅이의_일과(hour, isStudy) {
  if (hour > 4 && hour <= 12) {
    return '취침';
  }
  if (isStudy) {
    return '공부';
  }
  return '여가';
}
```

다시 다음과 같이 표현할 수 있다.

```js
function 단웅이의_일과(hour, isStudy) {
  if (hour > 4 && hour <= 12) {
    return '취침';
  }
  return isStudy ? '공부' : '여가';
}
```

이것도 다시 이렇게 표현할 수 있다.

```js
function 단웅이의_일과(시간, 공부중) {
  const 취침시간 = 4 < hour && hour <= 12;
  return 취침시간 ? '취침' : 공부중 ? '공부' : '여가';
}
```

그런데 사실 마지막 케이스의 경우 호불호가 조금 있는 편이다.

### 상수를 적극적으로 사용한다.

앞선 경우를 예로 들자면 다음과 같다.

```js
const 취침 = '취침';
const 공부 = '공부';
const 여가 = '여가';
function 단웅이의_일과(hour, isStudy) {
  if (hour > 4 && hour <= 12) {
    return 취침;
  }
  return isStudy ? 공부 : 여가;
}
```

혹은 다음과 같이 표현할 수 있다.

```js
const 단웅이의_상태 = {
  취침: 취침,
  공부: 공부,
  여가: 여가,
};

function 단웅이의_일과(hour, isStudy) {
  if (hour > 4 && hour <= 12) {
    return 단웅이의_상태.취침;
  }
  return isStudy ? 단웅이의_상태.공부 : 단웅이의_상태.여가;
}
```

여기서 `4`와 `12`도 상수로 만들 수 있다.

```js
const 단웅이의_상태 = {
  취침: 취침,
  공부: 공부,
  여가: 여가,
};
const 취침_시간 = {
  시작: 4,
  끝: 12,
};

function 단웅이의_일과(hour, isStudy) {
  if (취침_시간.시작 < hour && hour <= 취침_시간.끝) {
    return 단웅이의_상태.취침;
  }
  return isStudy ? 단웅이의_상태.공부 : 단웅이의_상태.여가;
}
```

작성하고 보니 단웅이녀석 이상한 시간에 자고 있다.

### 한 줄에 점을 하나만 찍는다.

이 부분은 순수하게 가독성을 위함입니다.

```js
function 랜덤_숫자_100개_만들기() {
  return Array(100)
    .fill(0)
    .map(() => Math.random())
    .map((v) => v * 100)
    .map(Math.round);
}
```

위에 처럼 된 코드를 다음과 같이 표현합시다.

```js
function 랜덤_숫자_100개_만들기() {
  return Array(100)
    .fill(0)
    .map(() => Math.random())
    .map((v) => v * 100)
    .map(Math.round);
}
```

혹은

```js
function 랜덤_숫자_100개_만들기() {
  return Array(100)
    .fill(0)
    .map(() => Math.random())
    .map((v) => v * 100)
    .map(Math.round);
}
```

### 줄여쓰지 않는다 (축약 금지)

- 길게 설명하지 않겠다.
- 아니, 내가 설명하지 않겠다.
- [이 포스트](https://velog.io/@mowinckel/%EB%88%84%EA%B0%80-%EC%9D%B4%EB%A6%84%EC%9D%84-%ED%95%A8%EB%B6%80%EB%A1%9C-%EC%A7%93%EB%8A%94%EA%B0%80)로 대체한다.

## 번들러 관련 자료

- [모듈화의 역사](https://medium.com/@chullino/%EC%9B%B9%ED%8C%A9-3-4-js%EB%AA%A8%EB%93%88%ED%99%94-%EC%97%AD%EC%82%AC-%EB%8F%8C%EC%95%84%EB%B3%B4%EA%B8%B0-1-9df997f82002)
- [module](https://gitlab.com/siots-study/topics/-/wikis/module)
- [모듈 소개](https://ko.javascript.info/modules-intro)
- [babel과 webpack을 이용한 ES6 환경 구축](https://poiemaweb.com/es6-babel-webpack-1)

# 3주차: ExpressJS로 API 서버 만들기

## 요구사항

- [ ] 사전 조사
  - [ ] NodeJS에 대한 개념 (간략히)
  - [ ] Javascript와 NodeJS의 공통점/차이점
  - [ ] RESTful, RESTAPI 등에 대해 조사하기
  - [ ] express.js에 대한 개념 (간략히)
- [ ] 기능구현
  - [ ] 아이템 조회
  - [ ] 아이템 추가
    - [ ] 아이템을 추가할 때 자유롭게 고유 ID를 계산해서 저장한다.
  - [ ] 아이템 내용 수정
  - [ ] 아이템 토글
  - [ ] 아이템 삭제
  - [ ] 데이터를 저장할 수 있는 형태로 관리한다.
    - [ ] 파일시스템(json) or MySQL or MongoDB 선택

## 사전조사에 대한 참고링크

- NodeJS
  - [공식문서](https://nodejs.org/ko/docs/guides/)
  - https://perfectacle.github.io/2017/06/18/what-is-node-js/
  - [javascript와 nodejs](http://junil-hwang.com/blog/javascript-node-js/)
- Javascrtip와 NodeJS의 공통점/차이점
  - [javascript와 nodejs](http://junil-hwang.com/blog/javascript-node-js/)
  - https://hazel-developer.tistory.com/152
- Restful, REST API
  - [REST란? REST API란? RESTful이란?](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)
  - [RESTful이란?](https://nesoy.github.io/articles/2017-02/REST)
  - [도대체 뭐가 RESTful 이라는건가?](http://www.chidoo.me/index.php/2016/06/03/what-is-restful/)
- express.js에 대한 개념
  - [공식문서](https://expressjs.com/ko/)
  - http://junil-hwang.com/blog/nodejs-express/

## 요구사항 스펙문서

### 아이템 조회

```http
# Request
GET /api/items

# Response
[
  { "idx": 1, "content": "todo item1", "completed": true, "createdAt": 1625484597770 },
  { "idx": 2, "content": "todo item2", "completed": false, "createdAt": 1625484600000 },
  { "idx": 3, "content": "todo item3", "completed": false, "createdAt": 1625484712340 }
]
```

### 아이템 추가

```http
# Request
POST /api/items
Content-Type: application/json

{
  "content": "새로운 Todo Item"
}
```

### 아이템 내용 수정

```http
# Request
# 1번 아이템의 내용을 수정
PUT /api/items/1
Content-Type: application/json

{
  "content": "새로운 Todo Item"
}
```

### 아이템 토글

```http
# Request
# 1번 아이템을 토글
PUT /api/items/toggle/1
Content-Type: application/json
```

### 아이템 삭제

```http
# Request
# 1번 아이템을 삭제
DELETE /api/items/1
Content-Type: application/json
```
