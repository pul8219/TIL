// ✨ 드림코딩 엘리 13강 async, await, 유용한 promise apis

// 1. async

//(1)
// JS는 코드를 동기적으로 실행하기 때문에 이를 실행하게되면 fetchUser함수 실행 중 10초를 온전히 기다렸다가 그 다음 코드를 실행한다.
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

//(3) 👍
// async를 붙여주면 함수 안의 코드 블럭들이 자동으로 Promise로 바뀜
async function fetchUser() {
  // do network request in 10 secs...
  // 사용자의 정보를 받아오는데 10초가 걸리는 코드가 있다고 가정해보자
  return 'yurim';
}

const user = fetchUser();
user.then(console.log);
console.log(user);

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

// 3. 유용한 Promise API들 사용

// Promise.all
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
  return Promise.race([getBread(), getCoffee()]); // 🥐와 ☕️ 중 먼저 값이 리턴되는 것 하나만 출력될 것
}

chooseOne().then(console.log);
