var windowHeight = window.innerHeight;
var scroll = 0;
var currentIndexSlideItem = 0;

var scrollStatus = {
    wheeling: false,
    functionCall: false
}
var scrollTimer = false;

function removeActiveSlider(showcaseSlideItem) {
    for (let i = 0; i < showcaseSlideItem.length; i++) {
        showcaseSlideItem[i].classList.remove('iz-showcase__slide--active');
    }
}

function scrollShowcase(e,ItemSlider,numberItemSlider) {
    var showCaseWrapper = document.querySelector('.iz-showcase__wrapper');
    var y = e.deltaY;
    var maxLength = (numberItemSlider - 1)*windowHeight;

    if(y > 0) {
        currentIndexSlideItem += 1;
        scroll += windowHeight;
        if(scroll <= maxLength) {
            //test = false;
            removeActiveSlider(ItemSlider);
            ItemSlider[currentIndexSlideItem].classList.add('iz-showcase__slide--active');
            showCaseWrapper.style.transform = "translate3d(0px,-" + scroll + "px, 0px)";
        }else {
            scroll = maxLength;
            currentIndexSlideItem = numberItemSlider - 1;
        }
    }else {
        currentIndexSlideItem -= 1;
        scroll -= windowHeight;
        if(scroll >= 0) {
            //test = false;
            removeActiveSlider(ItemSlider);
            ItemSlider[currentIndexSlideItem].classList.add('iz-showcase__slide--active');
            showCaseWrapper.style.transform = "translate3d(0px,-" + scroll + "px, 0px)";
        }else {
            scroll = 0;
            currentIndexSlideItem = 0;
        }
    }
}

$(document).ready(function() {

    var showCase = document.querySelector('.iz-showcase');
    var showcaseSlideItem = document.querySelectorAll('.iz-showcase__wrapper .iz-showcase__slide');

    for (let i = 0; i < showcaseSlideItem.length; i++) {
        showcaseSlideItem[i].style.height =  windowHeight + 'px';
    }

    showCase.onwheel = function(e) {
        scrollStatus.wheeling = true;

        if(!scrollStatus.functionCall) {
            scrollShowcase(e,showcaseSlideItem,showcaseSlideItem.length);
            scrollStatus.functionCall = true;
        }
        
        window.clearInterval(scrollTimer);

        scrollTimer = window.setTimeout(function() {
            scrollStatus.functionCall = false;
            scrollStatus.wheeling = false;
        }, 200);
    };

});