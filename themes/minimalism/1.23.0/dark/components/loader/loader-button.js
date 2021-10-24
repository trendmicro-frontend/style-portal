'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.5da515ca-1287-4325-82d6-361391b7b2d8', function (e) {
  var $loader = $('<span />').addClass('loader loader-small');
  var $iconUploadBtn = $('[data-loading=buttonIcon]', this);
  var $textUploadBtn = $('[data-loading=buttonText]', this);
  var textUploadBtnWidth = $textUploadBtn.outerWidth();
  var $clone = $textUploadBtn.clone().addClass('btn-clone').text('Uploading').prepend($loader.clone());

  $iconUploadBtn.tooltip();
  $iconUploadBtn.click(function (e) {
    $iconUploadBtn.tooltip('hide');
    var $loader = $('<span />').addClass('loader loader-small');
    var $tmicon = $iconUploadBtn.find('.tmicon');
    $tmicon.detach() && $iconUploadBtn.prop('disabled', true).append($loader);
  });

  $textUploadBtn.click(function (e) {
    var $loader = $('<span />').addClass('loader loader-small');
    $textUploadBtn.text('Uploading') && $textUploadBtn.prop('disabled', true).prepend($loader);
    $textUploadBtn.animate({ width: $clone.outerWidth() }, 100);
  });

  $textUploadBtn.after($clone).css('width', textUploadBtnWidth);
});
