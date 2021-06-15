[문서 목록으로 돌아가기](README.md)

> # STEP 39
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 39 [코드스피츠76 CSS Rendering - 2회차](https://www.youtube.com/watch?v=NFvSbFJmoWo&t=1658s) 포지션 모델(28분~)
> - 기한: 05/29(토) ~ 06/01(화)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

# POSITION

- 우리는 CSS를 그릴 때 <u>(30, 5)에 그려라</u> 라고 하는 게 아니라 <u>left, rigth에 그려라, float으로 그려라</u> 같은 추상적인 명령을 사용한다.
- 이렇게 추상적으로 명령을 내리더라도 geometry를 계산이 끝나고나면 fixed number로 바뀐다.(고정된 숫자)
- 이런 숫자들을 `offset`이라 부른다.(고유명사이다. CS에서 보통 얘기하는 offset과 다른 의미 - 기준점으로부터 얼마나 떨어져있는지를 나타내는 -)
- `offset`은 변경 불가한 읽기전용속성이다. (이미 계산이 끝난 후의 결과값이기 때문)
- 우리는 희망사항을 요청하는 것이고 실제 그림을 그리는 건 브라우저가 한다. (구형 ie6에는 float을 주면 무조건 padding을 3을 주는 버그가 있었다. 우리는 그 3을 예상치 못했겠지만 offset을 조사해보면 그 3이 포함되어있었을 것)
- 이로 인해 여러 이슈가 발생한다. 브라우저는 geometry 계산을 효율적으로 하려고 한다. 예를 들어 어떤 두 박스가 있다고 하자. 각각 박스의 크기가 조정되면 전체 요소들의 계산도 다시 이루어져야 한다고 할 때 이 작업을 각각 따로하면 오래걸릴 것이다. 브라우저는 이를 모아 한번에 처리하려고한다. 한번에 묶는 이런 단위를 `Frame`이라고 한다. Frame 단위로 재계산을 한번만 하려고 한다. 그런데 이때 우리가 어떤 엘리먼트의 offset을 요청하게되면 어떻게 될까? 브라우저는 offset을 알려주기 위해 즉시 재계산을 해야한다. offset을 웬만하면 요청하지 않는 것이 좋다. offset을 사용해도 괜찮은 경우는 계산이 모두 끝났을 때(geometry 변화가 없을 때)이다. 큐에 쌓인 것이 없기 때문에 offset을 불러도 재계산을 안 한다. 그런데 예를 들어 js에서든 어디에서든 layout을 그리기 위해 offset을 받아 이걸 베이스로 다시 layout을 그리려 하면 큐에 계속 쌓이고, 계속 재계산하게 되고 한 프레임을 그릴 때 전체계산을 몇번씩 하게 되어 엄청나게 느려진다.

## OFFSET PARENT

- OFFSET PARENT는 **기준점**이다.
- 예를 들어, left: 100을 주는 것은 기준점으로부터 그리라는 것이다.
- DOM 상의 PARENT가 항상 OFFSET PARENT인건 아니다. (STATIC, RELATIVE에서도 마찬가지다. 저번 STEP38에서 인라인 요소인 SPAN 안에 블록이 들어있는 걸 봤다. 이럴 땐 BFC의 OFFSET PARENT를 계산할 때 그 바깥쪽에 있는 친구 기준으로 계산하거나 인라인 요소를 강제로 끊어내 위치를 계산한다.)

### OFFSET PARENT = NULL인 경우

- ROOT, HTML, BODY 요소일 때
- POSITION:FIXED인 경우(엔 내 위에 OFFSET PARENT는 없는 것. 그럼 무엇을 기준으로 그리나? 브라우저의 바운드 박스를 기준으로 그린다.)
- OUT OF DOM TREE(REMOVE CHILD해서 DOM TREE에서 빼버리는 경우 등. createElement로 엘리먼트를 만든 경우도 offset parent는 존재하지 않는다. 이를 append해서 dom tree에 포함시켜야만 offset parent가 생겨난다.)

### OFFSET PARENT를 찾는 방법 RECURSIVE SEARCH

어떤 엘리먼트로 부터 offset parent를 찾는 방법은 재귀적으로 이루어진다.

- PARENT.POSITION:FIXED이면 = NULL (나도 내 부모도 OFFSET PARENT가 NULL이다.)
- PARENT.POSITION:!STATIC = OK(OK의 의미는 부모 위치를 계속 찾아간다는 뜻이다.)
  - 부모를 찾아 계속 올라감. 예를 들어 POSITION:ABSOLUTE일 때, 부모가 STATIC이면 이 부모는 OFFSET PARENT가 될 자격이 없는 것이다. 부모가 최소한 STATIC은 아니어야한다. 그럼 남은 경우는 ABSOLUTE, RELATIVE이다. (FIXED일 땐 NULL이 된다고 했으니) 결론적으로 ABSOLUTE 엘리먼트의 OFFSET PARENT가 될 수 있는 경우는 ABSOLUTE, RELATIVE밖에 없다.
- BODY = OK
- TD, TH, TABLE = OK
- PARENT.PARENT CONTINUE

내가 POSITION:ABSOLUTE면, 내가 그림을 그리는 위치의 기준점은 내 DOM 상의 부모가 아니라 내 부모, 조상들 중 POSITION: ABSOLUTE, RELATIVE인 요소라는 것🌟

ABSOLUTE는 위치를 지정해줘야한다. RELATIVE는 STATIC의 위치로 정해진다. 종종 STATIC으로 흘러가는 흐름속에 어떤 공간안에만 ABSOLUTE를 쓰고 싶은 경우가 있다. 이럴 때 이 공간을 RELATIVE로 만들어주면 이 안에 POSITION:ABSOLUTE인 친구들을 막 집어넣을 수 있다.(뚫고 나가지 않음) RELATIVE의 역할이 STATIC의 위치를 조정하는 데 쓴다기 보다는 이처럼 STATIC안에 ABSOLUTE를 넣기 위한 컨테이너로 사용하는 경우가 많다. -> 이 내용은 하단의 [RELATIVE BRIDGE 예제](#relative-bridge-예제) 참고

## OFFSET VALUE

브라우저가 실제로 계산한 다양한 OFFSET 값을(읽기전용, 쓰지는 못하고) 참조할 수 있다.

offset parent로부터 얼만큼 떨어져있는지, 실제 확보한 geometry 크기는 얼마인지(offsetWidth, offsetHeight를 통해) 알 수 있다.

- offsetLeft
- offsetTop
- offsetWidth
- offsetHeight

실제로 그린 후에 스크롤영역이 생겼을 때, 스크롤의 위치는 어디고 스크롤된 전체 크기는 얼마인지 아래 속성들로 알 수 있다.

- offsetScrollTop
- offsetScrollLeft
- offsetScrollWidth
- offsetScrollHeight

html에서는 스크롤이 내장되어있어 overflow만 주면 스크롤 박스가 생긴다.
스크롤 박스를 생각해보면, 원래 컨텐츠는 정말 큰 녀석인데 좁은 데 갇혀 스크롤바가 생긴 것이다. 그래서 사실 진짜 컨텐츠의 크기는 `offsetScrollWidth`, `offsetScrollHeight` 크기이다. 실제론 이 크기의 컨텐츠가 보이는 영역인 `offsetWidth`, `offsetHeight` 크기에 갇혀있는 것이다.

![](https://images.velog.io/images/pul8219/post/0714566a-726a-4ab6-9c1a-af5da731d319/image.png)

- offsetParent를 기준으로 그려졌다. 사진에 보이는 컨텐츠가 absolute였으면 offsetParent는 absolute이거나 relative일 것이다.
- offsetWidth, offsetHeight는 그려진 영역의 width, height를 나타낸다.
- 사진엔 나와있지 않지만 실제 컨텐츠 크기가 그려진 영역보다 컸을텐데 이 값은 offsetScrollWidth, offsetScrollHeight에 담겨있을 것이고 현재 스크롤이 어딘지는 offsetScrollTop, offsetScrollLeft에 담겨있을 것이다.
- offset 관련 속성값은 위에서 언급했듯이 **변경할 수 없다.** 예를 들어 스크롤바의 화살표를 누를 때 offsetHeight만큼 스크롤을 (한페이지씩) 이동시키고 싶다고 해보자. offset 속성값은 읽기전용, 즉 `offsetScrollTop`의 값을 바꿀 수 없기 때문에 `scrollTo`라는 메소드를 사용해야한다.

---

```html
<div style="width:200px;height:200px;background:yellow;margin:100px">
  <div style="width:100px;height:100px;position:absolute;background:red"></div>
  <div
    style="width:100px;height:100px;position:absolute;background:blue;left:0"
  ></div>
</div>
```

위 예제 실행 결과

![](https://images.velog.io/images/pul8219/post/4b62ef1d-683d-41f4-ac6c-a0408a31b220/image.png)

위 예제에서 파랑박스에 top:0 도 준 경우

![](https://images.velog.io/images/pul8219/post/23f6fc3f-6e14-4142-9f40-76c0566b57d1/image.png)

1. 빨강 박스

- 빨강 박스가 노랑 박스를 마치 offset parent로 본 것처럼 출력되었다.(노랑 div에 a를 쓰면 출력될 것 같은 - 왼쪽 위 - 위치에 출력되었음)

2. 파랑 박스

- left를 준 파랑 박스는 노랑 박스를 빠져나갔다.
- 노랑 박스는 static 요소이므로 absolute인 빨강 박스의 offset parent가 될 자격이 없다. 그래서 이와 무관하게 파랑 박스가 빠져나간 것이다. body가 파랑박스의 offset parent일 것이다.
- offset parent 기준으로 left:0을 주었다. 다만 top값은 주지 않았기 때문에 노랑박스에 마치 static이 그려졌을 때처럼 top을 유지하고 있다.

position:absolute를 준 빨강 박스가 static처럼 그려지는 것에는 이유가 있다.

- absolute에서 left, top을 주지 않았을 때 기본값이 offset parent의 (0, 0)일 것이란 생각을 버려라
- position:absolute 인 요소의 기본값은 offset parent와 무관하게 DOM상 부모의 기본값을 갖는다.
- left, top을 주면 그때부턴 static 부모를 바라보지 않고, offset parent를 찾아 이 기준으로 그림을 그리기 시작한다.
- 단 위 예제에서 파랑 박스에 top값은 주지 않았으니 DOM상 부모의 top을 기준으로 그림이 그려진 것이다.

static에 left, top을 주면 어떻게 될까?

- static은 자신의 부모를 계산할 때 normal flow 시스템으로 그린다.
- 따라서 left, top, bottom, right을 주면 무시한다.

left, top이 계산되는 방식

- static일 때: 무시
- absolute일 때: offset parent로부터의 거리
- relative일 때: normal flow로 그려졌을 때로부터의 차이값

ex) position:absolute일 때 float을 주면 어떻게 되나?

- float는 normal flow일 때만 성립한다. 왜? 새로운 BFC 영역을 만들어야하기 때문에
- 따라서 position:absolute를 주는 순간 float는 무의미해진다.

## RELATIVE BRIDGE 예제

```html
<style>
  .in {
    width: 100px;
    height: 100px;
    border: 1px dashed black;
    display: inline-block;
  }
  .abs {
    position: absolute;
    width: 50px;
    height: 50px;
    background: red;
    left: 40px;
    top: 40px;
  }
  .rel {
    position: relative;
  }
</style>
<body>
  <div class="in"></div>
  <div class="in"></div>
  <div class="in"></div>
  <div class="in rel"><div class="abs"></div></div>
  <div class="in"></div>
  <div class="in"></div>
  <div class="in"></div>
  <div class="in rel"><div class="abs"></div></div>
  <div class="in"></div>
  <div class="in"></div>
  <div class="in rel"><div class="abs"></div></div>
  <div class="in"></div>
</body>
```

inline-block 요소들을 여러개 준 상태에서 브라우저 창을 늘였다 줄였다 해보면 자연스럽게 블록들이 올라갔다 내려갔다 하는 걸 볼 수 있다.(컨텐츠가 많으면 알아서 줄바꿈 되고 알아서 그려지고~) 이는 normal flow로 동작하고 있기 때문이다. (ifc 계산) inline-block은, inline이지만 block처럼 박스모델을 소유할 수 있게 만든 것이다.

그런데 이 inline-block들 중 특정 박스 안에 박스를 그리고 싶다면?

position:absolute인 div를 inline-block들 안에 끼워넣는다. 하지만 이렇게만 하면 우리가 원하는대로 그림이 그려지지 않는다. 왜? `in` class를 준 inline-block들은 position:absolute인 박스 입장에선 힘없는 static이다. absolute 박스들에 top, left를 주는 순간 offset parent를 찾는데 이때 offset parent는 body가 되어버린다.

그렇다면 우리가 원하는대로 그리기 위해서는,

박스를 넣고 싶은 박스에 relative 속성을 주면 된다.
이렇듯 static 안에 absolute가 공생할 수 있는 방법은 relative를 쓰는 것이다.

![](https://images.velog.io/images/pul8219/post/cb48a955-0e69-40f0-a105-991c0f4ac37d/image.png)

추가로 [offset parent - recursive search](#offset-parent를-찾는-방법-recursive-search) 에서 td, th, table도 ok라고 되어있는 부분을 주목해보자. 이 스펙만 보면 마치 body에서 offset을 계산하는 것처럼 td 안에 집어넣기만 해도 td를 기준으로 위치를 계산해줄 것 같다. 하지만 직접 해보면 안 된다. (스펙은 이렇게 되어있지만..) td안에 다시 div(relative)로 감싸줘야 offset으로 계산된다.

💡 display모델 공부하기 (고전 display모델, 모던 display모델 있음. flex/grid box는 display로 빠짐)

# Comment

# References

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step39.md)
- [@eyabc](https://eyabc.github.io/docs/css/css-rendering/position_model_offset)
- [@khw970421](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-css-rendering-2%ED%9A%8C%EC%B0%A8-part2-step-38)
