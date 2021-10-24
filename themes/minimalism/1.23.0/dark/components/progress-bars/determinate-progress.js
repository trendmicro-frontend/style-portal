'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.7e18d8d1-77c4-4e24-900e-a466073a311a', function (e) {
  var progress = $('.progress-example .progress');
  var progressbar = $('.progress-example .progress-bar');
  var percentage = $('.progress-example .progress-bar span');
  setInterval(function () {
    var valuenow = Math.floor(progressbar.width() / progress.width() * 100) + '%';
    percentage.text(valuenow);
    progressbar.attr('aria-valuenow', valuenow);
  }, 50);
});
