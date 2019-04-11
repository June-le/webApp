$(function () {
    //验证码
    var verifyCode = new GVerify("v_container");

    //tab切换
    $(".tab_nav p").click(function () {
        $("input").val("")
        $(this).addClass("active").siblings().removeClass("active");
        $(".contents .logins").eq($(this).index()).removeClass("h").siblings().addClass("h")
    })

    //点击登录获取数据库信息判断账户密码是否正确
    function Ajax() {
        $.ajax({
            type: "POST",
            url: "api/Login.php",
            dataType: "json",
            data: "user=" + $("#userName").val() + "&pwd=" + $("#userPsd").val(),
            success: function (data) {
                console.log(data)
                if (data.code == 1) {
                    $(".login").html("登录")
                    $(".alert").html("用户名不存在");
                    alert()
                } else if (data.code == 2) {
                    $(".login").html("登录")
                    $(".alert").html("密码错误");
                    alert()
                } else {
                    // console.log(11111111)
                    $(".login").html("登录")

                    //设置cookie
                    setCookie("user", data.user);
                    window.location.href = 'index.html'


                }
            }
        })

    }
    function alert() {
        $(".alert").removeClass("h")
        var time = setInterval(function () {
            $(".alert").addClass("h")
            if ($(".alert").hasClass("h")) {
                clearInterval(time)
            }
        }, 1000)
    }
    //点击登录获取数据
    function handlerLogin() {
        $(".login").click(function (e) {
            // e.preventDefault();
            $(".login").html("登录中")
            Ajax()
        })
    }
    handlerLogin();

    $('.zhu-txt a').click(function () {
        window.location.href = 'regist.html'
    })
})