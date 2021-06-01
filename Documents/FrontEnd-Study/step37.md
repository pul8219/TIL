[문서 목록으로 돌아가기](README.md)

> # STEP 37
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 37 [코드스피츠76 CSS Rendering - 1회차 2/2](https://www.youtube.com/watch?v=_o1zsrBkZyg)
> - 기한: 05/15(토) ~ 05/18(화)

# 보충 필요

# 목차

- [FLOAT](#float)

# FLOAT

left | right | none | inherit

- NEW BFC: 새로운 BFC를 형성한다.
- FLOAT OVER NORMAL FLOW: NORMAL FLOW 위에 그려진다.
- TEXT, INLINE GUARD
- `LINE BOX`
  - FLOAT는 BFC, IFC등의 공식으로 그려지지 않고, `LINE BOX`라는 공식으로 그림이 그려진다. (참고 - 저번 시간에 배웠듯 `NORMAL FLOW`는 BFC, IFC, relative position 원리로 그려진다.)

## 예제1: NEW BFC + FLOAT

```html
<div style="width:500px">
  <div style="height:50px;background:red"></div>
  <div
    style="width:200px;height:150px;float:left;background:rgba(0,255,0,0.5)"
  ></div>
  <div style="height:50px;background:skyblue"></div>
</div>
```

![](https://images.velog.io/images/pul8219/post/2037a56c-fbd4-4a83-b1d7-67d71e9e4e2c/image.png)

- BFC가 시작되고 빨간 박스가 그려진다.
- FLOAT 요소를 만나면 새로운 BFC 영역이 생성된다.
- `skyblue`색 박스는 바로 위에서 만들어진 BFC 영역 안에서 NORMAL FLOW로 그림이 그려진다.
- FLOAT 요소인 초록색박스는 가장 바깥에 떠있다.
- FLOAT 요소로 인해 만들어진 새로운 BFC의 크기는 `FLOAT 영역 전체 + INLINE 영역 전체`가 차지하는 공간이다.(?)
- FLOAT는 추가적인 BFC 영역을 만드는 역할을 한다.
- BFC, IFC 영역이 많아질 수록 GEOMETRY 계산이 복잡해진다.

## 예제2: TEXT, INLINE GUARD

FLOAT는 INLINE요소에 대해서 (못 그려지게 하는) 가드로 동작한다.

```html
<div style="width:500px">
  <div style="height:50px;background:red"></div>
  <div
    style="width:200px;height:150px;float:left;background:rgba(0,255,0,0.5)"
  ></div>
  HELLO
  <div style="height:50px;background:skyblue">WORLD</div>
  !!
</div>
```

![](https://images.velog.io/images/pul8219/post/c374dd16-7b45-4ef8-9509-c30069b6fa7d/image.png)

- `HELLO` 초록색 박스 뒤에 그려져야할 것으로 기대되겠지만 아니다.
- FLOAT 요소가 INLINE요소에 GUARD역할을 하기 때문에 `HELLO`는 FLOAT 바깥에 그려진다.
- FLOAT 요소는 INLINE요소에만 가드로 작동한다.
- BLOCK요소에는 가드로 작동하지 않는다. 따라서 skyblue색 박스는 그대로 그려진다.
- 또한 DOM의 포함관계에 관계없이 INLINE요소는 가드된다. 따라서 `WORLD`라는 단어는 DOM구조상 skyblue색 박스 안에 있지만, FLOAT 바깥에 그려지게된다.

## 예제3: LINE BOX

FLOAT가 지옥이라고 느끼는 이유는 LINE BOX에 대한 정확한 이해가 없어서이다.

```html
<head>
  <style>
    .left {
      float: left;
      background: rgba(0, 255, 0, 0.5);
    }
    .right {
      float: right;
      background: rgba(255, 0, 0, 0.5);
    }
  </style>
</head>
<body>
  <div style="width:500px">
    <div class="left" style="width:200px;height:150px">1</div>
    <div class="right" style="width:50px;height:150px">2</div>
    <div class="right" style="width:50px;height:100px">3</div>
    <div class="left" style="width:150px;height:50px">4</div>
    <div class="right" style="width:150px;height:70px">5</div>
    <div class="left" style="width:150px;height:50px">6</div>
    <div class="left" style="width:150px;height:50px">7</div>
    <div style="height:30px;background:skyblue">ABC</div>
  </div>
</body>
```

### 그리는 과정

![](https://images.velog.io/images/pul8219/post/6796da7d-028c-45f3-b2f2-5a69d9f327e7/image.png)

- 위에서 언급했듯 FLOAT요소는 새로운 BFC 영역을 생성한다.
- 그 BFC 영역은 (전 시간에 배웠듯이) 부모의 가로길이(width)만큼을 다 먹는다.
- 이만큼의 BFC 영역이 첫 FLOAT요소를 그릴 수 있는 공간인 LINE BOX1이 된다. float: left이니까 해당 LINE BOX의 가장 왼쪽에 FLOAT 요소가 그려진다.

![](https://images.velog.io/images/pul8219/post/6514a28c-b3bd-4284-86a5-0e2868307c7c/image.png)

- 두번째 `DIV`는 첫번째 FLOAT 요소를 제외한 공간이 LINE BOX2가 된다. 이 LINE BOX의 가장 오른쪽에 그려진다.(float: right이니까) (DIV를 그리기 전에 그려질 수 있는 LINE BOX가 이미 계산되어있다.)

![](https://images.velog.io/images/pul8219/post/b2442b1e-1661-4893-a3ed-75870b4e08bb/image.png)

- LINE BOX는 세로크기도 고려한다. 세번째 DIV 박스가 필요한 HEIGHT는 100PX니까 LINE BOX는 그림과 같이 계산된다. 그 LINE BOX를 기준으로 가장 오른쪽에 세번째 DIV 박스가 그려진다.

![](https://images.velog.io/images/pul8219/post/f59b9b74-a23d-4181-a3f2-4ad6edf2cc33/image.png)

![](https://images.velog.io/images/pul8219/post/ba109cc1-3ea9-4911-8556-34f9214f7693/image.png)

- 다섯번째 DIV 박스는 공간이 부족해 네번째 DIV박스 오른쪽에 그려질 수 없다. 이럴 경우, 직전 LINE BOX(4)의 바닥선(BASE LINE)을 기준으로 아래 남은 공간의 가장 왼쪽, 오른쪽를 따져서 새로운 LINE BOX 영역이 계산된다. 다섯번째 DIV 박스는 이 LINE BOX의 가장 오른쪽에 붙여 그려진다.(`float: right`니까)
- LINE BOX 5의 입장에서 박스3 아래 있는 빈 공간은 무시된다.(5번 박스가 LINE BOX의 가장 오른쪽에 배치된 것이기 때문. 더 오른쪽은 있을 수 없다.)

![](https://images.velog.io/images/pul8219/post/6c8d4612-b382-4c15-b47e-148f24708bb4/image.png)

![](https://images.velog.io/images/pul8219/post/cca765b8-900c-4f6b-b935-0fbe1607cc88/image.png)

- 박스7을 그릴 때는 직전의 BASE LINE이 내려오다 박스2의 BASE LINE에 걸린다.(박스6의 바닥보다 먼저 등장)

![](https://images.velog.io/images/pul8219/post/90278eef-fb07-4a37-a6e6-7f9780c1f5fc/image.png)

- 마지막 DIV 박스는 float이 아니다. (`ABC`) 맨처음 float요소가 생성한 BFC 영역위치에서 NORMAL FLOW로 그려진다. 안에 있는 ABC는 텍스트 즉 인라인요소이므로 가드를 적용받아 FLOAT 요소의 바깥 중 '살아남은' 영역에 그려지게된다.

- 규칙
  - LINE BOX는 FLOAT요소만 신경쓴다. LINE BOX가 계산될때도 FLOAT요소만 고려한다.
  - LEFT보다 더 왼쪽에 그려지지 않고, RIGHT보다 더 오른쪽에 그려지지 않는다.
  - 빈 공간은 LEFT와 RIGHT 사이에만 가능하다.

### 실행결과

![](https://images.velog.io/images/pul8219/post/f41e8933-bd3a-4299-8ea0-6867eda2e52d/image.png)

## 예제4: LINE BOX + INLINE GUARD

```html
<head>
  <style>
    .left {
      float: left;
      background: rgba(0, 255, 0, 0.5);
    }
    .right {
      float: right;
      background: rgba(255, 0, 0, 0.5);
    }
  </style>
</head>
<body>
  <div style="width:500px">
    <div class="left" style="width:200px;height:150px">1</div>
    <div class="right" style="width:50px;height:150px">2</div>
    <div class="right" style="width:50px;height:100px">3</div>
    <div class="left" style="width:150px;height:50px">4</div>
    <div class="right" style="width:150px;height:70px">5</div>
    <div class="left" style="width:150px;height:50px">6</div>
    <div class="left" style="width:150px;height:50px">7</div>
    <div style="height:30px;background:skyblue">
      ABC1 ABC2 ABC3 ABC4 ABC5 ABC6 ABC7 ABC8
      <!-- ✏️ 예제3에서 수정한 부분(이렇게 바뀔 경우, 어떻게 그려질지 결과를 예상해보자) -->
    </div>
  </div>
</body>
```

### 실행결과

'살아남은' 공간에 글자들이 쏙쏙쏙 들어간다. LINE BOX를 이해하면 글자가 (세로로 긴) 곡선의 뱀모양처럼 나오게 출력하는 것도 가능하다.

![](https://images.velog.io/images/pul8219/post/9f735558-0070-4772-8514-d00b2ca0c7a9/image.png)

# OVERFLOW

> CSS2.1 VISUAL FORMATTING MODEL

VISIBLE | HIDDEN | SCROLL | INHERIT | AUTO

- AUTO: 내부의 크기가 커지면 부모도 커진다. GEOMETRY의 크기가 직접 변한다.
- VISIBLE: 보일 때까지 커진다. 일반적인 브라우저에서는 VISIBLE = AUTO 같은 의미이다.
- SCROLL: 내 GEOMETRY 넘어가는 컨텐츠가 발생하면 스크롤바를 만든다.
- HIDDEN: 내 GEOMETRY 넘어가는 컨텐츠가 발생하면 안보이게 잘라버린다.

## OVERFLOW가 `HIDDEN`, `SCROLL`일 때

- NEW BFC: 새로운 BFC를 즉시 생성한다.
- FIRST LINE BOX BOUND: 첫번째 LINE BOX를 이용해 BFC 영역을 만든다.

```html
<head>
  <style>
    .left {
      float: left;
      background: rgba(0, 255, 0, 0.5);
    }
    .right {
      float: right;
      background: rgba(255, 0, 0, 0.5);
    }
  </style>
</head>
<body>
  <div style="width:500px">
    <div class="left" style="width:200px;height:150px">1</div>
    <div class="right" style="width:50px;height:150px">2</div>
    <div class="right" style="width:50px;height:100px">3</div>
    <div class="left" style="width:150px;height:50px">4</div>
    <div class="right" style="width:150px;height:70px">5</div>
    <div class="left" style="width:150px;height:50px">6</div>
    <div class="left" style="width:150px;height:50px">7</div>
    <div style="height:30px;overflow:hidden;background:skyblue">A</div>
    <!-- div8 -->
  </div>
</body>
```

- 박스 div8은 처음 float 요소가 만들어질 때 BFC 영역에 속한 것 같으나, overflow 속성이 hidden이기 때문에 새로운 BFC 영역이 만들어진다.
- BFC는 부모만큼 width를 갖는다는 원칙을 가지고 있다.
- 그런데 overflow가 hidden이면 이 부모 영역을 계산할 때 LINE BOX BOUND를 계산한다. 따라서 실행결과는 아래와 같이 나타난다. (LINEBOX 남은 공간에 그려진 것을 볼 수 있다.)
- LINE BOX를 처음 공부했던 [예제3](#예제3-line-box)과 비교해볼 것

```html
<div style="width:500px">
  <!-- ... -->
  <!-- 1️⃣ -->
  <div style="height:30px;overflow:hidden;background:red">A</div>
  <!-- 2️⃣ -->
  <div style="height:15px;overflow:hidden;background:orange">B</div>
  <!-- 3️⃣ -->
  <div style="height:30px;background:black"></div>
  <!-- 4️⃣ -->
  <div style="height:30px;overflow:hidden;background:red">C</div>
  <!-- 5️⃣ -->
  <div style="height:20px;overflow:hidden;background:orange">D</div>
  <!-- 6️⃣ -->
  <div style="height:30px;background:black"></div>
  <!-- 7️⃣ -->
  <div style="overflow:hidden;background:red">E</div>
  <!-- 8️⃣ -->
  <div style="height:30px;background:black"></div>
  <!-- 9️⃣ -->
  <div style="height:30px;overflow:hidden;background:orange">F</div>
  <!-- 1️⃣0️⃣ -->
  <div style="height:30px;background:black"></div>
</div>
```

- 1️⃣ overflow:hidden이라 새로운 BFC 영역이 생성되고, LINE BOX BOUND를 계산해 결과에 보이는 것과 같이 그려진다.
- 2️⃣ 1번과 같은 방식으로 그려진다.
- 3️⃣ 이 DIV는 OVERFLOW:HIDDEN이 아니다. 이 박스는 2번의 BFC에 소속된 DIV가 되서 가로를 모두 차지한다. (2번의 BFC가 확장되었다.)
- 4️⃣ 1,2번과 같은 방식으로 그려진다.
- 5️⃣ height가 20px인데 이 박스가 그려질 공간이 없다.(부모 width가 0인 상태. line bound box를 계산했지만 그릴 수 없다는 걸 알았음) 따라서 없어진다. 그림이 그려지진않지만 BFC 영역은 height 20px에 맞춰 생성된다.
- 6️⃣ 5번 다음에 그려진다. (5번의 BFC 영역이 확장됨)
- 7️⃣ 그릴곳이 없어서 그려지지 않음(BFC 공간은 차지) (left밖에 없으니)
- 8️⃣ 7번 다음에 그려진다.
- 9️⃣ line box 경계가 더이상 없으니 일반적인 BFC 처럼 그려진다.
- 1️⃣0️⃣ 9번 다음에 그려진다.

![](https://images.velog.io/images/pul8219/post/6538ff57-ecb2-4311-8370-dcf4c6797c33/image.png)

> 오늘 배운 것
>
> - float와 normal flow의 관계
> - float와 overflow:hidden의 관계

![](https://images.velog.io/images/pul8219/post/87c91dd1-ea7b-4a2f-b2d5-2dd97eb47111/image.png)

> 위 결과에서 왜 (맨위 사이에 껴있는) 빨간 박스가 늘어나지 않았을까?(ABC8과 다음 그림이 겹치는 것을 볼 수 있음)
>
> - 컨텐츠가 커서 BFC 박스를 밀어낼 때 visible 속성이면 늘어난다.
> - 그런데 line box 때문에 guard가 작동하면서 inline 요소가 밀린거라면 늘어나지 않는다.
> - ABC8의 경우 그림이 그려진것 뿐이지 geometry 영역을 차지하고 있는 게 아님(console-element로도 확인 가능) 심지어 다음 div가 ABC8을 덮지도 않았다

![](https://images.velog.io/images/pul8219/post/80edb5d3-a225-47c6-88a2-36f0b30c65b0/image.png)

# OVERFLOW-X, Y

> OVERFLOW MODULE LEVEL3 DRAFT

VISIBLE | HIDDEN | SCROLL | CLIP | AUTO

OVERFLOW를 한꺼번에 관리하지 않고, OVERFLOW X축, Y축 따로 관리하는 스펙이다. RECOMMEND 였다가 DRAFT(권고)로 변경됐다. (why? 새로운 CSS 스펙이 나오면서 영향을 끼쳤음. 그래서 DRAFT로 내려감)

# TEXT-OVERFLOW

> CSS2.1 UI MODULE LEVEL3

CLIP | ELLIPSIS

- ELLIPSIS: TEXT에 대해서 `...` 표시해줌

# 마무리

지금까지 배운 것이 **고전 레이아웃**이다. 거의 모든 브라우저에서 제공하므로 기본이 되는 개념이다. 많이 연습할 것!

# Comment

# References

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step37.md)
- [@eyabc]()
  - https://eyabc.github.io/docs/css/css-rendering/float/
  - https://eyabc.github.io/docs/css/css-rendering/line_box
  - https://eyabc.github.io/docs/css/css-rendering/overflow
  - https://eyabc.github.io/docs/css/css-rendering/overflow_float
- [@khw970421](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-css-rendering-part2)
