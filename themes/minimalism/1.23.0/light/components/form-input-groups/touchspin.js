'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.8dad46f6-ea13-4746-ba77-5e428e8684bc', function (e) {
  var touchspinVertical = $('.touchspin.vertical');
  var touchspinHorizontal = $('.touchspin.horizontal');
  var touchspinVerInput = touchspinVertical.find('input');
  var touchspinHorInput = touchspinHorizontal.find('input');

  $(document).mousedown(function (e) {
    touchspinVertical.removeClass('focused');
    touchspinHorizontal.removeClass('focused');

    // Add focus class on touchspin wrapper
    if (e.target.closest('.touchspin.vertical')) {
      touchspinVertical.addClass('focused');
    }
    if (e.target.closest('.touchspin.horizontal')) {
      touchspinHorizontal.addClass('focused');
    }
    // Edit input value when click button
    if (e.target.closest('button')) {
      var button = $(e.target).closest('button').find('span');
      if (button.hasClass("tmicon-chevron-up")) {
        increaseValue(touchspinVerInput);
      }
      if (button.hasClass("tmicon-chevron-down")) {
        decreaseValue(touchspinVerInput);
      }
      if (button.hasClass("tmicon-add")) {
        increaseValue(touchspinHorInput);
      }
      if (button.hasClass("tmicon-minus")) {
        decreaseValue(touchspinHorInput);
      }
    }
  }).on('keydown', function (e) {
    // Edit input value when up and down key trigger
    if (e.target.closest('.touchspin.vertical > input')) {
      if (e.keyCode === 38) {
        e.preventDefault();
        increaseValue(touchspinVerInput);
      }
      if (e.keyCode === 40) {
        e.preventDefault();
        decreaseValue(touchspinVerInput);
      }
    }
    if (e.target.closest('.touchspin.horizontal > input')) {
      if (e.keyCode === 38) {
        e.preventDefault();
        increaseValue(touchspinHorInput);
      }
      if (e.keyCode === 40) {
        e.preventDefault();
        decreaseValue(touchspinHorInput);
      }
    }
  }).mousewheel(function (e, delta) {
    // Edit input value when mouse wheel on target input
    if (e.target.closest('.touchspin.vertical > input')) {
      e.preventDefault();
      if (delta > 0) {
        increaseValue(touchspinVerInput);
      } else {
        decreaseValue(touchspinVerInput);
      }
    }
    if (e.target.closest('.touchspin.horizontal > input')) {
      e.preventDefault();
      if (delta > 0) {
        increaseValue(touchspinHorInput);
      } else {
        decreaseValue(touchspinHorInput);
      }
    }
  });

  function increaseValue(element) {
    element.val(parseInt(element.val()) + 1);
  }

  function decreaseValue(element) {
    element.val(parseInt(element.val()) - 1);
  }
});
