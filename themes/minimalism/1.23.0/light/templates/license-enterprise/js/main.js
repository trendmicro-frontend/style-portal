$(function() {
	const modalLg = $('[data-template="modal-lg"]');
	const modalLgBody = modalLg.find('.modal-body');
	modalLgBody.mCustomScrollbar({
		callbacks:{
			whileScrolling:function(){
				$('.modal-header').toggleClass('fixedTop', this.mcs.top < 0);
			}
		}
	});
	$(window).on('resize', function () {
		let styleTag = $('[data-modal-size="adjust"]');
		const head = $('head');
		const noScrollbar = $('.modal-lg .mCS_no_scrollbar');
		const modalHeader = $('.modal-lg .modal-header');
		
		if (styleTag.length === 1) styleTag.remove();
		styleTag = $(
		'<style data-modal-size="adjust">\n' +
		'.modal-lg .modal-body, .modal-md .modal-body { max-height: calc(' + ($(window).height() * 0.8) + 'px - 112px); }' + 
		'</style>').appendTo(head);
	
		if(noScrollbar) modalHeader.removeClass('fixedTop');
		modalLgBody.mCustomScrollbar('update');
	});
	$('.help').tooltip({
		title: "Online help",
		placement: 'left'
	});
	$('.navbar').affix({
		offset: { top: 64 }
	});
	$('.navbar').removeClass('affix-top');
	$('[data-input-mask=activation]').inputMask({
		mask: 'AA-AAAA-AAAAA-AAAAA-AAAAA-AAAAA-AAAAA',
		prepare: function (str) {
			return str.toUpperCase();
		}
	});
});