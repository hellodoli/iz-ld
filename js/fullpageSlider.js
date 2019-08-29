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