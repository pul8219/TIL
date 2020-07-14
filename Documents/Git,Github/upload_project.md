## Git / Github에 프로젝트 올리기

### Git 설치

Git 다운로드: [https://git-scm.com/](https://git-scm.com/)

(Mac, Windows, Linux/Unix 모두 지원)

## 1\. 기존 프로젝트나 디렉토리를 Git 저장소로 업로드 하는 방법

### Github에서 Repository 생성

Github(깃허브): [https://github.com/](https://github.com/)

-   Github 회원가입(Sign Up)
    
-   새로운 Repository 생성: _Repositories > New(초록색 버튼)_
    
    -   README.md: README.md 파일은 프로젝트의 소개 및 설명, License, 설치법 등과 같은 내용을 담을 수 있는 파일이다. 생성된 Repository로 들어가면 README.md 파일의 내용이 가장 먼저 보인다.(메인 페이지 역할) 마크다운 방식으로 작성해야 한다. `Intialize this repository with a README` 항목에 체크하면 자동으로 README.md 파일을 만들어준다. 직접 만들거라면 체크를 해제해도 된다.
        -   README.md 안에 포함하는 항목 예시: 프로젝트명, 프로젝트 목표, 설치 안내(Installation), 사용법(Getting Started), 파일 정보 및 목록, 저작권(Copyright), License, ...

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fcc1rIP%2FbtqBoalOKBJ%2FZh8t8cT8kVOy0dKGpxs2a1%2Fimg.jpg)

-   저장소의 링크 복사
    -   아래 사진에서 빨간 박스 안에 있는 부분을 복사 ([원격 저장소 연결](#remoteRepo) 과정에서 사용할 것)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FvHMQl%2FbtqBjWpfbBi%2FF8JZSS4AMcLRlm8s5bkWzk%2Fimg.jpg)

### 로컬 저장소 생성

(원격 저장소에 업로드 하고 싶은) 실제 프로젝트가 있는 곳에 git 로컬 저장소를 생성할 것이다.

Git CLI(Command Line Interface)를 이용할 것이다. (CLI는 Windows 운영체제에서의 CMD, Mac OS나 Linux 운영체제에서의 Terminal 등에서 명령어를 통해 사용자와 컴퓨터가 상호작용하는 방식을 뜻함. ) Github Desktop, SourceTree 등의 GUI(Graphic User Interface)를 사용할 수도 있지만 Git은 사용할거라면 나중에라도 CLI 방식은 익혀놓는게 좋고 CLI를 먼저 접하고 GUI를 사용하는 것이 훨씬 이해가 쉽기 때문에 CLI 방식을 공부하는 것을 추천한다. (필자의 케이스, Git을 GUI로 무작정 맞닥뜨리고 Git 공부도 애매하게 해서 아직 Git에 대해 상당히 무지하다)

-   업로드하고자 하는 프로젝트 폴더 내에서 오른쪽 마우스 클릭 > git bash Here 실행
    -   다른 위치에서 git bash 실행할 경우, 명령어를 사용하여 프로젝트 폴더까지 디렉토리 이동 필요

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FyIXEe%2FbtqBkp5Cq7A%2FgfgyH9ZL2c0EmJM5KPxq41%2Fimg.jpg)

-   name, email 설정
    -   Git 설치 후 **처음 1번만** 해주면 된다.
    -   아래 명령어를 (본인의 계정 정보를 기반으로 수정하여) git bash에 한 줄씩 입력 > Enter

```shell
git config --global user.name "본인의 Github계정 이름"
git config --global user.email "본인의 email"
```

-   로컬 저장소 생성(Create Local Repository)

```shell
git init
```

-   모든 파일을 Commit 전에 **준비된 상태(staged state)**로 만들기 위한 명령 실행

```shell
git add .
```

-   현 상태 확인
    -   파일들이 준비된 상태(staged state)인지 준비되지 않은 상태(unstaged state)인지 알려준다.
    -   어떤 파일이 수정됐는지 등의 정보를 알려준다.

```shell
git status
```

-   준비된 파일들을 한 덩어리로 만드는 작업 **Commit(커밋)**
    -   Commit 메세지 내용은 추가하는 파일 또는 프로젝트의 변경 사항 내용을 간결하게 나타낼 수 있도록 작성
    -   \-m 옵션은 간단하게 한 줄로 메세지를 작성하기 위함. 긴 메세지를 작성하고 싶은 경우 이 옵션을 제거.
    -   Commit까지는 원격 저장소에 올라간 상태가 아니다. 여기까지는 아직 사용자의 로컬 저장소에만 반영되어있는 상태이다.

```shell
git commit -m "commit 메세지 내용"
```

### 원격 저장소와 연결 및 원격 저장소로 push

-   원격 저장소(Remote Repository)와 연결
    -   **origin** 은 원격 저장소 주소의 일명 '별칭'을 정한 것이다.
    -   아래 명령 중 주소는 아까 위에서 복사한 \_원격 저장소의 주소\_를 이용하여 입력하면 된다.
    -   지금까지의 과정 중 Github 로그인창이 떴다면 가입한 Github 계정으로 로그인하자

```shell
git remote add origin https://github.com/Github_ID/Repository_Name.git
```

-   원격 저장소에 커밋된 상태를 **push** 하기
    -   최종적으로 Github의 원격저장소에 Commit 덩어리를 업로드 하는 과정
    -   git push {원격 저장소명(별칭)} {브랜치명}
    -   아래 명령을 실행한 후 Github 원격 저장소를 확인해보면 프로젝트가 업로드된 것을 볼 수 있다.

```shell
git push origin master
```

## 2.원격 저장소에 이미 존재하는 프로젝트를 로컬로 가져오고 싶은 경우(프로젝트 참여 or 복사)

-   마찬가지로 Github에서 새로운 Repository 생성 후 원격 저장소 주소 복사
-   원격저장소에 있는 프로젝트를 저장하고자 하는 PC의 특정 폴더 내에서 git bash 실행
-   다음 명령 실행
    -   {원격 저장소 주소} 에는 방금 복사한 원격 저장소의 주소 넣기

```shell
git clone {원격 저장소 주소}
```