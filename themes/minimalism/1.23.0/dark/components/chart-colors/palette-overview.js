'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.e7cfb35a-1e2b-4329-b0e2-fbf15a0fcaae', function (e) {
  $('.chart-color', this).each(function () {
    var color = $(this).data('color');

    $('.chart-color-sqaure', this).css({ background: color });
    $('.chart-color-hex', this).text(color);
  });
});
