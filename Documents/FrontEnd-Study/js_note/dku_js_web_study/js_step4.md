# 4주차: API 연동

Step2에서 작업한 내용과 Step3에서 작업한 내용을 합치는 과정

- [ ] 사전 조사
  - [x] AJAX란?
  - [x] XMLHttpRequest API
  - [x] Fetch API
  - [x] CORS
  - [ ] Promise, async, await
- [ ] API 연동하기
  - [ ] 번들러로 빌드 하기
  - [ ] 빌드한 HTML/CSS/JS를 Server와 연동하기
  - [x] fetch api를 이용하여 html에서 server 데이터 가져오기

step3에서 mongoDB를 활용했는데, 파일 시스템을 이용해보고도 싶어서 step4에서는 파일 시스템을 이용해 아이템 조회, 추가, 수정, 삭제를 구현했다.

# 동기식 파일 I/O 메소드

`fs.readFileSync()` 파일 읽기

# JSON.parse(), JSON.stringify()

- JSON.parse(): JSON -> real js data
- JSON.stringify(): real js data -> JSON

<https://potensj.tistory.com/99>

- [Javascript JS 에서 json 형식 처리하기](https://potensj.tistory.com/99)

# express

- express.static('public') 정적파일 서비스
- res.render() express의 render()
- 완료: 아이템 추가, 아이템 수정

- [http status code에 대해서](https://evan-moon.github.io/2020/03/15/about-http-status-code/) 무조건 200, 500번 상태코드만 쓰지말고 상황에 따라 다른 상태코드도 쓸 것!
- [node.js, javascript todo app 개발 - spa, rest api, spa+rest api](http://junil-hwang.com/blog/javascript-todo-spa/)

## router 사용

router를 사용하여 index.js, api.js 분리

[Routing 라우팅 - Express 공식 문서](https://expressjs.com/ko/guide/routing.html)
[Using Middleware 미들웨어 사용하기 - Express 공식 문서](https://expressjs.com/ko/guide/using-middleware.html)

## express middleware로 에러처리하기

- express 미들웨어(middleware)란?
- express 미들웨어로 에러처리(황쌤 코드리뷰 반영)
- express 미들웨어 관련. `next()`?

- [[NodeJS][Express]도대체 next메소드의 정체는 뭘까?](https://kamang-it.tistory.com/entry/NodeJSExpress%EB%8F%84%EB%8C%80%EC%B2%B4-next%EB%A9%94%EC%86%8C%EB%93%9C%EC%9D%98-%EC%A0%95%EC%B2%B4%EB%8A%94-%EB%AD%98%EA%B9%8C)

async, await을 사용하면 express 미들웨어 에러처리 때 뭐가 안된다는 건지 자세히 알아보기.(promise로 래핑하래)

- [Express 미들웨어를 활용한 에러 처리](https://devhyun.com/blog/post/6) (읽어보면서 적용해보기)

- [Expressjs - Writing middleware](http://expressjs.com/en/guide/writing-middleware.html)
- [Expressjs - Using middleware](http://expressjs.com/en/guide/using-middleware.html)
- [Expressjs - Error handling](http://expressjs.com/en/guide/error-handling.html#error-handling) ⭐이해 필요

## 유효성 검사를 위한 express-validator

- req.body에 적절한 내용이 들어오지 않은 경우 -> 상태코드 400
- req.body, 경로에 담긴 파라미터, 쿼리스트링 등의 유효성 검사를 위해 express의 모듈인 (validate 말고) express-validator 사용

아이템을 추가할 때 content 내용이 공백이 포함된 문자열이거나 입력하지 않았을 경우에 에러를 던져주기 위해서 어떻게 검사할까 고민했다. body에 담긴 데이터를 일일이 검사하는 건 비효율적이란 생각이 들었고 방법을 찾다가 `express-validator`를 사용해봤다.

express-validator는 express에서 사용가능한 유효성 검사 모듈로 유효성 검사를 간편하게 할 수 있게 해준다.

```js
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

app.post(
  '/user',
  // username must be an email
  body('username').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then((user) => res.json(user));
  }
);
```

# `data.json`의 초기 상태

데이터를 저장하고 가져오는 `data.json`은 내 코드에 의하면 초기 상태가 다음과 같아야 한다.

```js
{
  "items": [
      // 데이터가 담길 곳
  ]
}

```

References

- [express-validator 공식문서](https://express-validator.github.io/docs/)
- [Node.js 유효성 검사를 위한 express-validator](https://2ssue.github.io/programming/express-validator/)

# 고유한 ID값 생성을 위한 uuid 사용

- [uuid, 그리고 왜 uuid를 String으로 그대로 저장하는 것이 효율성이 떨어지는지에 대해서](https://medium.com/aha-official/%EC%95%84%ED%95%98-rest-api-%EC%84%9C%EB%B2%84-%EA%B0%9C%EB%B0%9C-6-43568d94878a)
- [uuid npm 공식 문서](https://www.npmjs.com/package/uuid)

```
파일 구조

step4
📁public
    📁js
        ㄴapp.js        #entry file
    index.html
index.js        # backend files(1)
api.js      # backend files(2)
data.json       # Database
```

# 210719 온라인세션

일주일 회고

fetch, axios, xmlhttprequest
ajax에 대해 이해도 높인 시간?

react, redux 간단하게 사용해서 로그인, 회원가입등을 해보는 인강 공부

express 미들웨어와 에러처리에 대한 공부

채용공고 살펴봄 (로켓펀치, 원티드)

도서 '함께 자라기' 난이도에 맞는 학습하기 중요 학습 관련 책!(준일님 추천)

- 사전조사

  - 클라우드 서비스 (모두 유료)
  - 무료 플랫폼 조사
    - github pages : html, css, js 로만으로도 만들 수 있음
    - vercel: html, css, js 로만으로도 만들 수 있음 / serverless
    - heroku: 우리는 expresss를 썼으니 heroku 쓰는게 좋을 것 (제일 느림) 직접 만든 서버 관리할 수 있음
    - netlify:

- 원하는 시스템 선택해서 배포해보기
  - 개인적으로는 heroku 추천!

html css js는 github에 배포해보고 express는 heroku에 배포해서 매치시켜도 된다.
cors는 원하는 도메인만 가능하도록 해야 보안이 안전함

사실 공유기도 하나의 서버임
함부로 열어두면 해킹당한대 ;;

서버를 올리고
클라이언트에서 서버를 빌드를 해서
웹서비스

앱의 절반은 웹으로 만들어져있대(웹뷰)

react immutabel이 특징임 리덕스나 모비스? 프레임워크로 상태관리함
객체의 속성을 직접 수정하는 것이 아니라 setState

vue 플럭스 패턴
옵저버 패턴

vanillajs로 앱을 만드는 경우는 거의 없음. 학습 목적!
