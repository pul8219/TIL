# Kibana

## 시각화할 데이터 매핑하기

1. 데이터 로드 전에 매핑을 먼저 수행
매핑은 ELK에서 꼭 해줘야 하는 절차. 예를 들어 위도 경도 데이터를 가져올 때 해당 데이터의 타입을 "geo_point"로 매핑해주지 않으면 지도에 시각화시 지도에 나타낼 수 없는 문제가 발생함. 매핑은 필수!
(매핑 까먹으면 인덱스 지웠다가 다시 넣기)

2. bulk 데이터를 이용, Elasticsearch에 데이터 세트를 로드

3. `GET /_cat/indices?v` 이용, 데이터가 성공적으로 로드됐는지 확인

4. Elasticsearch에 로드된 각 데이터 세트에는 인덱스 패턴을 키바나에 등록. 그래야 검색도 할 수 있고 시각화도 할 수 있음


### 실습

####1

sample data <https://www.elastic.co/guide/en/kibana/7.6/tutorial-build-dashboard.html#load-dataset>

샘플데이터의 압축 파일 다운로드 받은 뒤 압축 해제

#### 2

Kibana dev tools Console에서 (지금까지는 인덱스를 만드는 것만 해봤는데)

`PUT /shakespeare` 이런 식으로 인덱스를 넣을 수도 있음
`mappings` 라는 json 데이터를 같이 넣어 매핑을 함께 지정해주기!

```
PUT /shakespeare
{
  "mappings": {
    "properties": {
    "speaker": {"type": "keyword"},
    "play_name": {"type": "keyword"},
    "line_id": {"type": "integer"},
    "speech_number": {"type": "integer"}
    }
  }
}

PUT /logstash-2015.05.18
{
  "mappings": {
    "properties": {
      "geo": {
        "properties": {
          "coordinates": {
            "type": "geo_point"
          }
        }
      }
    }
  }
}

PUT /logstash-2015.05.19
{
  "mappings": {
    "properties": {
      "geo": {
        "properties": {
          "coordinates": {
            "type": "geo_point"
          }
        }
      }
    }
  }
}

PUT /logstash-2015.05.20
{
  "mappings": {
    "properties": {
      "geo": {
        "properties": {
          "coordinates": {
            "type": "geo_point"
          }
        }
      }
    }
  }
}
```

(logstash란 샘플데이터는 날짜별로 있어서 이걸 다 넣어주는 것. 그리고 logstash라는 샘플데이터는 매핑을 geo_point밖에 안함. 다른건 매핑 없이 넣어도 되는 데이터 라는 뜻)

#### 3

데이터 셋을 로드(우분투니까 curl 명령에서 bulk api 사용)

```shell script
curl -u elastic -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/bank/_bulk?pretty' --data-binary @accounts.json
curl -u elastic -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/shakespeare/_bulk?pretty' --data-binary @shakespeare.json
curl -u elastic -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/_bulk?pretty' --data-binary @logs.jsonl
```

localhost:9200 는 각자의 host:port 입력하면 됨

실행후 status가 200번대(정상)인지 확인하기

Q. 실행했더니 host의 'elastic' 패스워드를 치라고 나오면?
A. 우분투 계정 패스워드 치니까 됐다.

`127.0.0.1:9200/_cat/indices?v` 로 Index 들 상태 확인

dev tools 에서 톱니바퀴 모양 > Index Management 확인

### 4

Index Pattern 으로 만들기

Kibana > Management > Index Pattern

logstash-2015... 데이터의 경우 (bank 데이터는 어떤 한 시점의 데이터인데) 시간에 따라 데이터 흐름이 있음 따라서 시계열 데이터! 인덱스 패턴 추가할 때 타임 필터 설정해줘야 넘어갈 수 있음
@timestamp 로그스태시가 수집한 시간 -> elasticsearch가 장시간 죽었다가 실행되면 문제가 될 수도 있긴 있음
utc_time 로그 자체의 시간

logstash-2015... 데이터의 경우 geo.coordinates 필드의 타입이 아까 매핑한 geo_point인지 확인

Kibana > Discover 에서 잘 올라갔는지 확인



## Kibana를 활용한 시각화

### 실습

#### 1

Kibana > Visualize
ex) Metrics (간단하게 count 세는 기능 포함)
visualize 만들 때 Save 필수

Kibana > Dashboard
Visualize 로 만든 데이터들을 대시보드에서 Add를 이용하여 추가해 대시보드를 꾸밀 수 있음

logstash 지도에 띄울 때 데이터 없을 경우 -> discover에 가서 날짜 지정해줘야함
왜냐하면 이 샘플데이터가 로그인데 2015년 자료라 시간 설정해줘야 데이터 보여