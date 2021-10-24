'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.16165a7c-77ff-45b8-b28b-51c21804fdbf', function (e) {
	var container = this;
	var disabledDatePickerContainer = $('#disabled-date-datepicker', container);

	disabledDatePickerContainer.data('date', '2017-01-10')._datepicker({
		todayHighlight: true,
		autoclose: true,
		format: 'yyyy-mm-dd',
		keyboardNavigation: false,
		endDate: '2017-01-20'
	});

	$(".prev", disabledDatePickerContainer).find("i").attr('class', 'tmicon tmicon-angle-left');
	$(".next", disabledDatePickerContainer).find("i").attr('class', 'tmicon tmicon-angle-right');
});
