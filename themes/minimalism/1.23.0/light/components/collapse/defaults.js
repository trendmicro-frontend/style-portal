'use strict';

function default86d3bfb618a7b1cdf79d8b755c077e40a4b5de5d() {

  var collapses = 'panel-collapse-show panel-collapse-shown panel-collapse-hide panel-collapse-hidden';

  $('.panel-collapse', this).on('show.bs.collapse', function (e) {
    $(e.target).parents('.panel').removeClass(collapses).addClass('panel-collapse-show');
  }).on('shown.bs.collapse', function (e) {
    $(e.target).parents('.panel').removeClass(collapses).addClass('panel-collapse-shown');
  }).on('hide.bs.collapse', this, function (e) {
    $(e.target).parents('.panel').removeClass(collapses).addClass('panel-collapse-hide');
  }).on('hidden.bs.collapse', this, function (e) {
    $(e.target).parents('.panel').removeClass(collapses).addClass('panel-collapse-hidden');
  });
};

portal.on('COMPONENT_SEGMENT_LOADED.4a994d1f-c0dd-4494-afbd-1d98313dad6f', default86d3bfb618a7b1cdf79d8b755c077e40a4b5de5d);

portal.on('COMPONENT_SEGMENT_LOADED.658f3d39-3dc0-4198-8593-d1ea6ea2d2db', default86d3bfb618a7b1cdf79d8b755c077e40a4b5de5d);

portal.on('COMPONENT_SEGMENT_LOADED.aada64f1-2751-43d8-9408-ba54166ea628', default86d3bfb618a7b1cdf79d8b755c077e40a4b5de5d);

portal.on('COMPONENT_SEGMENT_LOADED.9819530a-a8cf-416c-9500-503db5ccd5a4', default86d3bfb618a7b1cdf79d8b755c077e40a4b5de5d);

portal.on('COMPONENT_SEGMENT_LOADED.f85e76f4-7aa9-4da2-a531-4e32c2a67227', default86d3bfb618a7b1cdf79d8b755c077e40a4b5de5d);
