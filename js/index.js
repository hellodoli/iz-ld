//-- HEADER
// Navigation default(desktop)
const NAV_DEFAULT_NO_HASH = 'izNavDefault';
const NAV_DEFAULT = '#' + NAV_DEFAULT_NO_HASH;
const NAV_DEFAULT_MENU_NO_HASH = 'izNavDefaultMenu';
const NAV_DEFAULT_MENU = '#' + NAV_DEFAULT_MENU_NO_HASH;
// Navigation mobile
const NAV_TOGGLE_BURGER_NO_HASH = 'izMenuBurger';
const NAV_TOGGLE_BURGER = '#' + NAV_TOGGLE_BURGER_NO_HASH;
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

function navDesktopHover(speed) {

    var $sfHover_01 = $(NAV_DEFAULT_MENU + ' > li.has-megamenu'); // grid
    var $sfHover_02 = $(NAV_DEFAULT_MENU + ' li.menu-item-has-child');

    if ($sfHover_01.length > 0) effectSubMenuHover($sfHover_01, speed, 'grid');
    if ($sfHover_02.length > 0) effectSubMenuHover($sfHover_02, speed);
}

function toggleNavMobile($toogleNavMobile, speed) {
    $toogleNavMobile.on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $subMenu = $this.next('.sub-menu');
        if ($subMenu && $subMenu.length == 1) {
            if ($subMenu.hasClass('show')) {

                $subMenu.removeClass('show');
                $subMenu.slideUp(speed);
                $(this).removeClass('opened');

            } else {
                var $parent = $this.parent().parent();
                $parent.find('li.menu-item-has-child .sub-menu').removeClass('show');
                $parent.find('li.menu-item-has-child .sub-menu').slideUp(350);
                $parent.find('li.menu-item-has-child a').removeClass('opened');

                $this.addClass('opened');
                $subMenu.addClass('show');
                $subMenu.slideDown(speed);
            }
        }
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
    navDesktopHover(200);

    // 1.2 - Navigation Mobile
    //--- add class .collapse
    const navMobileSpeedCollapse = 350;
    var $navSubMenuMobile = $(NAV_MOBILE_MENU + ' .sub-menu');
    if ($navSubMenuMobile && $navSubMenuMobile.length > 0) {
        $navSubMenuMobile.css({
            'display': 'none',
        });
    }


    var $toggleBurger = $(NAV_TOGGLE_BURGER);
    var $navMobile = $(NAV_MOBILE);
    var $navMobileMenu = $(NAV_MOBILE_MENU);
    var $toogleNavMobile = $(NAV_MOBILE_MENU + ' li.menu-item-has-child > a');

    if ($navMobile && $navMobile.length == 1) {
        $navMobile.css({
            'display': 'none'
        });
    }

    if ($toggleBurger && $toggleBurger.length == 1) {
        $toggleBurger.on('click', function () {
            var $this = $(this);
            if ($this.hasClass('opened')) {
                // close nav mobile
                if ($navMobileMenu.length > 0) {
                    $navMobileMenu.find('li.menu-item-has-child .sub-menu').removeClass('show');
                    $navMobileMenu.find('li.menu-item-has-child .sub-menu').slideUp(navMobileSpeedCollapse);
                    $navMobileMenu.find('li.menu-item-has-child a').removeClass('opened');
                }

                if ($navMobile.length > 0) {
                    $navMobile.removeClass('show');
                    $this.removeClass('opened');
                    $navMobile.slideUp(navMobileSpeedCollapse);
                }

            } else {
                // open nav mobile
                if ($navMobile.length > 0) {
                    $this.addClass('opened');
                    $navMobile.addClass('show');
                    $navMobile.slideDown(navMobileSpeedCollapse);
                }
            }
        });
    }

    if ($toogleNavMobile && $toogleNavMobile.length > 0) {
        toggleNavMobile($toogleNavMobile, navMobileSpeedCollapse);
    }


    // 2/ FOOTER
    var $footer = $('.js-iz-footer');
    checkFooterFixed($footer);
}