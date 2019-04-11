// 点击tab切换
$(function () {
    $(".nav ul li").click(function () {
        var index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".content .tabs").eq(index).addClass("tabs-block").siblings().removeClass("tabs-block");

    })
})
// 点击tab切换

// 当滚动条大于一定值导航栏固定到最顶部
$(window).scroll(
    function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop >= 264) {
            $(".W-main .nav").addClass("hide");
        } else {
            $(".W-main .nav").removeClass("hide");
        }
    }
)
// 当滚动条大于一定值导航栏固定到最顶部


function initial(){
    var page = 0;
    $.ajax({
        url: '../api/jingpai.php',
        type: "GET",
        data: {
            page: page
        },
        dataType: 'json',
        success: function (data) {
            var template = $("#list").html();
            var html = ejs.render(template, {
                data: data
            });
            $(".content .tabs-block").append(html);
        }
    })
}
initial();


// 点击优选甄选发起ajax请求并且重复点击不会多次请求
var judge = true;
$(".nav ul li").eq(1).click(function () {
    var page = 0;
    console.log(1);
    if(judge){
        $.ajax({
            url: '../api/jingpai1.php',
            type: "GET",
            data: {
                page: page
            },
            dataType: 'json',
            success: function (data) {
                var template = $("#list").html();
                var html = ejs.render(template, {
                    data: data
                });
                $(".content .tabs-block").append(html);
            }
        })
    }
    judge = false;
})
// 点击优选甄选发起ajax请求并且重复点击不会多次请求
