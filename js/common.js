$(document).ready(function () {
    function tr(box, height) {
        var $box = $(box);

        if (typeof $box.data('text') == 'undefined') {
            $box.data('text', box.innerHTML);
        }
        var text = $box.data('text');
        var clone = document.createElement('div');

        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.top = '100%';
        clone.style.width = box.clientWidth + 'px';
        clone.innerHTML = text;
        document.body.appendChild(clone);
        console.log(box.offsetWidth)
        var l = text.length - 1;

        for (; l >= 0 && clone.offsetHeight > height; l--) {
            clone.innerHTML = text.substring(0, l) + '...';
        }

        box.innerHTML = clone.innerHTML;

        if (!('remove' in Element.prototype)) {
            Element.prototype.remove = function () {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            };
        }
        clone.remove();
    }

    function refreshTr() {
        var item_main = document.querySelectorAll('.item-text-description-content');
        for (var i = 0; i < item_main.length; i++) {
            tr(item_main[i], 60)
        }

        var item_prop = document.querySelectorAll('.food-content');
        for (var j = 0; j < item_prop.length; j++) {
            tr(item_prop[j], 60)
        }
    }

    refreshTr();
    var timeout;
    $(window).resize(function () {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(function () {
            refreshTr();
            clearTimeout(timeout);
        }, 100);
    });


    $('.dropdown.multi-selected .dropdown-toggle.multiple').on('click', function (event) {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', function (e) {
        if (!$('.dropdown.multi-selected').is(e.target)
            && $('.dropdown.multi-selected').has(e.target).length === 0
            && $('.dropdown.multi-selected.open').has(e.target).length === 0
        ) {
            $('.dropdown.multi-selected').removeClass('open');
        }
    });

     var slick_container_single = $('.single-item');
     if (slick_container_single.length) {
         slick_container_single.slick();
         $(".slick-slide").removeClass("aaa");
        $('.item-img .btn-green').css('visibility','visible');
     }

   var slick_container_multiple = $('.author-slider');
     if (slick_container_multiple.length) {
         slick_container_multiple.slick(
             {
                 slidesToShow: 2
             }
         );
     }

    var pagination_container = $('.pagination-main');
    if (pagination_container.length) {
        pagination_container.pagination({
            items: 100,
            itemsOnPage: 5,
            displayedPages: 3,
            edges: 1,
            cssStyle: 'light-theme'
        });
    }


    $('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="popover"]').popover();

    $(".dropdown-menu.single-menu li span").click(function () {
        var selText = $(this).text();
        //var caret = '<span class="caret"></span>';
        $(this).parents('.dropdown.single').find('.dropdown-toggle').html(selText);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });
});





