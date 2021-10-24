'use strict';

function defaultc6dcbbe6593cf24bdad1b68701aa969d67f3777f() {
  // global _

  $.widget('hie.queryBuilders', {
    options: {
      operator: 'AND',
      operators: [],
      fields: []
    },
    _create: function _create() {
      var _this = this;

      this.fields = {};
      this.data = this.element.data();
      this.$active = null;
      Object.assign(this.options, this.data);
      this.options.fields.forEach(function (field) {
        return _this.fields[field.label] = field;
      });
      this._createView();
    },
    _createView: function _createView() {
      var _this2 = this;

      var _options = this.options,
          operators = _options.operators,
          fields = _options.fields;

      this.$operator = $('\n      <div class="query-builder-operator">\n        <div class="dropdown">\n          <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown">\n            <span class="tmicon tmicon-caret-down"></span><span class="dropdown-label"></span>\n          </button>\n          <ul class="dropdown-menu query-builder-operator-options"></ul>\n        </div>\n      </div>\n    ');
      this.$operators = operators.map(function (_ref) {
        var value = _ref.value,
            label = _ref.label,
            selected = _ref.selected;

        selected && _this2._updateOperatorLabel(label);
        return $('<li><a href="javascript:;" data-operator="' + value + '">' + label + '</a></li>');
      });
      this.$criteria = $('\n      <div class="query-builder-item query-builder-add-criteria">\n        <div class="query-builder-item-operator"></div>\n\n        <div class="query-builder-item-field">\n          <div class="dropdown">\n            <button type="button" class="btn btn-border btn-block dropdown-toggle" data-toggle="dropdown">\n              <span class="tmicon tmicon-caret-down"></span>\n              <span class="tmicon tmicon-add"></span>Add criteria\n            </button>\n\n            <ul class="dropdown-menu query-builder-field-items"></ul>\n          </div>\n        </div>\n      </div>\n    ');
      this.$fields = fields.map(function (_ref2) {
        var value = _ref2.value,
            label = _ref2.label,
            header = _ref2.header;

        if (header) return $('<li class="dropdown-header">' + header + '</li>');
        return $('<li><a href="javascript:;" data-name="' + label + '">' + label + '</a></li>');
      });
      this.$items = $('<div class="query-builder-items"></div>');
      this.$operator.find('.query-builder-operator-options').append(this.$operators);
      this.$criteria.find('.query-builder-field-items').append(this.$fields);
      this.element.append(this.$operator, this.$items, this.$criteria);
    },
    _createItem: function _createItem(field) {
      var operator = this.options.operator;

      var $item = $('<div class="query-builder-item">\n        <div class="query-builder-item-operator">\n          <span class="badge badge-light-gray query-builder-item-operator-badge">' + operator + '</span>\n        </div>\n\n        <div class="query-builder-item-field">\n          <div class="dropdown">\n            <button type="button" class="btn btn-border btn-block dropdown-toggle query-builder-item-field-toggle" data-toggle="dropdown">\n              <span class="tmicon tmicon-caret-down"></span>\n              <span class="query-builder-item-field-selected">' + field.label + '</span>\n            </button>\n\n            <ul class="dropdown-menu query-builder-field-items"></ul>\n          </div>\n        </div>\n\n        <div class="query-builder-item-input"></div>\n\n        <div class="query-builder-item-remove">\n          <span class="tmicon tmicon-close-s tmicon-visible-low tmicon-hoverable query-builder-remove-item"></span>\n        </div>\n      </div>');
      var $fields = this.$criteria.find('.query-builder-field-items').clone();
      $item.find('.query-builder-field-items').replaceWith($fields);
      $item.find('.query-builder-item-field-toggle').on('focus', this._onItemFieldToggleFocus.bind(this));
      this._createItemInputControl($item, field);
      this.$items.append($item);
      this._assignActiveItem($item);
    },
    _createItemInputControl: function _createItemInputControl($item, field) {
      var value = field.value;

      var $container = $item.find('.query-builder-item-input').empty();
      var isTextType = value === 'text';
      var isTokensType = value === 'tokens';
      isTextType && this._createInputField($item, $container, field);
      isTokensType && this._createTokens($item, $container, field);
    },
    _createInputField: function _createInputField($item, $container, field) {
      var _this3 = this;

      var $input = $('<input type="text" class="form-control">');
      $input.on('input', _.debounce(function (e) {
        return _this3._validateInput($item, field, e.target);
      }, 300));
      $input.on('focus', function (e) {
        return _this3._assignActiveItem($item);
      });
      $container.append($input);
      $container.append('<span class="help-block help-block-invalid help-block-with-icon" style="display: none;">\n        <span class="tmicon tmicon-warning-circle tmicon-color-error"></span>\n        <span class="error-message"></span>\n      </span>');
      setTimeout(function () {
        return $input.focus();
      }, 50);
    },
    _createTokens: function _createTokens($item, $container, field) {
      var _this4 = this;

      var $input = $('<input type="text" class="form-control">');
      $container.append($input);
      $input.token({
        allowEditing: false,
        createTokensOnBlur: false,
        showAutocompleteOnFocus: true,
        placeholder: '',
        autocomplete: {
          source: field.options
        },
        fieldWidth: '100%',
        onFocus: function onFocus() {
          return _this4._onTokenFieldFocus($item);
        },
        onTagsClear: function onTagsClear() {
          return _this4._assignActiveItem($item);
        }
      });
      setTimeout(function () {
        return $input.token('focus');
      }, 50);
    },
    _init: function _init() {
      this._bindEvents();
    },
    _bindEvents: function _bindEvents() {
      this.element.on('click', '.query-builder-operator .query-builder-operator-options > li > a', this._onOperatorSelect.bind(this));
      this.element.on('click', '.query-builder-add-criteria .query-builder-field-items > li > a', this._onNewItemFieldSelect.bind(this));
      this.element.on('click', '.query-builder-items .query-builder-field-items > li > a', this._onItemFieldChange.bind(this));
      this.element.on('click', '.query-builder-remove-item', this._onRemoveItemClick.bind(this));
    },
    _updateOperatorLabel: function _updateOperatorLabel(label) {
      this.$operator.find('.dropdown-label').text(label);
    },
    _validateInput: function _validateInput($item, field, input) {
      if (!field.validator) return;
      var $input = $(input).removeClass('form-invalid');
      var $help = $item.find('.help-block').hide();
      var message = field.validator(input.value, field, $input, $help, $item);
      if (message === true) return;
      $input.addClass('form-invalid');
      $help.find('> .error-message').html(message);
      $help.show();
    },
    _assignActiveItem: function _assignActiveItem($item) {
      this.$active && this.$active.removeClass('query-builder-item-active');
      this.$active = $item.addClass('query-builder-item-active');
    },
    _onOperatorSelect: function _onOperatorSelect(e) {
      var $target = $(e.target);
      this.options.operator = $target.data('operator');
      this.element.find('.query-builder-item-operator > span').text(this.options.operator);
      this._updateOperatorLabel($target.text());
    },
    _onNewItemFieldSelect: function _onNewItemFieldSelect(e) {
      var $target = $(e.target);
      var data = $target.data();
      var field = this.fields[data.name];
      this._createItem(field);
    },
    _onItemFieldChange: function _onItemFieldChange(e) {
      var $target = $(e.target);
      var $item = $target.closest('.query-builder-item');
      var data = $target.data();
      var field = this.fields[data.name];
      $item.find('.query-builder-item-field-selected').text(data.name);
      this._createItemInputControl($item, field);
    },
    _onTokenFieldFocus: function _onTokenFieldFocus($item) {
      this._assignActiveItem($item);
      this._closeItemFieldToggleMenu();
    },
    _onItemFieldToggleFocus: function _onItemFieldToggleFocus(e) {
      var $target = $(e.target);
      var $item = $target.closest('.query-builder-item');
      this._assignActiveItem($item);
    },
    _closeItemFieldToggleMenu: function _closeItemFieldToggleMenu() {
      // When token field dropdown menu open, item field dropdown menu will also open.
      // Close item field dropdown menu when token focus.
      $('.query-builder').find('[data-toggle="dropdown"]').parent().removeClass('open');
    },
    _onRemoveItemClick: function _onRemoveItemClick(e) {
      $(e.target).closest('.query-builder-item').remove();
    }
  });

  $('.query-builder', this).queryBuilders({
    operators: [{
      value: 'AND',
      label: 'Match all of the following',
      selected: true
    }, {
      value: 'OR',
      label: 'Match any of the following'
    }],
    fields: [{
      header: 'Menu Section 1'
    }, {
      value: 'text',
      label: 'Input Field with Error Checking',
      pattern: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      validator: function validator(value, filed, $input, $help, $item) {
        return 'Error message.';
        // if (!filed.pattern.test(value)) return 'Invalid IP address.';
        // return true;
      }
    }, {
      value: 'tokens',
      label: 'Token Selection',
      options: ['Alan Chen', 'Bevis Wang', 'Tom Chang', 'Tim Lee', 'Zac Lin']
    }, {
      header: 'Menu Section 2'
    }, {
      value: 'text',
      label: 'Input Field'
    }]
  });
};

portal.on('COMPONENT_SEGMENT_LOADED.c3a71066-2bc6-48df-8892-d0156dd41fc4', defaultc6dcbbe6593cf24bdad1b68701aa969d67f3777f);

portal.on('COMPONENT_SEGMENT_LOADED.3223cc91-3f86-44f6-abcb-bb23f278ee4a', defaultc6dcbbe6593cf24bdad1b68701aa969d67f3777f);
