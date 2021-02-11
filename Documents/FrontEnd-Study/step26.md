[문서 목록으로 돌아가기](README.md)

> # STEP 26
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 26 [포인터 이벤트](https://ko.javascript.info/pointer-events)
> - 기한: 02/06(토) ~ 02/09(화)

# 보충 필요

# 목차

- [Pointer Events](#Pointer-Events)

  - [Pointer event types](#Pointer-event-types)
  - [Pointer event Properties](#Pointer-event-Properties)

- [Multi-touch](#Multitouch)
- [Event: pointercancel](#Event-pointercancel)

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

> 본 문서는 [포인터 이벤트](https://ko.javascript.info/pointer-events) 문서를 기반으로 작성하였습니다.

# Pointer Events

- 마우스, 펜, 터치스크린과 같은 디바이스의 인풋값을 다루는 방법

- 터치펜 등 다양한 디바이스에 대응해 활용할 수 있는 방법. touch, mouse 이벤트보다 잘 작동한다.

## Pointer event types

| Pointer event      | Similar mouse event |
| ------------------ | ------------------- |
| pointerdown        | mousedown           |
| pointerup          | mouseup             |
| pointerover        | mouseover           |
| pointerout         | mouseout            |
| pointerenter       | mouseenter          |
| pointerleave       | mouseleave          |
| pointercancel      | -                   |
| getpointercapture  | -                   |
| lostpointercapture | -                   |

- 마우스 이벤트 대신 포인터 이벤트를 사용하여 동작 개선 가능
- CSS 어떤 영역에서 터치를 허용하지 않으려면 `touch-action:none` 속성을 추가해줘야한다. 이는 `pointercancel` 파트에서 다룰 것임

## Pointer event Properties

- mouse event에도 있는 `clientX/Y`, `target`과 같은 속성과 기타 속성들을 가지고 있다.

- `pointerId`: 이벤트를 발생시킨 포인터에 대한 고유한 ID

- `pointerType`: 포인팅한 디바이스의 타입. 문자열이어야한다. 디바이스의 타입에 따라 다른 동작을 정의하고 싶을 때 유용. ex) "mouse", "pen", "touch" 등

- `isPrimary`: primary pointer면 `true`(?)

다음과 같은 일부 포인터의 속성은 접촉 영역과 압력 등을 측정한다.

- `width`: 포인터가 터치하고 있는 디바이스의 영역의 너비. 마우스엔 지원되지 않으며 이때 속성값은 항상 `1`이다.

- `height`: 포인터가 터치하고 있는 디바이스의 영역의 높이. 마우스엔 지원되지 않으며 이때 속성값은 항상 `1`이다.

- `pressure`: 포인터 팁의 압력을 의미하며 0~1사이의 값. 압력이 지원되지 않은 디바이스의 경우 눌리면 `0.5`, 그렇지 않으면 `0`값을 갖는다.

- `tangentialPressure`: 정규화된 tangential 압력(?)

- `tiltX`, `tiltY`, `twist`: 펜에 대한 속성으로 펜이 표면에 상대적으로 어떻게 위치해있는지 나타낸다.

# Multi-touch

- Pointer event는 `pointerId`, `isPrimary` 속성을 이용하여 multi-touch를 핸들링한다.
- 마우스 이벤트는 multi-touch를 지원하지 않는다.

1. 손가락을 이용한 첫 번째 터치

- `pointerdown` 이벤트가 발생하며 `isPrimary=true`, `pointerId` 값 셋팅됨

2. 두 번째 혹은 그 이상의 터치(1.의 첫 번째 터치가 여전히 지속되고 있다고 가정할 때)

- `pointerdown` 이벤트가 발생하며 `isPrimary=false`, 터치마다 각각 다른 `pointerId` 값 셋팅됨

> `pointerId`는 같은 디바이스라 할지라도 터치한 손가락 각각에 다른 id를 할당한다.

> multiple한 터치를 `pointerId`를 이용해 추적할 수 있다. 사용자가 포인터를 이동시키거나 손가락을 떼면 `pointermove`나 `pointerup` 이벤트가 `pointerdown`이 가지고 있던 `pointerId`를 가진채로 발생하기 때문이다.

[링크](https://ko.javascript.info/pointer-events)의 multi-touch 파트에서 데모 코드는 스마트폰이나 태블릿과 같은 디바이스의 터치스크린으로 이벤트를 발생시켰을 때 동작한다. 마우스로 터치할 경우 `pointerId`는 항상 같을거고 `isPrimary`도 항상 `true`일 것!

# Event: pointercancel

`pointercancel` 이벤트는 포인터 이벤트가 없을 것으로 판단하거나 `pointerdown` 이벤트가 일어난 후 포인터를 이동, 스크롤, 확대/축소하여 뷰포트를 조작할 때 발생한다.

다음과 같은 때 일어난다.

- 포인터 디바이스 하드웨어가 물리적으로 사용불가 상태일 때
- 디바이스 방향이 바뀔 때(tablet 회전 등)
- 확대/축소와 같은 동작 등 브라우저가 상호작용을 핸들링할 때

[step25](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step25.md)의 공 드래그앤드롭 예시 참고

1. 사용자가 이미지를 누르면 (start dragging)

- `pointerdown` 이벤트가 발생

2. 포인터를 이동하기 시작하면 (dragging the image)

- `pointermove` 이벤트가 발생한다(아마 여러번 발생할 것)

3. 이미지를 이렇게 드래그앤드롭하면 `pointercancel` 이벤트가 발생한다.

- 브라우저는 이미지 드래그앤드롭에 대해 기본 동작을 가지고 있다. `pointercancel`이벤트가 발생하면서 `pointermove` 이벤트가 더이상 발생하지 않는다.

## `pointercancel` 동작 피하기

브라우저의 기본 동작인 `pointercancel`을 막으려면 다음과 같은 과정이 필요하다.

1. 네이티브 드래그앤드롭이 일어나는 것을 막는다.

- [step25](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step25.md) 의 공 예시에서 처럼 `dragstart`이벤트의 기본동작을 막는 코드를 사용한다. (이 방법은 마우스 이벤트에서 잘 동작한다.)

```js
function onDragStart() {
  event.preventDefault();
}

// 혹은

ball.ondragstart = () => false;
```

2. 터치 디바이스의 경우 터치와 관련된 다른 브라우저 동작(드래그앤드롭 외에)들이 있다. 문제를 해결하기 위해 아래 방법을 사용한다.

- `#ball { touch-action: none }` 를 CSS에 추가한다.
- 이렇게 하면 터치 디바이스에서도 잘 작동할 것이다.

# Pointer capturing

todo

# Comment

# References

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step26.md)
- [@eyabc]()
- [@khw970421]()
- [@JeongShin]()
