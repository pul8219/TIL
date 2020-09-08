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

# 예외 처리(Exception / Error handling)

Javascript는 코드 실행 중에 예기치 못한 에러가 발생했을 때, 이로부터 코드의 실행 흐름을 복구할 수 있는 **예외 처리(Exception Handling)** 기능이 내장되어있다.

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

# References

[프론트엔드 면접 스터디, 예외 처리](https://gitlab.com/siots-study/topics/-/wikis/exception-handling)

[JavaScript로 만나는 세상, 예외 처리](https://helloworldjavascript.net/pages/290-exception.html)
