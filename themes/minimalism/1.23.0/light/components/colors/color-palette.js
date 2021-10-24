'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.33c9a987-edff-43ae-8963-1bd3992ea404', function (e) {
  var ClipboardButtonTemplate = function ClipboardButtonTemplate(text, data) {
    return '<button type="button"\n    class="btn btn-default btn-xs btn-copy-color"\n    data-clipboard-text="' + data + '">' + text + '\n    </button>';
  };

  $('[data-palette]', this).each(function (i, elem) {
    var $list = $(elem);
    var palette = $list.data('palette');
    var styles = portal.theme.current.styles;

    function render(index) {
      var $item = void 0;
      var selector = void 0,
          css = void 0,
          matches = void 0,
          color = void 0,
          dark = void 0;

      selector = '.colors-palette-container .' + palette + ' li:nth-child(' + index + ')';

      if (!styles.contains(selector)) {
        return;
      }

      css = styles.style(selector);
      $item = $('<li>').addClass('color-bar');

      matches = /background-color: (#\w+);/.exec(css);
      color = tinycolor(matches[1]);
      dark = color.isDark();

      $item.attr('data-color', color.toHexString()).data();

      $item.data({ color: color }).addClass(dark ? 'colors-dark' : null);
      $list.append($item);

      render(++index);
    }

    render(1);

    var $items = $list.find('>li');
    var length = $items.length;

    $items.each(function (i, elem) {
      var $item = $(elem);
      var color = $item.data('color');
      var index = length - i;
      var $index = $('<span>').addClass('color-index').data({ index: index }).text(index);
      var $color = $('<span>').addClass('color-code').attr({
        'data-toggle': 'popover',
        'data-placement': 'left',
        'data-trigger': 'manual',
        'data-html': true
      });

      color = tinycolor(color);

      $color.attr('data-content', ['<p style="color: #222;">Copy color code</p>', ClipboardButtonTemplate('HEX', color.toHexString()), ClipboardButtonTemplate('RGB', color.toRgbString())].join(' '));

      $color.popover().text(color.toHexString().toUpperCase());
      $item.append($index, $color);
    });
  });

  $('.colors-palette-container').on('click', '.color-bar', function (e) {
    if (e.ctrlKey) {
      return;
    }

    $('.colors-palette-container').find('.popover').popover('hide');
    $(e.currentTarget).find('.color-code').popover('show');
  }).on('mouseenter', '.color-bar', function (e) {
    // $(e.currentTarget).css('background-color', $(e.currentTarget).data('color').lighten(3).toHexString());
  }).on('mouseleave', '.color-bar', function (e) {
    // $(e.currentTarget).css('background-color', $(e.currentTarget).data('color').darken(3).toHexString());
  }).on('click', '.color-code', function (e) {
    $('.colors-palette-container').find('.popover').popover('hide');
    $(e.currentTarget).popover('show');

    e.stopPropagation();
  }).on('click', '.btn-copy-color', function (e) {
    $(e.currentTarget).parents('.popover').popover('hide');
  });

  $(document).on('click', function (e) {
    if ($(e.target).parents('.popover').length) {
      return;
    }
    if ($(e.target).is('.color-bar')) {
      return;
    }

    $('.colors-palette-container').find('.popover').popover('hide');
  }).on('keydown keyup', function (e) {
    window.ctrlKey = e.ctrlKey;
  });

  new Clipboard('.color-bar', {
    text: function text(trigger) {
      return window.ctrlKey ? trigger.getAttribute('data-color') : null;
    }
  });

  new Clipboard('.btn-copy-color');
});
