# STEP 8

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위:

[Asyncronous](https://gitlab.com/siots-study/topics/-/wikis/asyncronous)

비동기 함수

[Exception Handling](https://gitlab.com/siots-study/topics/-/wikis/exception-handling)

예외 처리

- 기한: 9/5(토) ~ 9/8(화)

# 보충 필요

- 프로토타입

- 에러가 발생하는 순간 호출 스택의 동작 방법

- Promise 쓸 때 다양한 에러 처리 예제 <https://gitlab.com/siots-study/topics/-/wikis/exception-handling>

- 에러객체.constructor

  객체 .constructor .prototype 등 ...

# 예외 처리(Exception / Error handling)

Javascript는 코드 실행 중에 예기치 못한 에러가 발생했을 때, 이로부터 코드의 실행 흐름을 복구할 수 있는 **예외 처리(Exception Handling)** 기능이 내장되어있다.

(에러가 발생했을 때 전체 코드를 중단시키는 것이 아니라 특정 코드부터 다시 실행되도록 할 수 있기 때문에 예외 처리가 필요한 것! )

[프론트엔드 면접 스터디, 예외 처리](https://gitlab.com/siots-study/topics/-/wikis/exception-handling)

[JavaScript로 만나는 세상, 예외 처리](https://helloworldjavascript.net/pages/290-exception.html)

이 문서는 위 두 문서 내용 전반을 기반으로 이해하면서 거의 같게 작성하였기 때문에
추가적으로 관련 내용 학습해 나의 언어로 문서 수정 필요!

## 목차

- [동기식 코드에서 예외 처리](#동기식-코드에서-예외-처리)

- [`throw` 연산자와 에러 커스터마이징](#`throw`-연산자와-에러-커스터마이징)

- [비동기식 코드에서 예외 처리](#비동기식-코드에서-예외-처리)

## 동기식 코드에서 예외 처리

`try-catch-finally` 구문을 사용하면 에러가 나더라도 코드의 실행을 지속할 수 있다.

1. `try` 블록 내부의 코드를 실행하다가

2. 에러가 발생하는 순간 아직 실행되지 않은 나머지 코드들을 무시된 채 `catch` 블록으로 실행 흐름이 넘어간다.

`catch`는 `try` 블록에서 발생한 에러의 정보를 담은 객체를 인수로 받아 사용할 수 있다.

`finally`블록 내의 코드는 `try` 블록 안에서의 에러 발생 여부와 관계 없이 무조건 실행된다. `try` 블록 내에서 `return`, `break`, `continue` 등으로 코드의 실행 흐름이 이동될 때도 마찬가지이다.

```js
for (let i of [1, 2, 3]) {
  try {
    if (i === 3) {
      break;
    }
  } finally {
    console.log(`현재 i의 값: ${i}`);
  }
}
// 실행 결과
// '현재 i의 값: 1'
// '현재 i의 값: 2'
// '현재 i의 값: 3'
```

- 실행결과

![image](https://user-images.githubusercontent.com/33214449/92496025-90cf1b00-f232-11ea-91c1-8de5d53da613.png)

```js
// try-catch-finally

try {
  console.log('잘 실행되는 중');
  new Array(-1); // 🏁
  console.log('에러 발생 후 코드는 실행되지 않음');
} catch (e) {
  console.log('에러가 발생해 코드의 실행 흐름이 catch 블록으로 옮겨왔음');
  console.log(`에러명: ${e.name} 내용: ${e.message}`);
} finally {
  console.log('finally');
}

// 실행 결과
// '잘 실행되는 중'
// '에러가 발생해 코드의 실행 흐름이 catch 블록으로 옮겨왔음'
// '에러명: RangeError 내용: Invalid array length'
// 'finally'
```

- 🏁 라인에서 에러가 났을 때 실행결과

![image](https://user-images.githubusercontent.com/33214449/92496657-62057480-f233-11ea-88b1-d8744c5bf801.png)

즉, `try-catch-finally` 구문에서 코드의 실행 순서는 다음과 같다.

- 에러가 나지 않았을 때: `try` - `finally`

- 에러가 났을 때: `try` - 에러 발생 - `catch` - `finally`

### `try..finally`

@eyabc 님 문서 참고하여 추가

- 안에서 에러를 처리하고 싶지 않을 때
- 시작한 프로세스가 마무리 되었는지 확실히 하고 싶은 경우

```js
function func() {
  // 무언가를 측정하는 경우와 같이 끝맺음이 있어야 하는 프로세스
  try {
    // ...
  } finally {
    // 스크립트가 죽더라도 완료됨
  }
}
```

- try 안에서 발생한 에러는 외부에서 catch 해주어야 한다.
- finally 는 실행흐름이 함수를 떠나기 전에 실행된다.

## `throw` 연산자와 에러 커스터마이징

Error 생성자와 `throw` 연산자를 이용해 프로그래머가 직접 에러를 발생시키 수도 있다.

```js
const even = parseInt(prompt('짝수를 입력하세요'));

if (even % 2 !== 0) {
  throw new Error('짝수가 아닙니다.');
}
```

- 실행 결과

![image](https://user-images.githubusercontent.com/33214449/92499499-e7d6ef00-f236-11ea-8941-bf90b8e06f05.png)

`throw new Error('짝수가 아닙니다.');`

위 코드에서 Error 생성자를 이용하여 인수로 원하는 에러메시지 내용을 넣어주었다. 이렇게 되면 해당 에러 메시지를 속성으로 가진 에러 객체가 생성되고 그 즉시 에러가 발생한다.

> Error 말고도 SyntaxError, ReferenceError 등의 다른 여러 에러 타입이 있다.

> 단 인터넷 익스플로러는 Error() 생성자에 대해서만 커스텀 에러 메시지를 표시한다고 하니 에러 메시지를 커스텀할 경우엔 Error()만 쓰는 것을 권장

> 그리고 모든 에러 객체는 Error 객체를 상속받는다. 커스텀 에러를 생성할 때도 Error 객체를 상속받도록 만들어야 한다.

이렇게 에러 메시지만 커스텀하는 것뿐만 아니라

다음과 같이 커스텀 에러를 생성하여 에러의 종류를 구분하거나 에러 객체에 기능을 추가할 수 있다.

> 커스텀 에러를 쓰면 어디서 어떤 문제가 발생했는지 잘 알 수 있기 때문에 디버깅에 용이하다.

```js
class MyError extends Error {
  constructor(value, message, ...params) {
    super(...params);
    this.value = value;
    this.message = message;
    this.name = 'MyError';
  }
}

try {
  const even = parseInt(prompt('짝수를 입력하세요'));
  if (even % 2 !== 0) {
    throw new MyError(even, '짝수가 아닙니다.');
  }
} catch (e) {
  if (e instanceof MyError) {
    console.log(e.value); // 사용자가 입력한 정수가 저장된 변수 even의 값
    console.log(e.message); // 인수로 넘겨준 메시지 '짝수가 아닙니다.'
    console.log(e.name); // 지정한 에러 이름 'MyError'
  }
}
```

### 에러 객체의 주요 프로퍼티

@eyabc 님 글 참고하여 추가

1. name

- 에러 이름
- 'ReferenceError' : 정의되지 않은 변수 때문에 발생한 에러

2. message

- 에러 상세 내용을 담고 있는 문자 메세지

3. stack

- 널리 사용되는 비표준 프로퍼티
- 현재 호출 스택, 에러를 유발한 중첩 호출들의 순서 정보를 가진 문자열
- 디버깅 목적

## 비동기식 코드에서 예외 처리

비동기식으로 작동하는 콜백 내부에서 발생한 에러는, 콜백 바깥에 있는 `try` 블록으로는 잡아낼 수 없다.

```js
try {
  setTimeout(() => {
    throw new Error('에러!');
  });
} catch (e) {
  console.error(e);
}
```

위 예제에서 try 블록은 에러를 잡아내지 못하고 에러 객체도 출력되지 않는다.

**TODO** 에러가 발생하는 순간 호출 스택의 동작 방법

> JavaScript 엔진은 에러가 발생하는 순간 호출 스택을 되감는 과정을 거칩니다. 이 과정 중에 try 블록을 만나야 코드의 실행 흐름을 원상복구시킬 수 있습니다. 위 예제에서 setTimeout에 넘겨진 콜백에서 에러가 발생하면, 호출 스택을 따라 올라가도 try 블록을 만나는 것이 아니므로, 코드의 실행 흐름이 catch 블록으로 옮겨지지 않는 것입니다.

위 예제의 문제를 해결하려면 코드를 다음과 같이 고쳐 `try` 블록이 비동기 콜백 내부에 위치하도록 해야 한다.

```js
setTimeout(() => {
  try {
    throw new Error('에러!');
  } catch (e) {
    console.error(e);
  }
});
```

### Promise

**TODO** Promise 쓸 때 다양한 에러 처리 예제 <https://gitlab.com/siots-study/topics/-/wikis/exception-handling>

Promise 객체의 세 가지 상태

- pending - Promise 객체에 결과값이 채워지지 않은 상태

- fulfilled - Promise 객체에 결과값이 채워진 상태

- **rejected - Promise 객체에 결과값을 채우려고 시도하다가 에러가 난 상태**

Promise 객체가 rejected 상태가 되면, 이 Promise에 대해서는 then 메소드에 첫 번째 인수로 넘겨준 콜백이 실행되지 않고, 두 번째 인수로 넘겨준 콜백이 대신 실행된다. 그리고 이 콜백에는 에러 객체가 첫 번째 인수로 주어진다.

```js
const p = new Promise((resolve) => {
  const even = parseInt(prompt('짝수를 입력하세요'));
  if (even % 2 !== 0) {
    throw new Error('짝수가 아닙니다.');
  } else {
    resolve(even);
  }
});

p.then(
  (even) => {
    return '짝수입니다.';
  },
  (e) => {
    // 에러시 실행되는 콜백(두 번째 인수로 넘겨준 콜백)
    return e.message;
  }
).then(alert);
```

`catch` 메소드를 이용해 에러 처리 콜백을 지정할 수도 있다.

```js
p.then((even) => {
  return '짝수입니다.';
})
  .catch((e) => {
    return e.message;
  })
  .then(alert);
```

`then` 메소드의 연쇄 안에서 에러가 발생하면, try-catch 구문과 유사하게 처음 만나는 에러 처리 콜백으로 코드의 실행 흐름이 건너뛰는 결과를 낳게 된다.

```js
Promise.resolve()
  .then(() => {
    throw new Error('catch 메소드를 통해 예외 처리를 할 수 있습니다.');
  })
  .then(() => {
    console.log('이 코드는 실행되지 않습니다.');
  })
  .catch((e) => {
    return e.message; // 여기서 에러 처리
  })
  .then(console.log);
```

혹은

```js
Promise.resolve()
  .then(() => {
    throw new Error('catch 메소드를 통해 예외 처리를 할 수 있습니다.');
  })
  .then(
    () => {
      console.log('이 코드는 실행되지 않습니다.');
    },
    (e) => {
      return '이코드가 실행됩니다'; // 에러 처리
    }
  )
  .catch((e) => {
    return e.message; // 앞에서 에러처리 했으니 이 메소드는 실행 안됨
  })
  .then(console.log);
```

### 비동기 함수

앞서본 Promise의 예외처리 방식은 동기식 예외 처리 방식과 달리 **콜백**을 사용하고 있기 때문에 코드가 복잡해지는 경향이 있다.

비동기 함수 내부에서는 rejected 상태의 Promise 객체를 동기식 예외 처리 방식과 동일하게 `try-catch-finally` 구문으로 처리할 수 있다.

```js
async function func() {
  try {
    const res = await fetch('https://nonexistent-domain.nowhere');
  } catch (e) {
    console.log(e.message);
  }
}

func(); // 실행 결과: Failed to fetch
```

단, Promise 객체에 대해 `await`하지 않는 경우 에러를 잡을 수 없다.

```js
async function func() {
  try {
    fetch('https://nonexistent-domain.nowhere');
  } catch (e) {
    console.log(e.message);
  }
}

func(); // 실행 결과: 아무것도 출력되지 않음
```

위 예제에서 에러를 잡을 수 없는 것을 다음과 같은 방법으로 해결할 수 있다.

- then 메소드의 두 번째 인수 이용

- catch 메소드 이용

```js
// 위 예제를 해결하여 에러를 잡는 코드
// then 메소드의 두 번째 인수 혹은 catch 메소드로 해결
async function func() {
  fetch('https://nonexistent-domain.nowhere').catch((e) =>
    console.log(e.message)
  );
}

func(); // 실행 결과: Failed to fetch
```

# 추가

- @khw970421 님 내용 추가

```js
try {
  console.log('잘 실행됩니다.');
  console.log(v);
  console.log('버려짐');
} catch (e) {
  switch (e.constructor) {
    case SyntaxError:
      console.log('안실행');
      break;
    case ReferenceError:
      console.log(e.constructor);
      console.log('실행');
      break;
  }
}
```

이때 e.name이 아닌 e.constructor를 써야하는 이유는 e.name은 String이고 e.constructor는 정확히는 함수이기 때문에 ReferenceError와 같은 타입이기때문

```js
try {
  console.log('잘 실행됩니다.');
  console.log(v);
  console.log('버려짐');
} catch (e) {
  console.log(e.name === ReferenceError); //false
  console.log(e.constructor === ReferenceError); //true
  console.log(typeof e.constructor); //function
  console.log(typeof ReferenceError); //function
  console.log(toString.call(e.constructor)); //[object Function]
  console.log(toString.call(ReferenceError)); //[object Function]
}
```

# References

[프론트엔드 면접 스터디, 예외 처리](https://gitlab.com/siots-study/topics/-/wikis/exception-handling)

[JavaScript로 만나는 세상, 예외 처리](https://helloworldjavascript.net/pages/290-exception.html)

# Q&A

팀원들 결과물 및 질의응답&코드리뷰

은영

- [Sync Async](https://eyabc.github.io/Doc/dev/core-javascript/Sync%20Async.html#sync)
- [브라우저의 JS 코드 실행과정](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98%20JS%20%EC%8B%A4%ED%96%89%EA%B3%BC%EC%A0%95.html)
- [비동기 프로그래밍](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B9%84%EB%8F%99%EA%B8%B0%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D.html)
- [콜백](https://eyabc.github.io/Doc/dev/core-javascript/%EC%BD%9C%EB%B0%B1%20Callback.html)
- [Promise](https://eyabc.github.io/Doc/dev/core-javascript/Promise.html)
- [[es2015+] 잡스(Jobs)](https://eyabc.github.io/Doc/dev/core-javascript/JOBS.html)
- [비동기 함수 Async Await](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B9%84%EB%8F%99%EA%B8%B0%20%ED%95%A8%EC%88%98%20Async%20Await.html)
- [Async Iterator](https://eyabc.github.io/Doc/dev/core-javascript/Async%20Iterator.html)
- [Async Generator](https://eyabc.github.io/Doc/dev/core-javascript/Async%20Generator.html)
- [Async Iterable](https://eyabc.github.io/Doc/dev/core-javascript/Async%20Iterable.html)
- [에러 핸들링](https://eyabc.github.io/Doc/dev/core-javascript/%EC%97%90%EB%9F%AC%20%ED%95%B8%EB%93%A4%EB%A7%81.html)

to 은영

마지막에 부랴부랴 하느라 제 결과물 예외처리쪽 내용이 부실한데 은영님 글이 많이 도움이 되어서 내용을 추가/수정하고 있습니다. 감사합니다.

## 에러 다시 던지기

부분에서 아래 코드가 user 앞에 let을 붙이는 걸 잊어 발생하는 에러를 설명해주셨는데요
이렇게 let으로 선언한 변수를 변수 선언 키워드를 붙여주지 않고 전역변수(?)로 받아버리면 자바스크립트에선 무조건 에러가 발생하나요?

```js
let json = '{ "age": 30 }'; // 불완전한 데이터

try {
  user = JSON.parse(json); // <-- user 앞에 let을 붙이는 걸 잊었네요.
  // ...
} catch (err) {
  alert('JSON Error: ' + err); // JSON Error: ReferenceError: user is not defined
  // (실제론 JSON Error가 아닙니다.)
}
```

---

같은 파트에 아래 나와있는 코드 예제에서요, user 앞에 let을 붙이지 않아 발생하는 경우인데
코드의 user 앞에 let이 왜 붙어있는건가요...?!

user 앞에 let 을 붙이지 않아 발생하는 ReferenceError 는 외부에서 처리하도록 catch 블록에서 throw 를 한번 더 해준다.

```js
let json = '{ "age": 30 }'; // 불완전한 데이터
try {
  let user = JSON.parse(json);
  if (!user.name) throw new SyntaxError('불완전한 데이터: 이름 없음');
  blabla(); // 예상치 못한 에러
  alert(user.name);
} catch (e) {
  if (e instanceof SyntaxError) {
    alert('JSON Error: ' + e.message);
  } else {
    throw e; // 에러 다시 던지기 (*)
  }
}
```

형욱

<https://github.com/khw970421/js-interview/blob/master/const/project8.md>

by 형욱

```
내용 간결하면서 필요한부분을 이해할수있어서 좋았습니다.
덕분에 Promise부분 수정하는데 좀 도움이 되었습니다.
처음 코드부분에서 경우를 나눠서 같은 내용을 다루는게 저 또한 평소에 구분지어서 차이점을 알아보는것이 익숙해 차이점을 보는데 이해하기 쉬웠습니다.
Promise관련해서 https://github.com/khw970421/js-interview/blob/master/const/project8.md 저의 정리도 도움이 되시었으면 좋겠습니다.
```

to 형욱

마크다운으로 작성하셨군요! 원래도 좋았는데 가독성이 더더 좋아진 것 같아요 step8 잘 읽었습니다 👍
제 결과물에 남겨주신 리뷰보고 형욱님 문서중 Promise 부분도 정독했습니다.

노원

<https://github.com/quavious/hell_script/blob/master/chapter8.js>

정웅

<https://jeongshin.github.io/JeongShin_Blog/TIL/study/JavaScript2.html#step-8-%F0%9F%91%89-error-handling>
