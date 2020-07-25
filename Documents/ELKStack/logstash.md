# Logstash

## 로그스태시, 파일비트 개요

로그스태시
오픈 소스 서버측 데이터 처리로 파이프라인 역할
입력-필터-출력으로 이루어짐

입력
모든 소스, 사이즈 및 형태의 데이터 수집
(로그, 메트릭, 웹 어플리케이션, 데이터 저장소, 다양한 AWS 서비스)

필터
데이터 이동 중 구문 분석 및 변환
GROK 나열 , 비정형데이터에서 구조를 도출한다
GEO IP 지도 그릴 수 있는 IP 기반 좌표
FINGERPRINT
DATE 로그가 찍힌 시간이 안적혀있는 소스들도 있음. 이런것에 시간 지정 가능
데이터들이 생긴 그대로 엘라스틱서치로 올라가기엔 한계가 있음. 이를 보완하기 위해서 여러 필터가 존재

출력
엘라스틱 서치가 될 수도 있고, 메일로 알림을 줄 수도 있고, 데이터베이스가 될 수도 있음
다양한 곳에 저장 가능

file
geoip
stdout
elasticsearch
등의 플러그인을 사용하여 설정해야함(json파일에)

### 로그스태시의 플러그인

#### Input
file 로그들을 출력해주고 끝나지 않고 발생하면 엘라스틱서치에 넘기고
syslog 메시지 구문 분석
redis 데이터베이스. redis 서버에서 읽음
beat filebeat에서 보낸 이벤트를 처리 (파일 비트는 알려진 파일의 형태에 대해서는 스스로 그 형식을 분석하고 읽어들일 수 있는 기능을 가지고 있음)

#### Filter
grok
mutate 일반적인 변환. 데이터 수정 및 제거
drop 이벤트 완전 삭제
clone 이벤트 복사(2개 이상의 필드에 포함시키고 싶을 때)
geoip ip주소의 지리적 위치에 대한 정보를 추가(ip주면 위도 경도줌. kibana의 지도 차트로 사용)

#### Output
elasticsearch에 데이터 전송 - http프로토콜 사용
file 디스크의 파일로 저장
graphite 이벤트 데이터를 graphite 애플리케이션에 저장
statsd 집계 역할 하는 애플리케이션에 보낼 수 있음

#### Codec
json
multiline

### 파일비트
로그와 파일을 경량화된 방식으로 전달하고 중앙 집중화하여 작업을 간편하게 유지해줌
로그스태시의 어려운 점들을 간편하게 할 수 있게 도와주는 역할


## 실습

### 로그스태시와 파일비트 설치
sudo dpkg -i logstash파일명
sudo dpkg -i filebeat파일명

설정 파일(.yml)이 있는 곳
/etc/logstash
/etc/filebeat

cd /usr/share/logstash/bin
sudo ./logstash -e "input {stdin {}} output {stdout {}}" //로그스태시 실행(stdin 입력을 키보드로 주겠다는 것.)

cd /etc/filebeat
sudo gedit filebeat.yml // 파일비트 설정파일 편집

```
- type: //이런식으로 여러개 타입 지정할 수 있음
enabled: //동작시키겠다는것 -> true로 바꿔주기
paths: //어떤 로그를 긁어오는건지 (샘플에서는 /var/log/*.log 에서 로그를 가져옴)

Elasticsearch output 부분
엘라스틱서치로 직접 출력하겠다는것 -> 직접 출력안할것이니 output.elasticsearch: 와 hosts 주석처리하기

Logstash output 부분
output.logstash:
hosts:
주석 해제하기

``` 

cd /etc/logstash
//conf.d 디렉토리에 샘플 conf파일 복사
sudo cp logstash-sample.conf ./conf.d/first-pipeline.conf
//first-pipeline.conf 이건 우리가 지정한 파일명임
sudo gedit conf.d/first-pipeline.conf

지금까지 파일비트와 로그스태시 설정한 것 적용하기 위해서 elkstack 재실행
sudo service elasticsearch restart
sudo service kibana restart
sudo service logstash restart
sudo service filebeat restart

아마 파일비트 로드까지 좀 걸릴거임
localhost:9200/_cat/indices?v 로 파일비트 잘 올라갔는지 확인

키바나에서 인덱스 패턴 추가(filebeat)
discover에서 잘 올라갔는지 확인

이렇게 엘라스틱서치-키바나-로그스태시-파일비트를 연결해보았음

---

웹서비스 ELK 연동 실습과 시각화

sudo gedit /etc/hostname
ubuntu라고 hostname 하면 헷갈리니까 webserver이런식으로 바꾸기
이거했다가 오류나서 hostname 원래대로 바꿔주고 재시작하니 된다.

**webserver 우분투에서**

filebeat 다운로드
<https://www.elastic.co/downloads/beats/filebeat>

deb 64-bit 링크 주소 복사
wget 복사한 링크 (다운로드 절차)
sudo dpkg -i filebeat파일명(설치 절차)

sudo apt-get install apache2
(웹서버가 열려야하니깐)

sudo netstat -antp | grep :80
(apache 열렸는지 확인)
127.0.0.1:80 주소창에 쳐서 확인

/var/log/apache2
경로에 있는 로그들을 긁어올것->파일비트 설정에서 바꿔줘야함
(웹로그)

sudo gedit /etc/filebeat/filebeat.yml

```
enabled: true 로 변경
paths: - var/log/apache2/access.log (테스트 위함. 웹로그만 일단 다룸)

Outputs 쪽에
elasticsearch 부분 주석 처리

logstash 부분
output.elasticsearch 주석 해제
hosts: ["elasticsearch깔려있는게스트의ip:5045"] 주석해제 (원래 포트 5044인데 그냥 바꾼거래)

```


**elasticsearch 설치되어있는 우분투에**

/etc/logstash/conf.d 아래에
web.conf 파일을 만들어 아래 내용을 저장

```
input{
        beats{
                port => 5045 //아까 5045바꿨으니까
        }
}

filter{
        grok{
                match => { "message" => "%{COMBINEDAPACHELOG}" }
        }

        date{
                match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]
        }

        geoip {
                source => "clientip" 
        }

}

output{
        elasticsearch {
                host => [ "localhost:9200" ]
                index => "web-%{+YYYY.MM.dd}"
        }
}

```

sudo service logstash restart


**webserver 우분투에서**

sudo service filebeat restart

curl webserverIP주소 (해당 주소를 요청하는 것)
(curl이 없으면 `sudo apt-get install curl`로 설치)

while true; do curl webserverIP주소; sleep 1; done




각 우분투에서 ifconfig
-> ip주소 확인 가능


ip가 인식이 왜 안될까?
우분투 2개 하고나서 네트워크 거의 안건드렸는데
따로 설정이 필요한가보다.
고정아이피, 넷마스크 이런거 너무 어렵고 
어떻게 설정해야 게스트에서 다른 게스트 로 요청보낼 수 있는지 모르겠다.


---

우분투 설치
https://m.blog.naver.com/jaelong191/221058392209
https://m.blog.naver.com/wideeyed/220960764870
우분투 고정 ip 할당
https://m.blog.naver.com/wideeyed/220960764870


## Reference

* 인프런 강의 'IT인을 위한 ELK 통합로그시스템 구축과 활용'
