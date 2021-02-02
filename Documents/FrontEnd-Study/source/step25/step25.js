// step25 drag and drop

let currentDroppable = null; // 🌟

const $ball = document.getElementById('ball');

$ball.addEventListener('dragstart', onDragStart);
$ball.addEventListener('mousedown', onMouseDown);

// 브라우저 자체적으로 이미지나 요소에 대한 드래그 앤 드롭을 지원하기 때문에 자동실행된다. 이와 아래 구현한 드래그 앤 드롭 로직이 충돌하는 걸 막기 위해서 'dragstart' 이벤트에 대해 아래와 같은 핸들러를 등록해야한다.
function onDragStart(){
    event.preventDefault();
}

function onMouseDown(){
    
    let shiftX = event.clientX - $ball.getBoundingClientRect().left; // ✏️
    let shiftY = event.clientY - $ball.getBoundingClientRect().top; // ✏️

    // 1. absolute와 zIndex 속성을 이용해, 공을 z-index 상 가장 위에서 움직이도록 하기 위한 코드
    $ball.style.position = 'absolute';
    $ball.style.zIndex = 1000;

    // 현재 위치한 부모에서 body로 직접 이동하여 body를 기준으로 위치를 지정함
    document.body.append($ball);

    // 공을 pageX, pageY 좌표 중앙에 위치시킴
    function moveAt(pageX, pageY){
        $ball.style.left = pageX - shiftX + 'px'; // ✏️
        $ball.style.top = pageY - shiftY + 'px'; // ✏️
    }

    // 포인터 아래로 공을 이동시킴
    moveAt(event.pageX, event.pageY);

    // ===============

    function onMouseMove(){
        moveAt(event.pageX, event.pageY);

        // 🌟 추가~~
        $ball.hidden = true;
        // 좌표가 윈도우 밖에 있으면 elemFromPoint() 메서드는 null을 반환한다
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        $ball.hidden = false;

        // 공을 윈도우 밖으로 드래그하는 경우는 제외시켜줘야한다.
        if(!elemBelow) return;

        // 잠재적으로 드롭할 수 있는 요소를 'droppable' 클래스로 지정한다.(다른 로직으로 변경 가능)
        let droppableBelow = elemBelow.closest('.droppable');

        if(currentDroppable != droppableBelow){
            // 들어오거나 날리거나...
            // 참고: 두 값 모두 null일 수 있다.
                //   currentDroppable=null 이벤트 전에 놓을 수 있는 요소 위에 있지 않다면(예: 빈 공간)
                //   droppableBelow=null 이벤트 동안 놓을 수 있는 요소 위에 있지 않다면

            // '날아가는 것'을 처리 (강조 제거)
            if(currentDroppable) leaveDroppable(currentDroppable);
            currentDroppable = droppableBelow;

            // '들어오는 것'을 처리
            if(currentDroppable) enterDroppable(currentDroppable);
        }
        // 🌟 ~~추가
    }

    // 2. mousemove로 공을 움직임
    // $ball이 아닌 document에서 `mousemove`를 추적해야하기 때문에 이렇게 작성한다.
    document.addEventListener('mousemove', onMouseMove);

    // =============

    function onMouseUp(){
        document.removeEventListener('mousemove', onMouseMove);
        $ball.onmouseup = null;
    }

    // 3. 공을 드롭하고, 불필요한 핸들러 제거
    $ball.addEventListener('mouseup', onMouseUp);
}

// 🌟
function enterDroppable(elem){
    elem.style.background = 'pink';
}

// 🌟
function leaveDroppable(elem){
    elem.style.background = '';
}