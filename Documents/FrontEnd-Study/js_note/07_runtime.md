# 런타임(Runtime)

- 프로그래밍 언어가 구동되고 있는 환경을 의미한다.

## 자바스크립트의 런타임

- Node.js
- 브라우저

둘 모두 자바스크립트가 구동되는 환경, 즉 자바스크립트 런타임이다.

# 싱글 스레드(Single Thread)

- 자바스크립트는 싱글스레드 언어이다.

# 콜스택(call stack)

# 정리

- 자바스크립트 엔진(싱글스레드라서 하나의 힙과 하나의 콜스택을 가짐), Web APIs, Event Loop(이벤트 루프), Callback Queue(콜백 큐) (크롬의 자바스크립트 런타임을 예로 공부)
  - 비동기 콜백이 동작하는 방식(콜백이 콜백큐에 쌓이고 콜스택이 비면 해당 콜백이 실행됨)

# References

[자바스크립트 런타임](https://beomy.github.io/tech/javascript/javascript-runtime/)
