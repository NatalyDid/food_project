$(function () {

    function showPreOrderLimit(blockId, popUp){
        $(blockId).on('click', function (ev) {
            var limitId = ev.target.dataset.showlimit;
            if (limitId) {
                $(popUp).each(function () {
                    if ($(this).attr('data-limit') === limitId) {
                        $(this).toggle();
                    }
                });
            }
        });
    }

    showPreOrderLimit('#expired', '.limit');
    showPreOrderLimit('#mails', '.limit');

    function modalButtonsEvents(blockId, modalId, buttonId) {

        $(blockId).on('click', function (ev) {

            var id = ev.target.dataset.id;
            if (id) {
                if (ev.target.parentNode.className === 'food-edit inactive') {
                    console.log('inactive');
                    return;
                }
                var modal = $(modalId);
                modal.modal('show');
                modal.on('shown.bs.modal', function () {
                    $(buttonId).on('click', function () {
                        console.log(id);
                        modal.modal('hide');
                    });
                });
                modal.on('hide.bs.modal', function () {
                    modal.off('shown.bs.modal');
                    $(buttonId).off('click');
                });
            }
        });
    }

    function modalRejectButtonsEvents(blockId, modalId, buttonId) {

        $(blockId).on('click', function (ev) {

            var reject = ev.target.dataset.rejectid;
            if (reject) {
                var modal = $(modalId);
                modal.modal('show');
                modal.on('shown.bs.modal', function () {
                    $(buttonId).on('click', function () {
                        console.log(reject);
                        modal.modal('hide');
                        modal.off('shown.bs.modal');
                        $(buttonId).off('click');
                    });
                });
            }
        });
    }

    function modalCancelButtonsEvents(blockId, modalId, buttonId) {

        $(blockId).on('click', function (ev) {

            var cancel = ev.target.dataset.cancel;
            if (cancel) {
                var modal = $(modalId);
                modal.modal('show');
                modal.on('shown.bs.modal', function () {
                    $(buttonId).on('click', function () {
                        console.log(cancel);
                        modal.modal('hide');
                        modal.off('shown.bs.modal');
                        $(buttonId).off('click');
                    });
                });
            }
        });
    }

    function modalApproveButtonsEvents(blockId, modalId, buttonId) {

        $(blockId).on('click', function (ev) {

            var approve = ev.target.dataset.approveid;
            if (approve) {
                var modal = $(modalId);
                modal.modal('show');
                modal.on('shown.bs.modal', function () {
                    $(buttonId).on('click', function () {
                        // дата-атрибут approveId(на кнопке на самом письме) соответствует id письма

                        // если есть комментарий, то к отправляемым данным нужно присоединить его
                        var form = new FormData();
                        form.append('id', approve);
                        var comment = $('#optional-comment-id').val();
                        if (comment) {
                            form.append('comment', comment);
                        }
                        $.post('url', function () {
                                alert("success");
                            }
                        ).done(function (resp) {
                            console.log(approve);
                            modal.modal('hide');
                            modal.off('shown.bs.modal');
                            $(buttonId).off('click');
                        }).fail(function () {
                            alert("error");
                        })
                    });
                });
            }
        });
    }

    function formSubmitEvents() {

        $('form[data-formid]').each(function (index, form) {
            $(form).on('submit', function (ev) {
                ev.preventDefault();
                var formid = ev.target.dataset.formid;
                // если есть комментарий, то к отправляемым данным нужно присоединить его
                // дата-атрибут formId(на форме в письме) соответствует id письма
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
                }).fail(function () {
                    alert("error");
                })
            })
        })
    }

    function crossDeleting(blockId) {
        $(blockId).on('click', function (ev) {
            var id = ev.target.dataset.id;
            if (id) {
                console.log(id);
            }
        });
    }

    formSubmitEvents();

    crossDeleting('#saved-searching');

    modalButtonsEvents('#offer', '#delete-confirm-modal-id', '#delete-confirm-button-modal-id');

    modalButtonsEvents('#mails', '#delete-confirm-modal-id', '#delete-confirm-button-modal-id');

    modalButtonsEvents('#proposals', '#modal-pre-order', '#confirm-button-modal-id');

    modalRejectButtonsEvents('#mails', '#modal-discard', '#reject-delete-button-id');

    modalCancelButtonsEvents('#mails', '#order-cancel-confirm-modal-id', '#order-cancel-confirm-button-modal-id');

    modalApproveButtonsEvents('#mails', '#modal-approve', '#confirm-information-button');

})
;
