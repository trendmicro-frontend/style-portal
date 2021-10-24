'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.410e8716-5818-4c5a-8a95-c02d1389a074', function (e) {
  function getSelectedText() {
    if (window.getSelection) {
      return window.getSelection().toString();
    }

    // IE
    if (document.selection.createRange) {
      return document.selection.createRange().text;
    }
  }

  $('.table-selectable', this).on('click', 'thead .head-checkbox', function (e) {
    var $label = $(e.target);
    var $control = $label.parent('.head-checkbox').find(':checkbox');
    var $table = $label.closest('.table');
    var $rows = $table.find('tbody > tr').not('.table-row-unselectable');
    var $active = $rows.filter('.active');
    var $checkboxes = $rows.find(':checkbox');
    var isAllSelected = $rows.length === $active.length;
    e.preventDefault();
    $control.prop('checked', !isAllSelected).toggleClass('checkbox-partial', false);
    $rows.toggleClass('active', !isAllSelected);
    $checkboxes.prop('checked', !isAllSelected).toggleClass('checkbox-partial', false);
  }).on('click', 'tbody > tr', function (e) {
    var $target = $(e.target);
    var $row = $target.closest('tr');
    var $checkbox = $row.find(':checkbox');
    var $table = $row.parents('.table');
    var $siblings = $row.siblings('tr').not('.table-row-unselectable');
    var $expandable = $row.closest('table').closest('tr').prev('.table-row-expandable');
    var $control = $table.find('thead .head-checkbox :checkbox');
    var expandable = $row.hasClass('table-row-expandable');
    var nested = $row.closest('.table-cell-child-table-container').length === 1;
    var data = $table.data();
    var isActive = $row.hasClass('active');
    var clickTimer = data.clickTimer;
    var dblclickRecoverTimer = data.dblclickRecoverTimer;

    if ($target.is('button,.btn,[type=button]')) return;
    if ($target.parent('button,.btn,[type=button]').length) return;

    e.preventDefault();

    if (data.hasDblclicked) {
      clearTimeout(data.dblclickRecoverTimer);
      dblclickRecoverTimer = setTimeout(function () {
        return $table.data('hasDblclicked', false);
      }, 300);
      $table.data('dblclickRecoverTimer', dblclickRecoverTimer);
      return;
    }

    clearTimeout(clickTimer);

    clickTimer = setTimeout(function () {
      if (getSelectedText()) {
        return;
      }

      $row.toggleClass('active', !isActive);
      $checkbox.prop('checked', !isActive);

      if (expandable) {
        $checkbox.toggleClass('checkbox-partial', !isActive);
        $($row.data('source')).find(':checkbox').prop('checked', !isActive).closest('tr').toggleClass('active', !isActive);
      }

      var $rows = $siblings.add($row);
      var $active = $rows.filter('.active');
      var isPartialSelected = $rows.length !== $active.length && $active.length > 0;
      var isAllSelected = !isActive && !isPartialSelected;

      if (nested) {
        $expandable.toggleClass('active', isAllSelected);
        $expandable.find(':checkbox').toggleClass('checkbox-partial', isPartialSelected).prop('checked', isAllSelected);
      }

      $rows = $table.find('tbody > tr').not('.table-row-unselectable');
      $active = $rows.filter('.active');
      isPartialSelected = $rows.length !== $active.length && $active.length > 0;
      isAllSelected = $rows.length === $active.length;

      $control.toggleClass('checkbox-partial', isPartialSelected).prop('checked', isAllSelected);
    }, 250);

    $table.data('clickTimer', clickTimer);
  }).on('dblclick', 'tbody > tr', function (e) {
    var $row = $(e.target);
    var $table = $row.parents('.table');
    var data = $table.data();
    clearTimeout(data.clickTimer);
    $table.data('hasDblclicked', true);
  });
});
