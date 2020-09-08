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

- Promise 다양한 예제

- 콜백

# 비동기 프로그래밍

파일 합침 및 수정 예정

## 목차

비동기 프로그래밍

- [비동기 함수(Async Function)](<#비동기-함수(Async-Function)>)

## 비동기 함수(Async Function)

`async`와 `await`

- Promise 체이닝(Promise then -> Promise then -> Promise then -> ...) 등의 방식도 가독성이 떨어질 수 있다는 비판 있음

- `async`, `await`를 사용하면 동기식 코드처럼 보이는 비동기식 코드를 짤 수 있고 Promise를 깔끔하게 사용할 수 있게 해줌

> 그렇다고 Promise가 나쁘고 async, await으로 무조건 대체하여 써야한다는 말은 아님! Promise가 적합한 경우가 있고 async, await으로 변환해야 적합한 경우가 있음!

- `async`와 `await`은 새로운 기술이 아니라, Promise 위에 더 간편하게 쓸 수 있도록 하는 `Syntactic Sugar`로 볼 수 있음(prototype 기반의 상속을 쉽게 흉내내도록 해주는 `class`처럼)

- ES2017에서 도입됨

### 1. `async`

- 함수 앞에 `async` 키워드를 붙이면 해당 함수는 비동기 함수가 된다.

- 비동기 함수는 항상 Promise 객체를 반환한다.

```js
// 1. async

//(1)
// JS는 코드를 동기적으로 실행하기 때문에 이를 실행하게되면 fetchUser함수 실행 중 10초를 온전히 기다렸다가(여기서 10초간 멈춰버림) 그 다음에 코드를 실행한다.
// 이를 웹페이지에 띄워야하는 상황이라면 사용자는 데이터를 받아오는 10초 동안 텅텅 빈 페이지를 보게될 것
// 따라서 비동기적인 코드가 필요

function fetchUser() {
  // do network request in 10 secs...
  // 사용자의 정보를 받아오는데 10초가 걸리는 코드가 있다고 가정해보자
  return 'yurim';
}

const user = fetchUser();
console.log(user);

//(2)
// 지난시간에 배운 Promise를 이용
// 언제 User 데이터를 받아올지 모르겠지만 이 Promise 객체를 갖고 있으면서 then이라는 콜백함수를 등록해놓으면
// 데이터가 준비되는데로 내가 콜백함수를 불러줄게 약속해! 라는 의미

function fetchUser() {
  return new Promise((resolve, reject) => {
    // do network request in 10 secs...
    // 사용자의 정보를 받아오는데 10초가 걸리는 코드가 있다고 가정해보자
    resolve('yurim');
  });
}

const user = fetchUser();
user.then(console.log);
console.log(user);

//(3) async 사용 👍
// async를 붙여주면 함수 안의 코드 블럭들이 자동으로 Promise로 바뀜
async function fetchUser() {
  // do network request in 10 secs...
  // 사용자의 정보를 받아오는데 10초가 걸리는 코드가 있다고 가정해보자
  return 'yurim';
}

const user = fetchUser();
user.then(console.log);
console.log(user);
```

- 위 코드의 (3)의 `console.log(user);`결과로 Promise 객체가 출력되는 것을 볼 수 있다.

![image](https://user-images.githubusercontent.com/33214449/92452453-07e7bd80-f1f9-11ea-8e4f-4e3e86bb2302.png)

### 2. `await`

- 비동기 함수 내에서 `await` 키워드를 쓸 수 있다.

- `await` 키워드 뒤에 오는 Promise가 결과값을 가질 때까지 비동기 함수의 실행을 중단시킨다.

- 여기서의 '중단'도 비동기식이며, 브라우저는 Promise가 완료될 때까지 다른 작업을 처리할 수 있다.

- `await`은 연산자이기도 하며, 연산의 결과값은 뒤에 오는 Promise 객체의 결과값이다.

- `await`키워드는 `for`, `if`와 같은 제어문 안에서도 쓰일 수 있다. `then`을 사용할 때보다 복잡한 비동기 데이터 흐름을 쉽게 표현할 수 있다는 장점. 그러나 비동기 함수 역시 Promise를 잘 알아야 잘 쓸 수 있다!

- 비동기 함수는 `await` 도중 에러가 났을 때 이를 편하게 처리할 수 있는 방법도 지원하는데 이는 [예외 처리](Documents/FrontEnd-Study/step8_exception_handling.md) 문서에서 자세히 살펴볼 것이다.

```js
// 2. await ✨

// await는 async가 붙은 함수 안에서만 쓸 수 있다.

// ms로 받은 시간이 지나면 resolve를 호출하는 Promise를 리턴하는 delay 함수
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getBread() {
  await delay(1000); // 1초를 기다렸다가
  return '🥐'; //를 리턴하는 Promise가 만들어짐
}

async function getCoffee() {
  await delay(1000); // 1초를 기다렸다가
  return '☕️'; //를 리턴하는 Promise가 만들어짐
}

// // getCoffee()를 Promise를 이용해 작성한다면 다음과 같았을 것
// function getCoffee() {
//   return delay(1000).then(() => '☕️');
// }

// 위 코드의 getBread(), getCoffee()를 이용해 빵과 커피 모두 가져오는 happyTime()을 만들어보자

// 경우 1) Promise Chain
// 문제점: Promise도 중첩으로 체이닝을 많이 하게되면 콜백지옥을 만들 수 있음;-;
function happyTime() {
  return getBread().then((bread) => {
    return getCoffee().then((coffee) => `${bread} + ${coffee}`); // 약 2초 뒤 🥐 + ☕️ 출력
  });
}

happyTime().then(console.log);

// 경우 2) async와 await 사용
// 경우 1의 콜백지옥 해결
// 문제점: 빵을 받는데 1초가 걸리고, 커피를 받는데 1초가 걸려 총 2초가 걸림. 빵을 받아오고 커피를 받아오는 것은 서로 영향을 주는 작업이 아니기 때문에(그렇다고 가정) 서로 기다릴 필요가 없음. 이렇게 작성하면 비효율적! 따라서 병렬적인 처리 필요

async function happyTime() {
  const bread = await getBread();
  const coffee = await getCoffee();
  return `${bread} + ${coffee}`; // 약 2초 뒤 🥐 + ☕️ 출력
}

happyTime().then(console.log);

// 경우 3) await 병렬처리 - 경우 2의 문제점 해결
// 문제점: 그런데 이렇게 코드를 작성하진 않는대! Promise API를 사용하여 해결 -> 3-1) Promise.all 사용한 예시 참고(👍)

async function happyTime() {
  const breadPromise = getBread(); // 빵의 Promise를 만들고
  const coffeePromise = getCoffee(); // 커피의 Promise를 만듦
  // 빵과 커피는 병렬적으로 동시에 함수 내부 코드가 실행됨
  const bread = await breadPromise; // 각각의 Promise 결과가 담기길 기다렸다가
  const coffee = await coffeePromise;
  return `${bread} + ${coffee}`; // 아까와 달리 2초가 아닌 1초 정도의 시간이 걸려 🥐 + ☕️ 결과가 출력됨을 알 수 있음
}
```

### 3. 유용한 Promise API들 사용

아래 코드는 2. await 코드 예제와 연결된다.

```js
// 3. 유용한 Promise API들 사용

// 1) Promise.all
// Promise 배열을 전달하면, 모든 Promise들이 병렬적으로 다 담길때까지 모아주는 친구. 담길때도 배열로 담김

function happyTime() {
  return Promise.all([getBread(), getCoffee()]).then((happyTime) =>
    happyTime.join(' + ')
  );
}

happyTime().then(console.log); // 약 1초 뒤 🥐 + ☕️ 출력

// Promise.race
// 배열에 전달된 Promise 중 가장 먼저 값을 리턴하는 친구만 전달되는
// getBread()와 getCoffee()의 ms 시간을 변경하면 명확하게 결과값을 확인 가능
function chooseOne() {
  return Promise.race([getBread(), getCoffee()]);
}

chooseOne().then(console.log); // 🥐와 ☕️ 중 먼저 값이 리턴되는 것 하나만 출력될 것
```

## [다음 문서 - 예외 처리](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step8_exception_handling.md)

## [다음 문서 - 예외 처리](step8_exception_handling.md)

# References

[프론트엔드 면접 스터디, 비동기 프로그래밍](https://gitlab.com/siots-study/topics/-/wikis/asyncronous)

[JavaScript로 만나는 세상, 비동기 프로그래밍](https://helloworldjavascript.net/pages/285-async.html)

[드림코딩 엘리, async와 await, 유용한 Promise APIs](https://youtu.be/aoQSOZfz3vQ)
