$(function () {
    $('#expired').on('click', function(ev){
        var limitId = ev.target.dataset.showlimit;
        if(limitId){
            $('.limit').each(function () {
                if($(this).attr('data-limit') === limitId){
                    $(this).toggle();
                }
            });
        }
    });

    function modalButtonsEvents(blockId, modalId, buttonId){

        $(blockId).on('click', function (ev) {

            var id = ev.target.dataset.id;
            if (id) {
                var modal = $(modalId);
                modal.modal('show');
                modal.on('shown.bs.modal', function () {
                    $(buttonId).on('click', function () {
                        console.log(id);
                        modal.modal('hide');
                        modal.off('shown.bs.modal');
                        $(buttonId).off('click');
                    });
                });
            }
        });
    }

    function crossDeleting(blockId){
        $(blockId).on('click', function (ev) {
            var id = ev.target.dataset.id;
            if (id) {
                console.log(id);
            }
        });
    }

    crossDeleting('#saved-searching');

    modalButtonsEvents('#offer', '#delete-confirm-modal-id', '#delete-confirm-button-modal-id');

    modalButtonsEvents('#mails', '#delete-confirm-modal-id', '#delete-confirm-button-modal-id');

    modalButtonsEvents('#proposals', '#modal-pre-order', '#confirm-button-modal-id');

});
