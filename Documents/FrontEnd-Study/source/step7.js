// // 타이머 API 예시
// // 매개변수가 없는 화살표 함수 문법 이용
// const timeoutId = setTimeout(() => {
//   console.log("setTimeout이 실행된지 3초가 지남");
// }, 3000);

// clearTimeout(timeoutId); // clearTimeout으로 setTimeout()의 반환값인 식별자를 전달하면 타이머가 취소된다.

//----

// 비동기 프로그래밍 - Callback

// ----

// // 비동기 프로그래밍 - Promise(1)
// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('2초가 지났습니다.');
//     resolve('hello');
//   }, 2000);
// }); // 2초 뒤 콜백이 실행되고 resolve 함수가 호출되어 p변수에 저장된 Promise 객체는 결과값 'hello'을 갖는 객체가 된다.

// // then 메소드도 Promise 객체를 반환한다.
// const p2 = p.then((msg) => {
//   // then 메소드에 콜백을 넘겨서 첫 번째 인수로 들어온 (Promise 객체)결과값을 가지고 추가 작업을 할 수 있다.
//   return msg + ' world'; // msg는 p에 담긴 Promise 객체 결과값이었던 'hello'
// });

// p2.then((msg) => {
//   // then 메소드에 콜백을 넘겨서 (Promise 객체를 반환받아 가지고 있는)p2 결과값을 가지고 또 추가 작업!
//   console.log(msg); // hello world
// });

// ----

// // 비동기 프로그래밍 - Promise(2)

// // Promise 객체를 반환하는 함수
// function delay(ms) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('${ms} 밀리초가 지났습니다.'); // 템플릿 리터럴은 런타임 시점에 이미 문자열로 처리/변환 되서 결과에 ${ms} 그대로 표시되는 건가?(TODO)
//       console.log(ms);
//       resolve();
//     }, ms);
//   });
// }

// delay(1000)
//   .then(() => delay(2000))
//   .then(() => Promise.resolve('끝'))
//   .then(msg => {
//     console.log(msg);
//   });

//   // 맨 아래 then은
//   // .then(console.log); 로 줄여쓸 수 있음

// console.log('시작');

// // 위 코드 실행 결과
// // 시작
// // ${ms} 밀리초가 지났습니다.
// // 1000
// // ${ms} 밀리초가 지났습니다.
// // 2000
// // 끝

// ----

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
