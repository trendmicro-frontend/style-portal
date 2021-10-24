'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.6e769613-f9d9-4481-82b8-a49dc240866e', function (e) {
  var progress = $('.indeterminate-determinate-example .progress');
  var progressbar = $('.indeterminate-determinate-example .progress-bar');
  var percentage = $('.indeterminate-determinate-example .progress-bar span');
  var flag = false;
  var setIndeterminate = function setIndeterminate() {
    progressbar.removeClass('progress-bar-determinate progress-bar-animated active');
    progressbar.addClass('progress-bar-indeterminate');
    percentage.text('');
    progressbar.attr('aria-valuenow', 0);
    setTimeout(setDeterminate, 6000);
  };
  var setDeterminate = function setDeterminate() {
    progressbar.removeClass('progress-bar-indeterminate').addClass('progress-bar-determinate progress-bar-animated active');

    var determinateInterval = setInterval(function () {
      var valuenow = Math.floor(progressbar.width() / progress.width() * 100);
      percentage.text(valuenow + '%');
      progressbar.attr('aria-valuenow', valuenow);
      if (progressbar.width() === progress.width()) {
        flag = true;
      }
      if (progressbar.width() < 50 && flag === true) {
        flag = false;
        clearInterval(determinateInterval);
        setIndeterminate();
      }
    }, 50);
  };
  setIndeterminate();
});
