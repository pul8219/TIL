// ✨ 드림코딩 엘리 12강 프로미스(promise) 개념, 활용 (1)

// 비동기를 간편하게 처리할 수 있도록 돕는 js에서 지원하는 object이다.
// 정해진 장시간의 기능을 수행하고나서 정상적으로 수행했을 경우 성공메시지와 함께 처리된 결과값을 전달해주고, 만약 예상치 못한 문제가 발생한 경우 에러를 전달해준다.

// 콜백을 쓰지 않고 promise를 이용해 어떻게 비동기 코드를 작성할 수 있는지 배울것임

'use strict';

// Promise is a JavaScript object for asynchronous operation.
// 비동기적인 것을 수행할 때 콜백 대신 유용하게 쓸 수 있는 것!

// 프로미스 공부의 포인트
// 1. state
// operation 수행중인지, 기능 수행 완료되어 성공했는지 실패했는지 등 이해하는 것 중요
// state: pending(프로미스가 만들어져서 우리가 지정한 operation이 실행중일 때) -> fulfilled(성공적으로 끝낸 경우) or rejected(파일 찾을 수 없거나 네트워크에 문제 생긴다면)
// 2. producer(정보 제공;원하는 기능을 수행해 원하는 데이터를 만들어내는, 즉 promise객체)와 consumer(정보 소비;원하는 데이터를 소비)의 차이점 이해


// 1. Producer
// when new Promise is created, the executor runs automatically.

// promise 객체 생성
const promise = new Promise((resolve, reject) => {
    // doing some heavy work(network, read files, ...)
    console.log('doing something...');
    setTimeout(() => {
        // resolve('ellie'); // 성공적으로 해냈다면 resolve 호출. 성공적으로 네트워크나 파일로부터 받아온 혹은 가공한 데이터를 resolve를 통해 전달
        reject(new Error('no network'));
        // Error 클래스는 js에서 제공하는 object(무언가 에러가 발생했다는 걸 나타내는) 에러오브젝트에는 어떤 에러가 발생했는지를 명시적으로 잘 작성해야한다.

    }, 2000);

});
// promise 생성자를 보면, executor라는 생성자를 받고있는데 이는 resolve, reject라는 또다른 콜백함수를 인자로 받는다.
// resolve 기능을 정상적으로 수행해 최종 데이터를 전달할
// reject 기능을 수행하다 중간에 문제가 생기면 호출하게 될

// 보통은 heavy한 일들을 promise 안에서 한다.(파일을 읽고 네트워크로 파일을 받아오고) 시간이 꽤 걸리는 것을 동기적으로 처리하게되면 데이터를 받아오는 동안 그 다음 라인의 코드가 실행되지 않기 때문에 시간이 좀 걸리는 일들은 비동기적으로 처리하는 것이 좋다.

// promise를 만드는 순간 우리가 전달한 executor라는 콜백함수가 바로 실행됨을 알 수 있다. 
// 그렇기 때문에 만약 promise 안에 네트워크 통신을 하는 코드를 작성했다면, 예를 들어 사용자가 버튼을 눌렀을 때 이 코드가 동작하게 하고 싶다면, 사용자가 요청하지도 않았는데 코드가 실행되는 일이 벌어질 수도 있다. 그렇기 때문에 promise를 만드는 순간 코드가 실행된다는 것을 유의해야한다.(불필요한 네트워크 통신이 일어날 수 있음)

console.log('test');

// 2. Consumers: then, catch, finally 를 통해 값을 받아올 수 있다.
// Promise 사용하기

// 값이 정상적으로 잘 수행된다면 그러면(then) 어떤 값을 받아와 원하는 기능을 수행(콜백함수)할거야 라는 것
promise.then((value) => {
    console.log(value);
})
.catch(error => {
    console.log(error);
})
.finally(() => {
    console.log('finally');
});

// 이 value라는 파라미터는 promise가 정상적으로 잘 수행되어서 resolve 콜백함수에서 전달된 ellie라는 값이 들어오겠지!

// then으로 성공적인 케이스만 다루면 reject할 때 uncaught됨(잡히지 않은 에러 발생)

// 에러 핸들링을 잘 하려면 catch를 이용해 error가 발생했을 때 어떻게 처리할건지 콜백함수를 등록해주면 된다.

// then을 호출하면 다시 프로미스가 리턴된다. 그래서 이 프로미스에 catch를 등록하는 것이 가능한 것이다.(체이닝)

// finally는 성공하든 실패하든 출력되는 문법(어떤 기능을 마지막으로 수행하고싶을 때 사용하기)


/**
 * 3. Promise chaining
 */

// 서버에서 숫자를 가져오는(걸 가정으로 한) 예제를 통해 프로미스를 연습해보자

const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
.then(num => num*2) //2
.then(num => num*3) // 그 숫자를 3배로 곱하고 //6
.then(num => {  //6
    // 그리고 그 숫자를 다른 서버에 보내 다른 숫자로 변환된 값을 받아올 것이다(가정)
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num-1), 1000);
    });
})
.then(num => console.log(num)); // 그리고 그 숫자를 출력 //5

// then에서는 값을 전달해도되고, 또다른 프로미스를 전달해도된다.

/**
 * 4. Error Handling
 * 오류를 잘 처리 하자
 */

// 닭으로 계란을, 계란으로 계란후라이를 만드는 코드를 작성해보자. 이를 서버에서 닭을 받아오고, 달걀을 받아오고, 요리까지 하는 걸로 가정해서 생각해보자.

const getHen = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐔'), 1000);
});
const getEgg = hen => new Promise((resolve, reject) => {
    // setTimeout(() => resolve(`${hen} => 🥚`), 1000);
    setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
});
const cook = egg => new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
});

// // practice1
// getHen()
// .then(hen => getEgg(hen))
// .then(egg => cook(egg))
// .then(meal => console.log(meal));

// // practice2
// 받아오는 값을 다른 함수로 바로 호출하는 경우 이렇게 생략이 가능하다. (코드가 깔끔해짐)
// getHen() //
// .then(getEgg)
// .then(cook)
// .then(console.log)
// .catch(console.log);
//catch로 에러처리를 하면 getEgg에서 error가 발생할 때 이 에러가 제일 밑으로 전달되며 에러가 잡히는 것을 확인할 수 있다.

// // practice3
// 만약 달걀을 받아올 때 문제가 발생한다면, 준비한 다른 재료로 대체하고싶다고 할 때? 이 때 에러를 잘 처리하고싶다면?
// getHen() //
// .then(getEgg)
// .catch(error => {
//     return '🍞';
// }) // 계란을 받아오는 것에 문제가 생겨도(에러가 나도) 빵으로 대체하고, 전체적인 프로미스 체인에 문제가 발생하지 않도록 고친 것이다 // 비록 계란을 받아오는 것은 실패했지만 빵을 대신 전달해 프로미스체인이 실패하지 않고 요리가 완성된 것을 확인할 수 있다. // 이렇게 다음에 catch를 붙임으로써 바로 전 라인에서 발생한 에러를 잡을 수 있다.
// .then(cook)
// .then(console.log)
// .catch(console.log);

// // practice4(catch문을 옮겨보며 혼자 연습)
getHen() //
.then(getEgg)
.then(cook) // 앞선 promise가 정상적으로 실행되지 않았기 때문에 skip
.catch(console.log) // getEgg에서 발생했던 에러가 처리됨
.then(console.log); // catch문이 정상적으로 종료되면 이후 task는 계속 실행될 수 있으나 resolve로 받아온 값이 없으므로 undefined가 출력됨
