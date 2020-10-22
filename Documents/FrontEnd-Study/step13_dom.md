# STEP 13

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위:

[객체](https://gitlab.com/siots-study/topics/-/wikis/dom)

- 기한: 10/17(토) ~ 10/20(화) (시험기간 고려, 10/22(목)까지 연장)

# 보충 필요

---

# DOM

## 목차

## BOM 이란?

BOM(Browser Object Model: 브라우저 객체 모델)

웹브라우저의 구성요소들이 객체화되어있는데 이 객체들을 모아놓은 모델을 의미한다. 이를 통해 웹브라우저를 제어할 수 있다.

- 웹 브라우저의 버튼, URL 주소창, 타이틀 바 등 웹브라우저 창 및 웹페이지 일부분을 제어할 수 있게끔 한다. BOM은 window 객체를 통해 접근이 가능하다.

![](https://user-content.gitlab-static.net/51032eabfd2ef6cb86cddb0d834edfb3a3e1bcd5/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f393939424444333335394344423037343131)

### 대표적인 BOM 객체들

1. window 객체: 브라우저 전체를 담당하는 객체 (전역 객체)

window 객체 아래에 location, navigator와 같은 BOM객체와 DOM 객체들이 포함됨

`alert()`, `confirm()`, `prompt()` 는 window 객체의 메서드들이다.

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- alert() -->
    <input
      type="button"
      onclick="alert(window.location)"
      value="alert(window.location)"
    />

    <!-- confirm() -->
    <input type="button" value="confirm" onclick="func_confirm()" />
    <script>
      function func_confirm() {
        if (confirm('삭제하시겠습니까?')) {
          alert('삭제되었습니다.');
        } else {
          // alert('cancel');
        }
      }
    </script>

    <!-- prompt() -->
    <input type="button" value="prompt" onclick="func_prompt()" />
    <script>
      function func_prompt() {
        if (prompt('ID를 입력하세요') === 'yurim') {
          alert('welcome');
        } else {
          alert('Access denied');
        }
      }
    </script>

    <input
      type="button"
      onclick="window.open('index.html')"
      value="window.open('index.html')"
    />
  </body>
</html>
```

2. location 객체: 브라우저의 URL 주소를 다루는 객체
3. navigator 객체: 웹 브라우저 및 브라우저 환경 정보를 다루는 객체
4. screen 객체: 웹 브라우저 화면이 아닌, 사용자의 모니터 정보를 제공하는 객체
5. history 객체: 현재 브라우저가 접근했던 URL history

TODO BOM 객체들의 각종 속성, 메소드 내용 추가 필요

---

## DOM이란?

---

## DOM tree

---

# References

https://gitlab.com/siots-study/topics/-/wikis/dom

https://opentogether.tistory.com/110

https://www.zerocho.com/category/JavaScript/post/573b321aa54b5e8427432946

https://velog.io/@bungouk6829/Javascript

https://iwantadmin.tistory.com/108
