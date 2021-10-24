'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.ab096cb6-bf2c-45fa-a279-de9e8bb52057', function (e) {
  var modalXs = $('[data-template="modal-xs"]', this);
  var modalXsBody = modalXs.find('modal-body');
  modalXsBody.mCustomScrollbar();
});
