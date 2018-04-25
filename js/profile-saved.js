$(function () {

    function crossDeleting(blockId){
        $(blockId).on('click', function (ev) {
            var id = ev.target.dataset.id;
            if (id) {
                console.log(id);
            }
        });
    }

    crossDeleting('#saved-searching');
});
