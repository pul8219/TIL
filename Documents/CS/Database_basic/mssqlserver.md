# SQL Server

관계형 데이터베이스를 관리하는 시스템을 의미하며 RDBMS라고도 한다. 마이크로소프트사에 의해 개발되었다.

SQL Server는 2개의 메인 컴포넌트로 구성되어있다.

1. Database Engine
1. SQLOS

## SQL Server Architecture

![image](https://user-images.githubusercontent.com/33214449/92401720-30c07200-f169-11ea-9785-0fef9301934e.png)

## 1. Database Engine

1. Query Processor(Relational Engine)

쿼리를 실행하는 가장 적합한 방법을 결정

input query를 가지고 있는 Storage Engine에 데이터를 요청하고 결과값을 처리한다.

2. Storage Engine

## 2. SQLOS

Relational Engine과 Storage Engine 아래엔 SQL Server Operating System(SQLOS)이 돌아가고 있다.

여타 OS처럼 메모리, I/O, 예외 처리, 동기화 등을 지원

# References

- <https://www.sqlservertutorial.net/>
