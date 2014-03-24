$(function(){    
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
                $('body').css('background-image','url('+bg+')');
            },200);
        }
    
    $('.tabs a').on('touchstart mousedown',function(e){ 
        $('html,body').animate({scrollTop:0},0);
        $.address.value($(this).attr('href'));
                
        var index_now = $('.b-menu .active').index();
        var index_new = $(this).parent().index();
        if (index_now > index_new){
            // Prev
            prevPage();
        }else{
            // Next
            nextPage();
        }
        
        if (index_new == 0){
            main_intit();
        }
                
        e.preventDefault()
        $(".tabs .active").removeClass('active')
        $(this).parent().addClass('active')
        tabsSwiper.swipeTo($(this).parent().index())
            
        
        var bg = $(this).attr('data-background');
        $('body').css('background-image','url('+bg+')');
        
        downScroll();
    })
    
    $('.b-href').on('click',function(e){ 
        var href = $(this).attr('href');
        var index = parseInt($(this).attr('data-index'));
        
        $('html,body').animate({scrollTop:0},0);
        $.address.value(href);
        
        
        var index_now = $('.b-menu .active').index();
        if (index_now > index){
            // Prev
            prevPage();         
        }else{
            // Next
            nextPage();
        }
                
        var bg = $('.b-menu [href="'+href+'"]').attr('data-background');
        $('body').css('background-image','url('+bg+')');
        
        e.preventDefault();
        $(".tabs .active").removeClass('active');
        $(".tabs li").eq(index).addClass('active');
        tabsSwiper.swipeTo(index);
        
        downScroll();
        return false;
    });
    
    
    $(".tabs a").click(function(e){
        e.preventDefault()
    })

    
    var active = $('.swiper-slide-active').index();
    var bgBody = $('.b-menu li').eq(active).find('a').attr('data-background');
    $('.b-menu li').eq(active).addClass('active');
    $('body').css('background-image','url('+bgBody+')');

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
    // GlobalSettings.intervals['b-box'].timerId = setInterval(function(){
    //     var isBack = true;
    //     // debugger;
    //     GlobalSettings.intervals['b-box'].isBack = !GlobalSettings.intervals['b-box'].isBack;
    //     isBack = GlobalSettings.intervals['b-box'].isBack;
    //     $.each($('.b-box b'), function(el){
    //         TweenMax.to(
    //             this,
    //             1,
    //             {
    //                 left: (isBack) ? 40 : -40,
    //                 top: (isBack) ? 40 : -40
    //             });
    //     });
    // }, 1000);

    $.each($('.b-box b'), function(){
        var el = this,
            bBox;

        TweenMax.to(
                    el,
                    1,
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
                            1,
                            {
                                left: (that.isBack) ? 40 : -40,
                                top: (that.isBack) ? 40 : -40
                            });
                        that.isBack = !that.isBack;
                    }, 3000);
                },
                isBack: true
            });
            bBox = GlobalSettings.intervals['b-box'];
            bBox[bBox.length-1].timerId = bBox[bBox.length-1].timerId();
        }, $('.b-box b').index(this) * 1000);
    });

    GlobalSettings.intervals['jumping-box'] = [];

    GlobalSettings.intervals['jumping-box'].push({
        timerId: function(){
                return setInterval(function(){
                    $('.js-boximg1').animate({
                        top: '10'
                    }, 1000, function(){
                        $('.js-boximg1').animate({
                            top: '25'
                        }, 1000);
                    });
                }, 2000)
        }()
    })

    GlobalSettings.intervals['jumping-box'].push({
        timerId: function(){
                return setInterval(function(){
                    $('.js-boximg2').animate({
                        top: '7'
                    }, 1000, function(){
                        $('.js-boximg2').animate({
                            top: '22'
                        }, 1000);
                    });
                }, 2000)
        }()
    })

    GlobalSettings.intervals['jumping-box'].push({
        timerId: function(){
                return setInterval(function(){
                    $('.js-boximg3').animate({
                        top: '13'
                    }, 1000, function(){
                        $('.js-boximg3').animate({
                            top: '25'
                        }, 1000);
                    });
                }, 2000)
        }()
    })
    

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
                    0.5,
                    {
                        left: -50/*(that.isBack) ? -50 : 60*/,
                        top: -130/*(that.isBack) ? -130 : -40*/
                    });
                    that.isBack = !that.isBack;
            }, 2000)
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