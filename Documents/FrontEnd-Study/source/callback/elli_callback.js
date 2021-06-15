// ✨ 드림코딩 엘리 11강 콜백, 콜백지옥 (비동기 처리의 시작)


'use strict';

// JavaScript is synchronous. 자바스크립트는 도익적이다.
// Execute the code block by order after hoisting.
// hoisting: var, function declaration

// console.log('1');
// setTimeout(function(){
//     console.log('2');
// }, 1000);
// // setTimeout에서 전달되는 시간은 ms(밀리초)

// console.log('3');

// // Synchronous callback
// function printImmediately(print){
//     print();
// }
// printImmediately(() => console.log('hello'));

// // Asynchronous callback
// function printWithDelay(print, timeout){
//     setTimeout(print, timeout);
// }
// printWithDelay(() => console.log('async callback'), 2000);


// Callback Hell example
// 사용자의 데이터를 서버(백엔드)에서 가져오는 코드
// 실제로 서버에서 가져오는 것이 아니므로 setTimeout()를 활용하여 받아오는 것처럼 구현해보기
class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(() => {
            if((id === 'ellie' && password === 'dream') || (id === 'coder' && password === 'academy')){
                onSuccess(id);
            }
            else{
                onError(new Error('not found'));
            }

        }, 2000);
    }

    // 사용자의 데이터를 받아 사용자마다 가진 역할들을 서버에 요청해 받아오는 //(사실 이렇게 말고 사용자가 로그인할 때 로그인 정보 안에 관련 정보를 한번에 백엔드에서 가져오는 것이 일반적이긴 함)
    getRoles(user, onSuccess, onError){
        setTimeout(() => {
            if(user === 'ellie'){
                onSuccess({name: 'ellie', role: 'admin'});

            }
            else{
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
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
            }, 
            (error) => {
                console.log(error);
            });
    }, 
    (error) => {
        console.log(error);
    });


// 1. id, password 입력
// 2. login
// 3. login 성공하면 사용자의 id를 활용해 role을 요청해서 받아올 것(getRoles)
// 4. 역할이 성공적으로 받아지면 사용자의 이름과 역할이 들어있는 걸 출력해볼 것


// 콜백함수의 문제점
// - 가독성이 떨어진다. 비즈니스 로직을 이해하기 어려움. 로그인을 한 후에 로그인한 데이터를 이용해 사용자의 역할을 받아오는구나~를 한 눈에 알아보기가 어려움
// - 에러가 발생해 디버깅을 해야될 때도 파악하기 어려움(체인이 길어질 수록 어려움)

// promise async await
// 어떻게 비동기 코드를 깔끔하게 작성하는지, 병렬, 효율적으로 네트워크 통신을 하는 방법에 대해서 공부할 것