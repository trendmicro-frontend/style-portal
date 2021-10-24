'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.3cb786de-6ea0-4a5f-8b05-55026fcb49df', function (e) {
  var $insert = $('#highlight-rows-insert-btn', this);
  var $reset = $('#highlight-rows-reset-btn', this);
  var $table = $('#highlight-rows-table > tbody', this);
  var $row = $('<tr>\n  <td>TW_Patch_02_DDI</td>\n  <td>Firmware</td>\n  <td>3</td>\n  <td>2016-06-02 23:21:02</td>\n  <td>Operator</td>\n</tr>');

  function padLeft(value, length, padding) {
    return String(new Array(length).fill(padding !== undefined ? padding : ' ').join('') + value).slice(-length);
  }

  $insert.on('click', function (e) {
    $row.addClass('highlight');
    $table.prepend($row);
    $row.on('animationend', function (e) {
      return e.originalEvent.animationName === 'table-row-fadeout' && $row.removeClass('highlight');
    });
    $insert.prop('disabled', true);
    $reset.prop('disabled', false);
  });

  $reset.on('click', function (e) {
    $table.find('tr').not('.static').remove();
    $insert.prop('disabled', false);
    $reset.prop('disabled', true);
  });
});
