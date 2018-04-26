$(function () {
    $('.showLimit').on('click', function () {
        $('.limit').toggle();
    });

    function modalButtonsEvents(blockId, modalId, buttonId){
        $(blockId).on('click', function (ev) {
            var id = ev.target.dataset.id;
            if (id) {
                var modal = $(modalId);
                modal.modal('show');
                modal.on('shown.bs.modal', function () {
                    $(buttonId).on('click', function (ev) {
                        console.log(id);
                        modal.modal('hide');
                    });
                });
            }
        });
    }

    modalButtonsEvents('#offer', '#delete-confirm-modal-id', '#delete-confirm-button-modal-id');

    modalButtonsEvents('#proposals', '#modal-pre-order', '#confirm-button-modal-id');

});
