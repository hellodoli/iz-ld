//-- HEADER
// Navigation default(desktop)
const NAV_DEFAULT_NO_HASH = 'izNavDefault';
const NAV_DEFAULT = '#' + NAV_DEFAULT_NO_HASH;
const NAV_DEFAULT_MENU_NO_HASH = 'izNavDefaultMenu';
const NAV_DEFAULT_MENU = '#' + NAV_DEFAULT_MENU_NO_HASH;
// Navigation mobile
const NAV_MOBILE_NO_HASH = 'izNavMobile';
const NAV_MOBILE = '#' + NAV_MOBILE_NO_HASH;

function effectSubMenuHover($sfHover, duration, displayStyle = 'block') {

    $sfHover.on('mouseenter',function(){
        var $this = $(this);
        var $subMenu = $this.children('.sub-menu');

        $subMenu.css({
            'display': displayStyle,
            'transition': null
        });

        setTimeout(function () {
            $this.addClass('sfHover');
            $subMenu.css({
                'margin-top': 0,
                'opacity': 1,
                'transition': 'all ' + duration + 'ms' + ' ease-in-out'
            });
        }, duration);
    });

    $sfHover.on('mouseleave', function(){
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
                'transition': null
            });
        }, duration);
    });

    /*$sfHover.hover(function () {
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
    });*/
}

function subMenuHover() {

    var $sfHover_01 = $(NAV_DEFAULT_MENU + ' > li.has-megamenu'); // grid

    var $sfHover_02 = $(NAV_DEFAULT_MENU + ' > li:not(.has-megamenu)');
    var $sfHover_03 = $(NAV_DEFAULT_MENU + ' .sub-menu > li.menu-item-has-child');

    if ($sfHover_01.length > 0) effectSubMenuHover($sfHover_01, 200, 'grid');

    if ($sfHover_02.length > 0) effectSubMenuHover($sfHover_02, 200);
    if ($sfHover_03.length > 0) effectSubMenuHover($sfHover_03, 200);
}

function collapseNavMobile() {
    var $btnToggleNavMobile = $('#izNavMobileMenu li.menu-item-has-child > a');

    $btnToggleNavMobile.on('click', function (e) {
        e.stopPropagation();

        //$btnToggleNavMobile.removeClass('opened');
        //if(!$(this).hasClass('opened')) $(this).addClass('opened');
            
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

//-- MAIN
function initHeaderAndFooter() {
    //--- init Header
    // make .sub-menu display: 'none'
    var $navSubMenu = $(NAV_DEFAULT + ' ' + '.sub-menu');
    if ($navSubMenu && $navSubMenu.length > 0) {
        $navSubMenu.css({
            'display': 'none',
            'margin-top': '10px',
            'opacity': 0
        });
    }

    // Mobile
    var $navMobile = $(NAV_MOBILE);
    if ($navMobile.length > 0) {
        $navMobile.addClass('collapse'); // <nav /> parent collapse
        $navMobile.find('.sub-menu').addClass('collapse'); // all .sub-menu collapse

        var $liParent = $(NAV_MOBILE + ' ' + 'li.menu-item-has-child');
        if($liParent.length > 0) {
            $liParent.each(async (index,element) => {
                // if has SUB MENU
                if($(element).find('li.menu-item-has-child').length > 0) {

                    var $subMenuChild = $(element).children('.sub-menu').find('.sub-menu');
                    await $(element).attr('id', NAV_MOBILE_NO_HASH + '_' + index);

                    var parentID = $(element).attr('id');
                    
                    $subMenuChild.each((index,element) => {
                        $(element).attr('data-parent', '#' + parentID);
                    });
                }
            });
        }
    }

    //--- hover navigation desk
    subMenuHover();
    //--- collapse navition mobile
    collapseNavMobile();

    var $footer = $('.js-iz-footer');
    checkFooterFixed($footer);
}