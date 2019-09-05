//-- HEADER
// Navigation default(desktop)
const NAV_DEFAULT_NO_HASH = 'izNavDefault';
const NAV_DEFAULT = '#' + NAV_DEFAULT_NO_HASH;
const NAV_DEFAULT_MENU_NO_HASH = 'izNavDefaultMenu';
const NAV_DEFAULT_MENU = '#' + NAV_DEFAULT_MENU_NO_HASH;
// Navigation mobile
const NAV_MOBILE_NO_HASH = 'izNavMobile';
const NAV_MOBILE = '#' + NAV_MOBILE_NO_HASH;
const NAV_MOBILE_MENU_NO_HASH = 'izNavMobileMenu';
const NAV_MOBILE_MENU = '#' + NAV_MOBILE_MENU_NO_HASH;

function effectSubMenuHover($sfHover, duration, displayStyle = 'block') {

    $sfHover.on('mouseenter', function () {
        var $this = $(this);
        var $subMenu = $this.children('.sub-menu');

        if ($subMenu && $subMenu.length > 0) {

            $subMenu.css({
                'display': displayStyle,
                'transition': ''
            });

            $this.addClass('sfHover');

            $subMenu.animate({
                'margin-top': 0,
                'opacity': 1,
            }, duration);
        }
    });

    $sfHover.on('mouseleave', function () {
        var $this = $(this);
        var $subMenu = $this.children('.sub-menu');

        if ($subMenu && $subMenu.length > 0) {
            $subMenu.animate({
                'margin-top': '10px',
                'opacity': 0
            }, duration, function () {
                $this.removeClass('sfHover');
                $subMenu.css({
                    'display': 'none',
                });
            });
        }
    });
}

function subMenuHover() {

    var $sfHover_01 = $(NAV_DEFAULT_MENU + ' > li.has-megamenu'); // grid

    var $sfHover_02 = $(NAV_DEFAULT_MENU + ' > li:not(.has-megamenu)');
    var $sfHover_03 = $(NAV_DEFAULT_MENU + ' .sub-menu > li.menu-item-has-child');

    if ($sfHover_01.length > 0) effectSubMenuHover($sfHover_01, 200, 'grid');

    if ($sfHover_02.length > 0) effectSubMenuHover($sfHover_02, 200);

    if ($sfHover_03.length > 0) effectSubMenuHover($sfHover_03, 200);
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

//-- MAIN
function initHeaderAndFooter() {
    // 1/ HEADER
    // 1.1 - Navigation default
    //--- make all .sub-menu display: 'none'
    var $navSubMenu = $(NAV_DEFAULT + ' ' + '.sub-menu');
    if ($navSubMenu && $navSubMenu.length > 0) {
        $navSubMenu.css({
            'display': 'none',
            'margin-top': '10px',
        });
    }

    //--- hover navigation desk
    subMenuHover();

    // 1.2 Navigation Mobile
    //--- add class .collapse
    var $navSubMenu = $(NAV_MOBILE_MENU + ' .sub-menu');
    if ($navSubMenu && $navSubMenu.length > 0) {
        $navSubMenu.css({
            'display': 'none'
        });
    }

    var $toogleNavMobile = $(NAV_MOBILE_MENU + ' li.menu-item-has-child > a');
    if ($toogleNavMobile && $toogleNavMobile.length > 0) {
        $toogleNavMobile.on('click', function () {
            var $this = $(this);
            var $subMenu = $this.next('.sub-menu');
            if ($subMenu && $subMenu.length == 1) {
                if ($subMenu.hasClass('show')) {

                    $subMenu.removeClass('show');
                    $subMenu.slideUp(350);
                    $(this).removeClass('opened');

                } else {
                    var $parent = $this.parent().parent();
                    $parent.find('li.menu-item-has-child .sub-menu').removeClass('show');
                    $parent.find('li.menu-item-has-child .sub-menu').slideUp(350);
                    $parent.find('li.menu-item-has-child a').removeClass('opened');

                    $this.addClass('opened');
                    $subMenu.addClass('show');
                    $subMenu.slideDown(350);
                }
            }
        });
    }

    // 2/ FOOTER
    var $footer = $('.js-iz-footer');
    checkFooterFixed($footer);
}