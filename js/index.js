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

const NAV_TOGGLE_BURGER_DESKTOP_NO_HASH = 'izMenuBurgerDesktop';
const NAV_TOGGLE_BURGER_DESKTOP = '#' + NAV_TOGGLE_BURGER_DESKTOP_NO_HASH;
const NAV_SOLID_MENU_NO_HASH = 'izNavSolidMenu';
const NAV_SOLID_MENU = '#' + NAV_SOLID_MENU_NO_HASH;

// Navigation mobile
const NAV_TOGGLE_BURGER_NO_HASH = 'izMenuBurger';
const NAV_TOGGLE_BURGER = '#' + NAV_TOGGLE_BURGER_NO_HASH;
const NAV_MOBILE_NO_HASH = 'izNavMobile';
const NAV_MOBILE = '#' + NAV_MOBILE_NO_HASH;
const NAV_MOBILE_MENU_NO_HASH = 'izNavMobileMenu';
const NAV_MOBILE_MENU = '#' + NAV_MOBILE_MENU_NO_HASH;
// Scroll Header Style
const SCROLL_NAVBAR_STYLE_DEFAULT = 'SCROLL_NAVBAR_STYLE_DEFAULT';
const SCROLL_NAVBAR_STYLE_SOLID = 'SCROLL_NAVBAR_STYLE_SOLID';


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
                $parent.find('li.menu-item-has-child .sub-menu').slideUp(speed);
                $parent.find('li.menu-item-has-child a').removeClass('opened');

                $this.addClass('opened');
                $subMenu.addClass('show');
                $subMenu.slideDown(speed);
            }
        }
    });
}

