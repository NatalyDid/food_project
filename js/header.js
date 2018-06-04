(function () {
    $(function () {
        $('#showMenu').on('click', function () {
            $('#Menu').show();
            $('#searchForm').addClass('mobile-hidden');
            $('#hideMenu').show();
            $('#showMenu').hide();
            $('#searchMore').hide();
        });
        $('#hideMenu').on('click', function () {
            $('#Menu').hide();
            $('#showMenu').show();
            $('#hideMenu').hide();
        });
        $('#searchButton').on('click', function () {
            $('#searchForm').removeClass('mobile-hidden');
            $('#Menu').hide();
            $('#showMenu').show();
            $('#hideMenu').hide();
        });
        $('#searchForm__close').on('click', function () {
            $('#searchForm').addClass('mobile-hidden');
            $('#searchMore').hide();
        });
        $('#showMore').on('click', function () {
            $('#searchMore').toggle();
        });

        $('body').on('click', function (ev) {
            if (ev.target.id === 'showMore') {
                return
            }
            while (ev.target.tagName !== 'BODY' && !ev.target.classList.contains('searchMore__wrapper')) {
                ev.target = ev.target.parentNode;
            }
            if (ev.target.tagName === 'BODY') {
                $('#searchMore').hide();
            }
        });

        $('#searchMore__submit').on('click', function () {
            $('#searchMore').hide();
        });

        $(".dropdown-menu.single-menu li a").click(function () {
            var selText = $(this).text();
            var caret = '<span class="caret"></span>';
            $(this).parents('.dropdown.single').find('.dropdown-toggle').html(selText + caret);
        });

        $('#ch15,#ch16').on('click', function () {
            if ($(this).prop('checked')) {
                $('#ch11,#ch12,#ch13,#ch14,#ch17').prop('disabled', true);
            } else {
                if (!$('#ch15').prop('checked') && !$('#ch16').prop('checked')) {
                    $('#ch11,#ch12,#ch13,#ch14,#ch17').prop('disabled', false);
                }
            }
        });

        $('#ch01').on('click', function () {
            if ($(this).prop('checked')) {
                $('#ch11,#ch12,#ch13,#ch14,#ch17').prop('disabled', false);
            }
        });

        $('#ch21').on('click', function () {
            if ($(this).prop('checked')) {
                $('#ch22,#ch23,#ch24,#ch25').prop('checked', true).prop('disabled', true);
            } else {
                $('#ch22,#ch23,#ch24,#ch25').prop('checked', false).prop('disabled', false);
            }
        });
    })
})();