[문서 목록으로 돌아가기](README.md)

# STEP 43, 44, 45

> **STEP 43**
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 43 [코드스피츠76 CSS Rendering - 4회차](https://www.youtube.com/watch?v=Tf5KvpYNNv8c) `1/3`
> - 기한: 06/26(토) ~ 06/29(화) (STEP 43)

Post Process, Transform 3D

> 수학 함수를 정확하게 알지 못해도 개념을 알고 사용할 줄은 알아야한다.

# Post Process

- Post Process는 Geometry, Fragment 이후 또 가공할 수 있도록 하는 것이다.
- 영역 계산후 바로 비트맵에 쓰는게 아니라 메모리에 올려 메모리에서 조작한 후에 그리는 `버퍼` 개념이 필요하다.
- IE5 이후 모든 브라우저에 버퍼 개념이 적용되었다. 버퍼는 쉽게 2차원 배열이라고 생각하면 된다. (x, y에 해당하는 점을 찍어놓으니까) 배열에 있는 값을 변경하면(post process) 여러 변형을 줄 수 있고 이 이후에 그림을 그리게 된다.
- 모던 브라우저의 방식: CPU를 이용해 geometry 계산, fragment(기본 fragment 채움)을 수행한 후 가공된 버퍼를 GPU에 넘겨준다. GPU에서 post process를 처리한다.(GPU에서 처리하는게 훨씬 빠르기 때문)
- CSS의 키워드 중 일부는 CPU에서 일부는 GPU에서 실행된다.
- 그래픽이 컴퓨터 머신을 많이 쓴다(고용량) (대부분의 언어가 메모리를 많이 먹어서 비트맵 데이터만큼은 메모리를 즉시 해제 할 수 있는 메소드를 제공해준다.) 그래서 그래픽에서 CPU나 GPU로 post process나 fragment로 일을 적절히 분배하는 것이 필요하다.
- post process를 쓰는 대표적인 속성: transform, keyframe animation (GPU에 맡기기 때문에 CPU가 널널해지고 js가 돌기 편해진다.)
- CSS에서 3D와 관련된 모든 처리는 GPU에서 한다.(post process에서 처리한다는 것)

![](https://images.velog.io/images/pul8219/post/e745e4b5-6f8e-42b4-a0d0-b6ed361bbb45/image.png)

ex) 이렇게 `리플`이라는 수학적 공식으로 픽셀을 흩뜨리고, `블러`라는 공식을 통해 완성된 픽셀에 변형을 줄 수 있다. 픽셀의 색깔, 밝기, 필터를 모두 줄 수 있고 회오리치게 만들수도, 물결치게 만들수도 있다.

![](https://images.velog.io/images/pul8219/post/15555ac4-f2f0-4258-915e-6cd2abe661b9/image.png)

- 3D를 주기 전(fragment)와 3D를 준 후(post process)는 아무런 상관이 없다. 후자는 DOM과도 상관이 없다.
- float, relative등의 계산을 fragment단계에서 모두 끝낸 후 변형을 주는 개념이 post process이다.

## Transform 3D

### `perspective`

모니터와 사람 눈 사이의 거리(를 가정하는 값)

- 같은 사각형이어도 `perspective`값을 크게 준 사각형은 더 작아보인다.(멀리서 보면 더 작게 보이는 것처럼)
- z값을 얼마를 주던간에 `perspective`에 의해 크게 좌우된다.
- 가까이 있으면 조금의 거리차이도 크게 느껴지며 왜곡이 심한 것처럼 `perspective`값을 적게 줄수록 왜곡이 커진다. (멀리있으면 멀리있을 수록 2D, 평면처럼 보인다)

### `perspective-origin`

- 변형을 줄 때 어딜보고 3D를 인식할 것인지 (`perspective`는 모니터 정가운데를 가정하고 있는 것이다.)

```
perspective-origin: 50% 50% // 한가운데
perspective-origin: 0 0 // 좌측 상단
perspective-origin: 100% 100% // 우측 하단 // 이 경우 좌측 상단과 상대적으로 멀어지니 좌측 상단의 왜곡이 제일 심할 것임
```

```html
<head>
  <!-- ... -->
  <style>
    @keyframes origin {
      0% {
        perspective-origin: 0% 50%;
      }
      50% {
        perspective-origin: 100% 50%;
      }
      100% {
        perspective-origin: 0% 50%;
      }
    }

    @keyframes spin {
      100% {
        transform: rotateX(360deg);
      }
    }
    html,
    body {
      height: 100%;
    }
    body {
      perspective: 600px;
      background: #404040;
      animation: origin 10s linear infinite;
    }
    .test {
      width: 500px;
      height: 500px;
      background: #aaa;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -250px;
      margin-top: -250px;
      animation: spin 30s linear infinite;
    }
  </style>
</head>

<body>
  <div class="test"></div>
</body>
```

위 예제를 실행시켜보자. 회전만 줬는데도 왜곡되어 보인다. 그 이유는 우리가 바라보는 위치(`perspective-origin`)를 계속 바꿨기 때문이다. 이러한 원근 왜곡은 `perspective`를 주기 시작할 때부터 시작된다.

> `rotateX`: x축을 기반으로 회전

### `transform-style`

```html
<div>
  <div></div>
</div>
```

- DOM의 계층 구조는 fragment단계까지만 적용되고 GPU로 넘어가면(3D) DOM 구조는 무시된다.
- 그런데 만약 위와 같은 html 구조에서 부모 div에 따라 자식 div도 회전하게 하고 싶다면 어떻게 해야할까?
- `transform-style` 속성을 `preserve-3d`로 설정하면 (기본값은 `flat`) 자식이 부모의 3D 관련 속성(`perspective` 등의 속성들)을 이어받아 이를 GPU가 처리할 수 있게 해준다.

### `transform-origin`

어디를 기준으로 변형이 일어나게 할 것인가에 대한 속성

```
// x,y가 모두 50%이므로 정가운데 점을 기준으로 회전할 것이다.
transform-origin: 50% 50% 0

/ y가 100%이므로 이므로 정가운데 점을 기준으로 회전할 것이다.
transform-origin: 50% 100% 0
```

```html
<head>
  <style>
    @keyframes spin {
      to {
        transform: rotateX(360deg);
      }
    }
    html,
    body {
      height: 100%;
    }
    body {
      perspective: 800px;
      background: #404040;
    }
    .test {
      width: 300px;
      height: 300px;
      background: #aaa;
      position: absolute;
      margin-left: -150px;
      margin-top: -150px;
      animation: spin 4s linear infinite;
    }
  </style>
</head>
<body>
  <div class="test" style="left:25%;top:50%;transform-origin:50% 0%"></div>
  <div class="test" style="left:50%;top:50%;transform-origin:50% 50%"></div>
  <div class="test" style="left:75%;top:50%;transform-origin:50% 100%"></div>
</body>
```

위 예제는 `transform-origin` 을 다르게 줬을 뿐인데 각각의 사각형이 `transform-origin` 값에 따라 다른 위치(축)을 기준으로 회전한다.

### `backface-visibility`

- frontface는 앞면, backface는 뒷면
- backface를 보이게 하고 요소를 회전시킬경우(가정) 앞면과 같은 이미지가 보인다. (backface를 안 보이게 하는 경우 뒷면이 보이도록 회전되는 순간 투명하게 보일 것)
- 앞면은 빨강, 뒷면은 파랑 처럼 앞뒷면이 전혀 다른 걸 보여주고 싶다면 frontface가 빨강, 파랑인 요소를 회전시키며 backface를 안보이게 하면 된다.(backface 기본값이 그리게 되어있으므로 false값을 주면 backface를 그리지 않게 할 수 있다)
- 이렇게 backface를 보이지 않게 하는 것은 유용할 때가 많다.
- ex) 안은 안 보이는 큐브를 띄울 경우, 컴퓨터는 보이지 않는 면도 그리고 있다. 따라서 내부를 그리지 않게 설정해주면 부하를 줄일 수 있다. (그림 그리는 작업이 부하가 가장 크다. 부하를 줄여야한다!)

> 3D 작업은 전부 다 GPU가 한다. 일부러 GPU가 그림을 그리게 하려고 3D 속성을 주는 경우도 있는데 rotate 0deg를 줘서 CPU가 아닌 GPU로 작업을 하게 하는게 한 가지 예시다.

[`transform-origin`](#transformorigin) 에서 봤던 예제의 `.test` style 태그에 `backface-visibility: hidden;` 속성을 추가해보자. 사각형들이 회전하다가 뒷면을 보이는 순간부터 투명해지는 것을 볼 수 있다.

# Comment

# References

# 팀원들 결과물‍

> **STEP 44**
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 43 [코드스피츠76 CSS Rendering - 4회차](https://www.youtube.com/watch?v=Tf5KvpYNNv8c) `2/3`
> - 기한: 07/03(토) ~ 07/06(화) (STEP 44)
> - [📋 스터디 문서 목록 바로가기](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/README.md)

JS로 3D 드럼통 그리기

# 드럼통 그리기

CSS로 회전하는 드럼통을 그려보자. 트럼통은 수많은 직사각형으로 이루어진 옆면과 원형인 상하판으로 만들어야한다.

## 방법1. JS Mix

<img src="https://images.velog.io/images/pul8219/post/aaab4f7c-c637-41f5-b26a-cc42211e126e/ezgif.com-gif-maker.gif" width="40%">

먼저 자바스크립트로 드럼통을 만들어보자.

![](https://images.velog.io/images/pul8219/post/d1744b53-1641-4fd1-be4b-c93a695e5c54/image.png)

드럼통은 위와 같은 이미지 한개를 이용해 CSS split으로 잘라서 사용할 것이다.(여러개의 이미지를 로드하지 않아도 된다는 장점이 있다.)

> `3D` 용어
>
> - 아틀라스: `3D`에서는 이미지 소스를 `텍스쳐`라고 하는데, 하나의 텍스쳐가 여러가지 텍스쳐(드럼통 예에선 옆면, 뚜껑 등)를 대신하는 경우 `3D`에선 그 텍스쳐를 `아틀라스`라고 부른다.(CSS에선 split) 정육면체는 6개의 사각형 면(face)을 잘 합치면 정육면체가 된다. 이런 것처럼 face에 필요한 데이터를 아틀라스로 공급받아서 이를 잘 변형하면 하나의 드럼통, 사람, 정육면체를 만들 수 있다.
> - 매쉬(Mesh): 이렇게 면(face)이 모인 것은 하나의 입체가 되고 이를 매쉬라고 부른다.

![](https://images.velog.io/images/pul8219/post/ac9b7f14-cd1b-45e6-81d6-fa2850f801a9/image.png)

- 면(face)들을 나누기 위해서는 `x, y, z`, `height, width`값이 필요하다.
- 아틀라스 안에서의 영역을 인식하기 위해 `tx, ty`값이 필요하다.
- 회전하기 위해서 `rx, ry, rz` 값이 필요하다.

```html
<style>
  @keyframes spin {
    to {
      transform: rotateY(360deg) rotateZ(360deg) rotateX(720deg);
    }
  }
  html,
  body {
    height: 100%;
  }
  body {
    perspective: 600px;
    background: #404040;
  }
  .ani {
    animation: spin 4s linear infinite;
  }
  .drum {
    background: url('http://keithclark.co.uk/labs/css-fps/drum2.png');
  }
</style>
```

```js
// div를 만들어주는 El 클래스
const El = class {
  constructor() {
    this.el = document.createElement('div');
  }
  set class(v) {
    this.el.className = v;
  }
};

// El을 상속받는 Face 클래스
const Face = class extends El {
  constructor(w, h, x, y, z, rx, ry, rz, tx, ty) {
    super();
    this.el.style.cssText = `
      position: absolute;
      width: ${w}px;
      height: ${h}px;
      margin: -${h / 2}px 0 0 -${w / 2}px;
      transform: translate3d(${x}px, ${y}px, ${z}px)
        rotateX(${rx}rad) rotateY(${ry}rad) rotateZ(${rz}rad);
      background-position: -${tx}px ${ty}px;
      backface-visibility: hidden; //⭐
    `;
  }
};
```

![](https://images.velog.io/images/pul8219/post/2dd98101-5283-4d4b-84c4-14c80ae24d02/image.png)

- 그림이 생기면 이렇게 좌상단 점이 기준이 된다. 그림을 옮겨 정중앙점을 기준으로 하도록 margin에 코드처럼 값을 준다.

> 중앙 정렬
>
> - 요소가 absolute가 아닐 때, margin의 left, right에 auto를 주면 된다.
> - 요소가 absolute일 때, margin의 top에 height의 `1/2`을 배고, left에 width의 `1/2`을 뺀다.

> margin은 top, right, bottom, left순 (반시계 방향)

```js
// Face를 모아 하나의 Mesh(드럼통)를 만드는 클래스
const Mesh = class extends El {
  constructor(l, t) {
    super();
    this.el.style.cssText = `
      position: absolute;
      left: ${l}; top: ${t};
      transform-style: preserve-3d;
    `;
  }

  add(face) {
    if (!(face instanceof Face)) throw 'invalid face';
    this.el.appendChild(face.el);
    return face;
  }
};
```

- Mesh도 div로 여러 div들을 가두는 역할을 한다. (그래서 El을 상속받았다.)
- 자식들도 자신과 같은 속성을 이어받을 수 있도록 `transform-style: preserve-3d`로 설정한다. ([STEP 43](https://pul8219.github.io/frontend-study/fe-study-step43/#transform-style) 참고)
- Mesh가 위치할 값을 `left`, `top`로 준다.
- `add`메소드: 나의 div에 Face element(자식)을 추가

```js
// 본격적으로 드럼통을 만들어보자
const mesh = new Mesh('50%', '50%');

const r = 100,
  height = 196,
  sides = 20;
const sideAngle = (Math.PI / sides) * 2;
const sideLen = r * Math.tan(Math.PI / sides);

for (let c = 0; c < sides; c++) {
  const x = (Math.sin(sideAngle * c) * r) / 2;
  const z = (Math.cos(sideAngle * c) * r) / 2;
  const ry = Math.atan2(x, z);
  const face = new Face(sideLen + 1, height, x, 0, z, 0, ry, 0, sideLen * c, 0);
  face.class = 'drum';
  mesh.add(face);
}

const tface = new Face(100, 100, 0, -98, 0, Math.PI / 2, 0, 0, 0, 100);
const bface = new Face(100, 100, 0, 98, 0, -Math.PI / 2, 0, 0, 0, 100);
tface.class = 'drum';
bface.class = 'drum';
mesh.add(tface);
mesh.add(bface);
mesh.class = 'ani';
document.body.appendChild(mesh.el);
```

- `r(반지름)`, `height(원통의 높이)`
- `sides`: 옆면을 얼마나 등분할 건지에 대한 변수이다. 여기선 20등분 했다는 것
- `sideAnle`: 각 side에서 원의 중심점을 향하게 했`을 때 각도이다. (라디안 기준에서 PI는 180도이기 때문에 360도로 만들기 위해 2를 곱해줬다.)
- `sideLen`: 나뉜 면이 원에서 차지하는 길이 (여기서 `tan`을 사용하지 않고 `sin`을 사용하면 나누는 면 개수가 적으면 사이 공간이 빌 수 있다)

- `for문`: for문을 돌면서 side가 20개면 20개의 Face를 만들어야한다.

  - `x, z` 를 주는 이유는 누워있는 원을 x,y,z로 이루어진 평면의 x,z에 그려야하기 때문이다.
  - 원주에 닿는 접점을 그리기 위해 `sin`, `cos`을 사용한다.(원에서 원주에 특정 각도에 위치한 점을 구하려면, 라디안값을 알고 있을 때 sin,cos를 이용해 x,z를 구할 수 있다.)
  - x,z로 `arc tan`을 이용하면 빗면들을 얼마만큼 휘게 할지 정할 수 있다. (즉 몇도를 돌려야 하는지 알 수 있다.)
  - `ry`는 y축을 기준으로 회전하며 옆면을 구성하기 때문에 정의한 것이다.
  - `new Face` 라인: `sideLen+1` 틈 벌어지지 말라고 1을 더해줬다. / x,z 원주에서의 위치 / 각도는 ry만 회전시키면 되니까 이렇게 설정 / `sideLen*c` 해당 face가 몇번째 위치인지 알 수 있게 준 값
  - `face.class = 'drum';`: 이미지를 가리키도록 한다.
  - Mesh에 지금 만든 Face를 추가한다.

**`backface-visibility` 적용**

- Face에 `backface-visibility: hidden`을 주고(⭐표시 코드라인 참고하기) 위아래 뚜껑을 주석으로 잠깐 없애보자.
- 뒷면이 보일 때마다 투명해지는 것을 볼 수 있다. 뚜껑을 다시 씌우면 잘 작동되는 것을 볼 수 있다.
- 이렇게 안 보이는 곳을 그리지 않게 `hidden`시킴으로써 자원을 절약할 수 있다. ([STEP 43](https://pul8219.github.io/frontend-study/fe-study-step43/#transform-style) 참고)

방법2는 다음 포스팅에 계속

# Comment

# References

# 팀원들 결과물‍

## 방법2. sass 로는 어떻게 만드나. 58분 이후

예정