function toggleBurgerNavMobile($toggleBurger, $navMobileMenu, $navMobile, navMobileSpeedCollapse) {


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

var shouldScrollHide = true;
function scrollNavbarDefault($navbarFixed, offsetTop) {

    console.log('page will scroll DEFAULT style');
    console.log('offsetTop: ', offsetTop);

    const $window = $(window);
    $window.on('scroll', function () {
        if ($window.scrollTop() > offsetTop) {

            if(shouldScrollHide) {
                if ($navbarFixed.hasClass('on-scroll-show')) {
                    $navbarFixed.removeClass('on-scroll-show');
                    $navbarFixed.addClass('on-scroll-hide');
                }
            }
            
            var windowScrollHeight = document.documentElement.scrollHeight;
            if(windowScrollHeight - window.pageYOffset === window.innerHeight) {
                if ($navbarFixed.hasClass('on-scroll-hide')) $navbarFixed.removeClass('on-scroll-hide');
                $navbarFixed.addClass('on-scroll-show');
                shouldScrollHide = false;
            }
        } else {
            if($navbarFixed.hasClass('on-scroll-hide')) {
                $navbarFixed.removeClass('on-scroll-hide');
                $navbarFixed.addClass('on-scroll-show');
            }
            shouldScrollHide = true;
        }
    });
}

function checkHasClassSolid($navbarFixed) {
    setTimeout(function() {
        if( window.pageYOffset === 0 ) {
            if( !$navbarFixed.hasClass('iz-navbar--transparent') ) $navbarFixed.addClass('iz-navbar--transparent');
            setTimeout(function() {
                if( !$navbarFixed.hasClass('iz-navbar--white-text-on-top') ) {
                    $navbarFixed.addClass('iz-navbar--white-text-on-top');
                }
            }, 200);
        } else {
            if( $navbarFixed.hasClass('iz-navbar--transparent') ) $navbarFixed.removeClass('iz-navbar--transparent');
            setTimeout(function() {
                if( $navbarFixed.hasClass('iz-navbar--white-text-on-top') ) {
                    $navbarFixed.removeClass('iz-navbar--white-text-on-top');
                }
            }, 200);
        }
    }, 200);
}

function scrollNavbarSolid($navbarFixed, offsetTop) {

    console.log('page will scroll SOLID style');
    console.log('offsetTop: ', offsetTop);

    const $window = $(window);
    checkHasClassSolid($navbarFixed, $window.scrollTop());

    $window.on('scroll', function () {
        const $windowScrollTop = $window.scrollTop();
        if ($windowScrollTop > offsetTop) {

            if(shouldScrollHide) {
                if ($navbarFixed.hasClass('on-scroll-show')) {
                    $navbarFixed.removeClass('on-scroll-show');
                    $navbarFixed.addClass('on-scroll-hide');
                }
            }
            
            var windowScrollHeight = document.documentElement.scrollHeight;
            if(windowScrollHeight - window.pageYOffset === window.innerHeight) {
                if ($navbarFixed.hasClass('on-scroll-hide')) $navbarFixed.removeClass('on-scroll-hide');
                $navbarFixed.addClass('on-scroll-show');
                shouldScrollHide = false;
            }
        } else {

            checkHasClassSolid($navbarFixed, $windowScrollTop);

            if($navbarFixed.hasClass('on-scroll-hide')) {
                $navbarFixed.removeClass('on-scroll-hide');
                $navbarFixed.addClass('on-scroll-show');
            }
            shouldScrollHide = true;
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
function initHeaderFixedScrollDefault() {
    console.log('page with DEFAULT NAVBAR');
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
}

function initHeaderFixedScrollSolid() {
    console.log('page with SOLID NAVBAR');
    const $toggleBurgerDesk = $(NAV_TOGGLE_BURGER_DESKTOP);
    if($toggleBurgerDesk && $toggleBurgerDesk.length === 1) {
        const $navSolidMenu = $(NAV_SOLID_MENU);
        $toggleBurgerDesk.on('click', function() {
            if( $navSolidMenu && $navSolidMenu.length === 1 ) {
                $navSolidMenu.addClass('is-open');
            }
        });
    }
}

function initHeaderAndFooter(scrollNavbarStyle = SCROLL_NAVBAR_STYLE_DEFAULT) {

    // 1/ HEADER
    // 1.1 - Navigation default
    if(scrollNavbarStyle === SCROLL_NAVBAR_STYLE_SOLID) {
        initHeaderFixedScrollSolid();
    } else {
        initHeaderFixedScrollDefault();
    }

    // 1.2 - Navigation Mobile
    const navMobileSpeedCollapse = 350;

    //--- display: none for menu
    const $navMobile = $(NAV_MOBILE);
    const $navMobileSubMenu = $(NAV_MOBILE_MENU + ' .sub-menu');

    if ($navMobile && $navMobile.length === 1) $navMobile.css({ 'display': 'none' });
    if ($navMobileSubMenu && $navMobileSubMenu.length > 0) $navMobileSubMenu.css({ 'display': 'none' });
        
    //--- click toggle
    const $toggleBurger = $(NAV_TOGGLE_BURGER); // button burger
    const $navMobileMenu = $(NAV_MOBILE_MENU); // trigger nav mobile
    const $toogleNavMobile = $(NAV_MOBILE_MENU + ' li.menu-item-has-child > a');

    if ($toggleBurger && $toggleBurger.length === 1) {
        toggleBurgerNavMobile($toggleBurger, $navMobileMenu, $navMobile, navMobileSpeedCollapse);
    }
    
    if ($toogleNavMobile && $toogleNavMobile.length > 0) {
        toggleNavMobile($toogleNavMobile, navMobileSpeedCollapse);
    }

    // 1.3 - Scroll fixed
    const $navbarFixed = $(NAVBAR_DEFAULT + '.iz-navbar--fixed');
    if ( $navbarFixed && $navbarFixed.length === 1 ) {

        const offset = $(MAIN).offset().top + 10;

        if(scrollNavbarStyle === SCROLL_NAVBAR_STYLE_SOLID) {
            //--- scroll fixed solid
            scrollNavbarSolid($navbarFixed, offset);
        } else {
            //--- cal navbar fake
            const $navbarDefaultFake = $(NAVBAR_DEFAULT_FAKE);
            if($navbarDefaultFake.length === 1) $navbarDefaultFake.css({ 'height': $(NAVBAR_DEFAULT).outerHeight() });

            //--- scroll fixed default
            scrollNavbarDefault($navbarFixed, offset);
        }
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
        var $portfolioFilters = t.parent().find('.iz-portfolio__filters');
        if($portfolioFilters.length === 1) {

            var d = this.dataset;

            let loadMore = '';
            var $portfolioLoadMore = t.parent().find('.iz-portfolio__load-more');
            if ($portfolioLoadMore.length === 1) {
                loadMore = `#${$portfolioLoadMore.attr('id')}`;
            }
            
            const filters = `#${$portfolioFilters.attr('id')}` || '';
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
                    width: 600,
                    cols: 2,
                    options: {
                        gapHorizontal: 15,
                        gapVertical: 15
                    }
                },
                {
                    width: 320,
                    cols: 1,
                    options: {
                        gapHorizontal: 15,
                        gapVertical: 15
                    }
                }
            ];
            const animationType = d.animationType || 'fadeOut';
            const loadMoreAction = d.loadMoreAction || 'click';
            
            $(this).cubeportfolio({
                filters: filters,
                loadMore: loadMore,
                loadMoreAction: loadMoreAction,
                layoutMode: layoutMode,
                gridAdjustment: gridAdjustment,
                gapHorizontal: gapHorizontal,
                gapVertical: gapVertical,
                mediaQueries: mediaQueries,
                defaultFilter: '*',
                animationType: animationType,
            });
        }
    });
}