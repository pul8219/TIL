# REST API

REST(Representational State Transfer)

자원을 이름으로 구분해 명시하고 해당 자원의 상태를 주고받는 것을 의미한다. 프레임워크가 아니라 약속, 방법론이다. (REST하다는 것은 웹에 존재하는 모든 자원(이미지, 동영상, DB자원)에 고유한 URI를 부여해 활용한다는 것이다.)

REST는 웹의 기존 기술과 HTTP 프로토콜을 그대로 활용한다. (웹의 장점, HTTP 프로토콜의 장점을 극대화하는 아키텍쳐) 자원을 명시하고 이를 HTTP Method(GET, POST, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.

> HTTP API와 REST API는 거의 같은 의미로 사용하나 REST API는 HTTP API에 여러 제약조건이 붙은 것과 같다. 엄밀히 말하면 다르다.

## REST의 특징

1. Uniform Interface

- HTTP 표준만 맞으면 어떤 기술도 가능한 Interface
  - ex) REST API의 정의를 HTTP + JSON으로 했다면, C, Java, Python, IOS 플랫폼 등 특정 언어나 기술에 종속받지 않고 모든 플랫폼에 사용 가능하다.
- Self-Descriptive Messages
  - API 메시지만 보고 API(Resouce, Method를 이용해 무슨 일을 하는지)를 직관적으로 이해할 수 있는 구조이다.

2. Server-Client 구조

- 자원을 가진쪽이 Server, 자원을 요청하는 쪽이 Client

3. Stateless(무상태)

- 상태 정보를 저장하지 않는다.

4. Resource 지향 아키텍쳐(ROA: Resource Oriented Architecture)
5. Cache Ability
6. Layered System
7. Code On Demand(Optional)

## REST 구성요소

1. 자원(Resource): URI

- 모든 자원에는 고유한 식별자가 있고 그 식별자는 `/groups/:group_id`와 같은 HTTP URI이다. Client는 이 URI를 이용해 자원을 지정하고 해당 자원의 상태(정보)에 대한 조작을 Server에 요청한다.

2. 행위(Verb): HTTP Method

- HTTP 프로토콜의 Method를 사용한다. (GET, POST, PUT, DELETE, HEAD 등)

3. 표현(Representation of Resource)

- Server는 Client의 요청에 대해 적절한 응답(Representation)을 보낸다.
- REST에서 자원은 JSON, XML, TEXT, RSS 등 여러 형태의 Representation으로 나타내질 수 있다.
- JSON, XML을 통해 데이터를 주고받는 것이 일반적이다.

## REST의 목표

## RESTful API

위에서 말한 REST 아키텍쳐를 준수해 설계된 API를 말한다.

# References

- [신입 개발자 면접 질문 시리즈 - RESTful API란 무엇인가?](https://www.notion.so/54d624628a634c879cc93d94f54cd2d1)
