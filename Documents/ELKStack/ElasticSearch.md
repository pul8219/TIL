# Elasticsearch

## Intro

### Elasticsearch와 관계형 DB(RDBMS) 비교

**관계형 DB | ElasticSearch**

Database | Index

Table | Type

Row | Document

Column | Field

Index | Analyze

Primary key | _id

Schema | Mapping

Physical partition | Shard

Logical partition | Route

Relational | Parent/Child, Nested

SQL | Query DSL

### Elasticsearch 아키텍쳐, 용어

1. 클러스터(cluster)

* 클러스터란 Elasticsearch에서 가장 큰 시스템 단위를 의미하며, 최소 하나 이상의 노드로 이루어진 노드들의 집합

* 서로 다른 클러스터는 데이터의 접근, 교환을 할 수 없는 독립적인 시스템

* 여러 대의 서버가 하나의 클러스터를 구성할 수 있고, 한 서버에 여러 개의 클러스터가 존재할수도 있음

2. 노드(node)

* Elasticsearch를 구성하는 하나의 단위 프로세스

* 역할에 따라 Master-eligible, Data, Ingest, Tribe 노드로 구분 가능

3. 인덱스(index) / 샤드(Shard) / 복제(Replica)

인덱스(index)는 관계형 DB에서 Database에 대응하는 개념

* 샤드(Shard): 데이터를 분산해서 저장하는 방법. 인덱스를 여러 샤드로 쪼갠 것으로 기본적으로 1개가 존재. 검색 성능 향상을 위해 클러스터의 샤드 갯수를 조정하기도함(튜닝)

* 복제(Replica): 또 다른 형태의 샤드. 노드를 손실했을 경우 데이터 신뢰성을 위해 샤드들을 복제하는 것. 서로 다른 노드에 존재할 것을 권장.


### Elasticsearch의 특징

* Scale out
샤드(Shard)를 통해 규모가 수평적으로 늘어날 수 있음

* 고가용성
복제(Replica)를 통해 데이터의 안정성을 보장

* Schema Free
JSON 문서를 통해 데이터 검색을 수행하므로 스키마 개념이 없음

* Restful
데이터 CRUD 작업은 **HTTP Restful API**를 통해 수행

**Data CRUD | Elasticsearch Restful | SQL**
CREATE | POST | INSERT
READ | GET | SELECT
UPDATE | PUT | UPDATE
DELETE | DELETE | DELETE

PUT, POST(매핑이나 데이터 삽입)는 엄격하게 구분하진 않는대


---

## 클러스터

Elasticsearch를 설치하고 실행해보면 클러스터가 1개 존재하는 것을 알 수 있다.

### 클러스터 health 체크 - 클러스터 정보

```shell script
$ curl -XGET localhost:9200/_cluster/health?pretty=true
```

curl 명령어가 작동하지 않을 경우, `sudo apt install curl` 명령어를 이용해 curl 설치

### 클러스터 status

[Elasticsearch status 설명](https://brunch.co.kr/@alden/43)


---

## elasticsearch crud

### Restful API란?
   * 노드와 통신하는 방법
   * Elasticsearch는 클러스터와 상호작용하는 데 사용가능한 매우 포괄적이고 강력한 REST API를 제공
   * 수행 가능한 작업
       * 클러스터, 노드, 색인 상태, 상태 및 통계 확인
       * 클러스터, 노드 및 색인 데이터 및 메타 데이터 관리
       * CRUD(Create, Read, Update, Delete) 및 인덱스에 대한 검색 작업 수행
       * 페이징, 정렬, 필터링, 스크립팅, 집계 및 기타 고급 검색 작업 실행
   * 구성요소 3가지: 리소스, 메서드, 메세지
   메서드엔 put get delete delete 있음(웹에선 put,get만 사용 가능)

### 설명

REST 완 별개로 elasticsearch가 제공하는 api가 있는데
`GET/_cat/nodes?v`

_cat :클러스터 상태 확인위해 사용
_search
_update
이런거!


v: 컬럼명 보여줌
pretty: json 파일 받으면 보통 다 붙어있는데 이걸 이쁘게 보여줌

클러스터 상태
녹색: 클러스터가 완전히 작동
노란색: 모든 데이터 사용할 수 있지만 일부 복제본이 할당이 안된 경우(샤딩 안된경우)
빨간색: 빨간색이면 사용불가

* 데이터베이스가 가진 데이터 확인
갖고 있는 모든 인덱스 항목 조회(indices=index+es 라고 보면됨)

`GET/_cat_indices?v`
(cat은 노드 조회 의미)

* elasticsearch 의 인덱싱 방식
관계형 db에서의 검색 방식 + 책 뒤에 있는 색인 목록과 유사(역파일 색인 데이터 구조)
ex)단어, 그 단어가 있는 페이지
데이터가 커진다는 단점도 있지만 검색이 빠름

