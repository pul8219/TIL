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

- [자바스크립트 런타임](https://beomy.github.io/tech/javascript/javascript-runtime/) 도움👍
- [event - poiemaweb](https://poiemaweb.com/js-event) 읽어보기❗
- [자바스크립트는 어떻게 동작하는가: 이벤트 루프와 비동기 프로그래밍의 부상, async/await을 이용한 코딩 팁 다섯 가지](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EB%B6%80%EC%83%81-async-await%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%94%A9-%ED%8C%81-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-df65ffb4e7e) 읽어보기❗
