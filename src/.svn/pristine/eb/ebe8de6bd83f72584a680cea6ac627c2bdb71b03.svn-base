$(function () {
    var verifyCode = new GVerify("v_container");
    var flag = false,
        flag1 = false;
    $("#phone").blur(function () {
        var phone = $("#phone").val();
        if (phone == "") {
            $(".alert").html("手机号不能为空");
            alert();
        } else {
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                $(".alert").html("手机号码有误，请重填");
                alert();
                return false;
            } else {
                flag=true;
                return true;
            }
        }
    })
    function newPW(){
        regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
        if($("#setpassword").val()==""){
            $(".alert").html("密码不能为空");
            alert()
            return false;
        }
        else if(!regExp.test($("#setpassword").val())){
            $(".alert").html("密码格式错误");
            alert()
            return false;
        }
        else{
            flag1=true;
            return true;
        }
    }
    $("#setpassword").blur(newPW);

    function alert() {
        $(".alert").removeClass("h")
        var time = setInterval(function () {
            $(".alert").addClass("h")
            if ($(".alert").hasClass("h")) {
                clearInterval(time)
            }
        }, 1000)
    }

     //点击注册满足条件时，请求数据
     $('#register').click(function () {
        var res = verifyCode.validate($('.yan').val()) 
        // console.log(res)
        if (res) {
            if (flag && flag1) {
                $.ajax({
                    beforeSend: function () {
                        $("#register").html("注册中");
                    },
                    type: "GET",
                    url: "api/zhuce.php",
                    dataType: "json",
                    data: "user=" + $("#phone").val() + "&pwd=" + $("#setpassword").val(),
                    success: function (data) {
                        if (data.code == 0) {

                            setCookie("user", data.user);
                            window.location.href=''
                        }
                    },
                    complete: function () {
                        $("#register").html('注册');
                    }
                })
            }
        } else {
            $(".alert").html("验证码错误");
            alert();
        }
    })
})