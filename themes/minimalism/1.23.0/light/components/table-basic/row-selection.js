'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.f882c6c6-2a88-43a2-898b-a7c8fb01fdc6', function (e) {
	function getSelectedText() {
		if (window.getSelection) {
			return window.getSelection().toString();
		}

		// IE
		if (document.selection.createRange) {
			return document.selection.createRange().text;
		}
	}

	$('.table-selectable').on('click', 'thead > tr > th.gutter > .form-check', function (e) {
		e.preventDefault();

		var $label = $(e.target);
		var $control = $label.parent('.form-check').find('input[type="checkbox"]');
		var $table = $label.parents('.table');
		var $rows = $table.find('tbody > tr');
		var $active = $table.find('tbody > tr.active');
		var $checkbox = $rows.find('input[type="checkbox"]');

		if ($rows.length !== $active.length) {
			$control.addClass('checkbox-partial');
			$control.prop('checked', true);
			$rows.addClass('active');
			$checkbox.prop('checked', true);
			return;
		}

		$control.removeClass('checkbox-partial');
		$control.prop('checked', false);
		$rows.removeClass('active');
		$checkbox.prop('checked', false);
	}).on('click', 'tbody > tr', function (e) {
		e.preventDefault();

		var $row = $(e.target).parents('tr');
		var $table = $row.parents('.table');
		var $rows = $table.find('tbody > tr');
		var $control = $table.find('thead > tr > th.gutter input[type="checkbox"]');
		var data = $table.data();
		var clickTimer = data.clickTimer;
		var dblclickRecoverTimer = data.dblclickRecoverTimer;

		if (data.hasDblclicked) {
			clearTimeout(dblclickRecoverTimer);
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

			var $checkbox = $row.find('input[type="checkbox"]');

			if ($row.hasClass('active')) {
				$control.prop('checked', false);
				$row.removeClass('active');
				$checkbox.prop('checked', false);

				if ($table.find('tbody input:checkbox:checked').length === 0) {
					$control.removeClass('checkbox-partial');
				}
			} else {
				$control.addClass('checkbox-partial');
				$row.addClass('active');
				$checkbox.prop('checked', true);

				if ($table.find('tbody input:checkbox:checked').length === $rows.length) {
					$control.prop('checked', true);
				}
			}
		}, 250);

		$table.data('clickTimer', clickTimer);
	}).on('dbclick', 'tbody > tr', function (e) {
		var $row = $(e.target);
		var $table = $row.parents('.table');
		var data = $table.data();

		clearTimeout(data.clickTimer);
		$table.data('hasDblclicked', true);
	}).on('click', 'tbody > tr a', function (e) {
		e.stopPropagation();
	});
});
