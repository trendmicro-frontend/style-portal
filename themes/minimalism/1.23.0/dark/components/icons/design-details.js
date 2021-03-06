'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.d86e5c89-f05a-4198-9a72-6d8a401aaf87', function (e) {
	var container = this;
	var rgba2hex = function rgba2hex(color_value) {
		if (!color_value) return false;
		var parts = color_value.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/),
		    length = color_value.indexOf('rgba') ? 3 : 2; // Fix for alpha values
		delete parts[0];
		for (var i = 1; i <= length; i++) {
			parts[i] = parseInt(parts[i]).toString(16);
			if (parts[i].length == 1) parts[i] = '0' + parts[i];
		}
		return '#' + parts.join('').toUpperCase(); // #F7F7F7
	};
	var iconColors = $('.icon-color', container);

	iconColors.each(function (index, item) {
		var src = $('span', item);
		var dist = $('.color-code', item);
		var hex = rgba2hex(src.css('color'));
		dist.html(hex);
	});
});
