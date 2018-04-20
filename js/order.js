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
});