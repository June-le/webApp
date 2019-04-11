;(function(){
    var indexScroll={
        init:function(){this.getMoreTjGoods()},
        showLoading: function(e) {
            $("body").append('<div class="Wb_loading"><img class="loading_img" src="https://static.wbiao.co/p/m/images/1/wb_loading.png" alt=""><span class="wb_txt">YB</span></div>');
        },
        hideLoading: function() {
            $(".Wb_loading").length && $(".Wb_loading").fadeOut(function() {
                $(".Wb_loading").remove()
            })
        },
        getMoreTjGoods: function() {
            var num,page=0,flag=true,showLoad,hideLoad;
            showLoad=this.showLoading;
            hideLoad=this.hideLoading;
            $(window).scroll(function() {
                if((parseFloat($(window).height()) + parseFloat($(window).scrollTop())) >= $(document).height()&&flag){
                    flag=false;
                    num=8*page;
                    showLoad();
                    if(page<2){
                        $.ajax({
                            type: "get",
                            url: 'api/tjgoods.php',
                            data:{
                                page:page
                            },
                            dataType: 'json',
                            success: function (data){
                                if(data.success==1){
                                    hideLoad();
                                    flag=true;
                                    page++;
                                    var source=$("#tjGoods").html();
                                    var html=ejs.render(source,{tjGoods:data.goods});
                                    $(".Wb_tj_goods .goods_list").append(html);
                                }else{
                                    console.log("数据库中没有数据");
                                }
                            },
                            error: function() {
                                console.log("请求失败")
                            }
                        });

                    }else{
                        $(".W_ending").removeClass("h");
                        hideLoad();
                    }
                }
            })
        }
    }
    indexScroll.init();
})()


