$(function () {
    // 首次加载页面发起ajax请求渲染页面5条数据
    var page = 0;
    $.ajax({
        url: '../api/gbzn.php',
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
            $("main").append(html);
        }
    })

    // 触底加载发起ajax请求加载数据
    $(window).scroll(
        function () {
            var scrollTop = $(this).scrollTop();
            // console.log(scrollTop);
            var scrollHeight = $(document).height();
            // console.log(scrollHeight);
            var windowHeight = $(this).height();
            // console.log(windowHeight);
            if (scrollTop + windowHeight == scrollHeight) {
                page++;
                var xhr =$.ajax({
                    url: '../api/gbzn.php',
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
                        $("main").append(html);
                    }
                });
                if(page>7){
                    $("div").removeClass("h");
                }
            }
        });
});