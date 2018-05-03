$(function () {
    setValidator($('#edit-form'));
    setValidator($('#modal_confirm_pswd'));

    $('#edit-form').on('submit', function (ev) {
        if ($('#edit-form').valid()){
            ev.preventDefault();
            $('#confModal').modal('show');
        }
    });

    $('#modal_confirm_pswd').on('submit', function (ev) {
        if ($('#modal_confirm_pswd').valid()){
            ev.preventDefault();
            console.log('aaa');
            $('#confModal').modal('hide');
        }
    });
});