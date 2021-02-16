[문서 목록으로 돌아가기](README.md)

> # STEP 27
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 27 [Keyboard: keydown and keyup](https://ko.javascript.info/keyboard-events)
> - 기한: 02/13(토) ~ 02/16(화)

# 보충 필요

# 목차

- [`input` 태그 내에서 일어나는 이벤트를 감지하는 것의 필요성](#input-태그-내에서-일어나는-이벤트를-감지하는-것의-필요성)
- [Keyboard Events](#keyboard-events)
- [Keydown and Keyup](#keydown-and-keyup)
- [Auto-repeat](#autorepeat)
- [Default actions](#default-actions)
- [Legacy](#legacy)

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

> 본 문서는 [Keyboard: keydown and keyup](https://ko.javascript.info/keyboard-events) 문서를 기반으로 작성하였습니다.

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

## `event.key` and `event.code`

- `event.key`는 키의 '의미'에 집중(OS에서 다른 언어를 지원해서 언어를 전환할 수 있다면 'z' 키를 눌렀을 때 z 말고 다른 문자가 나올 수도 있다는 것)
- `event.code`는 정확히 어떤 키가 눌렸는지에 집중(Shift를 예로 들면 키보드에는 2개의 Shift키가 있는데 이를 구분하는 것 처럼)

| key         | `event.key`    | `event.code`                |
| ----------- | -------------- | --------------------------- |
| `Z`         | `z`(lowercase) | `KeyZ`                      |
| `Shift+Z`   | `Z`(uppercase) | `KeyZ`                      |
| `F1`        | `F1`           | `F1`                        |
| `Backspace` | `Backspace`    | `Backspace`                 |
| `Shift`     | `Shift`        | `ShiftRight` or `ShiftLeft` |

- Letter keys `"Key<letter>"`: `"KeyA"`, `"KeyB"` etc. (`Key<letter>`의 K가 소문자가 아닌 대문자임에 유의)
- Digit keys `"Digit<number>"`: `"Digit0"`, `"Digit1"` etc.
- Special keys `"Enter"`, `"Backspace"`, `"Tab"` etc.

## 단축키 핸들링하기

단축키(hotkey)를 다뤄보자. `Ctrl+Z`(Mac에서는 `Cmd+Z`)는 'Undo'(실행취소)를 의미하는 단축키다. 이를 `keydown` 이벤트를 사용해서 어떤 키가 눌렸는지 체크하는 이벤트 핸들러를 정의함으로써 구현해보자. 이때 `event.key`와 `event.code` 중에 어떤 속성을 사용해서 값을 체크해야할까? 일단 `event.key`를 사용하면 언어에 따라 문자값이 바뀌니 `event.code`를 사용해서 코드를 작성해보자.

```js
document.addEventListener('keydown', function () {
  if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!');
  }
});
```

> ❓TODO `Z`를 먼저 누르고 `Ctrl`을 누르는 경우엔 왜 동작하지 않는걸까?

`event.code`를 사용할 시 서로 다른 레이아웃을 가진 키보드의 경우를 고려하지 않아 예상치 못한 결과가 생길 수도 있다. (독일 사용자의 경우 US와 다른 키보드 배치 때문에 `Y`라 써진 키를 눌러도 ㅡ US 입장에선 물리적으로 Z키에 위치한 키이기 때문에 ㅡ `event.code`의 결과는 `KeyZ`로 나올 수 있음) 이는 서로 다른 키 레이아웃에서의 같은 문자가 서로 다른 physical keys에 매칭되기 때문이다. 다만 다행히(?) 이런 경우는 몇몇 키 코드에서만 나타난다. (e.g. `KeyA`, `KeyQ`, `KeyZ` ㅡ 주로 키보드 가장자리에 있는 문자임을 볼 수 있다.) `Shift`키 같은 special keys에서는 이런 일이 일어나지 않는다. [더 알아보기](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system)

결론

- 키보드 레이아웃에 의존적인 문자를 다루는 경우(??), `event.key`를 사용하는 것이 좋다. ㅡ 그러니까 레이아웃이 다른 키보드에서도 예를 들어 'z'를 누르는 것(의미적)이 중요하다면 `event.key`를 사용하는 것이 좋다는 것으로 이해했다.
- 사용자가 언어를 전환하더라도 같은 물리적 위치에 있는 키로써 처리해야한다면, `event.code`를 사용하는 것이 좋다. ㅡ 만약 언어를 전환하더라도 같은 위치의 키를 눌러 단축키를 사용해야한다면 `event.code`를 사용하는 것이 좋을 것

# Auto-repeat

어떤 키를 긴 시간 동안 계속 누르고 있으면 `keydown` 이벤트가 누르는 동안 계속해서 발생한다. 이를 "auto-repeat"이라고 한다. 그러다 손을 떼면 `keyup`이벤트가 발생하며 반복이 끝난다. auto-repeat이 일어날 때, 이벤트 객체는 `event.repeat` 속성을 가지고 있으며 이때 값은 `true`이다.

# Default actions

키에도 기본 동작(default actions)이 있다.

- 문자 키를 누르면 해당 문자가 화면에 나타난다.
- `Delete` 키를 누르면, 문자가 삭제된다.
- `PageDown` 키를 누르면, 페이지가 스크롤된다.
- `Ctrl+S` 단축키를 누르면, 페이지를 저장할거냐는 창이 열린다.(html 저장하는 창 같은??)
- ...

## 기본 동작 취소

OS 기반의 special keys들은 제외하고, 다른 여러 키들의 `keydown` 이벤트에 대한 기본 동작을 취소하는 것이 가능하다.

### 예제1

`input` 태그에 숫자 0과 9만 입력할 수 있게 하는 예제(이외 다른 키를 눌렀을 때는 기본 동작을 취소시킴)

- 방법 1) `event` 객체의 `event.preventDefault()` 메서드를 사용해 기본동작 취소

```html
<input id="inputTag" />
```

```js
const $input = document.querySelector('#inputTag');

function test({ key }) {
  if (key === '0' || key === '9') return;
  event.preventDefault(); // 기본 동작 취소
}

$input.addEventListener('keydown', test);
```

- 방법 2) `on<event>`를 사용해 이벤트를 할당한 경우, `false`를 반환하게 해서 기본 동작 취소(`addEventListener`를 사용하는 경우 `return false`는 동작하지 않음)

```html
<script>
  const test = ({ key }) => {
    return key === '0' || key === '9'; // 눌린 키가 0 혹은 9가 아니면 false를 리턴할 것임
  };
</script>
<input onkeydown="return test(event)" />
```

### 예제2

핸드폰 번호를 입력하는 `input` 입력창 만들기 (`+`, `()`, `-` 와 같은 문자도 입력 허용하기)

```html
<script>
  const checkPhoneKey = ({ key }) => {
    return (
      (key >= '0' && key <= '9') ||
      key === '+' ||
      key === '(' ||
      key === ')' ||
      key === '-'
    );
  };
</script>
<input
  onkeydown="return checkPhoneKey(event)"
  placeholder="Phone number please"
  type="tel"
/>
```

근데 위 예제 코드에서는 조건에 맞지 않는 key들에 대한 동작은 모두 기본동작이 취소돼버려 `Backspace`, `Left`, `Right`, `Delete`와 같은 special keys들이 동작하지 않는다. 이를 해결하기 위해 다음과 같이 코드를 수정해준다.

```html
<script>
    const checkPhoneKey = ({ key }) => {
                return (key >= '0' && key <= '9') || key === '+' || key === '(' || key === ')' || key === '-' || key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
            };
    </script>
    <input onkeydown="return checkPhoneKey(event)"
```

그러나 input 입력창에 영문자등을 복사해 마우스 우클릭 + 붙여넣기 를 이용하면 코드에서 정한 조건들에 벗어나는 문자도 입력창에 입력이 가능하다. input event를 추적해 값을 확인하고 잘못된 값이 들어왔을 때 이를 강조하는 방식으로 해결 가능할 것이다.

# Legacy

## `keypress`는 사용하지 말자

이전에 `keyCode`, `charCode`, `which`와 같은 속성들을 가진 `keypress`라는 이벤트가 있었다. 이 이벤트는 더이상 사용이 권장되지 않는 이벤트이다. 사용을 지양하자. (여전히 이를 지원하는 브라우저가 있어 코드가 먹힐 수는 있으나 많은 브라우저에서 호환X. 웹표준에서도 삭제됐음.)

[keypress event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event)

> @deprecated
>
> @deprecated 태그는 클래스나 메소드 등을 더 이상 사용이 권장하지 않는 경우에 사용한다. 사용이 권장되지 않는다는 것은 사용을 불가능하다는 것은 아니다. 다만 권장을 하지 않고 차후에 없어질 수도 있다는 것을 의미한다.

# Comment

# References

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step27.md)
- [@eyabc]()
- [@khw970421]()
- [@JeongShin]()
