$(function(){
	minHeight()
	$(window).resize(function(e) {
		minHeight()
	});
});

function main_intit(){
	$('.b-main-top').css('top',-308);
	$('.b-main-top .b-links a').css('left',-297);
	$('.b-box').css('opacity',0);
	nextPage();
	TweenMax.to($('.b-main-top'), 0.5, {top:0,ease:Power1.easeOut,onComplete:function(){
		TweenMax.staggerTo($('.b-main-top .b-links a'),0.5,{left:0,ease:Power1.easeOut},0.5);
		TweenMax.staggerTo($('.b-box'),1,{opacity:1,delay:1.2},0.5);
	}});
}

function minHeight(){
	$('body').css({'min-height':$(window).height()});
	$('.swiper-container').css({'min-height':$(window).height() - 108});
	$('.swiper-slide > .container').hide();
}



  
function nextPage(){
	TweenMax.fromTo($('.b-page'),1,{left:1920},{left:0});
	pageAnimation();
}

function prevPage(){
	TweenMax.fromTo($('.b-page'),1,{left:-1920},{left:0});
	pageAnimation();
}

function pageAnimation(){
	TweenMax.set($('.b-block1, .b-button-order'),{left:-423});
	var tl = new TimelineLite();
	tl.to($('.b-block1'), 0.5, {left:0,delay:1})
	  .to($('.b-button-order'), 0.5, {left:0});
	tl.play(0);
}
