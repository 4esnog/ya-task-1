'use strict';

//= ../../bower_components/jquery/dist/jquery.min.js

$(document).ready(function(){

	var currChannelId;

	// Переключение навигации (по дате) на мобильных
	
	$('.active').click(function(e){
		if ($('body').outerWidth() >= 700) {
			$('.date-nav').removeClass('opened');
			return;
		}

		if ($('.date-nav').hasClass('opened')) {
			$('.date-nav').removeClass('opened');
		} else {
			$('.date-nav').addClass('opened');
		}

		e.preventDefault();

	});

	// Раскрытие полной программы выбранного канала

	$('.load-more-btn').click(function(e){
		currChannelId = $(this).attr('id').slice(0, -10);
		// if ($(currChannelId).hasClass('.channel--little'))
		// console.log('#'+currChannelId);
		$('.channel').addClass('channel--little hide');
		$('#'+currChannelId).removeClass('channel--little');
	});

	// Скрытие её же

	$('.back-btn').click(function(e){
		$('.channel').removeClass('hide');
		$('#'+currChannelId).addClass('channel--little');
	});

	// Прокрутка при навигации

	(function(){
		if ($('body').width() < 700) return;

		$('.date-nav a').click(function(e){
			e.preventDefault();

			var id = $(this).attr('href');
			var place = $('.main ' + id).offset().top;
			console.log(place);
			var margin = $('.main ' + id + ' .day__header').outerHeight(true);
			var headerHeight = $('.head').height();
			if (place != false) {
				$(document.body).animate({scrollTop: place - margin}, 500);
				}
		});

	})();

	// ScrollSpy

	(function(){

		if ($('body').width() < 700) return;

		var positions = {}

		$('.main .day').each(function(i){
			var id = $(this).attr('id');
			positions[id] = $(this).offset().top;
			console.log(id + ': ' + positions[id]);
		});

		$(document).scroll(function(){
			
			$('.main .day').each(function(i){

				var maxTop = $(document).scrollTop() >= ($(this).offset().top - $('.head').height() - 50);
				var maxBot = $(document).scrollTop() < ($(this).offset().top + $(this).outerHeight(true) - $('.head').height() - 50);

				console.log($(this).attr('id') + ': ' + maxTop + ' && ' + maxBot + ' = ' + (maxTop && maxBot));
				// console.log($(this).offset().top + $('.head').height() + 50);
				
				if (maxTop && maxBot) {
					$('.date-nav a').removeClass('active');
					$('.date-nav a[href="#'+$(this).attr('id')+'"]').addClass('active');
				}
			});
			// console.log($(this).scrollTop());
			

			// if ()
		});

	})();



});