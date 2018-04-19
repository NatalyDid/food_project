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

    runDropdowns();
    runInputs();
    runTimeInputs();

    uploadImageInput.on('change', readFile);

    getCroppedDataButton.on('click', function () {
      if (blobsArray.length < 4) {

          (function(global) {
              if (!('HTMLCanvasElement' in global)) return;
              if (!('toDataURL' in global.HTMLCanvasElement.prototype)) return;
              if ('toBlob' in global.HTMLCanvasElement.prototype) return;
              Object.defineProperty(global.HTMLCanvasElement.prototype, 'toBlob', {
                  value: function(callback) {
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
    
    function runInputs() {
      dateInputs.each(function (index, item) {
        item.value =  moment().format("DD-MM-YYYY");
        var picker = new Pikaday(
          {
            field: item,
            format: 'DD-MM-YYYY',
            firstDay: 1,
            minDate: new Date(),
            maxDate: new Date(2020, 12, 31),
            yearRange: [2018,2020]
          });
      })
    }
    
    function runTimeInputs() {
      timeInputs.each(function (index, item) {
        $(item).timepicker({
          timeFormat: 'HH:mm',
          interval: 60,
          dynamic: false,
          dropdown: true,
          scrollbar: true
        });
      });
    }

    function coockSelectChanged(event) {
        var currentValue = event.target.value;
        var title = $('#coockedTitleId');
        if (currentValue === 'Wird-gekocht') {
          title.text(coockedTitle.willBe)
        } else {
            title.text(coockedTitle.already)
        }
    }
  }

    $('#wahlen_checkable_1').on('click', function () {
        if ($(this).prop('checked')) {
            $('#wahlen_checkable_2,#wahlen_checkable_3,#wahlen_checkable_4,#wahlen_checkable_5').prop('checked', true).prop('disabled', true);
        } else {
            $('#wahlen_checkable_2,#wahlen_checkable_3,#wahlen_checkable_4,#wahlen_checkable_5').prop('checked', false).prop('disabled', false);
        }
    });

    setValidator($('#form-creating'));
})();

