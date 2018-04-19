$(function () {
    $('#showLimit').on('click', function () {
        $('#limit').toggle();
    });

    setValidator($('#edit-form'));
});