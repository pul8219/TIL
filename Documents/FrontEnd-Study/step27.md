[문서 목록으로 돌아가기](README.md)

> # STEP 27
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 27 [Keyboard: key down and keyup](https://ko.javascript.info/keyboard-events)
> - 기한: 02/13(토) ~ 02/16(화)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

> 본 문서는 [Keyboard: key down and keyup](https://ko.javascript.info/keyboard-events) 문서를 기반으로 작성하였습니다.

# `input` 태그 내에서 일어나는 이벤트를 감지하는 것의 필요성

- `input` 태그에서 음성인식 기술로 입력되는 텍스트, 마우스를 통한 복사/붙여넣기 이루어질 수 있음
- keyboard 이벤트로 다루기엔 충분하지 않음. input이라는 이벤트도 있음 [이벤트: change, input, cut, copy, paste](https://ko.javascript.info/events-change-input)에서 자세히 배울 것

# Keyboard Events

## Keyboard Events 종류

- keyup: 키를 놓을 때
- keydown: 키를 누를 때, 누르는 동안 발생
- keypress: 키를 눌렀을 때 (권장X)

- 폼(form) 요소

  - 사용자가 정보를 입력할 수 있게 만들어 놓은 웹 요소
  - `Element.forms`: 포함된 폼요소 개수만큼의 `HTMLCollection` 형태의 폼배열을 반환한다.
  - `HTMLFormElement.elements` 속성: `document.forms.elements["userName"];` 처럼 name 속성이나 `id` 속성으로 폼요소 내의 폼들을 제어할 수 있는 속성.
    [HTMLFormElement.elements - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements)

# Keydown and Keyup

키를 누르면 `keydown` 이벤트가 발생하고 그 다음 키를 떼면(해제하면) `keyup` 이벤트가 발생한다.

## `event.code` and `event.key`

| key       | `event.key`    | `event.code` |
| --------- | -------------- | ------------ |
| `Z`       | `z`(lowercase) | `KeyZ`       |
| `Shift+Z` | `Z`(uppercase) | `KeyZ`       |

모든 키는 `code`를 가지며 이는 키보드에서 해당 키의 위치에 의존한다.

- Letter keys `"Key<letter>"`: `"KeyA"`, `"KeyB"` etc.
- Digit keys `"Digit<number>"`: `"Digit0"`, `"Digit1"` etc.
- Special keys `"Enter"`, `"Backspace"`, `"Tab"` etc.

# Comment

# References

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step27.md)
- [@eyabc]()
- [@khw970421]()
- [@JeongShin]()
