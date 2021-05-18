비동기 처리(1) 콜백 함수(Callback)

비동기 처리(2) Promise [바로가기](10_promise.md)

비동기 처리(3) async/await [바로가기]()

# Callback

# 동기(Synchronous)와 비동기(Asynchronous)

Javascript는 동기적으로 동작한다.
호이스팅이 된 이후부터 우리가 작성한 순서에 맞춰 코드가 하나하나씩 순서대로 실행된다는 것이다.

> 호이스팅(hoisting): var, function declaration 이 자동적으로 제일 위로 끌어올려지는 것(실제로 끌어올려지는 것은 아니지만 이해하기 쉽게 표현하자면)

## 비동기

언제 코드가 시작될지 알 수 없는 것

> `setTimeout()`
>
> - 브라우저에서 제공하는 웹API
> - 지정한 시간이 지나면 인자로 전달한 콜백함수를 실행하는 역할
> - 정확히 지정한 시간후에 출력하진 않음(오차 있음) 자세한 사항은 [자바스크립트 런타임](https://beomy.github.io/tech/javascript/javascript-runtime/) 문서 참고

- `setTimeout()` 예제 코드

```js
console.log('1');

setTimeout(function () {
  console.log('2');
}, 1000);
// setTimeout에서 전달되는 시간은 ms(밀리초)
// setTimeout을 만나면 웹API이기 때문에 브라우저에 지정된 시간 후에 전달한 콜백함수를 실행해달라고 요청을 하게됨.
// 이에 대한 응답을 기다리지 않고 다음 코드로 넘어감. 따라서 3이 먼저 출력됨.
// 1초가 지나야 브라우저가 콜백함수를 실행해! 라고 응답함.
// 이것이 비동기적 실행 방법
// setTimeout(() => console.log('2'), 1000); // 화살표 함수 사용

console.log('3');
```

- 결과

```plaintext
1
3
2
```

# 콜백함수(callback)

- 전달한 함수를 나중에 너가 불러주(call)라는 개념 (바로 실행되는 것이 아니라 인자로 전달됨) 이런 전달한 함수를 callback 함수라고한다.
- 그렇다면 콜백은 항상 비동기적으로만 사용할까? No! ➡ 동기적 콜백(Synchronous callback), 비동기적 콜백(Asynchronous callback)이 있다.

## Synchronous callback

- 즉각적으로, 동기적으로 실행

## Asynchronous callback

- 나중에, 언제 실행될지 모름

```js
// Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log('hello'));

// Asynchronous callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);

// ✔️ 내부적으로는 함수 선언들이 호이스팅(위로 끌어올려짐)되고 함수가 실행된다.
```

> **다른 언어들에서의 콜백함수**
>
> 자바스크립트는 함수를 콜백형태로 다른 함수에 인자로 전달할수도 있고 변수에 할당할 수도 있다.
>
> 언어들마다 콜백을 지원하는 방식엔 차이가 있다. lamda expression, function pointer 등을 이용한 방법이 있다.

## 콜백지옥

콜백함수들이 중첩되며 콜백함수 안에서 다른 콜백함수를 부르고 부르고 부르는.. 그런 형태

- 콜백지옥 예제

사용자의 데이터를 서버(백엔드)에서 가져오는 코드를 작성해보자.

```js
// 실제로 서버에서 가져오는 것이 아니므로 setTimeout()를 활용하여 받아오는 것처럼 구현했다.
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === 'ellie' && password === 'dream') ||
        (id === 'coder' && password === 'academy')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  // 사용자의 데이터를 받아 사용자마다 가진 역할들을 서버에 요청해 받아오는 //(사실 이렇게 말고 사용자가 로그인할 때 로그인 정보 안에 관련 정보를 한번에 백엔드에서 가져오는 것이 일반적이긴 함)
  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'ellie') {
        onSuccess({ name: 'ellie', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000);
  }
}

const userstorage = new UserStorage();
const id = prompt('Enter your ID');
const password = prompt('Enter your password');

userstorage.loginUser(
  id,
  password,
  (user) => {
    userstorage.getRoles(
      user,
      (userWithRole) => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);

// 1. id, password 입력
// 2. login
// 3. login 성공하면 사용자의 id를 활용해 role을 요청해서 받아올 것(getRoles)
// 4. 역할이 성공적으로 받아지면 사용자의 이름과 역할이 들어있는 걸 출력해볼 것
```

`loginUser()` 함수에 전달하는 콜백 안에 또 콜백을 전달하는 로직이 있고... 아무튼 코드가 알아보기 어렵게 됐다. 이런 것을 콜백지옥에 빠진다고 표현한다.

### 콜백지옥의 문제점

- 가독성이 떨어진다. 비즈니스 로직을 이해하기 어렵다. (위에서 작성한 예시처럼 코드가 작성되어있는경우 로그인을 한 후에 로그인한 데이터를 이용해 사용자의 역할을 받아오는구나~라는걸 한 눈에 알아보기가 어렵다.)
- 에러가 발생해 디버깅을 해야될 때도 어려움이 발생한다.(체인이 길어질 수록 어려워진다.)
- `Promise`, `async/await`를 이용해 콜백지옥을 해결하고 비동기 코드를 깔끔하게 작성, 네트워크 통신을 병렬, 효율적으로 할 수 있다.

[Promise 문서](10_promise.md) 참고
