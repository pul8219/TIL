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

  -

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
  console.log("setTimeout이 실행된지 3초가 지남");
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

### 콜백(Callback)

콜백은 다른 함수의 인수로 넘기는 함수를 의미

- 콜백을 이용, 비동기 프로그래밍을 할 수 있다.

- 콜백을 인수로 받는 함수가 항상 비동기식으로 동작하는 것은 아니다.

- 콜백만으로는 복잡한 비동기 데이터 흐름을 표현하기가 어려워 **콜백 지옥** 이라는 말이 생겨났음

> 콜백 지옥 해결을 위해
> Promise, Generator (ES6)
> async/await (ES2017)
> 등이 도입됨

**TODO 콜백 예제 코드 보충**

### Promise

콜백의 문제를 해결하기 위해 Promise 패턴을 사용한 라이브러리들이 등장함

Promise는 '언젠가 끝나는 작업'의 결과값을 담는 통 같은 객체이다.

`then` 메소드를 이용하여 콜백을 등록해서, 작업이 끝났을 때 결과값을 가지고 다른 작업을 할 수 있다.

Promise 객체를 생성하는 가장 간단한 방법은 `Promise.resolve` 라는 정적메소드를 사용하는 것이다.

비동기 작업을 하는 Promise 객체를 만드려면 `Promise` 생성자를 이용하면 된다.

1. Promise 생성자는 콜백을 인수로 받는다. 이 콜백의 첫번째 인수로 `resolve`함수가 들어온다. 콜백 안에서 `resolve`를 호출하면 `resolve`에 인수로 준 값이 곧 Promise 객체의 궁극적인 결과값이 된다.
   (두번째 인수로는 `reject` 함수가 들어가는데 이는 비동기 작업에서 에러가 발생했을 때 호출하는 함수다.)

1. Promise 객체의 결과값을 이용해 추가 작업을 하려면 `then` 메소드를 호출해야 한다. `then` 메소드에 콜백을 넘겨서 첫 번째 인수로 들어온 결과값을 가지고 추가 작업을 할 수 있다.

## Q&A

## Reference

[프론트엔드 면접 자료, Asynchronous](https://gitlab.com/siots-study/topics/-/wikis/asyncronous)

[비동기 프로그래밍](https://helloworldjavascript.net/pages/285-async.html)
