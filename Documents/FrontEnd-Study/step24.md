[문서 목록으로 돌아가기](README.md)

# STEP 24

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)

- 작성자: Wol-dan (@pul8219)

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위: STEP 24 [CORS]()

- 기한: 01/23(토) ~ 01/25(화)

# 보충 필요

- [캡틴 판교 - 프런트엔드 개발자가 알아야하는 HTTP 프로토콜 Part 1](https://joshua1988.github.io/web-development/http-part1/)

# 목차

# Same-Origin Policy(동일 출처 정책)

웹페이지에서 다른 origin으로부터의 불러오는 리소스는 안전하지 않다고 보는 보안 메커니즘

이 정책에 의해서 자바스크립트로 다른 웹페이지에 접근할 때는 같은 origin의 페이지에만 접근이 가능하다.

> 외부 서버 경로로 ajax 요청을 보내면 에러가 발생하며 요청이 실패한다. 이는 자바스크립트 엔진 표준 스펙에 Same-Origin Policy(동일 출처 정책)이라는 보안규칙이 있기 때문이다.

## origin

두 URL이 같은 origin 을 갖는다는 것은 둘의 **프로토콜, 포트, 호스트**가 같다는 것을 의미한다.

### Ex)

아래 두 URL은 같은 origin이 아니다. http:// 의 기본 포트 번호는 `80`라서 둘은 포트가 다르기 때문이다.

`http://store.company.com/dir2/other.html`

`http://store.company.com:81/dir/page.html`

> 그러나 여러 도메인으로 구성되는 대규모 웹 프로젝트 증가, REST API를 이용한 외부 호출이 많아지는 상황에서 SOP는 적절치 않은 정책이 되기도 하고있다. 그래서 추가적으로 CORS라는 정책이 만들어졌다.

# CORS

## CORS란?

Cross-Origin Resource Sharing(교차 출처 자원 공유)

웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 메커니즘.
서버와 클라이언트가 정해진 헤더에 따라 서로 요청이나 응답에 반응할지 결정하는 방식으로, 요청을 받은 웹서버가 허용할 경우 다른 도메인의 웹페이지 스크립트에서도 자원을 주고받을 수 있게된다.

선택적 자원에 대해 허용한 origin들만 요청할 수 있도록 하기 때문에 필요하다.

![](https://mdn.mozillademos.org/files/14295/CORS_principle.png)

출처: [MDN - CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)

## CORS 작동 방식

웹 어플리케이션은 자신의 origin과 다른 리소스를 요청할 때, CORS를 실행한다.

1. Preflight

   요청하려는 URL이 외부 도메인일 경우, 웹 브라우저는 preflight 요청(사전 요청)을 먼저 날린다. 이를 통해 실제 요청하려는 경로와 같은 URL에 대해서 옵션 메서드로 요청을 미리 날려보고 요청을 할 수 있는 권한이 있는지 확인한다.

   ![](https://user-content.gitlab-static.net/b08e6a235bfe1a6e36c2e0373abf502cdc70b153/68747470733a2f2f6769746875622e636f6d2f6b696d7365756c62692f54494c2f7261772f6d61737465722f4a6176615363726970742f61737365742f636f72732e706e67)

   > 해당 서버측에서도 CORS에 대한 처리가 필요하다. 이렇게 preflight 요청이 오면 서버는 서버가 응답가능한 origin들을 헤더에 담아 브라우저에게 보낸다.
   >
   > 브라우저는 이 헤더를 보고 해당 origin에서 요청할 수 있는거라면 리소스 전송을 허용하고 불가능하다면 에러를 발생시킨다.

2. 실제 요청

## CORS에 관여하는 응답 헤더

### Request headers(클라이언트의 요청 헤더)

- Origin
  요청을 보내는 페이지의 origin(출처)

- Access-Control-Request-Method
  실제 요청에서 어떤 메서드를 사용할 것인지 알리기 위함

- Access-Control-Request-Headers
  실제 요청에서 어떤 헤더를 사용할 것인지 알리기 위함

### Reponse headers(클라이언트의 응답 헤더)

- Access-Control-Allow-Origin

  `*`이면 모든 외부 도메인에서 모든 요청을 허용한다는 것 (`Access-Control-Allow-Origin: *`)

# Comment

웹 보안상 기본적으로 SOP 정책이 적용된다는 것을 처음 알게되었다. 그리고 CORS도 처음 접해보는 개념인데 어떤 역할을 하는지는 이해가 가나, 구체적으로 어떻게 사용하는지는 잘 모르겠다. 팀원분들 문서도 살펴보고 추가적으로 더 공부하면서 정리필요

# References

- MDN, Same-origin policy https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

- MDN, CORS https://developer.mozilla.org/ko/docs/Web/HTTP/CORS

- REST API https://meetup.toast.com/posts/92

- HTTP 접근 제어(CORS)란? https://velog.io/@suseodd/HTTP-%EC%A0%91%EA%B7%BC-%EC%A0%9C%EC%96%B4-CORS-%EB%9E%80

- CORS란 무엇인가? https://hannut91.github.io/blogs/infra/cors

- CORS&HTTP&HTTPS&HTTPCache https://gitlab.com/siots-study/topics/-/wikis/CORS&HTTP&HTTPS&HTTPCache

# 팀원들 결과물
