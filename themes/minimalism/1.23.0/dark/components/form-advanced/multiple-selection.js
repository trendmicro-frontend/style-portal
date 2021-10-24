'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.b275b05f-c3c7-4552-a8a8-94c42e4ed066', function (e) {
  $('[data-multi-selection=multipleSelection]', this).multiSelect();
  $('[data-opt-multi-selection=optMultipleSelection]', this).multiSelect({ selectableOptgroup: true });

  var multipleSelectionOptions = {
    buttonClass: 'btn btn-border btn-icon-only',
    buttonIcons: {
      addAll: '<span class="tmicon tmicon-collapse-right"></span>',
      add: '<span class="tmicon tmicon-angle-right"></span>',
      removeAll: '<span class="tmicon tmicon-collapse-left"></span>',
      remove: '<span class="tmicon tmicon-angle-left"></span>'
    }
  };

  $('[data-multi-selection=advanced]', this).multipleSelection(multipleSelectionOptions);
  $('[data-opt-multi-selection=advanced]', this).multipleSelection(multipleSelectionOptions);
});
