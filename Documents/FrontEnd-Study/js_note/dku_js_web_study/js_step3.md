- 아이템 조회 캡쳐화면

![](https://images.velog.io/images/pul8219/post/3a4a6044-49ab-47f1-a5f2-0f3da5262e2a/image.png)

- 아이템 추가 캡쳐화면

![](https://images.velog.io/images/pul8219/post/e709d55a-f8ce-4f89-84aa-b7e91252dcbf/image.png)

mongoDB에서도 확인 가능

![](https://images.velog.io/images/pul8219/post/54d5df07-33d7-4588-987b-03206cd12c61/image.png)

- 아이템 수정 캡쳐화면

![](https://images.velog.io/images/pul8219/post/28638f0a-cc04-40cc-a3e4-4cf564a7a1cc/image.png)

mongoDB에서도 확인 가능

![](https://images.velog.io/images/pul8219/post/7a71dd02-344d-4df7-9871-01547161ec57/image.png)

- 아이템 토글

<https://stackoverflow.com/questions/12554716/toggle-query-in-mongodb>

mongoDB에 저장돼있는 `completed`값을 toggle시키기 위해서 `findById`로 먼저 타겟 아이템을 찾고, 찾은 타겟 아이템에서 completed에 not 연산을 주어 이를 `findByIdAndUpdate` 안에 포함시켰다.

![](https://images.velog.io/images/pul8219/post/e47c69ac-a325-4ed3-aee4-367b929abb53/image.png)

- 아이템 삭제

![](https://images.velog.io/images/pul8219/post/0bec3e58-8e02-461c-ad12-4f3d676c9efd/image.png)

# 210712 온라인세션

**사전조사**

- AJAX: 클라이언트단에서 서버로 요청을 할 때 AJAX를 써야함
- XMLHttpRequest API(줄여서 XHR이라고 함)
- FETCH API: rest api로 만들어진 것들을 fetch를 이용해 호출
  - `fetch('/api/items').then(res => res.json()).then(console.log)` 이런식으로 사용
- CORS

  ```
  동일출처정책: 똑같은 도메인에서 api를 호출하는 것. 서버에서 허용을 해주도록 설정하거나 애초에 똑같은 도메인에서 호출하거나 해야 한다.(cors -> 동일출처정책을 지켜라 라는 것)

  이를 우회하는 방법이 있긴한데 다음과 같다. 이를 이용해 크롤링도 하고 그러는 것이다.

  app.get('/naver', (req, res) => {
  axios.get('https://www.naver.com').then(({data}) => res.send(data));
  })
  ```

- Promise, async, await
  - promise는 비동기 호출에 대해 동기적으로 관리할 수 있게하는 것
  - async, await 어떻게 하면 잘 쓸 수 있는지 알아보기(await을 변수에 담아 또 await하는 방법 황쌤이 보여주심)

**API 연동하기**
