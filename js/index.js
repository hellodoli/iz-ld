//--- ELEMENTS
// Navbar
const NAVBAR_DEFAULT = '.iz-navbar';
const NAVBAR_DEFAULT_FAKE = '.iz-navbar-fake';
// Main
const MAIN = '.iz-main';
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

//--- HEADER FUNC
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

        $subMenu.animate({
            'margin-top': '10px',
            'opacity': 0
        }, duration, function () {
            $this.removeClass('sfHover');
            $subMenu.css({
                'display': 'none',
            });
        });
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

function scrollTopWindow($navbarFixed, offsetTop) {
    const $window = $(window);
    $window.on('scroll', function () {
        if ($window.scrollTop() > offsetTop) {
            if ($navbarFixed.hasClass('on-scroll-show')) $navbarFixed.removeClass('on-scroll-show');
            $navbarFixed.addClass('on-scroll-hide');
        } else {
            if ($navbarFixed.hasClass('on-scroll-hide')) $navbarFixed.removeClass('on-scroll-hide');
            $navbarFixed.addClass('on-scroll-show');
        }
    });
}

//--- FOOTER FUNC
function checkFooterFixed($footer) {
    if ($footer.length === 1) {
        if ($footer.hasClass('iz-footer--fixed')) {
            var $wrappBeforeFooter = $footer.prev();
            $wrappBeforeFooter.css('margin-bottom', $footer.outerHeight());
        }
    }
}

//-- MAIN FUNC
function initHeaderAndFooter() {

    // 1/ HEADER
    // 1.1 - Navigation default
    //--- make all .sub-menu display: 'none'
    const $navDefaultSubMenu = $(NAV_DEFAULT + ' ' + '.sub-menu');
    if ($navDefaultSubMenu && $navDefaultSubMenu.length > 0) {
        $navDefaultSubMenu.css({
            'display': 'none',
            'margin-top': '10px',
            'opacity': 0
        });
    }

    //--- hover navigation desk
    navDesktopHover(200);

    // 1.2 - Navigation Mobile
    const navMobileSpeedCollapse = 350;

    //--- display: none for menu
    const $navMobile = $(NAV_MOBILE);
    const $navMobileSubMenu = $(NAV_MOBILE_MENU + ' .sub-menu');

    if ($navMobile && $navMobile.length === 1) {
        $navMobile.css({
            'display': 'none'
        });
    }

    if ($navMobileSubMenu && $navMobileSubMenu.length > 0) {
        $navMobileSubMenu.css({
            'display': 'none',
        });
    }

    //--- click toggle
    const $toggleBurger = $(NAV_TOGGLE_BURGER);
    const $navMobileMenu = $(NAV_MOBILE_MENU);
    const $toogleNavMobile = $(NAV_MOBILE_MENU + ' li.menu-item-has-child > a');

    if ($toggleBurger && $toggleBurger.length === 1) {
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

    if ($toogleNavMobile && $toogleNavMobile.length > 0) toggleNavMobile($toogleNavMobile, navMobileSpeedCollapse);

    // 1.3 - Scroll fixed header
    const $navbarDefaultFake = $(NAVBAR_DEFAULT_FAKE);
    const $navbarFixed = $(NAVBAR_DEFAULT + '.iz-navbar--fixed');
    if (( $navbarDefaultFake && $navbarDefaultFake.length === 1 ) && ( $navbarFixed && $navbarFixed.length === 1 )) {
        //--- cal navbar fake
        $navbarDefaultFake.css({ 'height': $(NAVBAR_DEFAULT).outerHeight() });
        //--- scroll fixed
        const offset = $(MAIN).offset().top + 20;
        scrollTopWindow($navbarFixed, offset);
    }

    // 2/ FOOTER
    const $footer = $('.iz-footer');
    checkFooterFixed($footer);
}

function initJarallax() {
    const $izJarallax = $('.iz-jarallax');
    if($izJarallax && $izJarallax.length > 0) {
        $izJarallax.jarallax();
    }
}

function initCubePortfolio() {
    $('.iz-portfolio__container').each(function () {
        var t = $(this);
        var d = this.dataset;
        const filters = '#' + t.prev().attr('id');
        const layoutMode = d.layoutMode || 'grid';
        const gridAdjustment = d.gridAdjustment || 'responsive';
        const gapHorizontal = parseInt(d.gapHorizontal) || 35;
        const gapVertical = parseInt(d.gapVertical) || 30;
        const mediaQueries = [
            {
                width: 1500,
                cols: 5
            },
            {
                width: 1100,
                cols: 4
            },
            {
                width: 800,
                cols: 3
            },
            {
                width: 480,
                cols: 2,
                options: {
                    caption: '',
                    gapHorizontal: 30,
                    gapVertical: 10
                }
            }
        ];
        
        $(this).cubeportfolio({
            filters: filters,
            layoutMode: layoutMode,
            gridAdjustment: gridAdjustment,
            gapHorizontal: gapHorizontal,
            gapVertical: gapVertical,
            mediaQueries: mediaQueries,
            defaultFilter: '*',
            animationType: 'slideLeft',
            caption: 'zoom',
        });
    });


    /*$('#iz-portfolio-grid-01').cubeportfolio({
        // options

        mediaQueries: [{
            width: 1500,
            cols: 5,
        }, {
            width: 1100,
            cols: 4,
        }, {
            width: 800,
            cols: 3,
        }, {
            width: 480,
            cols: 2,
            options: {
                caption: '',
                gapHorizontal: 30,
                gapVertical: 10,
            }
        }],
    });*/
}