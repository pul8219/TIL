# References

미션3 다른분들 코드

- https://github.com/next-step/js-todo-list-step3/pull/30/files

# fetch()

- `fetch()`로 부터 반환되는 Promise 객체는 HTTP Status Code가 404나 500을 반환하더라도 HTTP error 상태를 reject하지 않는다. 대신 `ok`속성이 `false`인 resolve를 반환하며, 네트워크 장애등으로 요청이 완료되지 못한 경우 reject가 반환된다.

# 210614

setup()이 실행되고 나서 render()가 실행되길 원했는데 render()가 먼저 실행되버려서(setup이 비동기 이기 때문) mounted에서 state값이 텅 빈채로 진행되는 문제가 있었다.
core/Component.js의 생성자 부분에서 setup()이 완전히 끝난 후에 render()가 실행될 수 있도록 비동기 처리를 해줘야한다. constructor 안에서 async/await을 쓰는 것은 불가능하므로 init이라는 함수를 따로 빼서 여기에 setup, render 등을 호출해놓고 init을 생성자에서 호출하면 된다.
(setup안에서 api를 호출할 때 await을 사용한 것은 그 아래 문장들이 실행되지 않도록 한 것 뿐이며 이미 render-mounted는 실행되고 있었음. 그래서 문제였던 것!)

팀 리스트가 많아서 넘어갈 때 스크롤 구현하기
