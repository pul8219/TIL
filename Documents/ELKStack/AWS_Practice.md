# AWS 인스턴스 관련

AWS EC2에 Putty로 SSH 접속하기 <https://lsjsj92.tistory.com/549>

각각의 인스턴스 모두 Putty 통해 접속
elasticsearch, kibana, logstash, python코드
모두 실행시켜서 kibana 접속해보기

cd logstash/bin
./logstash -f ../config/conf/first.conf

logstash document_id 생성(중복 데이터 인지 확인하기 위해)
<https://m.blog.naver.com/PostView.nhn?blogId=indy9052&logNo=220951222671&proxyReferer=https:%2F%2Fwww.google.com%2F>

---

구현할 기능

```
1. 선박입출항 정보(실시간)
- 입출항 스케쥴 시각화(중간보고서 예상결과물 첫번째꺼 그대로) -> 이슈) 현재 시간을 기점으로 예정, 처리를 나누는거 생각해봐야함
- 나머지 데이터 시각화(차항지, 전출항지, 선박종류) -> 어렵지 않을 것 같음

2. 부두 정보(실시간)
- 부두 가동상태 시각화 & 부두가동률 -> 어렵지 않을 것 같음
- 울산항 부두 상황 지도 시각화 -> 이슈) 위도경도?, PORT-MIS와 부두데이터 불일치, 현재시간을 기점으로 부두에 있는 배들을 띄울 수 있는지?

3. 물동량 분석(정적인 데이터 분석)
- 주요 품목 물동량 시계열 예측 -> 이슈) ARIMA 적용
- 부두별 물동량 군집분석
```

- ELK

`외내입출`이라는 새로운 컬럼으로 시각화에서 저번에 발생했던 문제 해결

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea58eea6-f324-43f6-b7ea-1a72fe034428/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea58eea6-f324-43f6-b7ea-1a72fe034428/Untitled.png)

그런데 test2 라는 인덱스로 예전에 넣던 데이터도 같이 있네.. 이걸 어떻게 지우지

document_id(데이터(행)의 고유값)도 설정하긴 했는데 제대로 들어간지 모르겠음

logstash conf 파일 내용

```
input {
  tcp {
    port => 5000
    codec => json
  }
}
filter{
     json {
       source => "message"
     }
     date {
       match => ["입항일시", "yyyy-MM-dd HH:mm"]
       target => "@timestamp"
     }
}
output {
  elasticsearch {
    hosts => ["http://172.31.38.175:9200"]
    index => "test2"
    user => "id"
    password => "pw"
    document_id => "%{index}%{호출부호}"
  }
}
```

그리고 데이터 10개밖에 안들어갔음 왜이렇게 적지

todo

test2인덱스에 그동안 넣었던 게 다 있던 건가?

입출향 현황에서 구분(최초/변경/최종)이 실시간 업데이트가 안됨. 그래서 현재시간 기준 출항일시가 지났으면 최종으로 그래프에 나타낼 수 있도록 → 이거 출항일시랑 현재시간 비교 어케 하나

해야할 것

인덱스를 새로 만들고(빈)

매핑을 먼저하고(컬럼명이 다 정해질것) (시간 같은거)

파이썬에 json 키값을 다 영어로 바꿔주기

시간은 그 다음 문제

---

```
PUT /test1
{
  "mappings": {
    "properties": {
      "port_name" : {
        "type" : "keyword"
      },
      "call_sign" : {
        "type" : "keyword"
      },
      "ship_name" : {
        "type" : "keyword"
      },
      "ad_cnt" : {
        "type" : "integer"
      },
      "state" : {
        "type" : "keyword"
      },
      "in_out" : {
        "type" : "keyword"
      },
      "arr_dep" : {
        "type" : "keyword"
      },
      "total_ton" : {
        "type" : "integer"
      },
      "arr_date" : {
        "type" : "date",
				*"format" : "yyyy-MM-dd HH:mm"
      },
      "dep_date" : {
        "type" : "date",
				"format" : "yyyy-MM-dd HH:mm"
      },
      "bunder" : {
        "type" : "keyword"
      },
      "next_dest" : {
        "type" : "keyword"
      },
      "pre_dep" : {
        "type" : "keyword"
      },
      "ship_use" : {
        "type" : "keyword"
      },
      "inout_arrdep" : {
        "type" : "keyword"
      }
    }
  }
}
```

