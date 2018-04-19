$(document).ready(function () {
    setValidator($('#reg-form'));

    var uploadImageInput = $('#add-photo-id');
    var imageBody = $('#cropper-body-id');
    var cropperModal = $('#cropper_modal_id');
    var getCroppedDataButton = $('#get-cropped-data-button');
    var avatar = $('#avatar_preview');
    var savedFile;
    uploadImageInput.on('change', readFile);

    getCroppedDataButton.on('click', function () {

        (function(global) {
            if (!('HTMLCanvasElement' in global)) return;
            if (!('toDataURL' in global.HTMLCanvasElement.prototype)) return;
            if ('toBlob' in global.HTMLCanvasElement.prototype) return;
            Object.defineProperty(global.HTMLCanvasElement.prototype, 'toBlob', {
                value: function(callback/*, type, encoderOptions*/) {
                    var url = this.toDataURL.apply(this, [].slice.call(arguments, 1));
                    var m = /^data:(.*?);base64,(.*)$/.exec(url), type = m[1], b64 = m[2];
                    setTimeout(function() {
                        callback(new Blob([
                            new Uint8Array(global.atob(b64).split('').map(function(c) {
                                return c.charCodeAt(0);
                            }))], {type: type}));
                    }, 0);
                }, writable: true, enumerable: true, configurable: true});
        }(self));

        imageBody.cropper('getCroppedCanvas').toBlob(function (blob) {
            cropperModal.modal('hide');
            imageBody.cropper('destroy');
            savedFile = blob;
            uploadImageInput.val('');
            var reader = new FileReader();
            reader.onloadend = function (e) {
                if (avatar) {
                    avatar.attr("src", reader.result);
                }
            };
            reader.readAsDataURL(blob);
        });
    });

    function readFile(event) {
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].type && 'image/jpeg image/gif image/png'.indexOf(event.target.files[0].type) !== -1) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    if (imageBody) {
                        imageBody.attr("src", reader.result);
                        cropperModal.modal('show');

                        setTimeout(function () {
                            imageBody.cropper({
                                aspectRatio: 1,
                                viewMode: 1
                            })
                        }, 350);
                    }
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }
});