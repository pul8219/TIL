비동기 처리(1) 콜백 함수(Callback)

비동기 처리(2) Promise [바로가기](10_promise.md)

비동기 처리(3) async/await [바로가기]()

# Callback

# 동기(Synchronous)와 비동기(Asynchronous)

Javascript는 동기적으로 동작한다.
호이스팅이 된 이후부터 우리가 작성한 순서에 맞춰 코드가 하나하나씩 순서대로 실행된다는 것이다.
호이스팅(hoisting): var, function declaration 이 자동적으로 제일 위로 끌어올려지는 것(실제로 끌어올려지는 것은 아니지만 이해하기 쉽게 표현하자면)

## 비동기

언제 코드가 시작될지 알 수 없는 것

> `setTimeout()`
>
> - 브라우저에서 제공되는 웹API
> - 지정한 시간이 지나면 인자로 전달한 콜백함수를 실행하는 역할

콜백함수: 전달한 함수를 나중에 너가 불러주라는 개념