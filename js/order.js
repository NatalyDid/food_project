$(function(){
    var orderId;

    $('.image-small').on('click', function(){
        $('.image-small').each(function () {
            $(this).removeClass('active');
        });
        
        $(this).addClass('active');
        orderId = $(this).attr('data-smallImgId');

        $('.image-big').each(function () {
            $(this).hide();
        });

        $('.order-img').find('.image-big').each(function () {

            if($(this).attr('data-bigImgID') === orderId){
                $(this).show();
            }
        });
    });

    function orderFormSubmitEvents() {
        $('form[data-form]').each(function (index, form) {
            $(form).on('submit', function (ev) {
                ev.preventDefault();
                var formid = ev.target.dataset.form;
                var form = new FormData();
                form.append('id', formid);
                var formValuesArr = $(ev.target).serializeArray();
                $(formValuesArr).each(function (index, item) {
                    if(item.value){
                        form.append(item.name, item.value);
                    }
                })
                $.post('url', function () {
                        alert("success");
                    }
                ).done(function (resp) {
                    window.location.href = "profile-mails.html";
                }).fail(function () {
                    alert("error");
                })
            })
        })
    }

    setValidator($('#order-form'));

    $('#order-form').on('submit', function (event) {
        if (!$('#order-form').valid()){
            event.preventDefault();
        }
        orderFormSubmitEvents();
    });
});