아래로 바꿈

```
PUT /test1
{
  "mappings": {
    "properties": {
      "port_name": { "type" : "keyword" },
      "call_sign": { "type" : "keyword" },
      "ship_name": { "type" : "keyword" },
      "ad_cnt": { "type": "keyword" },
      "state": { "type": "keyword" },
      "in_out": { "type": "keyword" },
      "arr_dep": { "type": "keyword" },
      "total_ton": { "type": "integer" },
      "arr_date": { "type": "date", "format": "yyyy-MM-dd HH:mm" },
      "dep_date": { "type": "date", "format": "yyyy-MM-dd HH:mm" },
      "bunder": { "type": "keyword" },
      "next_dest": { "type": "keyword" },
      "pre_dep": { "type": "keyword" },
      "ship_use": { "type": "keyword" },
      "inout_arrdep": { "type": "keyword" }
    }
  }
}
```

아래로 바꿈

```
PUT /test1
{
  "mappings": {
    "properties": {
      "total_ton": { "type": "integer" },
      "arr_date": { "type": "date", "format": "yyyy-MM-dd HH:mm" },
      "dep_date": { "type": "date", "format": "yyyy-MM-dd HH:mm" }
    }
  }
}
```

json 컬럼명 다 바꾸기

총톤수 total_ton 로그스태시 conf 에서 integer로!(56,566 이런 식이니까 해결 필요)

document_id 다시 설정

type 지정할지 말지

`외내입출` 도 영어 이름 컬럼으로 넣기

logstash conf 에서 filter내 date 지우기
지금 logstash conf 파일 (first....conf 파일)

```
input {
  tcp {
    port => 5000
    codec => json
  }
}
filter{
     json {
       source => "message"
     }
     mutate {
       convert => {
         "total_ton" => "integer"
       }
     }
}
output {
  elasticsearch {
    hosts => ["http://172.31.38.175:9200"]
    index => "test1"
    user => "id"
    password => "pw"
    document_id => "%{call_sign}%{arr_dep}"
  }
}
```

sample data(안써도됨)

```
POST test1/_doc/1
{
  "port_name": "울산",
  "call_sign": "abcd",
  "ship_name": "울산호",
  "ad_cnt": "021",
  "state": "최초",
  "in_out": "외항",
  "arr_dep": "출항",
  "total_ton": "21333",
  "arr_date": "2020-09-04 10:00",
  "dep_date": "2020-09-04 22:00",
  "bunder": "부두",
  "next_dest": "부산항",
  "pre_dep": "인천항",
  "ship_use": "화물선",
  "inout_arrdep": "외항입항"
}
```

차항지 바꿀 필요 있음(영문으로 데이터가 들어감) -> 원래 영문인 외국 차항지도 있어서 그런거임 문제X!
total_ton 필드를 integer로 인식을 못해서 문제가 있는 듯 왜그런지 모르겠음
mutate>convert로 하면 오류나는데..다른 방법 없나

엑셀파일을 볼 수 있는 방법이 있나? (데이터 갯수가 제대로 들어간지 모르겠어서)

---

# 2020.09.06(일) 기록

## 문제1

- 문제

port-mis 에도 22개
데이터 프레임도 22개
근데 elasticsearch에는 8개밖에 안들어감
내가 document id를 잘못 설정해서 데이터가 누락됐던지

conf 파일에서 document_id => "test%{call_sign}%{arr_dep}"
지우기
뒤에걸 arr_dep 아니라 inout_arrdep 으로 했어야되는데 내가 잘못한듯 ㅋㅋㅋ
document_id 만 다시 새로 주면 될듯!

- 해결

document_id => "test%{call_sign}%{inout_arrdep}" 로 고쳐서 해결

## 문제2

- 문제: 총톤수 데이터가 오류남
  총톤수 데이터 를 숫자로 변환하는 과정에서 (,) 오류가 문제가 된듯

- 해결:
  logstash conf 파일에서 filter > mutate > convert 구문을 추가하여 총톤수 컬럼을 integer로 가공해주어 해결

## 해야할 일

- ~~(우선순위 1순위) 부두 크롤링한걸로 그려보기~~

깃랩의 UlsanPortAuthority.py 파일 참고

