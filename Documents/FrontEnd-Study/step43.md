[문서 목록으로 돌아가기](README.md)

> # STEP 43
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 43 [코드스피츠76 CSS Rendering - 4회차](https://www.youtube.com/watch?v=Tf5KvpYNNv8c)
> - 기한: 06/26(토) ~ 06/29(화) (STEP 43)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

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
