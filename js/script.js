//console.log("연결");
console.log("load");

//셀렉터 찾기.
//내가 찾아야하는 id또는class에게 이름을 지어준다
//ex) var $이름 = document.quertSelector("#id이름 or .class이름")
var $cursorDot = document.querySelector("#cursor-dot");
var $cursorBG = document.querySelector("#cursor-bg");
var $progress = document.querySelector("#progress");
var $list = document.querySelector(".section");
var $listEl = $list.querySelectorAll("a");
var $btnTop = document.querySelector("#btn-top");
var $btnGallery = document.querySelector("#btn-gallery");
var $slider = document.querySelector("#slider");
var $gnList = document.querySelector(".gn-list");
var $gnListEl = $gnList.querySelectorAll("a");
var $section = document.querySelectorAll(".section");
console.log($section);

//top button
$btnTop.addEventListener("click", onClickBtnTop);
function onClickBtnTop(e){
    e.preventDefault();
    TweenMax.to(window, 0.45, {scrollTo: {y: 0}, ease: Quad.easeInOut});
}

//nav scroll
for(var i = 0; i < $gnListEl.length; i++){
    $gnListEl[i].addEventListener("click", function(e){
        e.preventDefault();
        //var $el = e.currentTarget, id = Array.prototype.slice.call($gnListEl).indexOf($el);
        //var posY = $section[id + 1].offsetTop;
        
        var $el = e.currentTarget, id = $el.getAttribute("href");
        console.log($el);
        var posY = document.querySelector("#" + id).offsetTop;
        TweenMax.to(window, 0.4, {scrollTo:{y: posY}});
    });
}

//gallery scroll버튼
$btnGallery.addEventListener("click", onClickGoToSlider)
function onClickGoToSlider(e){
    e.preventDefault();
    var posY = $slider.offsetTop;
    TweenMax.to(window, 0.4, {scrollTo:{y: posY}});
}

//커서 움직이기.
window.addEventListener("mousemove", onMouseMoveWindow);

function onMouseMoveWindow(e) {
    var posX = e.clientX, posY = e.clientY;
// console.log(e);

    //현재 커서의 좌표값.
    // $cursorDot.style.top = posY + 'px';
    // $cursorDot.style.left = posX + 'px';
    TweenMax.killTweensOf($cursorDot);
    TweenMax.killTweensOf($cursorBG);
    TweenMax.killTweensOf($progress);
    TweenMax.to($cursorDot, 0.15, {css: {top: posY, left: posX}});
    TweenMax.to($cursorBG, 0.2, {css: {top: posY, left: posX}});
    TweenMax.to($progress, 0.25, {css: {top: posY, left: posX}});
}


//그니까 아래 두개 for문은 각각 active라는 class가 있는지 확인하고 있으면 실행 없으면 삭제 하라는것 같은데
//그니까 한마디로 mouseenter(클릭)시에 active가 반응하고
//mouseleave(마우스를 땠을때) active가 삭제 되게 하라는거니까
//클릭 또는 호버시에 색이 변경됬다 안됬다 하게 하라는 명령인거같음
for(var i = 0; i < $listEl.length; i++){
    // console.log($listEl[i]);
    $listEl[i].addEventListener('mouseenter', function(){
        // console.log('enter');
        if(!$cursorDot.classList.contains("active")){
            $cursorDot.classList.add("active");
        }
        if(!$cursorBG.classList.contains("active")){
            $cursorBG.classList.add("active");
        }
        if(!$progress.classList.contains("active")){
            $progress.classList.add("active");
        }
    })
    $listEl[i].addEventListener('mouseleave', function(){
        // console.log('leave');
        if($cursorDot.classList.contains("active")){
            $cursorDot.classList.remove("active");
        }
        if($cursorBG.classList.contains("active")){
            $cursorBG.classList.remove("active");
        }
        if($progress.classList.contains("active")){
            $progress.classList.remove("active");
        }
    });
}
//contains = 문자열 요소 확인
//remove = 삭제


// function pageScroll() {
//     window.scrollBy(0,1);
//     scrolldelay = setTimeout(pageScroll,10);
// }