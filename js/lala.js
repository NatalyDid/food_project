function imageViewDesktop() {
    var smallImgId;
    $('.section-card').on('click', '.item-small-img', function () {
        smallImgId = $(this).find('img').attr('id');

        $('.item-big-img-wrapper img').each(function () {
            if ($(this).attr('data-imgId') === smallImgId) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });
}