### 엘라스틱 서치의 질의방법
* 커맨드라인의 curl 명령어 사용 -> 불편
* postman 응용 프로그램 사용(window에서 주로 사용)
* **kibana에서 devtool 사용** (사용)
    * kibana의 연장아이콘 클릭(dev tool임)

### 데이터 입력/조회/삭제/업데이트 요약

* 입력

`PUT 엘라스틱서치주소/인덱스(데이터베이스)/타입(테이블)/document번호(_id) -d{메세지}`

메세지는 json 형태로 들어가야함(key value의 쌍)

* 조회

`GET 엘라스틱서치주소/인덱스(데이터베이스)/타입(테이블)/document번호(_id)`

* 삭제

`DELETE 엘라스틱서치주소/인덱스(데이터베이스)/타입(테이블)/document번호(_id)`

* 업데이트

`POST 엘라스틱서치주소/인덱스(데이터베이스)/타입(테이블)/document번호(_id)/_update -d{수정할내용}`

_update API 사용

### 실습
주소창에
노드 확인
127.0.0.1:9200/_cat/nodes?v
상태 확인
127.0.0.1:9200/_cat/health?v
127.0.0.1:5601

```
GET _cat/indices

```


```
POST customer/type1/1
{
  "name": "yurim",
  "age": 24
}

//위 방법으로 update를 하면 메세지의 내용으로 도규먼트 전체가 갈아끼워짐

POST customer/type1/1/_update
{
  "doc":{
    "age":22
  }  
}

//위 방법으로 update를 하면 수정하고 싶은 부분만 수정할 수 있음
"doc" 은 무조건 들어가야함
document에서 이부분을 수정하겠다 라는 뜻

```

```
POST customer/type1/1/_update
{
  "script":{
    "inline": "if(ctx._source.age==24){ctx._source.age++}"
    }
}

// 위처럼 스크립트를 이용하여 내용을 업데이트 할 수도 있음(코드적인것)
// 해당 도큐먼트 컨텍스트의 _source부분에 있는 age 항목을 수정한 것
```

### 배치 프로세스
http 방식(요청, 응답) 데이터를 한번에 여러개 보내게 하여 오버헤드를 줄여줌
지금까지는 데이터를 하나씩 보냈는데 _bulk API를 사용하여 여러개의 문서를 보내보기
중간에 실패하더라도 나머지는 정상적으로 실행됨

* bulk 이용, 두개의 데이터 넣는 예 (_id는 규칙)
```
POST /customer/type1/_bulk
{"index":{"_id":"1"}}
{"name": "kim"}
{"index":{"_id":"2"}}
{"name": "lee"}
```

* bulk 이용 여러개의 update 사항 보내기(update, delete등)
```
POST /customer/type1/_bulk
{"update": {"_id":"1"}}
{"doc": {"age": "18"}}
{"delete": {"_id":"2"}}
```

### Search API

* url 방법

```
POST kibana_sample_data_flights/_search?q=*&sort=AvgTicketPrice

#자동으로 오름차순으로 정렬이됨(sort의 default)
```

* 본문을 이용해 검색하는 방법

```
POST kibana sample_data_flights/_search
{
    "query": {"match_all":{}}, #모든 결과 조회
    "sort": {"AvgTicketPrice": "desc"},
    "_source": ["AvgTicketPrice","FlightNum"]
    #보여주고 싶은 필드만 보여주게함
}
```

```
POST kibana sample_data_flights/_search
{
    "query": {"match_phrase":{"DestCountry": "AU"}}, #조건에 맞는 결과 조회
    "sort": {"AvgTicketPrice": "desc"},
    "_source": ["AvgTicketPrice","FlightNum", "DestCountry"]
    #보여주고 싶은 필드만 보여주게함
}
```

결과는 기본적으로 조건이 없으면 10개 항목만 보여줌(default)


아래처럼 반드시 매치하는 것과 매치하지 않아야 하는 것을 지정하여 검색할 수도 있음

```
POST kibana_sample_date_flights/_search
{
    "query":{
        "bool":{
            "must": {"match": {"DestCountry": "AU"}}, #여기에 []로 여러 옵션을 줄 수도 있음
            "must_not": {"match": {"FlightNum": "9HY95MR"}
        }
    }
}
```

