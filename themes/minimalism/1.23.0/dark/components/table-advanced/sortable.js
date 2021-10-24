'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.e26756ec-9811-4429-8435-6fb6f24c4e95', function (e) {
	// LONG TEXT TRUNCATED
	// =================
	var mouseY;
	var mouseX;
	var timer;
	var tableLongtextToggle = $("<div class='longtext-toggle tooltip-inner fade tooltip-inner-light'></div>");
	var tableCell = $('[data-table-longtext=truncated]', this).find('tr').children();
	var colResizeTable = $('[data-table-resizeable=colResize]', this);

	tableCell.mouseenter(function () {
		if ($('.calSpace')) {
			$('.calSpace').remove();
		}
		var cellText = $(this).text();
		var cellWidth = $(this).hasClass('sortabled') ? $(this).width() - 16 : $(this).width();
		var wrapper = $('<div />');
		var divtable = $('<div />');
		var divtableRow = $('<div />');
		var span = $('<span />');

		wrapper.addClass('calSpace').css("position", "absolute").css("top", "-999999px");
		divtable.css("display", "table").css("border-collapse", "collapse");
		divtableRow.css("display", "table-row");
		span.addClass('calSpace').css("display", "table-cell").css("font-family", $(this).css('font-family')).css("font-size", $(this).css('font-size')).css("white-space", $(this).css('white-space')).css("border", "1px solid #444").css("padding", "8px 12px").html(cellText);

		//Add this script to set cellTextLength if the hover element is 'th'
		if ($(this).is("th")) {
			span.css("font-weight", "bold");
		}

		span.appendTo(divtableRow);
		divtableRow.appendTo(divtable);
		divtable.appendTo(wrapper);
		wrapper.appendTo($('body'));
		var cellTextLength = $('.calSpace span').width();

		if (cellWidth < cellTextLength) {
			tableLongtextToggle.html(cellText);
			$(this).hasClass('sortabled') ? $(this).css("cursor", "pointer") : $(this).css("cursor", "default");
			timer = setTimeout(function () {
				tableLongtextToggle.appendTo('body').css({ top: mouseY, left: mouseX });
				setTimeout(function () {
					tableLongtextToggle.addClass("in");
				}, 50);
			}, 500);
		}
	}).mouseleave(function () {
		clearTimeout(timer);
		tableLongtextToggle.removeClass("in").remove();
	});

	$(document).on('mousemove', function (e) {
		mouseY = e.pageY + 10;
		mouseX = e.pageX;
	});

	// RESIZABLE
	// =================
	setTimeout(function () {
		colResizeTable.colResizable({
			liveDrag: true,
			headerOnly: true,
			dragCursor: "col-resize",
			hoverCursor: "col-resize",
			minWidth: 77,
			onDrag: setDragLineHeight,
			onResize: setDragLineHeight,
			partialRefresh: true
		});
		$(".JCLRgrip").hover(function () {
			setDragLineHeight();
		}, function () {
			resetDragLineHeight();
		});

		function setDragLineHeight() {
			var tableHeight = colResizeTable.outerHeight();
			$(".JCLRgrip").css({ height: tableHeight });
		}
		function resetDragLineHeight() {
			var theadHeight = colResizeTable.find('thead').outerHeight();
			$(".JCLRgrip").css({ height: theadHeight });
		}
	}, 200);
});
