// ✨ 드림코딩 엘리 12강 프로미스(promise) 개념, 활용 (2)

/**
 * 5. 💩 -> ✨✨✨✨✨
 * 
 * callback 강의 학습 때 작성했던 콜백지옥 예제를 프로미스를 이용해 고쳐보자.
 * 
 * promise를 이용하는 것으로 바꾸고, 실행을 promise 체이닝으로 바꿔보자
 */

'use strict';

// 원본
//  class UserStorage{
//      loginUser(id, password, onSuccess, onError){
//          setTimeout(() => {
//              if((id === 'ellie' && password === 'dream') || (id === 'coder' && password === 'academy')){
//                  onSuccess(id);
//              }
//              else{
//                  onError(new Error('not found'));
//              }
 
//          }, 2000);
//      }
 
     
//      getRoles(user, onSuccess, onError){
//          setTimeout(() => {
//              if(user === 'ellie'){
//                  onSuccess({name: 'ellie', role: 'admin'});
 
//              }
//              else{
//                  onError(new Error('no access'));
//              }
//          }, 1000);
//      }
//  }
 
//  const userstorage = new UserStorage();
//  const id = prompt('Enter your ID');
//  const password = prompt('Enter your password');
 
//  userstorage.loginUser(
//      id, 
//      password, 
//      (user) => {
//          userstorage.getRoles(
//              user, 
//              (userWithRole) => {
//                  alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
//              }, 
//              (error) => {
//                  console.log(error);
//              });
//      }, 
//      (error) => {
//          console.log(error);
//      });
 
class UserStorage{
    loginUser(id, password){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if((id === 'ellie' && password === 'dream') || (id === 'coder' && password === 'academy')){
                    resolve(id);
                }
                else{
                    reject(new Error('not found'));
                }
            }, 2000);
        });
    }
    
    getRoles(user){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(user === 'ellie'){
                    resolve({name: 'ellie', role: 'admin'});
                }
                else{
                    reject(new Error('no access'));
                }
            }, 1000);
        });
    }

}

// 더이상 콜백을 전달받지 않아도됨

const userStorage = new UserStorage();
const id = prompt('Enter your ID');
const password = prompt('Enter your password');

userStorage.loginUser(id, password)
.then(userStorage.getRoles) // 잘되면 // .then(user => userStorage.getRoles(user)) 와 같은 코드
.then(user => alert(`Hello ${user.name}, you have a ${user.role}`))
.catch(console.log);

// class UserStorage{
//     loginUser(id, password, onSuccess, onError){
//         setTimeout(() => {
//             if((id === 'ellie' && password === 'dream') || (id === 'coder' && password === 'academy')){
//                 onSuccess(id);
//             }
//             else{
//                 onError(new Error('not found'));
//             }

//         }, 2000);
//     }

    
//     getRoles(user, onSuccess, onError){
//         setTimeout(() => {
//             if(user === 'ellie'){
//                 onSuccess({name: 'ellie', role: 'admin'});

//             }
//             else{
//                 onError(new Error('no access'));
//             }
//         }, 1000);
//     }
// }

// const userstorage = new UserStorage();
// const id = prompt('Enter your ID');
// const password = prompt('Enter your password');

// userstorage.loginUser(
//     id, 
//     password, 
//     (user) => {
//         userstorage.getRoles(
//             user, 
//             (userWithRole) => {
//                 alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
//             }, 
//             (error) => {
//                 console.log(error);
//             });
//     }, 
//     (error) => {
//         console.log(error);
//     });
