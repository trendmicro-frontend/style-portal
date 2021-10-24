'use strict';

function default3559d7accf00360971961ca18989adc0614089c0() {
  $('[data-search-box=searchBoxDisplay]', this).on('mousedown', function (e) {
    e.preventDefault();
  });

  var searchField = $('[data-search-box=searchBox]', this);
  searchBox(searchField);

  function searchBox(elem) {
    var $inputGroup = elem;
    var $input = $inputGroup.find('.form-control');
    var $closeBtn = $inputGroup.find('.tmicon-close-s');
    if ($input.val() === '') {
      $closeBtn.hide();
    }
    $input.on('keyup', function (e) {
      $(this).val() === '' ? $closeBtn.hide() : $closeBtn.show();
    });
    $closeBtn.on('click', function (event) {
      $input.val('').focus();
      $(this).hide();
    });
  }

  (function ($) {
    'use strict';

    $.widget('hie.searchBox', {
      // default options
      options: {
        placeholder: 'Type wording...',
        value: ''
      },
      // The constructor
      _create: function _create() {
        this.timer = null;

        this.$inputIconGroup = $('<div>', {
          'class': 'input-icon-group'
        });
        this.element.wrap(this.$inputIconGroup);

        this.$inputIconLabel = $('<label>', {
          'class': 'input-icon-label'
        }).insertAfter(this.element);
        this.$iconSearch = $('<i>', {
          'class': 'tmicon tmicon-search-o'
        }).appendTo(this.$inputIconLabel);

        this.$iconLoader = $('<span>', {
          'class': 'loader loader-small'
        }).hide().insertAfter(this.element);
        this.$iconClose = $('<span>', {
          'class': 'tmicon tmicon-close-s tmicon-visible-low tmicon-hoverable'
        }).hide().insertAfter(this.element);

        this.element.on('focus', $.proxy(this.searchBoxFocus, this)).on('blur', $.proxy(this.searchBoxBlur, this)).on('keyup', $.proxy(this.searchBoxKeyUp, this));
        this.$iconClose.on('click', $.proxy(this.closeIconClick, this));
      },
      searchBoxFocus: function searchBoxFocus() {
        this.$iconSearch.addClass('focus');
      },
      searchBoxBlur: function searchBoxBlur() {
        this.$iconSearch.removeClass('focus');
      },
      searchBoxKeyUp: function searchBoxKeyUp(event) {
        var _self = this;
        var selectedLength = String(window.getSelection()).length;
        var keyCheck = ['Control', 'Meta', 'Shift', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].indexOf(event.key);
        if (this.element.val() === '') {
          this.$iconClose.hide();
        } else {
          clearTimeout(this.timer);
          if (keyCheck === -1 && selectedLength === 0) {
            this.timer = setTimeout(function () {
              _self.$iconClose.hide();
              if (_self.element.val() !== '') {
                _self.$iconLoader.show();
              }
              setTimeout(function () {
                _self.$iconLoader.hide();
                if (_self.element.val() !== '') {
                  _self.$iconClose.show();
                }
              }, 500);
            }, 300);
          }
        }
      },
      closeIconClick: function closeIconClick(event) {
        this.element.val('');
        this.$iconLoader.hide();
        this.$iconClose.hide();
        this.element.focus();
      }
    });
  })(jQuery);

  $('#searchBox').searchBox();
};

portal.on('COMPONENT_SEGMENT_LOADED.e1f3dcf0-359f-4207-9efd-af567a12ed5e', default3559d7accf00360971961ca18989adc0614089c0);

portal.on('COMPONENT_SEGMENT_LOADED.27a7e158-ec25-440a-9c36-c73cba471f42', default3559d7accf00360971961ca18989adc0614089c0);

portal.on('COMPONENT_SEGMENT_LOADED.856dcb17-52f2-47ab-acae-462ce182986c', default3559d7accf00360971961ca18989adc0614089c0);
