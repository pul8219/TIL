# Node.js란?

> Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser.(server side)

- Node.js란 Chrome의 `V8`엔진(크롬에서 Javascript를 해석하기위해 동작하는 엔진)을 이용해 **서버에서도 Javascript가 동작할 수 있게 하는 환경**이라고 생각하면 된다.
- 한마디로 `서버사이드에서 실행되는 자바스크립트`
- 말그대로 '환경'이기 때문에 서버를 직접 구현해줘야한다.
- Node.js는 대기 시간을 효율적으로 사용하기 위해 제공하는 API는 모두 **비동기식**으로 동작한다.(비동기 I/O = 논블로킹 I/O를 사용) API를 실행하고 완료될 때까지 기다리는 게 아니라 다음 API를 실행한다는 것이다.

> !처리를 의뢰하는 때에! 그 처리가 완료됐을 때 실행하고싶은 이벤트를 등록하는 방식을 비동기 처리라고 볼 수 있다.

```js
// Node.js로 텍스트 파일을 읽어 들이는 프로그램
// 파일을 비동기로 읽는다.
const fs = require('fs'); // fs 모듈 사용

fs.readFile('test.txt', 'utf-8', testLoaded);

// 파일 읽기를 완료했을 때 실행할 함수
function testLoaded(err, data) {
  if (err) {
    console.log('읽기 실패');
    return;
  }
  console.log(data);
}

// 💡 파일을 읽어들일 때 readFile()를 사용하는데 이 메소드는 비동기적으로 파일을 읽어들이므로 파일을 읽는 동안 프로그램이 대기하지 않는다. 파일 읽기가 완료되면 3번째 매개변수에 전달했던 콜백함수가 실행되는 구조이다. 네트워크 입출력시에도 이와 마찬가지로 비동기적으로 처리가 이루어진다.
```

## Node.js의 장점

- 비동기 I/O로 인한 매우 빠른 고성능 서버 구현 가능. 실시간성이 높은 채팅 어플리케이션이나 작은 처리가 대량으로 발생하는 어플리케이션 구현에 유리.
- 구글의 최신화된 `V8`이라는 빠른 스크립트 실행 엔진을 사용해 효율이 좋음.

## JavaScript와 Node.js

JavaScript와 Node.js는 자바스크립트 표준인 ECMAScript라는 스펙을 사용한다는 공통점이 있다. 다만 Node.js는 JavaScript가 아니라 ECMAScript를 다룬다.

즉 ECMAScript를 알면 JavaScript, Node.js 둘 모두를 다룰 수 있지만 그 이외의 부분은 별도로 공부해야한다.

### JavaScript

- JavaScript는 document, browser를 다루며 프론트엔드, 즉 클라이언트(BOM, DOM)를 다룰 수 있는 도구이다.
- **JavaScript는 서버를 다룰 수 없다.**
- 웹 브라우저에서 실행할 수 있다.

```js
// JavaScript에서는 다음과 같은 것이 불가능하다.
const http = require('http'); //error
```

### Node.js

- Node.js는 자바스크립트를 해석하는 크롬의 `V8`엔진에서 스크립트 실행 엔진을 추출한 것이다. 쉽게 `V8`엔진이 데스크톱 앱으로 추출된 것이라고 생각하면 된다.
- Node.js는 백엔드, 즉 서버를 다룰 수 있는 도구이다. 파일 시스템을 이용할 수도 있고 Node.js로 서버를 만들 수도 있다.
- Express같은 라이브러리를 이용해 Node.js로 서버를 만들곤 하지만, Node.js는 그 자체로 웹 서버가 아니라 웹 서버를 만들 수 있는 하나의 **방법**이라는 것에 유의하자.
- **Node.js는 클라이언트를 다룰 수 없다.**

- 터미널(윈도우 cmd, Mac 터미널 등)에서 `node`를 입력해 브라우저 없이도 실행할 수 있다.

```js
// Node.js에서는 다음과 같은 것이 불가능하다.
let elem = document.body; // error
```

# npm

