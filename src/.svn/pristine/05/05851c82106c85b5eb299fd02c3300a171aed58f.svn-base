$(function(){

    //轮播图
    var mySwiper = new Swiper('.swiper-container1', {
        autoplay: true, //可选选项，自动滑动
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        }
    })
    //项目服务
    var navSwiper = new Swiper('.swiper-container2', {
        freeMode: true,
        slidesPerView: 'auto',
        freeModeSticky: true,
    });
   //维修名家
    var navSwiper = new Swiper('.swiper-container3', {
        freeMode: true,
        slidesPerView: 'auto',
        freeModeSticky: true,
    });

    //底部
   $(".W_footer a").click(function(){
      $(this).addClass("on").siblings().removeClass("on")
   })

   if(localStorage.adder){
    $(".add span").html( localStorage.adder)
   }else{
    $(".add span").html("未知")
   }
   
})