```
#실습 모음

GET _search
{
  "query": {
    "match_all": {}
  }
}

GET /_cat/health?v

GET /_cat/indices?v

POST /customer/type1/1
{
  "name": "yurim"
}

GET /customer/type1/1



POST /customer/type1/_bulk
{"index":{"_id":"1"}}
{"name": "kim"}
{"index":{"_id":"2"}}
{"name": "lee"}


POST /customer/type1/_bulk
{"update": {"_id":"1"}}
{"doc": {"age": "18"}}
{"delete": {"_id":"2"}}
```

*** url 방법 다시
```
GET kibana_sample_data_flights/_search?q=OriginWeather:Sunny AND DestCountry:AU&_source=OriginWeather,DestCountry,AvgTicketPrice&sort=AvgTicketPrice:desc
```

---

GET tourcompany/customerlist/_search?q=*


POST tourcompany/customerlist/1
{
  "name": "Alfred",
  "phone": "010-1234-5678",
  "holyday_dest": "Disneyland",
  "departure_date": "2017/01/20"
}

POST tourcompany/customerlist/2
{
  "name": "Huey",
  "phone": "010-2222-4444",
  "holyday_dest": "Disneyland",
  "departure_date": "2017/01/20"
}

POST tourcompany/customerlist/3
{
  "name": "Naomi",
  "phone": "010-3333-5555",
  "holyday_dest": "Hawaii",
  "departure_date": "2017/01/10"
}

POST tourcompany/customerlist/4
{
  "name": "Andra",
  "phone": "010-6666-7777",
  "holyday_dest": "Bora Bora",
  "departure_date": "2017/01/11"
}

POST tourcompany/customerlist/5
{
  "name": "Paul",
  "phone": "010-9999-8888",
  "holyday_dest": "Hawaii",
  "departure_date": "2017/01/10"
}

POST tourcompany/customerlist/6
{
  "name": "Colin",
  "phone": "010-5555-4444",
  "holyday_dest": "Venice",
  "departure_date": "2017/01/16"
}



#퀴즈 1

#엘라스틱서치 CRUD문제와 해설
#BoraBora 여행자 명단을 삭제하라
DELETE tourcompany/customerlist/4

#Hawaii 단체 관람객 출발일을 2017/01/10 에서 2017/01/17로 수정하라
POST tourcompany/customerlist/3/_update
{
	"doc":
	{
		"departure_date": "2017/01/17"
	}
}

POST tourcompany/customerlist/5/_update
{
	"doc":
	{
		"departure_date": "2017/01/17"
	}
}

#휴일 여행을 디즈니랜드로 떠나는 사람들의 핸드폰 번호를 조회해라



