'use strict';

$(document).ready(function(){

	// Переключение навигации (по дате) на мобильных
	
	$('.active').click(function(e){
		if ($('body').offset.width >= 700) {
			$('.date-nav').removeClass('opened');
			return;
		}

		e.preventDefault();

		if ($('.date-nav').hasClass('opened')) {
			$('.date-nav').removeClass('opened');
		} else {
			$('.date-nav').addClass('opened');
		}

	});

	// Раскрытие полной программы выбранного канала

	$('.load-more-btn').click(function(e){
		var channelId = $(this).attr('id').slice(0, -10);
		// if ($(channelId).hasClass('.channel--little'))
		console.log('#'+channelId);
		$('#'+channelId).removeClass('channel--little')
	});
});