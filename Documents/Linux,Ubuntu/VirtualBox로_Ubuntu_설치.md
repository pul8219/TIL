## VirtualBox로 Ubuntu 설치

## VirtualBox 설치

#### 1. Virtual Box 다운로드 및 실행
자신이 쓰는 운영체제에 맞게 VirtualBox 파일 다운로드 및 설치

<https://www.virtualbox.org/wiki/Downloads>


#### 2. '가상머신 만들기' 과정 진행


* 메모리 크기: 보통 2048MB (고성능 작업 필요한 경우 4GB로 수정)


* 하드 디스크 파일 종류
VDI(VirtualBox 디스크 이미지) 선택


* 물리적 하드 드라이브에 저장
`동적 할당` (SSD 크기 부족할 경우)
or
`고정 크기`


* 파일 위치 및 크기

파일 위치 지정
새 가상 하드 디스크 크기 지정


#### 3. Ubuntu 이미지 넣기
VirtualBox > 설정 > 저장소 > 컨트롤러:IDE 디스크 모양 > 가상 광학 디스크 선택/만들기 > 다운로드 받은 Ubuntu 이미지 파일 선택 > 확인

* Ubuntu에서 툴바가 보이지 않는 경우
VirtualBox 관리자에서 파일 > 환경 설정 > 입력 > 가상 머신 탭 > 호스트 키 조합 > 다른 키로 변경
Ubuntu 창에서 다른 키 + C



https://extrememanual.net/7223
https://ndb796.tistory.com/370
https://kkensu.tistory.com/42
http://egloos.zum.com/embedded21/v/1858305
https://temp123.tistory.com/15
https://wodonggun.github.io/wodonggun.github.io/linux/VirtualBox-%EC%9A%B0%EB%B6%84%ED%88%AC-%EC%84%A4%EC%B9%98.html
