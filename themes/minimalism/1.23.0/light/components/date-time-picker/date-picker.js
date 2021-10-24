'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.e5150e3b-e93b-4fed-a1f3-0652135b6066', function (e) {
  var container = this;
  var datepickerInput = $('#datepicker-input', container);
  $(container).children().css('z-index', 2);
  datepickerInput.datepicker();
});
