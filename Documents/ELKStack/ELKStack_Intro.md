# ELK Stack

## Intro

### ELK Stack이란?
다음의 오픈 소스를 포함하는 도구

* Logstash (데이터 수집)
    * 다양한 소스(DB, csv파일 등)의 로그 또는 트랜잭션 데이터를 수집, 집계, 파싱하여 Elasticsearch로 전달하는 도구
    * 다루기는 어렵지만 다양한 데이터들을 사용자가 원하는대로 수집할 수 있다는 장점이 있음

* Elasticsearch (데이터 관리)
    * 수집된 데이터를 모아두고 관리하는 일종의 데이터베이스, 검색엔진으로 사용되는 도구

* Kibana (데이터들의 통계, 데이터 시각화)
    * 데이터를 시각화하고, 통계 집계 등을 실시간 모니터링할 수 있도록 하는 도구
    
* Beats (데이터 수집)
    * 데이터 수집을 단순화하기 위해서 사용
    * Logstash에 비해 다루기 쉬움
    * 네트워크 패킷, 로그, 파일 등등을 쉽게 모을 수 있도록 함

### ELK의 장점

* 무료
* 쉽고 빠른 설치
    * Windows: zip파일 압축 풀어 실행(Java 설치되어있어야함)
    * Linux: Java 설치, deb?명령어 등 간단한 과정 거치면 사용 가능 


## ELK 개요와 설치

CRUD: Create Read Update Delete

### Elasticsearch

* 검색엔진 포함
    * 순위 순, 유사한 것 찾아냄, 상세 검색 포함

* 분석 엔진
* 통계 기능 포함

대량의 데이터를 실시간으로 저장, 검색
저장과 동시에 보이게 하겠다!(1초 목표)

### Elasticsearch의 핵심 개념
* Near Realtime(NRT)
거의 실시간 검색 플랫폼

* 클러스터(Cluster)
노드의 모음, 덩어리

* 노드
클러스터의 일부로 데이터를 저장하고 클러스터의 인덱싱 및 검색 기능에 참여하는 단일 프로세스

* 색인(Index) -> RDB에서 Database에 해당

* Type -> RDB에서 Table에 해당

* Documents -> RDB에서 Record에 해당
JSON 형태로 데이터를 다룸

* RESTFul API
웹 기반 통신


### Elasticsearch 설치
실습 환경: Ubuntu 16.04

1. Java 설치

2. wget 명령어 입력
    ```shell script
    $ wget `elasticsearch경로` 
    ```
   
   위에서 elasticsearch의 경로는
   www.elastic.co 홈페이지에서 Elasticsearch(원하는 버전)의 DEB파일 링크 주소 복사
   같은 방법으로 Kibana, Filebeat, Logstash도 설치
   
3. dpkg 명령어를 통해 설치

    `ls` 명령어 로 프로그램들 다운로드 됐는지 확인
    ```shell script
    $ dpkg -i 'elasticsearch 파일명(다른 것도 동일한 방식으로 설치)'
    ```

**유의**
elasticsearch와 kibana등의 버전은 동일해야 함

4. 실행

    ```shell script
    $ sudo service elasticsearch start #elasticsearch 실행
   
   $ sudo netstat -antp | grep :9200 #elasticsearch 포트 열린 것 확인(실행되는데 시간이 좀 걸린다)
   #elasticsearch는 9200
   
   $ sudo service kibana start
   
   $ sudo netstat -antp | grep :5601
   #kibana는 5601
    ```

> * netstat 명령어
> 리눅스의 네트워크 연결 목록(TCP, UDP, 소켓 연결 등)을 보여주는 명령어. 현재 열려있는 포트를 사용중인 프로세스도 확인 가능
> a 옵션: (all) 모든 네트워크 상태 출력 / -n 옵션: 도메인 주소를 숫자로 출력 / -t: (TCP) TCP 프로토콜만 출력 / -p: PID(Process ID)와 사용중인 프로그램명 출력
> 

> * 포트(port)
> 네트워크 서비스의 논리적인 출입구를 의미. 서버는 네트워크 서비스의 포트(목적지 포트)를 열어 놓고 클라이언트의 요청을 대기하고, 클라이언트도 포트(출발지 포트)를 통해 서버에 네트워크 서비스를 요청. 모든 컴퓨터에는 사용가능한 65,356개의 포트가 있고 이 중 몇몇 중요한 포트는 예약되어 있음. TCP/IP 네트워크에서 http 프로토콜은 80, telnet은 23, ftp는 21을 표준 포트로 사용함.


5. 브라우저에서 elasticsearch와 kibana 확인

Firefox 주소창에 다음 주소들을 입력해 확인

* Elasticsearch
127.0.0.1:9200
-> Raw Data 결과가 나오면 성공

* Kibana
127.0.0.1:5601
-> Kibana 대시보드가 나오면 잘 실행된 것


## Reference
* [Elasticsearch 공부](https://victorydntmd.tistory.com/308?category=742451)
