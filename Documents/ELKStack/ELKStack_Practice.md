# ELKStack Practice

## 파이썬으로 엘라스틱서치 다루기

- 파이썬 설치

```shell script
sudo apt install python3
sudo apt install python-pip # 파이썬 패키지들 설치

pip3 install elasticsearch
```

- 파이썬 elasticsearch 함수 기능

    - es.*: API 기능(ex: es.cat, es.update)
    - index: 데이터 삽입
    - get: 데이터 조회
    - search: 데이터 검색
    
    
- 파이썬 파일 생성(.py)

**엘라스틱 서비스 접근**

```python
from elasticsearch import Elasticsearch

es = Elasticsearch(["http://127.0.0.1:9200"]) #현재 우분투에서 elasticsearch 실행해놨으므로
# es = Elasticsearch(hosts="127.0.0.1", port=9200)

print(es)
# 결과
# <Elasticsearch([{'host': '127.0.0.1', 'port': 9200}]) # elasticsearch에 접근된 것을 볼 수 있음




# 데이터 삽입
# 결과 'result'가 'created"로 나오면 잘 생성된것


```

```python
# 데이터 조회 - get 이용

from elasticsearch import Elasticsearch

es = Elasticsearch(["http://127.0.0.1:9200"])

#데이터 조회
data = es.get(index="my_index", doc_type="doc1", id=1)
#데이터 조회하는거라 doc_type이랑 id 도 알고 있어야한대 < ?
print(data)

```

```python
# 데이터 검색 - search 이용

from elasticsearch import Elasticsearch

es = Elasticsearch(["http://127.0.0.1:9200"])

data = es.search(index="my_index", body={"query": {"match_all":{}}})
# 모든 데이터를 가져옴(match_all)

print(data)

```

파이썬에서는 json형태가 dictionary래!

## 공공데이터 실습 - 전국 CCTV 데이터 분석 및 시각화

### 전국 CCTV 데이터 다운로드 및 업로드

#### 데이터 다운로드

링크: [https://www.data.go.kr/dataset/15013094/standard.do](https://www.data.go.kr/dataset/15013094/standard.do)

#### 인코딩 변환 후 업로드

다운로드 받은 파일은 키바나에 그냥 업로드하면 인코딩 문제 때문에 한글이 다 깨져서 보인다.

notepad에서 .csv 파일을 열어 UTF-8로 저장해준 뒤 다시 업로드해보자

Kibana 메인 > Import a CSV, NDJSON, or log file > 파일 드래그 앤 드롭 > import > index 이름 설정 후 import 클릭




