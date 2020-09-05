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
    user => "elastic"
    password => "haniumelk@!"
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
    user => "elastic"
    password => "haniumelk@!"
    document_id => "%{call_sign}%{arr_dep}"
  }
}
```

sample data

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
