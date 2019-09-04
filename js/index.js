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

function collapseNavMobile() {
    var $toogleNavMobile = $('#izNavMobileMenu li.menu-item-has-child > a');

    $toogleNavMobile.on('click', function (e) {
        e.stopPropagation();

        var $prevToggleNavMobile = $(this).next('.sub-menu').find('.opened');
        if($prevToggleNavMobile.length > 0) {
            $prevToggleNavMobile.next('.sub-menu').collapse('hide');
            $prevToggleNavMobile.removeClass('opened');
            $(this).next('.sub-menu').collapse('hide');
            return;
        }

        // add class .opened for toggle current
        if(!$(this).hasClass('opened')) {
            $toogleNavMobile.removeClass('opened');//toggle thang ngang hang vs no thoi
            
            $(this).addClass('opened');
        }else{
            $(this).removeClass('opened');
        }
        
        //toggle .sub-menu
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
    var $navMobile = $(NAV_MOBILE);
    if ($navMobile.length > 0) {
        $navMobile.addClass('collapse'); // <nav /> parent collapse
        $navMobile.find('.sub-menu').addClass('collapse'); // all .sub-menu collapse

        var $liParent = $(NAV_MOBILE + ' ' + 'li.menu-item-has-child');
        if ($liParent.length > 0) {
            $liParent.each(async (index, element) => {
                // if has SUB MENU
                if ($(element).find('li.menu-item-has-child').length > 0) {

                    var $subMenuChild = $(element).children('.sub-menu').find('.sub-menu');
                    await $(element).attr('id', NAV_MOBILE_NO_HASH + '_' + index);

                    var parentID = $(element).attr('id');

                    $subMenuChild.each((index, element) => {
                        $(element).attr('data-parent', '#' + parentID);
                    });
                }
            });
        }
    }

    //--- collapse navition mobile
    collapseNavMobile();

    // 2/FOOTER
    var $footer = $('.js-iz-footer');
    checkFooterFixed($footer);
}