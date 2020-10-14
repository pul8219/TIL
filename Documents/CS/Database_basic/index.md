# Index

## Index 의 개념

데이터베이스에서 Index(색인)이란 테이블에서 조회 같은 동작을 빠르게 할 수 있도록 해주는 자료구조를 일컫는다.

Index를 활용해 자주 쓰이는 컬럼에 대한 Index Table을 만들면 데이터 쿼리의 성능을 향상시킬 수 있다.

💡 인덱스를 쓰지 않았을 때 full scan 으로 비용 많이 발생하는 것 sql문이나 상황으로 예시들어서 설명하기

- rowid(rid): 데이터가 삽입될 때 DB에서 자동으로 생성하는 값으로 해당 데이터 행의 고유한 주소값을 나타낸다.

- Index에 일반적으로 사용되는 구조는 B+ Tree 알고리즘이다.

## 클러스터형 인덱스와 비클러스터형 인덱스

인덱스는 파일 구조에 따라 클러스터형 인덱스(Clustered Index)와 비클러스터형 인덱스(Nonclustered Index)로 나뉠 수 있다.

### 클러스터형 인덱스

- 키 값을 중심으로 데이터 행들을 정렬된 구조로 저장

- 테이블에 한 개만 생성 가능, 지정한 열(Column)에 대해 자동으로 정렬된다.

- 행 데이터를 해당 열로 정렬한 후에 루트 페이지를 만든다.

- 클러스터형 인덱스는 루트 페이지와 리프 페이지로 구성되며 리프 페이지는 데이터 그 자체이다.

- 내부적으로 대부분 B+트리 구조로 구현되어있다.(검색, 삽입, 수정, 삭제에 용이) 인덱스페이지의 리프페이지가 곧 데이터페이지이다.(인덱스에 데이터가 포함되어있다고 볼 수 있다.)

- 기본키를 지정하여 테이블을 생성하게되면 sql server는 자동으로 기본키에 포함된 열(column)을 바탕으로 클러스터형 인덱스를 생성한다.

이미 클러스터형 인덱스를 가지고 있는 테이블에 기본키를 추가할 경우, 이는 (강제로) 비클러스터형 인덱스를 이용한 키로 생성된다.

기본키 없이 테이블을 생성하는 경우는 매우 드물지만 이렇게 생성할 경우 create clustered index 구문을 이용하여 클러스터형 인덱스를 테이블에 정의할 수 있다.

TODO 어떤 컬럼을 기준으로 해서 클러스터형 인덱스 만들면 select \* from table_name where column조건문
쿼리 날린다고 할 때
리프에는 해당 컬럼의 데이터만 있는 거 아닌가?
나머지 컬럼들은 어떤 방식으로 스캔하는 건지 궁금하다

### 비클러스터형 인덱스

- 테이블에 여러 개의 비클러스터형 인덱스를 생성할 수 있다. 클러스터형 인덱스처럼 자동 정렬되지 않는다.

## B+ Tree

## 파일 구조

### Heap files

힙 파일.

- 레코드 순서에 상관없이 저장 (이해 필요)

- 레코드가 삽입될 때 파일의 끝에 삽입된다. 삽입시 레코드에 대한 정렬이 필요치 않다.

- 가장 단순한 파일 구조

- 쿼리에서 모든 레코드를 참조하고 레코드들을 접근하는 순서가 중요하지 않을 때 사용하는 것이 효율적

## MSSQL 내용

Primary Key 없이 테이블을 생성할 경우 데이터 행(row)들은 정렬되지 않은 구조인 힙(heap) 구조로 저장된다.

# References

- 위키백과

https://brunch.co.kr/@skeks463/25

https://itholic.github.io/database-index/

https://middleware.tistory.com/entry/%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B5%AC%EC%A1%B0-%EB%B0%8F-%ED%8C%8C%EC%9D%BC-%EA%B5%AC%EC%A1%B0

https://www.javatpoint.com/dbms-heap-file-organization

https://mongyang.tistory.com/75

https://swconsulting.tistory.com/381

https://12bme.tistory.com/149?category=682920

mssql 관련 공식 튜토리얼 사이트인데 여기의 클러스터형 인덱스, 비클러스터형 인덱스 내용이 이해하는데 도움이 되었다.
https://www.sqlservertutorial.net/sql-server-indexes/sql-server-clustered-indexes/

https://m.blog.naver.com/PostView.nhn?blogId=merds&logNo=150010445427&proxyReferer=https:%2F%2Fwww.google.com%2F

http://www.sqler.com/bColumn/873830
