(function () {
    document.addEventListener('DOMContentLoaded', runScript);

    function runScript() {
        var blobsArray = [];
        var previewsArray = $('.preview-wrapper');
        var uploadImageInput = $('#add-new-image-id');
        var imageBody = $('#cropper-body-id');
        var getCroppedDataButton = $('#get-cropped-data-button');
        var cropperModal = $('#cropper_modal_id');
        var fleischgerichtButtonId = $('#fleischgericht_button_id');
        var fleischgerichtCheckable1 = $('#fleischgericht_checkable_1');
        var cuttingBlockFleischgericht = $('#cutting_block_fleischgericht');
        var cuttingBlockFleischgerichtButton = $('#cutting_block_fleischgericht_button_id');
        var chipsFirstBlock = $('#chips_first_block');
        var zusatzInputsBlockId = $('#zusatz_inputs_block_id');
        var zusatzInputsBlockButton = $('#zusatz_inputs_block_button_id');
        var chipsSecondBlock = $('#chips_second_block_id');
        var fleischgerichtInputs = [];
        var zusatzInputs = [];
        var dateInputs = $('input[data-date]');
        var timeInputs = $('input[data-time]');
        var coockedSelect = $('#coocked_select_id');
        var coockedTitle = {
            already: "Gekocht",
            willBe: "Wird gekocht"
        };
        var pickers = [];
        var timePickers = [];
        var $reverseDateId = $("#reverseDateId");
        runDropdowns();
        runInputs();
        runTimeInputs();

        $('[aria-label="Close"]').on('click', function () {
            $(document).trigger('wrap-destroy');
        });

        uploadImageInput.on('change', readFile);

        $(document).on('wrap-destroy', function () {
            imageBody.cropper('destroy');
        });

        getCroppedDataButton.on('click', function () {
            if (blobsArray.length < 4) {

                (function (global) {
                    if (!('HTMLCanvasElement' in global)) return;
                    if (!('toDataURL' in global.HTMLCanvasElement.prototype)) return;
                    if ('toBlob' in global.HTMLCanvasElement.prototype) return;
                    Object.defineProperty(global.HTMLCanvasElement.prototype, 'toBlob', {
                        value: function (callback) {
                            var url = this.toDataURL.apply(this, [].slice.call(arguments, 1));
                            var m = /^data:(.*?);base64,(.*)$/.exec(url), type = m[1], b64 = m[2];
                            setTimeout(function () {
                                callback(new Blob([
                                    new Uint8Array(global.atob(b64).split('').map(function (c) {
                                        return c.charCodeAt(0);
                                    }))], {type: type}));
                            }, 0);
                        }, writable: true, enumerable: true, configurable: true
                    });
                }(self));

                imageBody.cropper('getCroppedCanvas').toBlob(function (blob) {
                    blobsArray.push(blob);
                    fillPrevievs();
                    imageBody.cropper('destroy');
                });
            }
        });

        fleischgerichtButtonId.on('click', fleischgerichtButtonIdHandle);
        cuttingBlockFleischgerichtButton.on('click', cuttingBlockFleischgerichtButtonHandle);
        zusatzInputsBlockButton.on('click', zusatzInputsBlockButtonHandle);
        coockedSelect.on('change', coockSelectChanged);


        function readFile(event) {
            console.log("ddd");
            if (event.target.files && event.target.files[0]) {
                if (event.target.files[0].type && 'image/jpeg image/gif image/png'.indexOf(event.target.files[0].type) !== -1) {
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        if (imageBody) {
                            imageBody.attr("src", reader.result);
                            cropperModal.modal('show');

                            setTimeout(function () {
                                imageBody.cropper({
                                    aspectRatio: 16 / 9,
                                    viewMode: 1
                                })
                            }, 350);
                        }
                    };
                    reader.readAsDataURL(event.target.files[0]);
                }
            }
        }

        function fillPrevievs() {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                generatePreviewsElements(previewsArray, blobsArray, reader);
                if (blobsArray.length > 3) {
                    uploadImageInput.prop('disabled', true);
                }
            };
            reader.readAsDataURL(blobsArray[blobsArray.length - 1]);
            cropperModal.modal('hide');
        }

        function generatePreviewsElements(previewsArray, blobsArray, reader) {
            var setMainButton = document.createElement('span');
            setMainButton.textContent = 'als Galeriebild';
            setMainButton.classList.add('make-main');
            setMainButton.dataset.imgIndex = (blobsArray.length - 1);
            setMainButton.addEventListener('click', changeMainImage);

            var setDeleteButton = document.createElement('span');
            setDeleteButton.classList.add('fa');
            setDeleteButton.classList.add('fa-trash-o');
            setDeleteButton.dataset.imgIndex = (blobsArray.length - 1);
            setDeleteButton.addEventListener('click', deleteImage);

            var image = document.createElement('img');
            image.classList.add('previews');
            image.src = reader.result;

            $(previewsArray[blobsArray.length - 1]).append(setMainButton);
            $(previewsArray[blobsArray.length - 1]).append(setDeleteButton);
            $(previewsArray[blobsArray.length - 1]).append(image);
        }

        function changeMainImage(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            var blobIndex = ev.target.attributes['data-img-index'].value;
            var tempZeroBlob = blobsArray[0];
            blobsArray[0] = blobsArray[ev.target.attributes['data-img-index'].value];
            blobsArray.splice(blobIndex, 1, tempZeroBlob);
            var getEventTarget = $(ev.target.parentElement).find('.previews');
            var getEventScr = getEventTarget.attr('src');
            var getZeroTarget = $(previewsArray[0]).find('.previews');
            var getZeroSrc = getZeroTarget.attr('src');
            getZeroTarget.attr('src', getEventScr);
            getEventTarget.attr('src', getZeroSrc);
        }

        function deleteImage(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            var blobIndex = ev.target.attributes['data-img-index'].value;
            blobsArray.splice(blobIndex, 1);
            var imagesSrcArray = [];
            previewsArray.each(function (index, item) {
                if ($(item).children('.previews').length > 0) {
                    imagesSrcArray.push($(item).children('.previews').attr('src'));
                }
            });
            imagesSrcArray.splice(blobIndex, 1);
            previewsArray.each(function (index, item) {
                if (imagesSrcArray[index]) {
                    $(item).find('.previews').attr('src', imagesSrcArray[index]);
                } else {
                    $(item).html('');
                }
            });
            uploadImageInput.prop('disabled', false);
        }

        function fleischgerichtButtonIdHandle() {
            if (fleischgerichtCheckable1.prop("checked")) {
                cuttingBlockFleischgericht.removeClass('hidden');
            } else {
                cuttingBlockFleischgericht.addClass('hidden');
                chipsFirstBlock.addClass('hidden');
                chipsFirstBlock.html('');
                var inputs = cuttingBlockFleischgericht.find('input');
                inputs.each(function (index, item) {
                    $(item).prop("checked", false);
                })
            }
            $('.dropdown.multi-selected').removeClass('open');
        }

        function cuttingBlockFleischgerichtButtonHandle() {
            var inputs = cuttingBlockFleischgericht.find('input');
            fleischgerichtInputs = [];
            inputs.each(function (index, item) {
                if ($(item).prop("checked")) {
                    fleischgerichtInputs.push(item);
                }
            });
            $('.dropdown.multi-selected').removeClass('open');
            fillFleischgerichtChips('fleischgericht');
        }

        function fillFleischgerichtChips(blockName) {
            var currentInputs;
            var parentBlock;
            if (blockName === 'fleischgericht') {
                chipsFirstBlock.html('');
                currentInputs = fleischgerichtInputs;
                parentBlock = chipsFirstBlock;
            } else {
                chipsSecondBlock.html('');
                currentInputs = zusatzInputs;
                parentBlock = chipsSecondBlock;
            }
            $(currentInputs).each(function (index, item) {
                var input = $(item);
                var chips = "<div class=\"chips flex-left-center\">" +
                    "<i class=\"fa fa-times\" data-input-id='" + input.attr('id') + "' data-parent='" + blockName + "'></i>" +
                    "<span>" + input.attr('data-name') + "</span></div>";
                parentBlock.append(chips);
                parentBlock.removeClass('hidden');
            });
            parentBlock.find('.fa').each(function (index, item) {
                $(item).on('click', deleteBlockChips);
            })
        }

        function deleteBlockChips(ev) {
            var inputIds = $(ev.target).attr('data-input-id');
            var inputParent = $(ev.target).attr('data-parent');
            $('#' + inputIds).prop("checked", false);
            inputParent === 'fleischgericht' ? cuttingBlockFleischgerichtButtonHandle() : zusatzInputsBlockButtonHandle();
        }

        function zusatzInputsBlockButtonHandle() {
            var inputs = zusatzInputsBlockId.find('input');
            zusatzInputs = [];
            inputs.each(function (index, item) {
                if ($(item).prop("checked")) {
                    zusatzInputs.push(item);
                }
            });
            $('.dropdown.multi-selected').removeClass('open');
            fillFleischgerichtChips('zusatz');
        }

        function runDropdowns() {
            $('.dropdown.multi-selected .btn-multiple').on('click', function (event) {
                $(this).parent().toggleClass('open');
            });

            $('body').on('click', function (e) {
                if (!$('.dropdown.multi-selected').is(e.target)
                    && $('.dropdown.multi-selected').has(e.target).length === 0
                    && $('.open').has(e.target).length === 0
                ) {
                    $('.dropdown.multi-selected').removeClass('open');
                }
            });
        }

        $('.dropdown.multi-selected').on('click', function (event) {
            event.stopPropagation();
            var target = event.target;
            while (this !== target) {
                target = target.parentNode;
            }
            console.log(this);
            console.log(target);
            var dropdowns = $('.dropdown.multi-selected');
            for (var i = 0; i < dropdowns.length; i++) {
                if (dropdowns[i] !== target) {
                    dropdowns[i].classList.remove('open');
                }
            }
        });

        function runInputs() {
            dateInputs.each(function (index, item) {
                item.value = moment().format("DD-MM-YYYY");
                var picker = new Pikaday(
                    {
                        field: item,
                        format: 'DD-MM-YYYY',
                        firstDay: 1,
                        minDate: new Date(),
                        maxDate: new Date(moment().add(3, 'd').format('YYYY-MM-DD'))
                    });
                pickers.push({picker: picker, isChangable: item.hasAttribute('data-reverse')})
            })
        }

        function runTimeInputs() {
            timeInputs.each(function (index, item) {
                $(item).timepicker({
                    timeFormat: 'H:i',
                    step: 15,
                    minTime: '00:00',
                    maxTime: '23:59',
                    startTime: '00:00',
                    disableTextInput: true
                });
                // $(item).timepicker('setTime', new Date());
                timePickers.push({timePicker: item, isChangable: item.hasAttribute('data-reverse')})
            });
        }

        function coockSelectChanged(event) {
            var currentValue = event.target.value;
            var title = $('#coockedTitleId');
            $('.hidden-when-reserve').show();
            if (currentValue === 'Wird-gekocht') {
                console.log('change date');
                title.text(coockedTitle.willBe);
                updateDatePicker(true);
                //updateTimePicker(true);
                updateTimePickerWillbe();
                //updateDelivery();
                $reverseDateId.on('change', changeDateInterval);
                //     var reverseDate_value = document.getElementById('reverseDateId').value;
                //     var inputsDelivery_value = document.querySelectorAll('input[data-date]');
                //     for (var i = 0; i < inputsDelivery_value.length; i++) {
                //         inputsDelivery_value[i].value = reverseDate_value;
                //     }
                // });
                $reverseDateId.off('change', updateTimePickerAlready);
                $reverseDateId.on('change', updateTimePickerWillbe);
                $('[data-role="from"]').on('change', updateDeliveryEndTime);
                //asdf();
                //$("#reverseTimeId").change(asdf);
            }
            if (currentValue === 'Gekochtam') {
                title.text(coockedTitle.already);
                updateDatePicker(false);
                //updateTimePicker(false);
                updateTimePickerAlready();
                $reverseDateId.off('change');
                $reverseDateId.on('change', updateTimePickerAlready);
                $('[data-role="from"]').on('change', updateDeliveryEndTime);
            }
            if (currentValue === 'Nach-Vorbestellug') {
                $('.hidden-when-reserve').hide();
            }

            function updateDatePicker(flag) {
                for (var i = 0; i < pickers.length; i++) {
                    if (pickers[i].isChangable) {
                        pickers[i].picker.destroy();
                        var dateInput = document.getElementById('reverseDateId');
                        dateInput.value = moment().format("DD-MM-YYYY");
                        var picker;
// flag === true - from now to future, flag === false - from now to past
                        if (flag) {
                            picker = new Pikaday(
                                {
                                    field: dateInput,
                                    format: 'DD-MM-YYYY',
                                    firstDay: 1,
                                    minDate: new Date(),
                                    maxDate: new Date(moment().add(2, 'd').format('YYYY-MM-DD'))
                                });
                        } else {
                            picker = new Pikaday(
                                {
                                    field: dateInput,
                                    format: 'DD-MM-YYYY',
                                    firstDay: 1,
                                    minDate: new Date(moment().subtract(1, 'd').format('YYYY-MM-DD')),
                                    maxDate: new Date()
                                });
                        }
                        pickers[i].picker = picker;
                    }
                }
            }

            /*function updateTimePicker(flag) {
                for (var i = 0; i < timePickers.length; i++) {
                    if (timePickers[i].isChangable) {
                        console.log(timePickers[i]);
            // flag === true - from now to future, flag === false - from now to past
                        if (flag) {
                            var Time = new Date();
                            var this_Hour = Time.getHours();
                            var this_Min = Time.getMinutes();
                            var Minutes = this_Min - (this_Min % 5);
                            if (this_Min % 5 > 2) Minutes += 5;
                            console.log(Minutes);
                            $(timePickers[i].timePicker).timepicker('option', {
                                timeFormat: 'H:i',
                                step: 15,
                                minTime: this_Hour + ":" + Minutes,
                                maxTime: '23:59',
                                disableTextInput: true
                            });
                        } else {

                            $(timePickers[i].timePicker).timepicker('option', {
                                timeFormat: 'H:i',
                                step: 15,
                                minTime: '00:00',
                                maxTime: new Date(),
                                disableTextInput: true
                            });
                        }
                    }
                }
            }*/

            function updateTimePickerAlready() {
                $('#reverseTimeId').val(moment().format('HH:mm'));
                if ($('#reverseDateId').val() !== moment().format('DD-MM-YYYY')) {
                    $('#reverseTimeId').timepicker('option', {
                        timeFormat: 'H:i',
                        step: 15,
                        minTime: '00:00',
                        maxTime: '23:59',
                        startTime: '00:00',
                        disableTextInput: true
                    });
                } else {
                    $('#reverseTimeId').timepicker('option', {
                        timeFormat: 'H:i',
                        step: 15,
                        minTime: '00:00',
                        maxTime: moment().format('HH:mm'),
                        startTime: '00:00',
                        disableTextInput: true
                    });
                }
            }

            function updateTimePickerWillbe() {
                $('#reverseTimeId').val(moment().format('HH:mm'));
                if ($('#reverseDateId').val() !== moment().format('DD-MM-YYYY')) {
                    $('#reverseTimeId').timepicker('option', {
                        timeFormat: 'H:i',
                        step: 15,
                        minTime: '00:00',
                        maxTime: '23:59',
                        startTime: '00:00',
                        disableTextInput: true
                    });
                } else {
                    $('#reverseTimeId').timepicker('option', {
                        timeFormat: 'H:i',
                        step: 15,
                        minTime: moment().format('HH:mm'),
                        maxTime: '23:59',
                        startTime: '00:00',
                        disableTextInput: true
                    });
                }
            }

            function updateDeliveryEndTime() {
                $(this).parent().find('[data-role="to"]').timepicker('remove');
                $(this).parent().find('[data-role="to"]').timepicker({
                    timeFormat: 'H:i',
                    step: 15,
                    minTime: $(this).val(),
                    maxTime: '23:59',
                    startTime: '00:00',
                    disableTextInput: true
                });
                $(this).parent().find('[data-role="to"]').val($(this).val());
            }

            function changeDateInterval() {

                var reverseDate_value = document.getElementById('reverseDateId').value;
                var inputsDelivery_value = document.querySelectorAll('input[data-date]');
                for (var i = 0; i < inputsDelivery_value.length; i++) {
                    inputsDelivery_value[i].value = reverseDate_value;
                }
            }

            /*function updateDelivery() {
                var cookDate = $('#reverseDateId').val(),
                    cookTime = $('#reverseTimeId').val();
                $('#delivery_1_date').val(cookDate);
            }*/

            /*function asdf() {
           var reverseDate_value = document.getElementById('reverseDateId').value;
           var reverseTime_value = document.getElementById('reverseTimeId').value;

           $('#deliveryBlock').find('.date-input-wrapper').each(function (i) {
              /!* console.log($(this));
               $(this).find('.time-input').val(reverseTime_value);
               if ($(this).find('.date-input').val() === reverseDate_value) {
                   $(this).find('.time-input').timepicker('option', {
                       timeFormat: 'H:i',
                       step: 15,
                       minTime: reverseDate_value,
                       maxTime: '23:59',
                       startTime: '00:00',
                       disableTextInput: true
                   })
               } else {
                   $(this).find('.time-input').timepicker('option', {
                       timeFormat: 'H:i',
                       step: 15,
                       minTime: '00:00',
                       maxTime: '23:59',
                       startTime: '00:00',
                       disableTextInput: true
                   })
               }*!/
           })
           /!*
           for (var i = 0; i < inputsDeliveryTime_value.length; i++) {
               $(inputsDeliveryTime_value[i]).val(reverseDate_value);
               $(inputsDeliveryTime_value[i]).timepicker('option', {
                   timeFormat: 'H:i',
                   step: 15,
                   minTime: reverseDate_value,
                   maxTime: '23:59',
                   startTime: '00:00',
                   disableTextInput: true
               });

          }
          *!/

       }*/
        }
    }

    var span_value = $('#interval_count span').text();

    $('#deliveryBlock').on('click', function (ev) {
        if ($(ev.target).attr('data-hideInterval')) {
            $(ev.target).parent().hide();
            span_value = +span_value - 1;
            $('#interval_count span').text(span_value);
            ev.stopPropagation();
            if (span_value < 3) {
                $('div[data-showInterval]').show();
            }
        }
    });

    $('div[data-showInterval]').on('click', function () {
        span_value = +span_value + 1;
        if (+span_value === 3) {
            $(this).hide();
        }
        $('#interval_count span').text(span_value);
        $('[data-addinputwrapper="' + span_value + '"]').show();
    });

    $('#wahlen_checkable_1').on('click', function () {
        if ($(this).prop('checked')) {
            $('#wahlen_checkable_2,#wahlen_checkable_3,#wahlen_checkable_4,#wahlen_checkable_5').prop('checked', true).prop('disabled', true);
        } else {
            $('#wahlen_checkable_2,#wahlen_checkable_3,#wahlen_checkable_4,#wahlen_checkable_5').prop('checked', false).prop('disabled', false);
        }
    });

    setValidator($('#form-creating'));
})
();

