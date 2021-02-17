// document.addEventListener('keydown', function(){
//     if(event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)){
//         alert('Undo!');
//     }
// });



//=========================
// 기본 동작 취소
// const $input = document.querySelector('#inputTag');

// function test({ key }){
//     if(key === '0' || key === '9') return;
//     event.preventDefault(); // 기본 동작 취소
// }

// $input.addEventListener('keydown', test);

const dom = document.querySelector('body');
dom.addEventListener("keydown", e => {
    console.log(e.key, e.code)
});