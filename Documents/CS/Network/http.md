캡틴판교 - 프런트엔드 개발자가 알아야하는 HTTP 프로토콜 Part 1 https://joshua1988.github.io/web-development/http-part1/
그랩 - IT 개발자와 일할 때 필요한 모든 개발지식 A to Z https://www.grabbing.me/IT-A-to-Z-By-1e1fbc981b7c4c03ac44943085ac8304

블랙커피 문서 '웹의 동작' 'restful api'

restful api란 무엇인가? https://www.notion.so/54d624628a634c879cc93d94f54cd2d1#f76a803d3e584ee1a78bab8d7218e8ca

신입개발자 면접 질문 깃허브 2개
https://github.com/gyoogle/tech-interview-for-developer

https://github.com/WeareSoft/tech-interview

그랩 모든 개념

- [HTTP, REST API](https://ijbgo.tistory.com/20)

# HTTP

HTTP(HyperText Transfer Protocol)

- HTML를 비롯한 컨텐츠를 컴퓨터들이 **어떻게** 송수신할지에 대해 정해놓은 프로토콜(규약)로, 웹 상에서 클라이언트와 서버 간에 요청/응답(request/response)으로 정보를 주고 받게되어있다. (브라우저에서는 http 프로토콜을 통해 웹서버와 통신을 하게 된다.)
- 주로 HTML문서를 전달할 때 HTTP를 사용한다.
- 텍스트를 교환하기 때문에 네트워크에서 신호를 가로채면 내용이 노출될 수 있다. 이러한 보안 이슈를 해결해주는 프로토콜로 HTTPS가 등장했다.
- TCP와 UDP를 사용하며 80번 포트를 사용한다.

> **하이퍼텍스트(HyperText)**
>
> 참조를 통해 한 문서에서 다른 문서로 접근할 수 있는 텍스트 문서를 의미한다. 인터넷과 결합하여 HTML의 주된 구성요소가 되었다.

> **HTML(HyperText Markup Language)**
>
> 웹페이지가 어떤 구조로 되어있는지 브라우저로 하여금 알 수 있도록 하는 마크업 언어이다.(프로그래밍 언어는 아니다.)
>
> 출처: MDN

> **프로토콜(Protocol)**
>
> 네트워크 통신을 할 때 따르는 규칙(통신규약)

## HTTP의 특징

- Connectionless(비연결)
  - 클라이언트가 요청을 서버에 보내고 서버가 적절한 응답을 클라이언트에 보내면 연결이 해제된다.
- Stateless(무상태)
  - 연결을 끊는 순간 클라이언트와 서버의 통신은 끝나며 상태 정보를 유지하지 않는다.

## HTTP method

- GET(Read)
- POST(Create)
- PUT(Update)
- DELETE(Delete)

## HTTP status code

대표적인 HTTP 응답 상태 코드

- 200: OK
- 201: Created
- 302: Found
- 304: Not Modified
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
- 503: Service Unavailable

> `2XX`: 성공. 클라이언트가 요청한 동작을 성공적으로 처리
> `3XX`: 리다이렉션 완료.
> `4XX`: 요청 오류. 클라이언트에 오류가 있는 경우
> `5XX`: 서버 오류. 서버가 요청을 수행하지 못한 경우

> [HTTP 상태 코드, MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

## HTTPS

HTTPS(HyperText Transfer Protocol Secure)

- HTTPS는 웹 상에서 정보를 암호화하는 SSL프로토콜을 이용해 클라이언트와 서버가 자원을 주고 받을 수 있게 하는 통신 규약을 의미한다.
- HTTPS는 텍스트를 암호화한다.(공개키 암호화 방식) (HTTP와의 차이점!)
- TCP/IP 포트로 443번 포트를 사용한다.

> SSL(Secure Socket Layer)

# 리다이렉트(redirect)

re(다시) + direct(지시하다)

예를 들어 브라우저가 `www.test.com/page1` URL을 웹 서버에 요청했을 때, 서버가 HTTP 응답 메시지를 통해(상태코드 `302`, 응답 메시지 헤더의 Location에 리다이렉트되어야할 주소를 담음) `www.test.com/page2`로 다시 요청하라고 브라우저에게 다른 URL을 지시할 수 있다. 이를 리다이렉트라고 한다.

## 리다이렉트가 필요한 이유

- ex) 네이버 로그인이 되어있어야 접근이 가능한 페이지를 요청했을 경우 로그인 페이지로 리다이렉트시킬 필요가 있다.

# References
