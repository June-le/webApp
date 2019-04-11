(function(){
    document.cookie = "userId=2";
var userId=getCookie("userId")||0;
globalCart = {
    // 获取购物车中商品的总数量
    getQuantity: function (suc) {
        // 将传入的参数与默认的配置进行合并
        var opts = {
            success: function () { }
        };
        var sets = $.extend(opts, suc);
        // 判断是不是登录状态,如果没有登录就将localstorage中的cart对象中的商品总数量传回去
        if (0 === yb.isLogin) {
            // 如果没有登录就将数据存到localstorage中
            (function () {
                var oldCart = $.parseJSON(localStorage.getItem("cart")), totalNum = 0;
                // 如果在localstorage中已经有了cart这个对象
                if (oldCart) {
                    for (var key in oldCart) {
                        if (oldCart[key].goodsNum) {
                            // 统计购物车中商品的总数量
                            totalNum += oldCart[key].goodsNum;
                        }
                    }
                    sets.success(totalNum);
                } else {
                    // 如果根本就没有cart这个对象
                    sets.success(0);
                }
            })();

        } else if (1 === yb.isLogin) {
            // 如果是登录状态，就从数据库中查找购物城中商品总数量
            // (function () {
            //     $.ajax({
            //         type: "get",
            //         url: "api/dmCart.php",
            //         dataType: "json",
            //         success: function (data) {
            //             if (data.info.error === 0) {
            //                 sets.success(data.data)
            //             } else {
            //                 sets.success(0);
            //             }
            //         }
            //     })
            // })();
        }
    },
    // 用户点击加入购物车后加入购物车
    add: function (params) {
        var opts = {
            goodsCode: null,
            goodsNum: 1,
            salePrice: null,
            extendValue: null,
            success: null
        };
        var sets = $.extend(opts, params);
        if (!sets.goodsCode || Number(sets.salePrice <= 0)) {
            return false;
        }
        function addToLocalCart() {
            var localCart = $.parseJSON(localStorage.getItem("cart"));
            var local = localCart || {};
            // 如果加入购物车的这件商品在购物车中已经有了就增加其数量
            if (local[sets.goodsCode]) {
                if (local[sets.goodsCode].goodsNum) {
                    local[sets.goodsCode].goodsNum += sets.goodsNum
                } else {
                    local[sets.goodsCode].goodsNum = sets.goodsNum;
                }
            } else {
                local[sets.goodsCode] = {};
                local[sets.goodsCode].goodsNum = sets.goodsNum;
            }
            if (sets.salePrice) {
                local[sets.goodsCode].salePrice = sets.salePrice
            }
            localStorage.setItem("cart", JSON.stringify(local));
            sets.success({
                error: 0,
                message: "ok"
            })
        }
        // 判断用户是否登录
        if (0 === yb.isLogin) {
            //如果用户没有登录就将数据存入localstorage
            addToLocalCart();
        } else if (1 === yb.isLogin) {
            console.log("进入了登录状态的加入购物车");
            // 如果用户登录了就将数据存入数据库
            (function () {
                $.ajax({
                    type: "get",
                    url: "api/dmAddToCart.php",
                    dataType: "json",
                    data: {
                        goodsCode: sets.goodsCode,
                        userId: userId,
                        goodsNum: sets.goodsNum
                    },
                    success: function (data) {
                        if (!data.error) {
                            sets.success(data);
                        }
                    }
                })
            })()
        }

    }
}
// 加入购物车操作封装完成
cart = function () {
    // 查看当前商品详情页有没有购物车小图标
    // 如果有购物车小图标的话就查询商品总数量
    if ($(".detail_footer .icon-d-goodscart").length) {
        globalCart.getQuantity({
            success: function (totalNum) {
                // 如果商品总数大于0就在购物车小图标右上角显示红色的数字
                if (totalNum > 0) {
                    $(".detail_footer .icon-d-goodscart i").text(totalNum);
                    $(".detail_footer .icon-d-goodscart i").addClass("red")
                } else {
                    $(".detail_footer .icon-d-goodscart i").hide();
                }
            }
        });
    }
    var addToCart = function () {
        var spIndex = $(".choice_content-a_title_bian").attr("data-index");
        var chooseNum = Number($("#count").val());
        var spPrice = Number($(".wbPrice").text());
        var $cartNum = $(".detail_footer .icon-d-goodscart i");
        globalCart.add({
            goodsCode: spIndex,
            goodsNum: chooseNum,
            salePrice: spPrice,
            success: function (data) {
                $(".detail_footer .icon-d-goodscart i").show();
                if (1 === yb.isLogin) {
                    if (data) {
                        if (data.error > 0) {
                            console.log(e.info.message || "网络异常");
                        } else {
                            $(".coice_content_cont_num").text(chooseNum);
                            $cartNum.text(Number($cartNum.eq(0).text()) + chooseNum);
                        }
                    }
                } else if (0 ===yb.isLogin) {
                    $(".coice_content_cont_num").text(chooseNum);
                    $cartNum.text(Number($cartNum.eq(0).text()) + chooseNum);
                }
            }
        });
    };
    detailJS.eject($(".js_cart").eq(1), ".choice_content-a_ico,.tc_bg", ".tc_container_choice");
    $(".js_cart").eq(1).on("click", function () {
        // console.log("点击了");
        console.log(detailJS.eject);
    })
    $(".js_cart").eq(0).on("click", function () {
        // 弹出弹窗后判断此次页面操作选择的数量
        addToCart();
        $(".tc_content").removeClass("tc_bottom");
        $("body").css({
            overflow: "auto"
        });
        $(".tc_container_choice").fadeOut();

    })
}()
})()

