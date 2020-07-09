# Git 정리

* `git commit` 이라고 입력하면 nano에디터가 켜짐

nano에디터에서는 `Ctrl+X` -> `Y` -> `Enter` 순서로 눌러 저장 가능

* `git commit --amend`

커밋을 수정할 수 있음

ex) `git commit --amend -m "blah blah"` (-m 과 메시지를 붙이면 에디터를 켜지 않고 바로 수정이 가능)

* `git diff`: 커밋된 파일 중 변경된 사항 비교할 때
* `git log`: 저장소 반영 내역을 확인하는 명령어

    * 옵션

    `-p` 각 커밋의 수정 결과 보여주는 diff와 같은 역할

    `-n` 상위 n개의 커밋만 보여주는 옵션

    `--stat` 어떤 파일이 커밋에서 수정되고 변경되었는지, 파일 내 라인이 추가되거나 삭제되었는지 확인

    `--pretty=oneline` 각 커밋을 한 줄로 출력

    `--graph` 커밋간 연결된 관계를 아스키 그래프로 출력-> 나중에 브랜치 배우면 요긴하게 사용

    `-S` 텍스트 코드에서 추가되거나 제거된 내용 중 특정 텍스트가 포함되어 있는지 검사

    `-all`

** 커밋하면 파일의 상태가 (라이프사이클) `unmodified`로 된다는 것 꼭 기억하기 **

* `git reset HEAD README.txt` (README.TXT의 staging상태를 취소 - 다시 되돌리는 작업)


## 3장 가지치기

* 브랜치: 독립적으로 어떤 작업을 진행하기 위해 진행
 
* master branch 기본적으로 생성되는 디렉토리(안정된 상태여야함)

* 브랜치 생성

`git branch 브랜치명`

* 현재 브랜치 확인

`git branch`

* 브랜치 전환

`git checkout 브랜치명`

-> 해당 브랜치로 전환

예를 들어 현재 master 브랜치인데 git checkout like_feature 명령어로 브랜치를 전환하게 되면 HEAD 포인터가 like_feature를 가리키게됨(HEAD가 가리키는것이 현재 브랜치)

** checkout **

snapshot을 넘나들때도 사용 가능 -> 과거 파일 내용 확인 가능
git checkout <snapshot hash>
(16진수로 이루어진 hash 사용)


* fast-forward

git branch 전환하고 새로운 파일 생성, 커밋하면 새로운 체크포인트가 생기는 것

* merge(머지, 합병)

checkout으로 브랜치 이동후 현재 브랜치에 merge하고 싶은 브랜치를 `git merge 브랜치명` 으로 merge

(다른 것 변경 없이 새로운 내용만 추가되어) merge가 이루어지는 것을 fast-forward라고 함


fast-forward와 달리 갈라지는 branch
어떤 파일을 각 브랜치에서 동시에 수정한 경우


* 브랜치 삭제(더이상 필요없는 경우 삭제)

`git branch -d 브랜치명` 


* merge conflict

머지한 두 브랜치에서 같은 파일을 변경했을 때 충돌이 발생


**<충돌 해결>**
1. git status 명령어로 어느 파일에서 충돌이 발생했는지 확인

2. 충돌이 일어난 파일을 연다.
```
<<<<<<< HEAD
blahblah #HEAD 포인터에서 변경된 내용
=======
BLAH BLAH #아래 브랜치명에서 변경된 내용
>>>>>>> 브랜치명
```

3. 수정완료후 깃에서 포함시킨 <<< === 이런 기호 제거
4. 수정 완료 후 git add git commit 과정 거쳐 다시 merge하기

git merge 충돌을 해결하는 것도 중요하지만 방지하는 것도 중요
master Branch의 변화를 지속적으로 가져와서 충돌이 발생하는 부분을 제거하기!
but 제일 좋은건 마스터 브랜치가 자주 변경되는 일이 없도록 하는것 why? 마스터 브랜치는 배포가능한 수준의 안정된 버전을 가지고 있어야 하기 때문


**<충돌 해결 실습>**
elice branch와 madhatter branch가 동일한 파일을 변경하여 머지시 충돌이 난 경우임

현재 elice 브랜치에 있을 때, 충돌을 해결하고 elice, madhatter, master 브랜치를 모두 병합하기


해당 파일 수정 (crawling.py)
git add crawling.py
git commit -m "conflict solved"

git checkout madhatter
git merge elice

(-> elice와 madhatter가 병합됨)

git checkout master
git merge elice

(-> elice와 madhatter가 병합된 것이 master에 병합됨)



## 제4장 git 원격 저장소

* 원격저장소 받아오기

일반적인 과정

`git clone`

`git remote add origin 'git저장소주소'`

---

원격 저장소의 의미: 인터넷이나 네트워크 어딘가에 있는 저장소. github를 비롯한 gitlab등의 호스팅서비스

`git clone`: 기존의 git repository를 복사

`git remote add origin 'git저장소주소(웹호스트서비스/그룹명/프로젝트명)'`

`git remote`

---

* 연결된 원격 저장소 확인하는 방법

`git remote show origin`
원격 저장소 살펴보기

원격 저장소 이름 변경
`git remote rename origin 변경하고싶은이름 `

원격 저장소 삭제
`git remote rm 저장소이름`

* 원격 저장소 동기화

####저장소 갱신

`pull`: 원격 저장소에서 데이터 가져오기 + 자동으로 로컬데이터와 병합(merge)


`fetch`: 원격 저장소에서 데이터를 가져오기만 하는 것(병합은 별도로 해줘야 함)
fetch하고나서 git log origin/master 명령어로 변경된 파일을 확인하고 merge(git merge origin/master) 해줌

#### 저장소발행
로컬저장소에서 작업한 내용을 원격 저장소에 반영

`git push origin master` (master의 작업내용을 origin에 push하겠다!)
유의) 다른 사람이 먼저 push한 상태에서는 push할 수 없다.
다른 사람이 작업한 것을 merge부터 해주기!

* origin이란?

`git remote add origin 'git저장소주소(웹호스트서비스/그룹명/프로젝트명)'`

여기에서 `origin`은 원격저장소의 단축이름을 지정한 것

origin아닌 다른 이름으로 지정도 가능

origin이 디폴트 값

`git remote -v`
지정한 저장소의 이름과 주소를 함께 볼 수 있음