- `npm(Node Package Manager)`은 Node.js에서 필요한 모듈들을 다운로드 받을 수 있게 도와주는 포준 패키지 관리 도구이다.
- 설치가능한 라이브러리에 어떤 것이 있는지는 npm 공식 사이트에서 확인할 수 있다. [npmjs](https://www.npmjs.com/)
- 어떤 모듈이 다른 모듈에게 의존적일 때(=어떤 모듈이 다른 모듈을 사용하는 경우), 즉 의존 관계에 있는 모듈도 npm을 이용하면 한꺼번에 설치할 수 있다.

## 전역 설치

시스템 전체에서 공유할 수 있는 라이브러리를 설치하고 싶다면 모듈을 **전역 설치** 하면 된다.

```bash
$ npm install -g 설치하고싶은모듈명
```

```bash
# npm으로 전역 모듈을 설치할 때 어떤 디렉토리에 설치되는지 알고싶다면 아래 명령어를 사용한다.
$ npm root -g
```

## npm을 사용한 프로젝트 생성 방법

`npm`으로 모듈 추가/제거 뿐만 아니라 프로젝트 관리도 할 수 있다.

```bash
# 1. 프로젝트로 사용할 디렉토리를 생성한다.
# 2. 해당 디렉토리에서 다음 명령어를 실행한다.
$ npm init
```

`npm init`을 실행하면 프로젝트에 `package.json` 파일이 생성된다. 이는 npm으로 프로젝트를 관리하기 위한 설정 파일이다.

`npm install`로 모듈을 설치할 때 `--save` 옵션을 주면 `package.json`에 설치한 모듈과 버전이 기록된다.

`package.json`을 사용하면 프로젝트를 버전 관리 도구 등으로 백업하고 관리할 때 `node_modules` 디렉토리 내부의 라이브러리를 따로 관리하지 않아도 된다. 라이브러리와 그 버전이 기록되어 있으므로 npm을 이용해 해당 모듈을 다시 다운로드할 수 있기 때문이다. (`node_modules`를 지우고 `npm install`을 실행해보면 `package.json`의 `dependencies`를 기반으로 필요한 모듈이 자동으로 설치되는 것을 볼 수 있다.)

## npm을 사용해 스크립트 실행하기

`npm`을 이용하면 스크립트 또는 코드 생성 명령어를 관리할 수 있다. 다음과 같이 `package.json`의 `scripts`에 `start`라는 엔트리를 추가해보자.

```json
// 📁 package.json
{
    ...
    "scripts": {
        "start": "node index.js"
    }
    ...
}
```

그리고 `npm run start` 명령어를 터미널에서 입력하면 `package.json`의 `scripts/start`에 작성한 셀 명령어가 실행된다.

추가로 `npm run`이라고 입력하면 실행할 수 있는 명령어 목록이 출력된다.

# yarn

`yarn`은 `npm`과 같은 **패키지 관리 시스템**이다. `npm`보다 빠르게 동작한다.

Node.js, npm이 설치되어 있다면 다음 명령어로 Yarn을 설치할 수 있다.

```bash
$ npm install yarn -g
```

yarn으로 모듈을 설치할 땐, `yarn add` 명령어를 사용한다.

```bash
$ yarn add 설치할모듈명

# 전역 모듈을 설치하고 싶을 땐 아래처럼 "global" 옵션 사용
$ yarn global add 설치할모듈명
```

# express

> Express.js, or simply Express, is a web appplication framework for Node.js

Node.js가 자동차의 엔진이라면, 엔진을 가지고 자동차의 바퀴 등 자동차(웹사이트, 어플리케이션 등)를 쉽게 만들 수 있도록 도와주는 것이 express이다. node.js로 서버를 쉽게 구성할 수 있도록 도와주는 프레임워크이다.

쉽게 말하면 **express란 NodeJS를 사용하여 쉽게 서버를 구성할 수 있게 만든 클래스와 라이브러리의 집합체** 이다.

## express 설치

express 설치에 앞서 다음 두 가지가 선행되어있어야 한다.

- Node.js 설치
- `npm init`을 통한 프로젝트 initialize

그런 다음 `npm install express` 명령어로 express를 설치하면 된다.

## express 사용

```js
const express = require('express'); // express 모듈 로드
const app = express();
const port = 3000; // 포트 번호 지정

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

# bodyparser 미들웨어

[express 미들웨어 body-parser 모듈](https://velog.io/@yejinh/express-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-bodyParser-%EB%AA%A8%EB%93%88)

# module.exports

[module.exports와 exports이해하기](https://uroa.tistory.com/57)

# References

- [도서 - 모던 자바스크립트 개발자를 위한 리액트 프로그래밍]()
- [javascript와 node.js](http://junil-hwang.com/blog/javascript-node-js)
- [Javascript와 Node의 차이점을 정리해보자](https://hazel-developer.tistory.com/152)
- [Express란?](https://velog.io/@madpotato1713/JAVASCRIPT-express%EB%9E%80)

---

- [Node.js란?](https://medium.com/@yeon22/node-js-node-js%EB%9E%80-410ae3749c56)
- [node.js, express, package.json](https://velog.io/@madpotato1713/JAVASCRIPT-express%EB%9E%80)
- [nodejs express로 서버 구성하기, express 기본기](https://medium.com/withj-kr/nodejs-express%EB%A1%9C-%EC%84%9C%EB%B2%84-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0-1-express-%EA%B8%B0%EB%B3%B8%EA%B8%B0-c0245b4120bc)
- [nodejs mongodb 연결하기 ~ bcrypt를 이용하여 로그인 정보 암호화하기](https://velog.io/@chy0428/Node-JS-MongoDB-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0)
- [nodejs로 CRUD 만들어보기](https://medium.com/@feedbotstar/node-js-%EB%A1%9C-crud-%EB%A7%8C%EB%93%A4%EC%96%B4-%EB%B3%B4%EA%B8%B0-cdcbaf7174a7)