#퀴즈 2
퀴즈1에서 했던 데이터가 다 날라갔대. 이를 대비 bulk데이터를 만들고 api를 사용하여 업로드해보자
*주의 중괄호 안에 붙여써야함
POST tourcompany/customerlist/_bulk
{"index":{"_id":"1"}}
{"name": "Alfred", "phone": "010-1234-5678", "holyday_dest": "Disneyland", "departure_date": "2017/01/20"}
{"index":{"_id":"2"}}
{"name": "Huey", "phone": "010-2222-4444", "holyday_dest": "Disneyland", "departure_date": "2017/01/20"}
{"index":{"_id":"3"}}
{"name": "Naomi", "phone": "010-3333-5555", "holyday_dest": "Hawaii", "departure_date": "2017/01/10"}
{"index":{"_id":"4"}}
{"name": "Andra", "phone": "010-6666-7777", "holyday_dest": "Bora Bora", "departure_date": "2017/01/11"}
{"index":{"_id":"5"}}
{"name": "Paul", "phone": "010-9999-8888", "holyday_dest": "Hawaii", "departure_date": "2017/01/10"}
{"index":{"_id":"6"}}
{"name": "Colin", "phone": "010-5555-4444", "holyday_dest": "Venice", departure_date": "2017/01/16"}

1.
tourcompany 인덱스에서 010 3333 5555 를 검색하십시오

GET tourcompany/customerlist/_search?q="010-3333-5555"

2.
휴일 여행을 디즈니랜드로 떠나는 사람들의 핸드폰 번호를 조회하십시오 (phone 필드만 출력

GET tourcompany/customerlist/_search?q="Disneyland"&_source=phone,holyday_dest

3.
departure date 가 2017 01 10 과 2017 01 11 인 사람을 조회하고 이름 순으로 출력하십시오
(name 과 departure date 필드만 출력
GET tourcompany/customerlist/_search?q="2017/01/10" OR "2017/01/11"&_source=name, departure_date&sort=name.keyword

sort=name하면 에러날 것
아마 name필드를 문자열로 인식을 못하는 문제같음(엘라스틱서치 버전 6부터 그럼)
name.keyword로 써주기

4.
BoraBora 여행은 공항테러 사태로 취소됐습니다 BoraBora 여행자의 명단을 삭제해주십시오

Bora Bora인 애 확인
GET tourcompany/customerlist/_search?q="Bora Bora"

POST tourcompany/customerlist/_delete_by_query?q="Bora Bora"


5.
Hawaii 단체 관람객의 요청으로 출발일이 조정됐습니다 2017 01 10 에 출발하는 Hawaii 의 출발일을
2017 01 17 일로 수정해주십시오

스크립트 넣기

POST tourcompany/customerlist/_update_by_query
{
	"script":{"inline":"ctx._source.departure_date='2017/01/17'", "lang":"painless"},
	"query":{
		"bool":{
			"must":[
				{"match": {"departure_date":"2017/01/10"}},
				{"match": {"holyday_dest":"Hawaii"}}
				]
		}
	}
}

소스 안에 departure_date에 하겠다는 의미
"lang":"painless"는 language가 무엇인지 상관하지 않고 라는 형식 같은것임(중요x)

실행해보면 2개 update 된 것 확인 가능



kibana 시작하기
어떤 index 탐색할지 설정해야함

http://127.0.0.1:9200/_cat/indices

할당된메모리, 사용되고 있는메모리

http://127.0.0.1:5602/status


Management에서 kibana-index patterns
create index pattern
어떤 인덱스를 할 것인가 -> Time Filter

time filter는 시계열 (타임시리즈) 관련
데이터 분석에서 시계열 데이터 있는데
시간에 따라 분석을 할 수 있는 데이터 : 주식, 시세, 로그 등


총 정리: 우리가 만든 데이터의 경우 index pattern에 등록해줘야 함 -> 잘 조회되는지 확인
-----07/14 수강

---


---

## 기본 API(index, document CRUD)

// 클러스터에 존재하는 모든 인덱스(index) 조회
curl -XGET 'localhost:9200/_cat/indices?v'

// 클러스터에 인덱스를 생성하고 이를 조회해보기

curl -XPUT 'localhost:9200/seereal?pretty'
curl -XGET 'localhost:9200/_cat/indices?v'

// 인덱스에 Type을 생성하고 Document(관계형 DB에서 Record에 해당)를 넣어보기(색인화 작업)
curl -XPOST 'localhost:9200/seereal/weather/1?pretty' -H 'Content-Type: application/json' -d'{"date": "2020-07-10"}'

seereal 인덱스에 weather Type에 1번 _id에 색인화하는 과정
(_id 값을 명시하지 않으면 임의의 문자열을 _id로 할당함)

* -d 옵션

--data-binary의 축약

추가할 데이터를 명시

or

// 데이터를 json 형식의 파일로 만들어서 API를 호출하여 데이터를 추가하는 방식도 가능

curl -XPOST 'localhost:9200/seereal/weather/2?pretty' -H 'Content-Type: application/json' -d @data.json

// 지금까지 추가한 Docuent 조회
curl -XGET 'localhost:9200/seereal/_search?pretty'

// _id를 이용해 document를 검색
curl -XGET 'localhost:9200/seereal/weather/1?pretty'

// Document의 응답 결과를 줄일 수 있는 방법
curl -XGET 'localhost:9200/seereal/weather/2?pretty&filter_path=_source'

curl -XGET 'localhost:9200/seereal/weather/2?pretty&filter_path=_source.celsius'

// Document 수정
curl -XPUT 'localhost:9200/seereal/weather/2?pretty' -H 'Content-Type: application/json' -d '{
"date": "2017-04-04"
}'

// 인덱스, Document 삭제
* 특정 _id의 Document 삭제 방법

curl -XDELETE 'localhost:9200/seereal/weather/1?pretty'

* 인덱스 삭제 방법
curl -XDELETE 'localhost:9200/seereal?pretty'

---
## Q & A











---

## Reference

*[Elasticsearch 입문하기(1) 클러스터](https://victorydntmd.tistory.com/311?category=742451)

*[Elasticsearch 입문하기(2)](https://victorydntmd.tistory.com/312?category=742451)




https://withcoding.com/112