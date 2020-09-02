# STEP 7

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위: [Asyncronous](https://gitlab.com/siots-study/topics/-/wikis/asyncronous)

비동기 프로그래밍의
Motivation - 타이머 API, 브라우저의 Javascript 코드 실행 과정, 동기 프로그래밍, 비동기 프로그래밍 HTTP 통신을 할 때

- 기한: 8/29(토) ~ 9/1(화)

- 보충 필요

  - async / await

  - Javascript 런타임에 이루어지는 일들

  - Promise 관련 추가 메소드

  - map 메소드

  - promise 예제에서 함수 인자로 넘겨주거나 () => 같이 들어가있을 때 명확한? 의미를 더 이해할 필요가 있음

  - `setTimeout()` 등의 타이머나 콜백의 비동기적 진행 자세히

  - 템플릿 리터럴 잘못 알고 있던 사용법 고치고 제대로 알기 <https://flik.tistory.com/53>

# Javascript

## 목차

- [Motivation - 타이머 API](#Motivation---타이머-API)

- [브라우저의 Javascript 코드 실행 과정](#브라우저의-Javascript-코드-실행-과정)

- [동기와 비동기 프로그래밍](#동기와-비동기-프로그래밍)

- [Q&A](#Q&A)

- [Reference](#Reference)

[비동기 프로그래밍](https://helloworldjavascript.net/pages/285-async.html) 내용을 기반으로 작성하였습니다.

## Motivation - 타이머 API

1. `setTimeout()`, `clearTimeout()`
1. `setInterval()`, `clearInterval()`

- ms(밀리 초) 단위이다.(1000ms = 1s)
- `setTimeout()`과, `setInterval()`은 각각 타이머 식별자를 반환한다. 이 식별자를 통해 실행 중인 타이머를 취소할 수 있다.
- 정확한 지연 시간을 보장해주지 않는다.

```js
// 매개변수가 없는 화살표 함수 문법 이용
const timeoutId = setTimeout(() => {
  console.log('setTimeout이 실행된지 3초가 지남');
}, 3000);

clearTimeout(timeoutId); // clearTimeout으로 setTimeout()의 반환값인 식별자를 전달하면 타이머가 취소된다.
```

## 브라우저의 Javascript 코드 실행 과정

### 호출 스택(Call Stack)

- Javascript 엔진은 함수 호출과 관련된 정보를 호출 스택(Call Stack)이라는 스택 형태의 저장소에 관리한다.

- 호출 스택에 저장되는 각 항목을 `실행 컨텍스트`라고 한다.

[실행 컨텍스트 참고](https://junilhwang.github.io/TIL/Javascript/Execution-Context/)

- 호출 스택에 작업이 존재하는 동안 웹 브라우저는 먹통이 된다.

- 호출 스택의 작업이 빠르게 처리되지 않으면 브라우저의 애니메이션이 끊기는 등 사용자 경험에 악영향을 줄 수 있다.

### 작업 큐(Task Queue)

그러나 모든 작업을 그렇게 빠르게 처리할 수는 없기 때문에 브라우저에서는 다음과 같은 절차를 통해 오래 걸리는 일을 처리한다.

- 오래 걸리는 일을 Javscript 엔진에서 처리하는 것이 아니라 API를 통해 브라우저에 위임하여 처리한다. 이 때 일이 끝나면 실행할 콜백을 같이 등록한다.

**TODO 여기서 말하는 API에 대해 자세히 알아보기**

- 위임된 일이 완료되면 그 결과와 콜백을 작업 큐(Task Queue)에 추가한다.

- 브라우저는 호출 스택이 비워질 때마다 가장 오래된 작업을 꺼내와서 해당 작업에 대한 콜백을 실행시키는 과정을 반복한다. 이를 이벤트 루프(Event Loop)라고 한다.

- 작업 큐의 작업을 처리하는 사이사이에 브라우저는 화면을 새로 그릴 수 있다. 이는 호출 스택이 비워지지 않는다면 브라우저는 화면을 새로 그릴 수 없다는 의미이다.

[브라우저의 JavaScript 코드 실행 과정 참고](https://helloworldjavascript.net/pages/285-async.html)

## 동기와 비동기 프로그래밍

만약 해야할 일이 `메이플 시럽 구매`, `반죽`, `생크림 휘핑` 이렇게 3가지 라면,

- **동기(Synchrosnous=Sync) 프로그래밍**: 해야할 일을 순차적으로 끝내 나가는 방식으로 한가지 행동이 완료됐을 때 다음 행동을 진행한다.

  `=` 요청과 결과가 동시에 일어난다

  `=` 어떤 일이 완료될 때까지 코드의 실행을 멈추고 기다리는 프로그래밍 방식

  ex)
  `메이플 시럼 구매` -> `반죽` -> `생크림 휘핑`

- **비동기(Asynchronous=Async) 프로그래밍**: 각각의 행동(혹은 요청)의 결과를 기다리지 않고, 다른 일을 진행해나가는 방식을 의미한다.

  `=` 요청과 결과가 동시에 일어나지 않는다.

  `=` 어떤 일이 완료되기를 기다리지 않고 다음 코드를 실행해나가는 프로그래밍 방식

  ex)

  A에게 `메이플 시럽 구매` 명령

  B에게 `반죽` 명령

  C에게 `생크림 휘핑` 명령

  10분 뒤 `메이플 시럽 구매`와 `생크림 휘핑`이 완료된다.

  15분 뒤 `반죽`이 완료된다.

  3가지 작업을 하는데 총 15분이 소요됐다.

비동기 프로그래밍 방식은 프로그램의 성능과 응답성을 높이는 데 도움이 된다. 하지만 코드가 실행되는 순서가 뒤죽박죽이 되고 코드 가독성이 낮아진다는 비판을 받아왔다. 이를 해결하기 위해 Javascript에서 사용되는 비동기 프로그래밍 방식이 어떤 것이 있는지 살펴볼 것이다.

### 비동기적인 코드의 예

- 사용자의 요청에 의해 특정 시간이 경과되기 전까지 어떤 함수의 실행을 보류하는 경우(setTimeout)

- 사용자의 직접 개입이 있을 때 어떤 함수를 실행하도록 대기하는 경우(addEventListner)

- 웹브라우저 자체가 아닌 다른 대상에 어떤 일을 요청하고 그에 대한 응답이 왔을 때 비로소 어떤 함수를 실행하도록 대기하는 경우(XMLHttpRequest)

- CPU의 계산에 의해 **즉시** 처리가 가능한 대부분의 코드는 비동기적인 코드가 아닌 동기적 코드이다.

### 콜백(Callback)

콜백은 다른 함수의 인수로 넘기는 함수를 의미

- 콜백을 이용, 비동기 프로그래밍을 할 수 있다.

- 콜백을 인수로 받는 함수가 항상 비동기식으로 동작하는 것은 아니다.

- 콜백만으로는 복잡한 비동기 데이터 흐름을 표현하기가 어려워 **콜백 지옥** 이라는 말이 생겨났음

- **콜백지옥**: 콜백함수를 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기 정도가 감당하기 힘들 정도로 깊어지는 현상. 콜백지옥 형태는 가독성이 떨어지고 코드를 수정하기도 어렵게 만든다.

> 콜백 지옥 해결을 위해
>
> Promise, Generator (ES6)
>
> async/await (ES2017)
>
> 등이 도입됨

**TODO 콜백 예제 코드 보충 필요**

### Promise

콜백의 문제를 해결하기 위해 Promise 패턴을 사용한 라이브러리들이 등장함

Promise는 '언젠가 끝나는 작업'의 결과값을 담는 통 같은 객체이다.

- `then` 메소드를 이용하여 콜백을 등록해서, 작업이 끝났을 때 결과값을 가지고 다른 작업을 할 수 있다.

- Promise 객체를 생성하는 가장 간단한 방법은 `Promise.resolve` 라는 정적메소드를 사용하는 것이다.

- 비동기 작업을 하는 Promise 객체를 만드려면 `Promise` 생성자를 이용하면 된다.

1. Promise 생성자는 콜백을 인수로 받는다. 이 콜백의 첫번째 인수로 `resolve`함수가 들어온다. 콜백 안에서 `resolve`를 호출하면 `resolve`에 인수로 준 값이 곧 Promise 객체의 궁극적인 결과값이 된다.
   (두번째 인수로는 `reject` 함수가 들어가는데 이는 비동기 작업에서 에러가 발생했을 때 호출하는 함수다.)

1. Promise 객체의 결과값을 이용해 추가 작업을 하려면 `then` 메소드를 호출해야 한다. `then` 메소드에 콜백을 넘겨서 첫 번째 인수로 들어온 결과값을 가지고 추가 작업을 할 수 있다.

```js
// 비동기 프로그래밍 - Promise(1)
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('2초가 지났습니다.');
    resolve('hello');
  }, 2000);
}); // 2초 뒤 콜백이 실행되고 resolve 함수가 호출되어 p변수에 저장된 Promise 객체는 결과값 'hello'을 갖는 객체가 된다.

// then 메소드도 Promise 객체를 반환한다.
const p2 = p.then((msg) => {
  // then 메소드에 콜백을 넘겨서 첫 번째 인수로 들어온 (Promise 객체)결과값을 가지고 추가 작업을 할 수 있다.
  return msg + ' world'; // msg는 p에 담긴 Promise 객체 결과값이었던 'hello'
});

p2.then((msg) => {
  // then 메소드에 콜백을 넘겨서 (Promise 객체를 반환받아 가지고 있는)p2 결과값을 가지고 또 추가 작업!
  console.log(msg); // hello world
});
```

```js
// 비동기 프로그래밍 - Promise(2)

// Promise 객체를 반환하는 함수
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('${ms} 밀리초가 지났습니다.'); // 템플릿 리터럴은 런타임 시점에 이미 문자열로 처리/변환 되서 결과에 ${ms} 그대로 표시되는 건가?(TODO)
      console.log(ms);
      resolve();
    }, ms);
  });
}
// delay()는 Promise 통을 반환하는 함수이다.
// ms 시간이 지난 후 함수 내부를 실행한다.
// resolve();를 통해 Promise 통이 반환된다.

delay(1000)
  .then(() => delay(2000))
  .then(() => Promise.resolve('끝'))
  .then((msg) => {
    console.log(msg);
  });

// 맨 아래 then은
// .then(console.log); 로 줄여쓸 수 있음

console.log('시작');
```

**위 코드 실행 결과**

```
시작
${ms} 밀리초가 지났습니다.
1000
${ms} 밀리초가 지났습니다.
2000
끝
```

**코드 설명**

1초 있다가 delay() 함수가 실행된다.

위 1초가 가기 전에 `console.log('시작')` 코드가 실행된다.

resolve 함수를 호출해 Promise 객체를 반환한다.

반환된 Promise 객체를 이용, then 메소드를 호출하여 delay(2000)을 콜백으로 넘겨준다. 2초 기다렸다가 delay() 함수 내부 코드를 실행한다.

반환된 Promise 객체를 이용, then 메소드를 호출하여 이번엔 resolve를 직접 호출하여 '끝'이라는 결과값을 가진 Promise 객체를 반환받는다.

위 Promise 객체를 이용, then 메소드를 호출하여 결과값을 출력한다.

#### HTTP 통신을 할 때 Promise의 사용

`axios`는 Javascript를 통해 직접 요청을 보내기 위해 사용되는 라이브러리

`axios.get()` -> GET 메소드로 요청을 보내기 위해 사용 -> Promise 객체가 반환됨

```js
// HTTP 통신을 할 때 Promise의 사용
const axios = require('axios');
const API_URL = 'https://api.github.com';

axios
  .get(`${API_URL}/repos/facebookincubator/create-react-app/issues?per_page=5`) // 해당 주소에 get요청을 보내고 받은 데이터의 결과값이 담긴 Promise 통이 반환된다. 결과값은 Response 객체이다.(HTTP 응답에 대한 내용)
  .then((res) => {
    // 받은 데이터가 res에 담긴다
    res.data
      .map((issue) => issue.title)
      .forEach((title, index) => console.log(index + 1 + ' : ' + title));
  });
```

#### Promise의 장점

- `then` 메소드는 Promise 객체를 반환하므로, 콜백을 중첩하지 않고도 비동기 작업을 연달아 할 수 있다.

- 비동기 작업을 값으로 다룰 수 있게 된다.

> TODO
>
> Promise.all 메소드 -> Iterator, Iterable한 객체의 반복 처리 가능
>
> Promise.race
>
> Promise 상태(3가지) - pending, settled(fulfilled, rejected)
>
> Promise 예외 처리(reject 관련)

## Q&A

### 팀원들 결과물

유림

<https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step7.md>

은영

<https://eyabc.github.io/Doc/dev/core-javascript/%EB%B9%84%EB%8F%99%EA%B8%B0%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D.html#motivation-%ED%83%80%EC%9D%B4%EB%A8%B8-api>

by 은영

1.

```
브라우저가 JavaScript 코드를 실행할 때, 호출 스택의 변화
1.스크립트를 로드 할 때
- 전역실행맥락(Global Execution Context) 을 호출 스택에 push
2.함수가 호출 될 때
- 함수 호출의 실행 맥락 생성
- 함수 호출의 실행 맥락을 호출 스택에 push
3.함수의 실행이 끝날 때
- 결과값 반환
- 호출 스택의 가장 위에 있는 실행 맥락 pop
4.스크립트의 실행이 모두 끝날 때
- 전역 실행 맥락을 호출 스택에서 pop
웹 브라우저는 호출 스택에 실행 맥락이 존재하는 동안(실행 중인 함수가 존재하는 동안) 먹통이 된다.

- 브라우저의 주사율, 보통 60fps, 대략 16 ms 안에 코드 실행을 완료되지 않으면
  - 브라우저 내 애니매이션이 뚝뚝 끊기는 현상
  - 사용자 경험에 악영향
```

위 내용이 자세하게 서술되어있어 좋습니다. 저는 호출스택과 작업큐가 변화하는 것에만 초점을 맞추어 썼는데
전역 실행 맥락까지 고려해 Javascript 전체 동작 방식과 연결지어 정리하는게 더 필요할 것 같네요.
은영님 글 참고해서 제 것도 보완하겠습니다.

to 은영

1.

`Motivation - 타이머 API 내용 중) 자바스크립트 개념이 아닌 브라우저와 node.js 에서 부터 왔다.`
몰랐던 내용입니다 ..!

1.

Promise 내용 중 아래 코드에서 hello가 어떻게 출력되는 건가요?

```
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // 1초 뒤 "done!" 출력

promise.then(msg => {
  console.log(msg); // hello
});
```

정웅

노원

<https://github.com/quavious/hell_script/blob/master/chapter7.js>

by 노원

알아갑니다!

- this를 통해 타이머 끝내기

```js
//setInterval의 콜백 함수로 function(){...}을 넣어주면 해당 function은 setInterval 객체의 메소드가 된다.
//즉, 콜백함수 내 작성된 this는 실행객체, setInterval 함수를 가리키게 되고, this를 통해 별다른 변수 선언 없이도
//함수를 끝내는 것이 가능하다.

let i = 0;
setInterval(function () {
  i++;
  console.log(i);
  if (i === 5) {
    clearInterval(this);
  }
}, 2000);
//5까지 콘솔에 출력되고 종료된다.
```

- async, await의 이해

```js
async function fetchAPI() {
  const resp = await Axios.get('https://example.com');
  console.log(resp.status);
  // example.com에 http 요청 및 값 반환이 완료될 때까지 console.log가 동작하지 않는다.
}
function withAsyncFunc() {
  fetchAPI();
  console.log(1000);
}
//withAsyncFunc()
// 1000이 먼저 출력되고 그 다음 fetchAPI, 비동기적 메소드에 있는 console.log(resp.status)가 실행된다.
// async 함수 내에선 await의 존재 덕분에 Get 요청이 완료된 직후 resp.status가 출력된다.

// async await으로 비동기식 코드를 동기식으로 작성할 수 있다.
async function withAsyncFunc() {
  await fetchAPI();
  console.log(1000);
}
withAsyncFunc();
// fetchAPI 함수에 await을 붙여줌으로써 resp.status가 콘솔에 출력된 후 1000이 출력되게 하였다.
```

to 노원

1.

아래 내용과 함께 호출스택, 작업큐 의 변화 등과 같은 브라우저가 JavaScript 코드를 실행시킬 때 일어나는 과정에 대한 설명이 함께 있으면 좋을 것 같습니다!

```js
function func() {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 0);
  console.log(3);
}
//func() // func 함수는 1, 2, 3을 출력하지 않는다. setTimeout에 전달된 인자가 0이라도 해당 메소드가 비동기적으로 작동하기 때문에
// 콘솔에는 1, 3, 2가 출력된다
```

형욱

<https://github.com/khw970421/js-interview/blob/master/const/project7.js>
<https://github.com/khw970421/js-interview/blob/master/const/project7.5.js>
<https://github.com/khw970421/js-interview/blob/master/const/project7_total.js>

by 형욱

`기본적으로 알아야 할것` 부분이 도움이 많이 되었습니다!

```js
//기본적으로 알아야 할것
const ex = function () {};
console.log(function () {}); //[Function (anonymous)] => 함수의 참조 값을 반환한다.    (함수의 실행없이 함수자체를 리턴)
console.log(() => {}); //[Function (anonymous)] => 함수의 참조 값을 반환한다.    (함수의 실행없이 함수자체를 리턴)
console.log(ex); //[Function: ex]         => 함수의 참조 값을 반환한다.    (함수의 실행없이 함수자체를 리턴)
console.log(ex()); //undefined              => 반환문이 없어서 undefined이다.(함수의 실행 후  반환값을 리턴)

//자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미한다.
//setTimeout 예시
const later_hi = () => {
  console.log('1초뒤 ㅎㅇ');
};
setTimeout(later_hi, 1000); //'1초뒤 ㅎㅇ'
//setTimeout(later_hi(),1000);      // error    =>later_hi()의 반환값이 undefiend이므로 스케줄링 대상을 찾지못함
```

내가 `setTimeout()` 등의 타이머나 콜백의 비동기적 진행을 공부 더 해야될듯!

to 형욱

1.

제가 이해한 것이 맞는지 궁금하여 드리는 질문입니다

```js
// setTimeout
class ash1 {
  hp = 15;
}
const a1 = new ash1();
const di1 = setTimeout(dinomit1, 1000);
function dinomit1() {
  console.log('clearTimeout 으로 인해 출력 x');
}
clearTimeout(di1); //di1에 반환값이 들어가있다가 clearTimeout으로 8반환값이 전달되어 타이머 취소
```

혹시 위 예제에서 `console.log('clearTimeout 으로 인해 출력 x');`가 출력되지 않는 이유가
`dinomit1()`함수를 1초 뒤에 실행하려고 **기다리는 사이에** `clearTimeout(di1);` 가 실행되기 때문인가요?
그리고 타이머 식별자가 `di1`에 반환되는 시기가 `const di1 = setTimeout(dinomit1, 1000);` 이 코드가 실행될 때 인지 궁금합니다!

1.

```js
//이렇게도 비동기(h함수가 끝나기전에 내부함수들이 처리)이지만 결과 출력에 a,b가 순차적으로 나온다.
function h(callback) {
  let a = 100,
    b = 150;
  callback(a);
  callback(b);
}
h(function (value) {
  console.log(value);
});
```

`callback(a);` `callback(b);` 가 비동기적으로 실행되나?

1.

```js
function test(callback) {
  console.log('콜백함수안');
  callback();
}
test(function () {
  console.log('이부분이 콜백');
});
```

결과 예측해보기!

## Reference

[프론트엔드 면접 자료, Asynchronous](https://gitlab.com/siots-study/topics/-/wikis/asyncronous)

[비동기 프로그래밍](https://helloworldjavascript.net/pages/285-async.html)

[ES6 프로미스(Promise), 진짜 쉽게 이해하기 (Promise의 목적만 생각한다.)](https://jeong-pro.tistory.com/128)

[[JavaScript] ES6 템플릿 리터럴에 대해 알아보자!!](https://eblee-repo.tistory.com/38)

[JavaScript 비동기 처리를 위한 promise 이해하기](https://velog.io/@cyranocoding/2019-08-02-1808-%EC%9E%91%EC%84%B1%EB%90%A8-5hjytwqpqj)

[자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)

[도서, 코어자바스크립트]()
