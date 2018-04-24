$(function () {
    $('#offer').on('click', function (ev) {
        ev.preventDefault();
        var id = ev.target.dataset.id;
        if (id) {
            var modal = $('#delete-confirm-modal-id');
            modal.modal('show');
            modal.on('shown.bs.modal', function () {
                $('#delete-confirm-button-modal-id').on('click', function (ev) {
                    console.log(id);
                    modal.modal('hide');
                });
            });
        }
    });
});