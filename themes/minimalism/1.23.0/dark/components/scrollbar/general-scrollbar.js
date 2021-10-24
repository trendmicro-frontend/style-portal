'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.aa8b7cdb-389a-4ac4-a32d-451745bc15b0', function (e) {
    $('.general-scrollable').mCustomScrollbar();

    $('.hidden-scrollable').mCustomScrollbar({
        autoHideScrollbar: true
    });
});
