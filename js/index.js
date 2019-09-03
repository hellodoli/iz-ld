//-- HEADER
function effectSubMenuHover($sfHover, duration, displayStyle = 'block') {

    $sfHover.hover(function () {
        var thiss = $(this);
        var $subMenu = thiss.children('.sub-menu');

        $subMenu.css({
            'display': displayStyle,
            'transition': ''
        });

        setTimeout(function () {
            thiss.addClass('sfHover');
            $subMenu.css({
                'margin-top': 0,
                'opacity': 1,
                'transition': 'all ' + duration + 'ms' + ' ease-in-out'
            });
        }, duration);
    }, function () {
        var thiss = $(this);
        var $subMenu = thiss.children('.sub-menu');

        thiss.removeClass('sfHover');

        $subMenu.css({
            'margin-top': '10px',
            'opacity': 0,
            'transition': 'all ' + duration + 'ms' + 'ease-in-out'
        });

        setTimeout(function () {
            $subMenu.css({
                'display': 'none',
                'transition': ''
            });
        }, duration);
    });
}

function subMenuHover() {
    var $sfHover_01 = $('.iz-navigation__menu > li.has-megamenu'); // grid

    var $sfHover_02 = $('.iz-navigation__menu > li:not(.has-megamenu)');
    var $sfHover_03 = $('.iz-navigation__menu .sub-menu > li.menu-item-has-child');

    if ($sfHover_01.length > 0) effectSubMenuHover($sfHover_01, 200, 'grid');

    if ($sfHover_02.length > 0) effectSubMenuHover($sfHover_02, 200);

    if ($sfHover_03.length > 0) effectSubMenuHover($sfHover_03, 200);
}

function collapseNavMobile() {
    var $btnToggleNavMobile = $('.iz-navigation-mobile__menu li.menu-item-has-child > a');

    $btnToggleNavMobile.on('click', function (e) {
        e.stopPropagation();
        $(this).next('.sub-menu').collapse('toggle');
    });
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
    //--- init Header
    var $navSubMenu = $('.iz-navigation__menu .sub-menu');
    var $navMobileSubMenu = $('.iz-navigation-mobile__menu .sub-menu');

    if ($navSubMenu && $navSubMenu.length > 0) {
        $navSubMenu.css({
            'display': 'none',
            'margin-top': '10px',
            'opacity': 0
        });
    }

    if ($navMobileSubMenu && $navMobileSubMenu.length > 0) {
        $('.iz-navigation-mobile').addClass('collapse');

        $navMobileSubMenu.addClass('collapse');
        $navMobileSubMenu.attr('data-parent', '#' + $navMobileSubMenu.parent().attr('id'));
    }

    //--- hover nav desk
    subMenuHover();
    //--- collapse nav mobile
    collapseNavMobile();

    var $footer = $('.js-iz-footer');
    checkFooterFixed($footer);
}