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
우분투 설치
<https://somjang.tistory.com/entry/UbuntuWindows%EC%97%90%EC%84%9C-Oracle-Virtual-Box%EC%97%90-%EC%9A%B0%EB%B6%84%ED%88%AC-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0-Ubuntu-18043-LTS?category=348811>

#### 환경설정 요약

- 우분투 환경설정

    - 한글 설정(우분투 16.04는 fcitx?로 해결, 이상 버전은 iBus)
  
    ```
  언어팩 다운로드 느릴 때
  rm /var/lib/dpkg/lock
  sudo dpkg --configure -a
  (apt-get 안되는 문제도 이걸로 해결했었음)
  
    ```
  우분투 16.04 한글 설치&설정
      <https://snowdeer.github.io/linux/2018/01/21/ubuntu-16p04-install-korean-keyboard/>
      `Keyboard input method system` 항목을 `fcitx`로 변경한 후 재부팅 필수
      fcitx configuration에서 korean 104 compatible은 지워주면 한글로 전환이 간단해짐
  
    - 해상도 변경
    갑자기 해상도 바꾸면 화면이 이상해져서 다음 링크를 참고하여 해결했다.
    <https://gdpark.tistory.com/151>
    
    그냥 바꿔도 될 경우는 1920x1200 이런걸로 바꿔도 된다.
    
    - 자바 설치(필수)
    - vim 설치 `sudo apt install vim`
    - 클립보드 양방향 설정
    - elasticsearch 설정 + 외부 접속 설정(엘라스틱서치, 키바나)
    
    ```shell script
    # firewall-cmd 명령어 실행 위해 설치
    sudo apt install firewalld 

    # elasticsearch의 경우 port 9200을 허용해야함
    firewall-cmd --permanent --zone=public --add-port=9200/tcp
    firewall-cmd --reload
    firewall-cmd --list-ports
  
    # /etc/elasticsearch/elasticsearch.yml 파일 변경
    network.host: 0.0.0.0
    node.name: node-1
  discovery.initial_master_nodes: ["127.0.0.1"]
  cluster.initial_master_nodes: ["node-1"]
  
  # 그리고 가상머신 설정에서 포트 포워딩
  
  # elasticsearch 재시작
  
  # kibana의 경우 port 5601을 허용해야함
      firewall-cmd --permanent --zone=public --add-port=5601/tcp
      firewall-cmd --reload
      firewall-cmd --list-ports
  
  # /etc/kibana/kibana.yml
  server.port: 5601
  server.host: "0.0.0.0"
  
  # kibana 재시작
  
    
    ```
  
    방화벽 열기 <https://msyu1207.tistory.com/entry/Elasticsearch-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%99%B8%EB%B6%80-%ED%97%88%EC%9A%A9>
    
    
- ELK 환경설정
    - 윈도우 호스트에서도 elk 접근할 수 있도록 네트워크 설정 + 설정파일 변경
    -
    -
    - 로그스태시 실습 의 웹서비스 연동 때 파일비트 설정파일 변경한 것


#### trello에서 긁어온 내용

- 멘토님이 우분투환경에서 ELK를 쉽게 사용할 수 있도록 환경설정 도와주심

    * 우분투를 실행할 때 elasticsearch, kibana 등도 자동으로 실행되도록 설정 변경
`sudo systemctl enable elasticsearch` `sudo systemctl enable kibana`

    ELK가 설치된 환경(ex.우분투 환경) 외부에서 실습도 하고 elasticsearch, kibana 등에 접근할 수 있도록 네트워크 환경 설정 (외부 접속 허용하기 위한 보안 설정) **AWS 클라우드 환경에서는 설정파일 이렇게 바꾸면 안됨!!! 큰일나유**

1. VM 설정 > `네트워크` > `고급` > `포트 포워딩` 항목 추가
이거 하면 /etc/elasticsearch가 접근이 안됨 왜 그러지

2. 터미널에서 `vim` 설치 후 (`sudo apt install vim`) `sudo vi /etc/elasticsearch/config/elasticsearch.yml` (elasticsearch.yml이라는 설정 파일의 내용을 변경하기 위함)
같은 방법으로

`sudo vi /etc/kibana/config/kibana.yml` 설정파일도 내용 변경

 ```
# /etc/elasticsearch/elasticsearch.yml
# 아래의 내용을 (적절한 곳에)추가
network.host: 0.0.0.0 # 모두로부터 접근 허용한다는 의미
node.name: node-1
discovery.seed_hosts: ["127.0.0.1"]
cluster.initial_master_nodes: ["127.0.0.1"]

# /etc/kibana/config/kibana.yml
server.host: 0.0.0.0 # 모두로부터 접근 허용한다는 의미
```

<기타 명령어>

```
sudo systemctl status elasticsearch # elasticsearch 상태 확인
sudo systemctl status kibana # kibana 상태 확인
sudo netstat -antp # 포트 상태 확인
sudo gedit /etc/elasticsearch/elasticsearch.yml # vim 안 깔려있을 때 에디터 실행 방법
```




1. Java 설치

`sudo apt install oracle-java8-installer`
위 명령어는 Oracle의 자바 라이선스 정책 변경으로 인해 동작하지 않는다

`sudo apt-get install openjdk-8-jdk`

`java -version` 으로 잘 설치됐는지 확인

ubuntu_test_reset 우분투에 깔린 자바 버전: java 1.8.0_252


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
   
   /etc/elasticsearch/ 접근 불가능할시 `sudo -i` 하고 루트권한으로 접근하기

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

* 인프런 강의 'IT인을 위한 ELK 통합로그시스템 구축과 활용'
