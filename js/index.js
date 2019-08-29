//-- HEADER
function initSubMenu($navSubMenu) {
    if ($navSubMenu && $navSubMenu.length > 0) {
        $navSubMenu.css({
            'display': 'none'
        });
    }
}

function effectSubMenuHover($sfHover, displayStyle = 'block') {

    $sfHover.hover(function () {
        var thiss = $(this);
        thiss.children('.sub-menu').css({
            'display': displayStyle
        });
        setTimeout(function () {
            thiss.addClass('sfHover');
        }, 100);
    }, function () {
        var thiss = $(this);
        thiss.removeClass('sfHover');
        setTimeout(function () {
            thiss.children('.sub-menu').css({
                'display': 'none'
            });
        }, 300);
    });
}

function subMenuHover() {

    var $sfHover_01 = $('.iz-navigation__menu > li');
    var $sfHover_02 = $('.iz-navigation__menu .sub-menu > li.menu-item-has-child');

    if ($sfHover_01.length > 0) effectSubMenuHover($sfHover_01, 'grid');

    if ($sfHover_02.length > 0) effectSubMenuHover($sfHover_02);
}

//--- FOOTER
function checkFooterFixed($footer) {
    if ($footer.length === 1) {
        if ($footer.hasClass('js-iz-footer--fixed') || $footer.hasClass('iz-footer--fixed')) {
            var $wrappBeforeFooter = $footer.prev();
            $wrappBeforeFooter.css('margin-bottom', $footer.outerHeight());
        }
    }
}

function initHeaderAndFooter() {
    var $navSubMenu = $('.iz-navigation__menu .sub-menu');
    initSubMenu($navSubMenu);

    var $footer = $('.js-iz-footer');
    checkFooterFixed($footer);

    subMenuHover();
}