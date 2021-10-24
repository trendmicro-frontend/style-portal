'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.84ac9650-408c-4c4a-a5a6-62e49e39e9aa', function (e) {
  var container = this;
  var datePickerTimeInput = $('#datepicker-with-time', container);
  var timePickerDate = $('#time-picker-date', container);
  var format = 'YYYY-MM-DD';
  var today = moment().format(format);
  $(container).children().css('z-index', 2);

  datePickerTimeInput.val(today).datepicker();
  timePickerDate.timepicker();
});
