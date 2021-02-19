const $thumb = document.querySelector('.thumb');
const $slider = document.querySelector('#slider');

$thumb.addEventListener('dragstart', onDragStart);
$thumb.addEventListener('mousedown', onMouseDown);


let sliderY = $slider.getBoundingClientRect().top;
let thumbY = $thumb.getBoundingClientRect().top;
// let sliderYReal = window.pageYOffset - $slider.getBoundingClientRect().top;
// console.log(sliderY);
// console.log(sliderYReal);
// console.log(window.getComputedStyle($slider).width);
// let minXBoundary = window.pageXOffset + window.getComputedStyle($slider).margin;
// let maxXBoundary = window.getComputedStyle($slider).margin + window.getComputedStyle($slider).width;
let minXBoundary = $slider.getBoundingClientRect().left;
let maxXBoundary = $slider.getBoundingClientRect().right;

// console.log(minXBoundary);
// console.log(maxXBoundary-13);

function onDragStart(){
    event.preventDefault();
}

function onMouseDown(){
    let shiftX = event.clientX - $thumb.getBoundingClientRect().left;
    let shiftY = event.clientY - $thumb.getBoundingClientRect().top;


    $thumb.style.position = 'absolute';
    $thumb.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY){
        if(pageX < minXBoundary){
            $thumb.style.left = minXBoundary + 'px';
        }
        else if(pageX > maxXBoundary){
            $thumb.style.left = maxXBoundary - (5*2) + 'px';
        }
        else{
            $thumb.style.left = pageX - shiftX + 'px';

        }
        $thumb.style.top = thumbY + 'px';
    }

    function onMouseMove(){
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    function onMouseUp(){
        document.removeEventListener('mousemove', onMouseMove);
        $thumb.onmouseup = null;

    }

    $thumb.addEventListener('mouseup', onMouseUp);
}