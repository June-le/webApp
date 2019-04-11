var bannerSwiper = new Swiper('.banner', {
    autoplay: true,//可选选项，自动滑动
    loop: true
})
var tab = (function () {
    function nav() {
        $('.wb_nav ul').on('click', 'li', function (e) {
            e.preventDefault();
            $(this).children('a').addClass('on').parent().siblings().children('a').removeClass('on');
            $('.wrap').children().eq($(this).index()).show().siblings().hide();
        })
    }
    return {
        nav: nav
    }
})();
tab.nav();
var ajx = (function () {
    function sp() {
        var page = 1;
        $('.ajx_commodity').click(function () {
            $.ajax({
                type: 'get',
                url: '../api/brandstore.php',
                dataType: 'json',
                data: {
                    page: page
                },
                success: function (data) {

                    if (data.success) {

                        var html = ejs.render($('#tpl').html(), { list: data });
                        $('.wb_index_goods_sp').html(html)
                    } else {
                        console.log('没有更多数据')
                    }
                },
                error: function () {
                    console.log('请求失败')
                }
            })
        })
    }
    return {
        sp: sp
    }
})();
ajx.sp();
var scro = (function () {
    function scroll() {
        $(window).scroll(function () {
            // console.log($(document).scrollTop());
            if ($(document).scrollTop() >= 100) {
                $('.W_pt_shopBottom').addClass('on');
            } else {
                $('.W_pt_shopBottom').removeClass('on');
            }
        })
        $(window).scroll(function () {
            // console.log($(document).scrollTop(),$('.wb_shop_box').get(0).style.marginTop);
            if ($(document).scrollTop() >= 200) {
                $('.wb_shop_box').css({top:'-2.2rem'});
                $('.wb_nav').css({top:'-2.2rem'});
                $('.W_gnTab_nav').css({top:'1.76rem'});
            } else {
                $('.wb_shop_box').css({top:'0'});
                $('.wb_nav').css({top:'0'});
                $('.W_gnTab_nav').css({top:'4.1rem'});
            }
        })
    }
    return {
        scroll: scroll
    }
})();
scro.scroll();