- 입항일시 출항일시 python에서 계산하여 새로운 컬럼 넣어주기(예정/최종)

- (우선순위 2순위)최대한 값을 넣어서 표현하는 걸 늘리기

  시각화: 선박 용도 top5, 예선, 도선, 국적
  이전 인덱스로 만들었던거 새로운 인덱스로 다시 그리기 - 입출항현황, 차항지, 전출항지

  국적(한글로 써있는거), 예선, 도선

- 키바나 시각화 자동화(근데 일단 가능은 한지?)

- 시각화 목록

  - 당일 입출항 현황(막대그래프) / [기능1] 기준 인덱스: port_state / 설명: 당일 입출항(외내, 입출 기준)의 최초/변경/최종 상태를 표현
  - 예선(수치) / [기능1] 기준 인덱스: port_state / 설명: 예선컬럼의 Y, N값을 각각 나타냄
  - 도선(수치) / [기능1] 기준 인덱스: port_state / 설명: 도선컬럼의 Y, N값을 각각 나타냄
  - 차항지(파이차트) / [기능1] 기준 인덱스: port_state / 설명: 차항지 컬럼 값을 파이차트로 표현
  - 전출항지(파이차트) / [기능1] 기준 인덱스: port_state / 설명: 전출항지 컬럼 값을 파이차트로 표현
  - 선박국적(파이차트) / [기능1] 기준 인덱스: port_state / 설명: 선박 국적 컬럼 값을 파이차트로 표현
  - 선박용도 top5(파이차트?) / [기능1] 기준 인덱스: port_state / 설명: 선박 용도 컬럼 값 중 가장 많은 순서대로 Top5 매긴 파이 차트

  - 부두 상태(막대그래프) / [기능2] 기준 인덱스: bunder_state / 설명: 부두 상태(정상, 확인중, 일부파손, 사용불가)를 표현
  - 정상 부두 퍼센트(수치) / [기능2] 기준 인덱스: bunder_state / 설명: 부두 상태가 정상인 것의 퍼센트를 표현
    ㄴ이거 퍼센트화 안됨. 파이썬으로 계산하고 넘겨줘야하나...? 그럼 아예 다른 데이터인데... json을 2개를 던질 수가 있나
  - 부두별 부두상태 / [기능2] 기준 인덱스: bunder_state / 설명: 각 부두 상태(정상, 확인중, 일부파손, 사용불가)별로 어떤 부두가 그 상태에 속하는지 표현

## 지금까지 했던 방법 정리

1. 인덱스를 먼저 생성해주며 매핑을 한다(dev tools 에서)
1. logstash 로 값을 밀어넣는다.
1. 인덱스 패턴을 생성한다
1. 시각화한다.(visualize)

## 문제 3 (UlsanPortAuthority.py 파일 관련)

UlsanPortAuthority.py 파일 실행하니 `int object is not iterable` 라는 오류 메시지 발생

- 해결

`for i in len(p_date):` -> `for i in range(len(p_date)):` 변경하여 해결(구글링)

1. 부두데이터 관련 logstash conf 파일 새로 생성하기

```
input {
  tcp {
    port => 5000
    codec => json
  }
}
filter{
     json {
       source => "message"
     }
}
output {
  elasticsearch {
    hosts => ["http://172.31.38.175:9200"]
    index => "bunder_state"
    user => "id"
    password => "pw"
    document_id => "bunder_state%{p_location}"
  }
}
```

2. dev tools 이용 부두 데이터 넣을 인덱스 만들면서 매핑 지정해주기

- 매핑 코드

```
PUT bunder_state
{
  "mappings": {
    "properties": {
      "p_date": { "type": "date", "format": "yyyy-MM-dd HH:mm" }
    }
  }
}
```

# 2020.09.11(금) 기록

- 다음과 같이 시각화 완료

![image](https://user-images.githubusercontent.com/33214449/92873531-1379f500-f442-11ea-9607-5a27047ff405.png)

![image](https://user-images.githubusercontent.com/33214449/92873776-5a67ea80-f442-11ea-8686-859fe618d518.png)

## 궁금증

- AWS 인스턴스 생성하고 설치하는 방법
- AWS에서 방화벽 설정 어떻게 하면 풀리는지
- 프로젝트내 여러가지 네트워크 설정 tcp, 소켓, aws 관련 등등
