//获取焦点失去焦点显示和清除输入框的内容
$(function () {
    $(".num").focus(function () {
        if ($(this).val() == "请输入手机号") {
            $(this).val("");
        }
    })
    $(".num").blur(function () {
        if ($(this).val() == "") {
            $(this).val("请输入手机号");
        }
    })
})
//获取焦点失去焦点显示和清除输入框的内容

// 点击领取判断输入的是否是正确的电话号码
$(function () {
    $(".wrap-in .btn").click(function () {
        var phone = $(".num").val();
        var myreg = /^1(3|4|5|7|8)\d{9}$/;
        // alert(1);
        if (myreg.test(phone)) {
            alert("领取成功");
        } else {
            alert("请输入正确的号码");
            $(".num").val("请输入手机号");
            return false;
        }
    })
})
// 点击领取判断输入的是否是正确的电话号码

// 点击返回顶部
$(function(){
    $(".wrap-2 .button").click(function(){
        $("html,body").animate({scrollTop:0},0);
    })
})
// 点击返回顶部