$(function () {
    // $('.showLimit').on('click', function () {
    //     $('.limit').toggle();
    // });

    $('#expired').on('click', function(ev){
        var limitId = ev.target.dataset.showLimit;
        console.log(limitId);
        if(limitId){
            $('.limit').each(function () {
                if($(this).attr('data-limit') === limitId){
                    $(this).show();
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
                    $(buttonId).on('click', function (ev) {

                        modal.modal('hide');
                    });
                });
            }
        });
    }

    modalButtonsEvents('#offer', '#delete-confirm-modal-id', '#delete-confirm-button-modal-id');

    modalButtonsEvents('#proposals', '#modal-pre-order', '#confirm-button-modal-id');

});
