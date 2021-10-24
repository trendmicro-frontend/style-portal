'use strict';

function defaulte6d7a4c1389cffecac2b41b4645a305dcc137e81() {

  $.widget('hie.tree', {
    options: {
      clickable: '.tree-node-label',
      expandable: '.tree-node-expand-button',
      activatable: true,
      selectable: false,
      async: false,
      fetch: null
    },
    _create: function _create() {
      this.$nodes = this.element.find('.tree-node');
      this.$activeNode = this.element.find('.tree-node-active');
      this.data = this.element.data();
      Object.assign(this.options, this.data);
    },
    _init: function _init() {
      this._updateView();
      this._bindEvents();
    },
    _updateView: function _updateView() {
      var _this = this;

      this.$nodes.filter(function (i, node) {
        return node.dataset.level === '1';
      }).each(function (i, node) {
        _this._toggleTreeNodeExpansion($(node), false);
      });
      this.element.find(this.options.clickable).addClass('tree-node-hoverable');
    },
    _bindEvents: function _bindEvents() {
      this.element.on('mouseover', this.options.clickable, this._onToggleNodeHover.bind(this));
      this.element.on('mouseout', this.options.clickable, this._onToggleNodeHover.bind(this));
      this.element.on('click', this.options.clickable, this._onTreeNodeClick.bind(this));
      this.element.on('click', this.options.expandable, this._onExpandClick.bind(this));
    },
    _onTreeNodeClick: function _onTreeNodeClick(e) {
      var $node = $(e.currentTarget).closest('.tree-node');
      if (this._isExpandButton(e.target)) return;
      if (!this.options.selectable) return this._activateTreeNode($node);
      this._toggleTreeNodeSelection($node);
    },
    _onToggleNodeHover: function _onToggleNodeHover(e) {
      $(e.currentTarget).closest('.tree-node').toggleClass('tree-node-hover', e.type === 'mouseover');
    },
    _onExpandClick: function _onExpandClick(e) {
      var _this2 = this;

      var _options = this.options,
          async = _options.async,
          fetch = _options.fetch;

      var $node = $(e.currentTarget).closest('.tree-node');
      var loaded = async && $node.data('loaded');
      var promise = !async || loaded ? Promise.resolve() : fetch($node);
      $node.toggleClass('tree-node-loading', !loaded);
      promise.then(function () {
        $node.toggleClass('tree-node-loading', false).data('loaded', true);
        _this2._toggleTreeNodeExpansion($node, true);
      });
    },
    _toggleTreeNodeSelection: function _toggleTreeNodeSelection($node) {
      var $checkbox = $node.children('.tree-node-label').find(':checkbox');
      var disabled = $checkbox.prop('disabled');
      if (disabled) return;
      var checked = !$checkbox.prop('checked');
      !checked && $checkbox.removeClass('checkbox-partial');
      $checkbox.prop('checked', checked);
      this.$nodes.removeClass('tree-node-open');
      this._toggleChildrenSelection($node, checked);
      this._toggleParentsSelection($node);
    },
    _toggleChildrenSelection: function _toggleChildrenSelection($node, checked) {
      var _this3 = this;

      var $nodes = this._findChildTreeNodes($node);
      $nodes.toArray().forEach(function (node) {
        var $node = $(node);
        var expandable = $node.hasClass('tree-node-expandable');
        var $checkbox = $node.children('.tree-node-label').find(':checkbox');
        $checkbox.prop('checked', checked);
        !checked && $checkbox.removeClass('checkbox-partial');
        expandable && _this3._toggleChildrenSelection($node, checked);
      });
    },
    _toggleParentsSelection: function _toggleParentsSelection($node) {
      var _this4 = this;

      var $parents = this._findParentTreeNodes($node);
      $parents.toArray().forEach(function (node) {
        var $node = $(node);
        var $checkbox = $node.children('.tree-node-label').find(':checkbox');
        var children = _this4._findChildTreeNodes($node);
        var $childCheckboxes = $(children).children('.tree-node-label').find(':checkbox');
        var $childChecked = $childCheckboxes.filter(':checked');
        var $childPartial = $childCheckboxes.filter('.checkbox-partial');
        var hasAnySelected = $childChecked.length > 0 || $childPartial.length > 0;
        var isChildrenAllSelected = children.length === $childChecked.length;
        $checkbox.toggleClass('checkbox-partial', hasAnySelected && !isChildrenAllSelected);
        $checkbox.prop('checked', isChildrenAllSelected);
      });
    },
    _activateTreeNode: function _activateTreeNode($node) {
      if (!this.options.activatable) return;
      this.$activeNode.removeClass('tree-node-active');
      this.$activeNode = $node.addClass('tree-node-active');
      this.$nodes.removeClass('tree-node-open');
    },
    _toggleTreeNodeExpansion: function _toggleTreeNodeExpansion($target, toggle) {
      var expanded = $target.hasClass('tree-node-expanded');
      toggle && $target.toggleClass('tree-node-expanded', !expanded).toggleClass('tree-node-open', !expanded);
      !expanded && this.$nodes.not($target).removeClass('tree-node-open');
    },
    _findChildTreeNodes: function _findChildTreeNodes($node) {
      return $node.children('.tree-nodes').children('.tree-node');
    },
    _findParentTreeNodes: function _findParentTreeNodes($node) {
      return $node.parents('.tree-node');
    },
    _isExpandButton: function _isExpandButton(target) {
      return $(target).is('.tree-node-expand-button,.tree-node-expand-icon');
    }
  });

  $('.tree', this).tree({
    fetch: function fetch($node) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return resolve();
        }, 1500);
      });
    }
  });
};

portal.on('COMPONENT_SEGMENT_LOADED.22ad59b7-aa68-43ae-a622-6836fb554f61', defaulte6d7a4c1389cffecac2b41b4645a305dcc137e81);

portal.on('COMPONENT_SEGMENT_LOADED.c793e761-3df4-4d01-9dc7-d769db92061a', defaulte6d7a4c1389cffecac2b41b4645a305dcc137e81);

portal.on('COMPONENT_SEGMENT_LOADED.3a634be6-eac5-4c8f-996e-2343fc8f4a02', defaulte6d7a4c1389cffecac2b41b4645a305dcc137e81);

portal.on('COMPONENT_SEGMENT_LOADED.1e4c46bb-2684-4882-a274-0573d5250a73', defaulte6d7a4c1389cffecac2b41b4645a305dcc137e81);

portal.on('COMPONENT_SEGMENT_LOADED.23177624-22aa-4d98-b500-34c5766e5caa', defaulte6d7a4c1389cffecac2b41b4645a305dcc137e81);
