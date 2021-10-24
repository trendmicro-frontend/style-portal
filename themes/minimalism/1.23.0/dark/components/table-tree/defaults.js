'use strict';

function default42be03a68001a8c5644dcd804b40e6eabe7c91e9() {

	$.widget('hie.treeTable', {
		_create: function _create() {
			this.$rows = this.element.find('tbody > tr');
			this._updateView();
			this._bindEvents();
		},
		_updateView: function _updateView() {
			var _this = this;

			this.$rows.filter(function (i, elem) {
				return elem.dataset.level === '1';
			}).each(function (i, elem) {
				_this._toggleTreeChildrenExpansion($(elem), false, false);
			});
		},
		_bindEvents: function _bindEvents() {
			this.element.on('click', '.table-row-expand-btn', this._onExpandClick.bind(this));
			this.element.on('click', '.table-row-checkbox label', this._onCheckboxLabelClick.bind(this));
			this.element.on('click', 'tbody > tr', this._onRowClick.bind(this));
		},
		_toggleTreeChildrenExpansion: function _toggleTreeChildrenExpansion($target, toggle, hide) {
			var _this2 = this;

			var expanded1 = $target.hasClass('table-tree-row-expanded');
			var children = this._findTreeChildRows($target);
			children.forEach(function (row) {
				var $row = $(row);
				var exandable = $row.hasClass('table-tree-row-exandable');
				$row.toggleClass('hide', hide ? true : toggle === expanded1);
				exandable && _this2._toggleTreeChildrenExpansion($row, false, hide ? true : toggle === expanded1);
			});
			toggle && $target.toggleClass('table-tree-row-expanded', !expanded1);
		},
		_toggleTreeChildrenSelection: function _toggleTreeChildrenSelection($target, checked) {
			var _this3 = this;

			var children = this._findTreeChildRows($target);
			children.forEach(function (row) {
				var $row = $(row);
				var exandable = $row.hasClass('table-tree-row-exandable');
				var $checkbox = $row.find('.table-row-checkbox :checkbox');
				$row.toggleClass('active', checked);
				$checkbox.prop('checked', checked);
				exandable && _this3._toggleTreeChildrenSelection($row, checked);
			});
		},
		_toggleTreeParentsSelection: function _toggleTreeParentsSelection($target) {
			var _this4 = this;

			var parents = this._findTreeParentRows($target);
			parents.forEach(function (row) {
				var $row = $(row);
				var $checkbox = $row.find(':checkbox');
				var children = _this4._findTreeChildRows($row);
				var $childCheckboxes = $(children).find(':checkbox');
				var $childChecked = $childCheckboxes.filter(':checked');
				var $childPartial = $childCheckboxes.filter('.checkbox-partial');
				var hasAnySelected = $childChecked.length > 0 || $childPartial.length > 0;
				var isChildrenAllSelected = children.length === $childChecked.length;
				$row.toggleClass('active', isChildrenAllSelected);
				$checkbox.toggleClass('checkbox-partial', hasAnySelected && !isChildrenAllSelected);
				$checkbox.prop('checked', isChildrenAllSelected);
			});
		},
		_findTreeChildRows: function _findTreeChildRows($target) {
			var index = this.$rows.index($target);
			var level = $target.get(0).dataset.level;

			var rows = this.$rows.slice(index + 1).toArray();
			var children = [];
			for (var row, i = 0, l = rows.length; i < l; ++i) {
				row = rows[i];
				if (row.dataset.level <= level) break;
				if (row.dataset.level === String(+level + 1)) children.push(row);
			}
			return children;
		},
		_findTreeParentRows: function _findTreeParentRows($target) {
			var index = this.$rows.index($target);
			var rows = this.$rows.slice(0, index).toArray().reverse();
			var parents = [];
			for (var row, level = $target.get(0).dataset.level, i = 0, l = rows.length; i < l; ++i) {
				row = rows[i];
				if (row.dataset.level > level) continue;
				if (row.dataset.level === level) continue;
				if (row.dataset.level < level) parents.push(row);
				if (row.dataset.level === 1) break;
				level = row.dataset.level;
			}
			return parents;
		},
		_onExpandClick: function _onExpandClick(e) {
			var $button = $(e.currentTarget);
			var $row = $button.closest('.table-tree-row-exandable');
			this._toggleTreeChildrenExpansion($row, true, false);
		},
		_onRowClick: function _onRowClick(e) {
			var $target = $(e.target);
			var $row = $(e.currentTarget);
			var $checkbox = $row.find(':checkbox');
			var checked = $checkbox.prop('checked');
			var active = $checkbox.length === 1 && !checked;
			if ($target.is('.table-row-expand-btn,.table-row-expand-icon')) return;
			!checked && $checkbox.removeClass('checkbox-partial');
			$row.toggleClass('active', active);
			$checkbox.prop('checked', active);
			this._toggleTreeChildrenSelection($row, active);
			this._toggleTreeParentsSelection($row);
		},
		_onCheckboxLabelClick: function _onCheckboxLabelClick(e) {
			e.preventDefault();
		}
	});

	$('.table-tree').treeTable();
};

portal.on('COMPONENT_SEGMENT_LOADED.cee0fa0f-9af3-4e27-8b70-05d0290771fa', default42be03a68001a8c5644dcd804b40e6eabe7c91e9);

portal.on('COMPONENT_SEGMENT_LOADED.9396f64c-fcb4-49dd-ad99-12ad22ec0511', default42be03a68001a8c5644dcd804b40e6eabe7c91e9);

portal.on('COMPONENT_SEGMENT_LOADED.9d55b272-a14d-4e8b-a087-e5daecd25b42', default42be03a68001a8c5644dcd804b40e6eabe7c91e9);
