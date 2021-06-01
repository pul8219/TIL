[문서 목록으로 돌아가기](README.md)

> # STEP 38
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 38 [코드스피츠76 CSS Rendering - 2회차](https://www.youtube.com/watch?v=NFvSbFJmoWo&t=1658s) 모던 박스모델(~28분)
> - 기한: 05/22(토) ~ 05/25(화)

# 보충 필요

# 목차

- [Morden Box](#morden-box)
  - [Box-shadow](#boxshadow)
  - [Outline](#outline)
- [Box-Sizing 예제](#boxsizing-예제)
- [Border&Background 예제](#borderbackground-예제)
- [Box-Shadow 예제](#boxshadow-예제)
- [Box-Shadow&Relative 예제](#boxshadowrelative-예제)
- [Box-Shadow Inset 예제](#boxshadow-inset-예제)
- [Box-Shadow Sandwich 예제](#boxshadow-sandwich-예제)
- [Box-Shadow N-Layer](#boxshadow-nlayer)
- [Box-Shadow&Border-Radius](#boxshadowborderradius)
- [Box-Shadow Animation](#boxshadow-animation)
- [Online 예제](#online-예제)

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

# MORDEN BOX

## BOX-SHADOW

![](https://images.velog.io/images/pul8219/post/8c81cd55-4b87-4b1d-a651-e2a2ae261c2d/image.png)

- box-shadow를 border처럼 사용할 수 있다(쉐도우 거리나 블러를 주지않으면)
- box-shadow는 border-box의 바깥에 그려진다. geometry로 계산되지 않고 그림만 그려진다. box-shadow는 fragment 단계에서 작동하는 개념이므로 이로인해 상자가 밀려나거나 위치가 바뀌거나 하지 않는다. (오직 그림에만 영향을 미친다. step36의 렌더링시스템에서 공부했던 geometry, fragment단계를 기억하기)
- box-shadow를 안쪽에도 그릴 수 있다.(padding쪽으로) BOX-SHADOW INSET
- box-shadow를 여러개 그릴 수도 있다(장점) border-box는 하나만 그릴 수 있었는데 box-shadow를 이용하면 border를 몇개고 그릴 수 있다.
- box-shadow는 BORDER의 RADIUS를 따라간다.(예를들어 BORDER가 곡선이면 BOX-SHADOW도 곡선으로 따라간다.)

## OUTLINE

![](https://images.velog.io/images/pul8219/post/c92ca0ae-8162-4d1d-9f60-964ba7a3ca0d/image.png)

- BOX-SHADOW와 같은 위치에 그려지는 또다른 속성이다.(BORDER-BOX 바깥쪽)
- BOX-SHADOW가 BORDER의 RADIUS를 따라가는 반면, OUTLINE은 따라가지 않는다. (어떤 경우 이를 유용하게 사용할 수도 있다.)

## BOX-SIZING 예제

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px solid #000;
    display: inline-block;
  }
</style>

<div style="background:red"></div>
<div style="background:blue; box-sizing:border-box"></div>
```

![](https://images.velog.io/images/pul8219/post/d4544b4b-9df9-4c6c-a6cc-3604141d1243/image.png)

- width와 height를 주는 것은 content box의 크기를 정하는 것이다.
- 빨간 박스의 경우 100x100에 padding 10px, border 10px이 붙여져 div의 전체 크기는 140x140이 된다. (컨텐츠 영역이 100x100으로 보존됨)
- 100x100안에 border등을 욱여넣고싶다면 파란박스처럼 `box-sizing` 속성을 `border-box`로 주면 된다.
- 하얀 공백이 생기는 이유는 inline으로 설정된 두 div 사이에 공백이 있기 때문이다. 첫번째 div의 닫는 태그와 두번째 div의 여는 태그를 붙여주면 없어진다.

![](https://images.velog.io/images/pul8219/post/d09dc614-4fd8-4442-bf0d-f50669ad9291/image.png)

![](https://images.velog.io/images/pul8219/post/a6044d94-f2b7-4225-813b-2238a41fe2e1/image.png)

## BORDER&BACKGROUND 예제

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px dashed rgba(0, 0, 0, 0.5);
    display: inline-block;
  }
</style>

<div style="background:red"></div>
<div style="background:blue; box-sizing:border-box"></div>
```

![](https://images.velog.io/images/pul8219/post/71ee1764-42ab-41c3-a683-cc26dfec041a/image.png)

위 예제에서 style 속성에 `dashed`와 `rgba`만 변경한 것이다. 이렇게 border를 활용해서도 다양하게 그림을 그릴 수 있다.

## BOX-SHADOW 예제

다시 한번 기억할 것! box-shadow는 border-box 바깥쪽에 그려지고 geometry에 영향을 주지 않는다.

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px dashed rgba(0, 0, 0, 0.5);
    display: inline-block;
  }
</style>

<div style="background:red"></div>
<div style="background:blue; box-shadow:0 0 0 10px rgba(255,255,0,0.5);"></div>
```

![](https://images.velog.io/images/pul8219/post/5460392c-b74d-49af-8d8f-1c3a4a5aedf9/image.png)

`box-shadow`값: x, y, blur, 두께 순

- 결과를 보면, 빨간 박스 색칠 -> 파란 박스 색칠 -> box-shadow(노란색) 순으로 그려진 것을 알 수 있다.(노란색이 빨간 박스 위로 올라와있으니) position absolute, fixed만 z-index 순서가 있다고 생각하는 경향이 있는데, 이처럼 인라인 요소임에도 불구하고 그려짐에도 순서가 있음을 알 수 있다.

## BOX-SHADOW&RELATIVE 예제

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px dashed rgba(0, 0, 0, 0.5);
    display: inline-block;
  }
</style>

<div style="background:red; position:relative;"></div>
<div style="background:blue; box-shadow:0 0 0 10px rgb(255,255,0);"></div>
```

![](https://images.velog.io/images/pul8219/post/35f0fc25-f251-45f1-bf90-d7cfa14932ed/image.png)

- position: relative 일 경우 normal flow로 먼저 그려지고 relative인 것은 그 후에 다시 그려진다. 그래서 다시 그려진 빨간박스에 겹치는 box-shadow 부분(노란색)이 덮인 것이다.
- (geometry 계산 -> fragment 그려짐. 근데 relative는 normal flow이후 geometry를 재계산 해야함. 이렇게 그려지는 과정엔 규칙이 있다)

## BOX-SHADOW INSET 예제

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px dashed rgba(0, 0, 0, 0.5);
    display: inline-block;
  }
</style>

<div style="background:red"></div>
<div
  style="background:blue; box-shadow:inset 0 0 0 10px rgba(255,255,0,0.5);"
></div>
```

![](https://images.velog.io/images/pul8219/post/2ec0c7cb-3960-4674-bdc9-f3412d9efa74/image.png)

- BOX-SHADOW INSET은 BORDER-BOX 안쪽에 그려짐을 알 수 있다.

## BOX-SHADOW SANDWICH 예제

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px dashed rgba(0, 0, 0, 0.5);
    display: inline-block;
  }
</style>

<div style="background:red"></div>
<div
  style="background:blue; box-shadow:0 0 0 10px purple, inset 0 0 0 10px rgba(255,255,0,0.5);"
></div>
```

![](https://images.velog.io/images/pul8219/post/39b5b986-111f-4bc0-a37d-922c7fe8040c/image.png)

- border를 3개나 그릴 수 있게 되었다!

## BOX-SHADOW N-LAYER

BOX-SHADOW를 안쪽으로 2개, 바깥쪽으로 2개 그려보자

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px dashed rgba(0, 0, 0, 0.5);
    display: inline-block;
  }
</style>

<div style="background:red"></div>
<div
  style="background:blue; 
  box-shadow:
  0 0 0 10px purple, 
  0 0 0 20px #0a0,
  inset 0 0 0 10px purple,
  inset 0 0 0 20px #0a0;
  "
></div>
```

![](https://images.velog.io/images/pul8219/post/3a70f1e0-dfdc-4a77-ab7f-5b66466c344a/image.png)

- 초록색 선의 경우 보라색 선에 가려지기 때문에 20px를 줘야 10px처럼 보이게 그려질 수 있다(이를 생각해서 값을 줘야한다.)
- box-shadow는 가장 마지막에 선언한 것부터 그려진다(스택처럼 생각) 그래서 보이지 않는 색깔 없이 결과가 잘 출력된 것이다.

## BOX-SHADOW&BORDER-RADIUS

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px dashed rgba(0, 0, 0, 0.5);
    display: inline-block;
  }
</style>

<div style="background:red"></div>
<div
  style="background:blue; 
  box-shadow:
  0 0 0 10px purple, 
  0 0 0 20px #0a0,
  inset 0 0 0 10px purple,
  inset 0 0 0 20px #0a0;
  border-radius: 50%"
></div>
```

![](https://images.velog.io/images/pul8219/post/1ae8b46f-52a6-457d-8659-26a88a3c1bf8/image.png)

- 문서 초반 box-shadow를 설명할 때 배웠듯 box-shadow는 border-radius에 영향을 받음을 알 수 있다.
- 이렇게 레이어를 쌓아가며 여러가지 그림을 그릴 수 있다(당구공, 빛나는 공, 별, ...) 레이어가 많지 않아도 상관없는 것이 border에 그라데이션을 줄 수 있기 때문이다.

## BOX-SHADOW ANIMATION

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px dashed rgba(0, 0, 0, 0.5);
    display: inline-block;
  }
  @keyframes ani {
    from {
      box-shadow: 0 0 0 0 purple, 0 0 0 0 #0a0, inset 0 0 0 0 purple, inset 0 0
          0 0 #0a0;
    }
    to {
      box-shadow: 0 0 0 10px purple, 0 0 0 20px #0a0, inset 0 0 0 10px purple, inset
          0 0 0 20px #0a0;
    }
  }
</style>

<div style="background:red"></div>
<div
  style="background:blue; 
  border-radius: 50%;
  animation:ani 0.4s linear infinite;"
></div>
```

<img src="https://images.velog.io/images/pul8219/post/fecf0aa0-0401-4275-9651-e92f7b0994cb/animation.gif" width="300px">

> 회전 적용

```html
<style>
  div {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px dashed rgba(0, 0, 0, 0.5);
    display: inline-block;
  }
  @keyframes ani {
    from {
      transform: rotate(0);
      box-shadow: 0 0 0 0 purple, 0 0 0 0 #0a0, inset 0 0 0 0 purple, inset 0 0
          0 0 #0a0;
    }
    to {
      transform: rotate(360deg);
      box-shadow: 0 0 0 10px purple, 0 0 0 20px #0a0, inset 0 0 0 10px purple, inset
          0 0 0 20px #0a0;
    }
  }
</style>

<div style="background:red"></div>
<div
  style="background:blue; 
  border-radius: 50%;
  animation:ani 0.4s linear infinite;"
></div>
```

<img src="https://images.velog.io/images/pul8219/post/16f235c5-874b-42be-b7a5-376d9c377339/animation_rotate.gif" width="300px">

## OUTLINE 예제

BOX-SHADOW로 충분할 것 같은데, OUTLINE은 어디에 쓰는걸까? OUTLINE을 이용한 대표적인 예가 있다. 바로 stitched

```html
<div
  style="
    width:100px;
    height:100px;
    background:brown;
    border-radius:15px;
    outline:10px solid brown;
    border: 1px dashed #fff;
    color: #fff;
    box-shadow: 0 0 0 10px brown

  "
>
  stitched
</div>

<div
  style="
    width:100px;
    height:100px;
    background:yellow;
    border-radius:15px;
    outline:10px solid rgba(0,255,0,0.5);
    border: 1px dashed lightblue;
    color: lightblue;
    box-shadow: 0 0 0 10px red

  "
>
  stitched
</div>
```

![](https://images.velog.io/images/pul8219/post/9b22281c-9ec9-441d-8818-c79c9d85a0f5/image.png)

![](https://images.velog.io/images/pul8219/post/d93f7d40-390a-434f-bc21-bef30c6891d2/image.png)

- outline은 border-radius의 영향을 받지 않으므로 원래 div의 border box바깥으로 그려진다.
- 이로 인해 div의 둥근 모서리와 outline사이에 뾰족한 모서리가 생기게 된다
- 이를 box-shadow로 가려준다. (뾰족한 모서리를 채우기 위해 box-shadow 두께가 얼마가 되야하는지는 피타고라스 정리로 구할 수 있다ㅎ 너무 두꺼우면 outline을 벗어나니까 안됨)
- 이는 `stitched` 기법이라 불린다.(유명한 기법)

# Comment

# References

- CSS display inline-block https://www.daleseo.com/css-display-inline-block/

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step38.md)
- [@eyabc]()
  - https://eyabc.github.io/docs/css/css-rendering/morden_box
  - https://eyabc.github.io/docs/css/css-rendering/box_sizing
  - https://eyabc.github.io/docs/css/css-rendering/box_shadow
  - https://eyabc.github.io/docs/css/css-rendering/outline
- [@khw970421]()
  - [part1](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-css-rendering-2%ED%9A%8C%EC%B0%A8-step-38)
  - [part2](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-css-rendering-2%ED%9A%8C%EC%B0%A8-part2-step-38)
