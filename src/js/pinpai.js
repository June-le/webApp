        // 品牌top轮播开始
        var mySwiper = new Swiper('.pinpai-banner', {
            autoplay: true, //可选选项，自动滑动
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            }
        })
        // 品牌top轮播结束

        // 品牌bom滑动开始
        var navSwiper = new Swiper('.shangou-bom-banner', {
                freeMode: true,
                slidesPerView: 'auto',
                freeModeSticky: true,
            })
        // 品牌bom滑动结束