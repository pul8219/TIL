[따라하며 배우는 노드, 리액트 시리즈 - 기본 강의(인프런)](https://inf.run/A1nk) 내용 정리

> 💡보일러 플레이트
>
> 재사용가능한 프로그램. 어디에나 들어가는 로그인, 회원가입 기능을 보일러 플레이트로 만들어볼 것

# 환경설정

## Node.js 설치

- `node -v`로 node.js가 설치되어있는지 확인
- 원하는 폴더로 이동한 후, `npm init`을 통해 `package.json`을 생성
- `index.js` 생성(`index.js`는 백엔드 서버의 시작점이 되는 파일이다.)

## express.js 설치

- `npm install express --save`
  - `--save`라는 옵션은 `package.json`에 해당 dependency를 명세해주는 기능이다.
- 다운받은 dependencies들은 `node_module`이라는 폴더에서 관리된다.
- <expressjs.com/en/starter/hello-world.html>
  - `const express = require('express')` express 모듈을 가져온다.
  - `const app = express()` 새로운 express앱을 만들고
  - `const port = 3000` 포트를 지정해준다.
  - `app.get('/', (req, res) => res.send('Hello World!'))` 루트 디렉토리일경우(`/`) `Hello World!`를 표시한다.
  - `app.listen` 앱을 실행
  - `package.json`에 `"scripts"`에 `"start":"node index.js"`를 추가한 다음 터미널에서 `npm run start`(start 스크립트를 실행시킨다.)

## mongoDB 설치

- 클라우드 상에 mongoDB 만들기

- mongoose 설치(mongoDB를 쉽게 쓸 수 있게 해주는 툴)
  - `npm install mongoose --save`
- 우리의 app과 mongoDB를 연결하기 (mongoose의 connect 사용)

# mongoDB Model & Schema

## Model

Schema를 감싸는 것

## Schema

- mongoDB에는 Schema-less하다. RDBMS처럼 고정 Schema가 존재하지 않는다는 뜻으로 같은 Collection 내에 있더라도 document별로 다른 Schema를 가질 수 있다는 의미이다. 유연하게 사용이 가능하다는 장점이 있지만 어떤 필드가 어떤 데이터 타입인지 알기 어려운 단점이 있어 mongoose에서는 Schema를 지원한다.
- mongoose는 Schema를 사용하는데 mongoDB에 저장되는 document의 데이터 구조, 즉 필드 타입에 관한 정보를 JSON 형태로 정의한 것이다. (RDBMS의 테이블 정의와 유사한 개념이다.)
- Schema는 Model 생성 시 인자로 전달한 후, 더이상 사용되지 않는다.

출처: <https://poiemaweb.com/mongoose>

> MongoDB의 개념 - RDBMS의 개념
>
> - Collection - Table
> - Document - Record

> Schema(스키마)
>
> RDBMS에서 Schema는 데이터베이스를 구성하는 레코드의 크기, 키(key)의 정의, 레코드와 레코드의 관계, 검색 방법 등을 정의한 것을 의미한다.

## 참고

`const User = mongoose.model('User', userSchema)`

여기서 지정한 Collection의 이름은 `User`로 단수형이지만, mongoDB에 저장되는 실제 Collection의 이름은 자동으로 `s`가 붙어 `Users`로 저장된다.

# Git & Github

- Git: 소스코드를 관리할 수 있는 **툴**(분산 버전관리 시스템)
- Github: Git으로 관리하고 있는 코드들을 올리고 많은 사람들과 공유, 수정할 수 있도록 해주는 클라우드 **서비스**

> SSH(Secure Shell)

## ❗ Git push할 때 htt(ps방식과 ssh방식 장단점 비교하기

SSH 방법으로 연결할 것(지금까지 git init 하고 추가한 파일들을 add>commit 까지 했음. 이제 원격 서버에 코드들을 push할 차례)

1. SSH 키 생성

[Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

2. SSH Agent를 Background에서 킨다.

<https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent>

- `eval "$(ssh-agent -s)"`

- SSH private키를 ssh-agent에 add 해줘야한다.
- SSH public키를 Github에 추가해준다. <https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account>
  - `clip < ~/.ssh/id_ed25519.pub` 를 프롬프트창에서 실행시키면 ssh public키가 우리의 클립보드에 복사된다.
  - Github > Settings > SSH GPG key > 복사해놓은 ssh 키를 붙여넣기
  - 이렇게 하면 우리 컴퓨터랑 Github 서버가 안전하게 통신 가능하다.

# BodyParser & PostMan & 회원가입

## BodyParser

Body-parser를 이용해 클라이언트에서 서버로 정보들을 보낼것이다.

클라이언트에서 오는 Body 데이터를 서버에서 분석(parse)해서 req.body로 가져올 수 있게 해주는 것이다. (req.body를 쓸 수 있는 것은 bodyParser가 있기 때문이다.)

`npm install body-parser --save`

> 클라이언트와 서버
>
> 우리가 index.js에 작성하고 있는 것이 Server이다.

## PostMan

현재 만들어진 클라이언트가 없어서 PostMan을 통해 요청(Request)을 보낼 것이다.

## Register Route 만들기

```js
app.post('/register', (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져와 데이터베이스에 넣어주는 코드

  const user = new User(req.body);

  // mongoDB 메소드인 save를 사용. 정보들이 user모델에 저장된다.
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
  // res.json() 응답을 json으로 하겠다는 것
});
```

# Nodemon

서버를 수동으로 재시작하지 않아도 변경사항이 실행될 수 있도록 도와주는 툴

- `npm install nodemon --save-dev`: `-dev` local에서 할때만 사용하겠다는 것(<-> production mode, 배포 이후) 설치 후 `package.json`를 확인해보면 `-dev`를 붙이지 않았을 때는 `"dependencies"`에 추가된 것과 달리 `"devDependencies"`에 추가된 것을 볼 수 있다.
- 시작할 때 nodemon으로 시작하기 위해서 `package.json`의 스크립트에 다음을 추가 `"backend": "nodemon index.js"` 그리고 실행 `npm run backend`

# Local vs Deploy

mongoDB의 유저 id, pw와 같은 private 해야하는 정보들을 숨길 때 개발환경이 무엇인지에 따라 설정을 다르게 해줘야 한다.

숨길 정보를 담은 파일을 gitignore를 통해 숨길 경우, local 환경에서는 확인이 가능하나 배포 후 환경에서는 확인이 불가하다(heroku를 예를 들면, config에 mongoDB uri를 따로 입력해줘야한다.) 그래서 local 환경에서는 해당 파일에서 가져오게 하고, 배포 후 환경에서는 웹사이트에서 가져오게 나눠서 설정해줘야한다.

- Local 환경에서(development)
- Deploy(배포)한 후(production)

- `key.js` 에서 분기 설정

```js
if (process.env.NODE_ENV === 'production') {
  // production 환경일 때
  module.exports = require('./prod');
} else {
  // development 환경일 때
  module.exports = require('./dev');
}
```

- `dev.js` -> git에 올라가지 않도록 .gitignore에 명시하기

```js
module.exports = {
  mongoURI: 'mongodb-uri',
};
```

- `prod.js`

```js
module.exports = {
  mongoURI: process.env.MONGO_URI, // (예를 들면) heroku에서 설정한 이름과 똑같아야한다.(MONGO_URI)
};
```

# Bcrypt로 비밀번호 암호화

현재 데이터베이스에 비밀번호가 그대로 저장되어있다. 관리자도 비밀번호를 모를 수 있도록 이런 정보는 암호화해야한다. bcrypt라는 라이브러리를 활용해 암호화해보자.

- `npm install bcrypt --save`
- npmjs.com/package/bcrypt 사이트 참고
  - `saltRounds` salt가 몇자리인지 지정하고
  - salt를 생성해서
  - salt를 이용해 비밀번호를 암호화한다.

`User.js` 수정

```js
const bcrypt = require('bcrypt');
const saltRounds = 10;

//mongoose.model 코드 전에 아래 코드를 작성하기

// model을 save 하기 전에 무언가를 하겠다는 뜻
userSchema.pre('save', function (next) {
  // 비밀번호 암호화

  var user = this;

  if (user.isModified('password')) {
    //비밀번호 암호화가 비밀번호가 바뀔때만 동작할 수 있도록 제한
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      }); // hash에는 암호화된 비밀번호가 담긴다.
    });
  }
});
// next는 model을 save하는 곳으로 보내주는 function이다.
```

email이나 name을 바꿀 때도(비밀번호는 바꾸지 않는데도) 다시 비밀번호를 암호화해버리는 걸 막으려면 위의 코드에 나와있듯이 isModified 관련 코드를 추가해줘야한다.
