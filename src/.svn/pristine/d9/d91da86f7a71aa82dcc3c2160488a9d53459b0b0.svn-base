$(function(){
    $(".W_gnTab_nav ul li").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        // console.log($(this).index())
        console.log($('.W_gnTab_content .gnTabs_block'))
        $('.W_gnTab_content .gnTabs_block').eq($(this).index()).addClass("gn-block").siblings().removeClass("gn-block")
    })

    $(".W_footer a").click(function(){
        $(this).addClass("on").siblings().removeClass("on")
     })

     if(localStorage.adder){
        $(".add span").html( localStorage.adder)
       }else{
        $(".add span").html("未知")
       }
})