$(function(){
    function changeBGmagic(background, index){
        if ( index == 0 ) {
            $('body').addClass('body-first-page');
            $('body').attr('style', '');
        } else {
            $('body').removeClass('body-first-page');
            $('body').css({
                'background-image':'url('+background+')',
                'background-position': '0px 0px',
                'background-attachment': 'fixed'
            });
        }
    }

    $(window).resize(function(e) {
        downScroll();
    });
    
    var tabsSwiper = new Swiper('.swiper-container',{
        onlyExternal : true,
        speed:0,
        initialSlide: 0
    });
        pageAnimation();
    
    var href_active = $.address.value();
        href_active = href_active.replace('/', '');
    var link_active = $('[href="'+href_active+'"]').parent().index();
        if (link_active != -1){
            setTimeout(function(){
                tabsSwiper.swipeTo(link_active);
                var bg = $('[href="'+href_active+'"]').attr('data-background');
                $('[href="'+href_active+'"]').parent().addClass('active');
                changeBGmagic(bg, link_active);
            },200);
        }
    
    $('.tabs a').on('touchstart mousedown',function(e){ 
        $('html,body').animate({scrollTop:0},0);
        $.address.value($(this).attr('href'));
        $('.js-slideBySlide').css('opacity', '0.0');
        var index_now = $('.b-menu .active').index(),
            index_new = $(this).parent().index(),
            counter = 0;
        if (index_now > index_new){
            // Prev
            prevPage();
        }else{
            // Next
            nextPage();
        }
        
        if (index_new == 0){
            main_intit();
        } else {
            $('.b-bottom-from .b-line').addClass('black');
        }
        e.preventDefault()
        $(".tabs .active").removeClass('active')
        $(this).parent().addClass('active')
        tabsSwiper.swipeTo($(this).parent().index())
        $('.b-block1, .b-button-order').css('left', '-423px');
        setTimeout(function(){
            var arr_length = $('.swiper-slide-active .js-slideBySlide').length;

            // $('.b-block1, .b-button-order').animate({
            //     left: -423,
            // }, 1000);
            // TweenMax.set($('.b-block1, .b-button-order')[0],{left:-423});
            $.each($('.swiper-slide-active .js-slideBySlide'), function(){
                var that = this;
                counter++;
                // console.log($(that).hasClass('b-block1'));
                setTimeout(function(){
                    if($(that).hasClass('b-block1')|| $(that).hasClass('b-button-order')){
                        // debugger;
                        $(that).css('display', 'inline-block');

                            var tl = new TimelineLite();
                                tl.to($('.b-block1'), 0.5, {left:0,delay:1})
                                  .to($('.b-button-order'), 0.5, {left:0});
                                tl.play(0);
                    } else {
                        $(that).animate({
                            'opacity': 1,
                        },1000);
                    }
                }, 500*counter);
            });
        }, 1000);
        var bg = $(this).attr('data-background');
        changeBGmagic(bg, index_new);        
        downScroll();
    })
    
    $('.b-href').on('click',function(e){ 
        debugger;
        var href = $(this).attr('href'),
            index = parseInt($(this).attr('data-index')),
            counter = 0;
        
        $('html,body').animate({scrollTop:0},0);
        $.address.value(href);
        $('.js-slideBySlide').css('opacity', '0.0');
        
        var index_now = $('.b-menu .active').index();
        if (index_now > index){
            // Prev
            prevPage();         
        }else{
            // Next
            nextPage();
        }
                
        var bg = $('.b-menu [href="'+href+'"]').attr('data-background');
        changeBGmagic(bg, index_now);

        if (index == 0){
            main_intit();
        } else {
            $('.b-bottom-from .b-line').addClass('black');
        }

        e.preventDefault();
        $(".tabs .active").removeClass('active');
        $(".tabs li").eq(index).addClass('active');
        tabsSwiper.swipeTo(index);
        
        setTimeout(function(){
            var arr_length = $('.swiper-slide-active .js-slideBySlide').length;
            $('.b-block1, .b-button-order').animate({
                left: -423,
            }, 1000);
            TweenMax.set($('.b-block1, .b-button-order')[0],{left:-423});
            $.each($('.swiper-slide-active .js-slideBySlide'), function(){
                var that = this;
                counter++;
                console.log($(that).hasClass('b-block1'));
                setTimeout(function(){
                    if($(that).hasClass('b-block1')|| $(that).hasClass('b-button-order')){
                        // debugger;
                        $(that).css('display', 'inline-block');
                        // $(that).fadeIn(400, function(){
                            // setTimeout(function(){
                            var tl = new TimelineLite();
                                tl.to($('.b-block1'), 0.5, {left:0,delay:1})
                                  .to($('.b-button-order'), 0.5, {left:0});
                                tl.play(0);

                            // },3000)
                        // });
                    } else {
                        $(that).animate({
                            'opacity': 1,
                        },1000);
                    }
                }, 500*counter);
            });
        }, 1000);

        downScroll();
        return false;
    });
    
    $('.js-mask').on('click', function(e){
        var txt = $(e.currentTarget).data('text');
        $('.js-lvl-modal > .lvl-modal-content').html(txt);
        $('.js-lvl-modal').modal();
    });

    $('.js-lvl-modal-close').on('click', function(){
        $('.js-lvl-modal').modal('hide');
    });

    $('.js-lvl-modal').on('shown.bs.modal', function (e) {
        $('.js-lvl-modal').hide();
        $('.js-lvl-modal').fadeIn(200);
    })
    $('.js-lvl-modal').on('hidden.bs.modal', function (e) {
        $('.js-lvl-modal').show();
        $('.js-lvl-modal').fadeOut(200);
    })

    $(".tabs a").click(function(e){
        e.preventDefault()
    })

    
    var active = $('.swiper-slide-active').index();
    var bgBody = $('.b-menu li').eq(active).find('a').attr('data-background');
    $('.b-menu li').eq(active).addClass('active');
    // changeBGmagic(bgBody);

    $('.fancybox').fancybox();
    
    
    $('body').on('click','.b-radio',function(){
     if (!$(this).find('input').attr("checked")){
        var name = $(this).find('input').attr('name');
        $('input[name="'+name+'"]').each(function(index, element) {
        $(this).parent().removeClass('b-active') ;
        });
        $('input[name="'+name+'"]').removeAttr('checked');
        $(this).find('input').prop({'checked': true});
        $(this).addClass('b-active');
       }else{
           return false;
         }
    });
    
    
    $( "#quadrate-range" ).slider({
      range: true,
      min: 0,
      max: 260,
      values: [ 0, 260 ],
      slide: function( event, ui ) {
        $( ".b-quadrate-min" ).html(ui.values[ 0 ]);
        $( ".b-quadrate-max" ).html(ui.values[ 1 ]);
      }
    });
    
    $( "#price-range" ).slider({
      range: true,
      min: 0,
      max: 2300000,
      values: [ 0, 2300000 ],
      step: 1000,
      slide: function( event, ui ) {
         $( ".b-price-min" ).html(ui.values[ 0 ]);
         $( ".b-price-max" ).html(ui.values[ 1 ]);
      }
    });
    
    $('.ui-slider').each(function(index, element) {
       $(this).find('.ui-slider-handle').each(function(index, element) {
            $(this).addClass('sliderarrow'+index);
       });  
    });
    
    $('.b-close').click(function(e) {
        $('.b-container-basket, .b-overlay, .b-overlay1, .b-container-order, .b-level-container, .b-level-container > div').fadeOut();
        return false;
    });
    
    $('.b-level-poup').click(function(e) {
        var href = $(this).attr('href');
        $('.b-level-container').css('top',$(window).scrollTop()+140);
        $('.b-level-container, .b-overlay, .b-overlay1, .'+href).fadeIn();
        return false;
    });
    
    $('.b-pay-info').click(function(e) {
        $('.b-container-basket').css('top',$(window).scrollTop()+140);
        $('.b-container-basket, .b-overlay').fadeIn();  
        return false;
    });
    
    $('.b-order-popup').click(function(e) {
        $('.b-container-order').css('top',$(window).scrollTop()+140);
        $('.b-container-order, .b-overlay').fadeIn();   
        return false;
    });
    
    $('.b-down-scroll').click(function(e) {
        var winHeight = parseInt($(window).height()) / 2;
        $('html, body').animate({scrollTop:'+='+winHeight});
        return false;
    });
    
    setTimeout(function(){downScroll()},500);
    
    $('.b-offer-block .b-offer').hover(
    function(e) {
        var then = $(this).find('img');
        TweenMax.to(then,1,{scale:1.2});
    },
    function(e) {
        var then = $(this).find('img');
        TweenMax.to(then,1,{scale:1});
    });
    
    $('.b-data-block .b-block1').hover(
    function(e) {
        TweenMax.to($(this),0.5,{left:20});
    },
    function(e) {
        TweenMax.to($(this),0.5,{left:0});
    });
    
    $('.b-button-order, .b-main-top .b-links a').hover(
    function(e) {
        TweenMax.to($(this),0.5,{left:20});
    },
    function(e) {
        TweenMax.to($(this),0.5,{left:0});
    });
    
    GlobalSettings = {};
    GlobalSettings.intervals = {};
    GlobalSettings.intervals['b-box'] = [];
    GlobalSettings.intervals['b-box'].isBack = true;// проигрывать анимацию в обратном порядке.


    //"свечение" иконок на главной странице
    $.each($('.b-box b'), function(){
        var el = this,
            bBox;

        TweenMax.to(
                    el,
                    2,
                    {
                        left: 40,
                        top: 40
                    });

        setTimeout(function(){
            GlobalSettings.intervals['b-box'].push({
                timerId: function test(){
                    var that = this;
                    setInterval(function(){
                        TweenMax.to(
                            el,
                            2,
                            {
                                left: (that.isBack) ? 40 : -40,
                                top: (that.isBack) ? 40 : -40
                            });
                        that.isBack = !that.isBack;
                    }, 4000);
                },
                isBack: true
            });
            bBox = GlobalSettings.intervals['b-box'];
            bBox[bBox.length-1].timerId = bBox[bBox.length-1].timerId();
        }, $('.b-box b').index(this) * 1000);
    });

    GlobalSettings.intervals['jumping-box'] = [];

    jumpingBoxSpeed = 400;
    intervalStartEndJump = 12;

    //прыгающие иконки блоков на главной странице
    GlobalSettings.intervals['jumping-box'].push({
        timerId: function(){
                return setInterval(function(){
                    var top = $('.js-boximg1').css('top');
                    $('.js-boximg1').animate({
                        top: '10'
                    }, jumpingBoxSpeed/2, function(){
                        $('.js-boximg1').stop();
                        $('.js-boximg1').animate({
                            top: '25'
                        }, jumpingBoxSpeed/2, function(){
                            $('.js-boximg1').stop();
                            $('.js-boximg1').animate({
                                top: top
                            }, jumpingBoxSpeed/2);
                        });
                    });
                }, jumpingBoxSpeed*intervalStartEndJump);
        },
        $el: $('.js-boximg2')
    });

    GlobalSettings.intervals['jumping-box'].push({
        timerId: function(){
                return setInterval(function(){
                    var top = $('.js-boximg2').css('top');
                    $('.js-boximg2').animate({
                        top: '7'
                    }, jumpingBoxSpeed/2, function(){
                        $('.js-boximg2').stop();
                        $('.js-boximg2').animate({
                            top: '22'
                        }, jumpingBoxSpeed/2, function(){
                            $('.js-boximg2').stop();
                            $('.js-boximg2').animate({
                                top: top
                            }, jumpingBoxSpeed/2);
                        });
                    });
                }, jumpingBoxSpeed*intervalStartEndJump);
        },
        $el: $('.js-boximg2')
    });

    GlobalSettings.intervals['jumping-box'].push({
        timerId: function(){
                return setInterval(function(){
                    var top = $('.js-boximg3').css('top');
                    $('.js-boximg3').animate({
                        top: '13'
                    }, jumpingBoxSpeed/2, function(){
                        $('.js-boximg3').stop();
                        $('.js-boximg3').animate({
                            top: '25'
                        }, jumpingBoxSpeed/2, function(){
                            $('.js-boximg3').stop();
                            $('.js-boximg3').animate({
                                top: top
                            }, jumpingBoxSpeed/2);
                        });
                    });
                }, jumpingBoxSpeed*intervalStartEndJump);
        },
        $el: $('.js-boximg3')
    });
    
    GlobalSettings.intervals['jumping-box'].push({
        timerId: function(){
                return setInterval(function(){
                    var top = $('.js-boximg4').css('top');
                    $('.js-boximg4').animate({
                        top: '8'
                    }, jumpingBoxSpeed/2, function(){
                        $('.js-boximg4').stop();
                        $('.js-boximg4').animate({
                            top: '20'
                        }, jumpingBoxSpeed/2, function(){
                            $('.js-boximg4').stop();
                            $('.js-boximg4').animate({
                                top: top
                            }, jumpingBoxSpeed/2);
                        });
                    });
                }, jumpingBoxSpeed*6);
        }(),
        $el: $('.js-boximg4')
    });
    var index = 0;

    $.each(GlobalSettings.intervals['jumping-box'], function(){
        var that = this
        index++;
        if(that.$el[0] != $('.js-boximg4')[0]){
            setTimeout(function(){
                that.timerId();
            }, jumpingBoxSpeed*6*(index/4));
        }
    });

    GlobalSettings.intervals['logo'] = [];
    GlobalSettings.intervals['logo'].push({
        timerId: function(){
            return setInterval(function(){
                var that = this;
                $('.js-logo-blur').find('b').css({
                    left: "60px",
                    top: "-40px"
                })
                TweenMax.to(
                    $('.js-logo-blur').find('b'),
                    2.7,
                    {
                        left: -50/*(that.isBack) ? -50 : 60*/,
                        top: -130/*(that.isBack) ? -130 : -40*/
                    });
                    that.isBack = !that.isBack;
            }, 7000);
        },
        isBack: true
    });

    GlobalSettings.intervals['logo'][0].timerId = GlobalSettings.intervals['logo'][0].timerId();
    
    $('.b-box-inner .b-img').hover(
    function(e) {
     var then = $(this).find('b');
     TweenMax.to(then,1,{left:-15,top:-15,ease:Cubic.easeOut});
    },
    function(e) {
     var then = $(this).find('b');
     TweenMax.to(then,1,{left:0,top:0,ease:Cubic.easeOut});
    });

    // $('.js-mask').on('mouseover', function(e){
    //     var $el = $(e.currentTarget),
    //         pos = {
    //             left: $el.position().left - 5,
    //             top: $el.position().top +5
    //         };

    //     $el.stop();
    //     $el.animate({
    //         left: pos.left,
    //         top: pos.top
    //     }, 100)
    // })
    // .on('mouseout', function(e){
    //     var $el = $(e.currentTarget),
    //         pos = {
    //             left: $el.position().left + 5,
    //             top: $el.position().top - 5
    //         };

    //     $el.stop();
    //     $el.animate({
    //         left: pos.left,
    //         top: pos.top
    //     }, 100, function(){
    //         $el.css('z-index', 0);
    //     })
    // })
    
});

function downScroll(){
    $('.b-down-scroll').fadeOut();
    var height_html = parseInt($('html').height());
    var height_win = parseInt($(window).height());
    if (height_html > height_win){
        $('.b-down-scroll').stop(true).fadeIn();
    }else{
            $('.b-down-scroll').fadeOut();
         }
}