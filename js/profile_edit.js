$(function () {
    $('#showLimit').on('click', function () {
        $('#limit').toggle();
    });

    setValidator($('#edit-form'));
    setValidator($('#modal_confirm_pswd'));
});