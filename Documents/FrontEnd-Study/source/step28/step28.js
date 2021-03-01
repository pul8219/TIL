// window.addEventListener('scroll', function(){
//     document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
// });

// =====================
// 과제
// endless scroll
const article = document.querySelector('article');

// 문서에 스크롤을 만들어주기 위해 문서 크기만큼 미리 코드를 넣어주는 함수
const addSample = () => {
    while(window.innerHeight >= document.body.offsetHeight){
        let today = new Date();
        article.insertAdjacentHTML('beforeend', `<div><p>Date: ${today}</p></div>`);
    }
};

window.onload = () => {
    addSample();
};

window.addEventListener('scroll', function(){
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        let today = new Date();
        article.insertAdjacentHTML('beforeend', `<div><p>Date: ${today}</p></div>`);
    }
});


// ===============
// 과제
// Up/down button

// const article = document.querySelector('article');
// const goTopBtn = document.querySelector('#go-top');

// // 문서에 스크롤을 만들어주기 위해 문서 크기만큼 미리 코드를 넣어주는 함수
// const addSample = () => {
//     while(window.innerHeight >= document.body.offsetHeight){
//         article.insertAdjacentHTML('beforeend', `<div class='block'>Sample</div>`);
//     }
// };

// window.onload = () => {
//     addSample();
// };

// window.addEventListener('scroll', function(){
//     if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
//         article.insertAdjacentHTML('beforeend', `<div class=
//         block>Sample</div>`);
//     }

//     if(window.innerHeight < document.querySelector('html').scrollTop){
//         document.querySelector('#go-top').style.display = "block";
//     }
//     else{
//         document.querySelector('#go-top').style.display = "none";
//     }
// });

// goTopBtn.addEventListener('click', function(){
//     window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: 'smooth'
//     });
// });