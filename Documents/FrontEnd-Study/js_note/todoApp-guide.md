로그인 없이 사용자의 데이터를 저장해놓고 있을 수 있는 방법

소셜로그인 타입으로

id로 todolist 불러오기

javascript - node.js - mongodb

mongodb설치

- mongodb 파일을 다운받아서 연결하는 방법
- mongodb 사이트에서 cluster를 만들어 연결하는 방법

express 설치

https://velog.io/@madpotato1713/JAVASCRIPT-express%EB%9E%80

express로 서버 구성하기

https://medium.com/withj-kr/nodejs-express%EB%A1%9C-%EC%84%9C%EB%B2%84-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0-1-express-%EA%B8%B0%EB%B3%B8%EA%B8%B0-c0245b4120bc

nodejs mongodb 연결하기
https://velog.io/@chy0428/Node-JS-MongoDB-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0

node.js 서버의 정확한 역할?

db 어떻게 공유할지
데이터 구조
nodejs, mongodb, express 등 공부

---

# mongoose

mongoDB를 node.js에서 쉽게 사용할 수 있도록 해주는 모듈이다.

[REST API, Nodejs + mongoDB 강의](https://youtu.be/hX9MldkfUxI)

mongoose schema https://mongoosejs.com/docs/schematypes.html

mongodb CRUD https://velog.io/@ckstn0777/MongoDB%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90#mongodb-%EA%B4%80%EB%A6%AC-gui-%ED%88%B4

express mongodb 활용하기 - 로그인 기능 만들기 https://loy124.tistory.com/246

mongoose로 node.js와 mongodb 앱 쉽게 개발하기 https://velog.io/@hayoungj0710/Mongoose%EB%A1%9C-Node.js%EC%99%80-MongoDB-%EC%95%B1-%EC%89%BD%EA%B2%8C-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0

node.js mongoDB driver API 공식문서 https://mongodb.github.io/node-mongodb-native/3.6/api/

mongoose api 공식문서 https://mongoosejs.com/docs/api.html

how to push object to array in mongoose https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
https://stackoverflow.com/questions/15621970/pushing-object-into-array-schema-in-mongoose

Mongoose Atomic Update 방식을 찾아서 https://velog.io/@yejineee/Mongoose-Atomic-Update-%EB%B0%A9%EC%8B%9D%EC%9D%84-%EC%B0%BE%EC%95%84%EC%84%9C

mongoose와 mongodb api의 update 차이점

https://blog.ull.im/engineering/2019/03/08/update-on-mongodb-and-mongoose.html

객체 내의 배열 내의 객체의 내용을 수정할 때 도움이 됐던 링크
mongoose update an item from array by id(객체의 id와 배열 안의 어떤 아이템의 id로 찾는 방법을 물어보는 글 -> 딱 내가 알고싶던 것!)
https://stackoverflow.com/questions/48741974/mongoose-update-an-item-from-array-by-id

`{$set: {'todoList.$.contents': req.body.contents}},` 여기서 `$`는 내가 찾으려는(요청한) 것과 match되는 array 요소를 의미한다.

---

node.js javascript todoapp개발 (1)spa 개발자황준일 http://junil-hwang.com/blog/javascript-todo-spa/

how to make a todolist with (node.js, express, mongodb) 유튜브 영상 https://www.youtube.com/watch?v=fPN8oGkyXg8

---

# 데이터 형식 설계

- `_id`(자동생성)
- `name` 사용자명
- `todoList` 투두리스트 아이템들이 담겨있는 list. 다음과 같은 항목이 객체로 담겨 `todoList`의 요소로 들어있음.

  - `_id` -> 자동생성 가능? 가능!
  - `contents` 투두리스트 아이템의 내용
  - `isCompleted` 해당 투두리스트 아이템의 완료 유무(해야할 일 or 완료한 일) (default: 해야할 일)

- 데이터 형식 샘플

```json
{
  "_id": "blahblah",
  "name": "Dalgom",
  "todoList": [
    {
      "_id": "blahblah001",
      "contents": "Yoga",
      "isCompleted": false
    },
    {
      "_id": "blahblah002",
      "contents": "Study",
      "isCompleted": false
    }
  ]
}
```

# 진행

mongoDB, node.js express, mongoose 사용해 클라우드 데이터베이스에 데이터 넣어보기

Postman으로 get, post 등 요청 보내기

데이터는 어떤 유저 안에 todoList(배열)이 있는 형태 -> 이 todoList에 todoItem을 CRUD하는 연습해보기

---

# html css

## 구현하고 싶은 기능

- 반응형으로
- 색은 보라색 그라데이션?
- 체크표시 누르면 투두아이템에 취소선 그어지게(보라색) 투두아이템글씨도 연한 회색이 되게
- x표시에 포인터 대면 강조되게

## css pseudo-element와 pseudo-class

https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements

https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-classes

## css 크로싱 브라우저를 위한 접두어

- `-webkit-`: 구글, 사파리 브라우저에 적용
- `-moz-`: 파이어폭스 브라우저에 적용

todolist 샘플 https://velog.io/@janeljs/making-a-todolist

checkbox, label https://stackoverflow.com/questions/30663562/use-images-like-checkboxes/30663705

`::before`

---

Q. 210521 node.js express mongodb html화면에서 데이터를 받아서 db에 crud를 하려는게 목적이잖아? 근데 react를 안 쓰고 vanillajs로 개발을 하려면 어떤 개념을 알아야 하는지..? route, render, 자료검색하다보니까 이런게 나오는데 화면단 데이터를 어떻게 다뤄야되는지 모르겠다,,는 거죠!

(은영언니 조언)

- react, nodejs 인프런 강의 수강 추천
- fetch 대신 axios 사용해서 구현해보기(axios 설정파일을 이용해 다양한 부가기능 구현 가능)
- 부스트캠프같은 프로그램은 '어떤 필요성을 느껴 공부를 해 무언갈 만들었다는 실천 결과', '프로그래밍을 향한 열정' 표현하는 것 중요
