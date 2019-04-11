var detailJS = {
    setHeight: function () {
        var leftHeight = $(window).height() - $(".headOut").height() - $(".footOuter").height();
    },
    headTabs: function () {
        var flag = true;
        var ajaxFun = this.sendAjax;
        headSwiper = new Swiper("#tabs-container", {
            paginationClickable: !0,
            observer: !0,
            observeParents: !0,
            autoHeight: !0,
            noSwiping: !0,
            noSwipingClass: "stop-swiping",
            speed: 500,
            on: {
                slideChangeTransitionStart: function () {
                    $(".tabs .on").removeClass("on"),
                        $(".tabs a").eq(this.activeIndex).addClass("on")
                },
                slideChangeTransitionEnd: function () {
                    if ($(".W_title .wb_goods_tab a").eq(2).hasClass("on")) {
                        if (flag) {
                            flag = false;
                            ajaxFun("#evaluate_total_content");
                        }
                    }
                },
            },
            observeSlideChildren: true
        });
        $(".tabs a").on("click", function (i) {
            i.preventDefault(),
                $(".tabs .on").removeClass("on"),
                $(this).addClass("on"),
                headSwiper.slideTo($(this).parent().index())
        })
    },
    swipers: function () {
        new Swiper(".swiper-container-carousel", {
            visibilityFullFit: !0,
            loop: !0,
            lazy: true,
            pagination: {
                el: ".pr_carousel .swiper-pagination"
            }
        })
    },
    detailsTab: function () {
        $(".details .W_gnTab_nav ul").on("click", "li", function () {
            $(this).addClass("on").siblings().removeClass("on");
            $("#details_content").find(".gnTabs_block").eq($(this).index()).show().siblings().hide();
            headSwiper.update();

        })
    },
    storeTab: function () {
        $(".store .store-content li").last().addClass("h");
        $(".store-title").on("click", "li", function () {
            $(this).addClass("on").siblings().removeClass("on");
            $(".store-content").find("li").eq($(this).index()).removeClass("h").siblings().addClass("h");
            headSwiper.update();
        })
    },
    evaluateTab: function () {
        var flag = true;
        var ajaxFun = this.sendAjax;
        var evaluateMock = this.evaluateMock;
        $(".evaluate .W_gnTab_nav ul").on("click", "li", function () {
            $(this).addClass("on").siblings().removeClass("on");
            $("#evaluate_content").find(".gnTabs_block").eq($(this).index()).removeClass("h").siblings().addClass("h");
            if ($(".evaluate .W_gnTab_nav ul li").eq(1).hasClass("on")) {
                if (flag) {
                    flag = false;
                    evaluateMock(true);
                    ajaxFun("#evaluate_total_content2");
                }
            }
            // headSwiper.update();
        })
    },
    productAllEval: function () {
        $(".evaluate_more_whole").on("click", function () {
            headSwiper.slideTo(2, 300, false);
            headSwiper.update();
        })
    },
    evaluateMock: function (hasPic) {
        var ajaxFun = this.sendAjax;
        // var vip=["金卡会员","银卡会员","钻石会员"];
        var img = [0, "images/detail/evaluate-head-01 (1).jpg", "images/detail/evaluate-head-01 (3).jpg", "images/detail/evaluate-head-01 (2).jpg", "images/detail/evaluate-head-01 (4).jpg", "images/detail/evaluate-head-01 (5).jpg"];
        if (hasPic) {
            img.shift();
        }
        var txt = ["万表买的第二块表，都不错，除了厚一点", "好看，走时准，一天大概快两三。", "说实话第一眼看到给我的感觉很有档次，做工没的说，至于其他的等我用过一段时间后在做评价"];
        Mock.mock("http://evaluate.com", {
            err: 0,
            "list|8": [{
                'head|1': img,
                'name': /^\w{2}[*]{4}\w{2}$/,
                'vip|0-2': 1,
                'wuxing|1-5': 1,
                'txt|1': txt,
                'img': function () {
                    var ran1, ran2, arr = [];
                    ran2 = Math.floor(Math.random() * 7);
                    for (var i = 0; i < ran2; i++) {
                        ran1 = Math.floor(Math.random() * 17);
                        arr.push("images/detail/evaluateMock-01 (" + ran1 + ").jpg")
                    }
                    return arr;
                },
                // 'date':"2018-09-12 12:11:49",
                date: Mock.Random.datetime(),
                'style|0-1': "真皮 白色 牛皮",
                'imgNum': "共3张图",
            }]
        });
        $(".W_gnTab_content .detail_more").eq(0).on("click", function () {
            ajaxFun("#evaluate_total_content");
        })
        $(".W_gnTab_content .detail_more").eq(1).on("click", function () {
            ajaxFun("#evaluate_total_content2");
        })
    },
    productEval: function () {
        this.sendAjax(".pr_evaluate .evaluate_content", "single", "headtab");
    },
    sendAjax: function (target, n, h) {
        var tempheadTabs = this.headTabs;
        $.ajax({
            url: 'http://evaluate.com',
            dataType: 'json',
            success: function (data) {
                if (n == "single") {
                    var temp = [];
                    temp.push(data.list[0]);
                    data.list = temp;
                }
                var html;
                html = "";
                html += ejs.render(document.getElementById('evaluateMock').innerHTML, { evaluate: data });
                html += $(target).html();
                $(target).html(html);
                if (h) {
                    tempheadTabs.call(detailJS);
                };
                headSwiper.update();
            }
        })
    },
    eject: function (e, t, o) {
        $(e).on("click", function () {
            $(o).fadeIn(),
                $(".tc_content").addClass("tc_bottom"),
                $("body").css({
                    overflow: "hidden"
                })
        }),
            $(t).on("click", function () {
                $(o).fadeOut(),
                    $(".tc_content").removeClass("tc_bottom"),
                    $("body").css({
                        overflow: "auto"
                    })
            })
    }
    ,
    ejectAll: function () {
        var eject = this.eject;
        eject(".coupons_stages", ".tc_button_b,.tc_bg", ".tc_container_fq"),
            eject(".coupons_voucher", ".tc_button_b,.tc_bg", ".tc_container_juan"),
            eject(".coupons_promotion", ".tc_button_b,.tc_bg", ".tc_container_cx"),
            eject(".flaw", ".tc_button_b,.tc_bg", ".tc_container_xc"),
            eject(".ys_content", ".tc_button_b,.tc_bg", ".tc_container_ys"),
            eject(".pr_coice", ".choice_content-a_ico,.tc_bg", ".tc_container_choice"),
            eject(".js_share", ".fx_button,.tc_bg", ".tc_container_fx"),
            eject(".combination_ico", ".js_combination,.tc_bg", ".tc_container_zh"),
            eject(".W_combination .more", ".purchase_title,.icon-a-close03,.tc_bg", ".tc_container_rq"),
            eject("#brand", ".tc_container_brand .button,.tc_container_brand .brandPopup .title i,.tc_bg", ".tc_container_brand"),
            eject(".rareClick", ".tc_container_rare .tc_bg,.tc_container_rare .tc_button_b", ".tc_container_rare")
        $(".choice_content_b_content").find("span").on("click", function () {
            $(this).addClass("colour").siblings().removeClass("colour");
            // $(".choice_content-a_img img").attr({src})

            var a="https://image7.wbiao.co/shop/121382c5d7ee4bcfbdb3061eb3f0ca03.jpg?x-oss-process=image/resize,m_pad,w_750,h_750,color_ffffff"
            var b="https://image7.wbiao.co/shop/5c5921ea1d0b479bbd13dbf8ca0e0404.jpg?x-oss-process=image/resize,m_pad,w_750,h_750,color_ffffff"
            var c="https://image7.wbiao.co/shop/0c2f546fff5b4180b93ce3a4f4f40e3f.jpg?x-oss-process=image/resize,m_pad,w_750,h_750,color_ffffff"
            if($(this).index()==0){
                console.log(1111)
                $(".choice_content-a_img img").attr({src:a})
            }else if($(this).index()==1){
                $(".choice_content-a_img img").attr({src:b})
            }else{
                $(".choice_content-a_img img").attr({src:c})
            }
        })
    },
    add: function () {
        var e, t = $("#count"), o = Number(t.attr("data-realCount")) + Number(t.attr("data-virtualCount"));
        $(".choice_content_b_num_b").find("span").on("click", function () {
            var a = $(this);
            if (e = Math.floor(t.val()),
                "add" == a.attr("data-type")) {
                if (5 === Number(a.attr("data-saleType")))
                    return 0,
                        !1;
                e >= o ? (
                    t.val(o)) : (t.val(++e),
                        a.siblings("span").removeClass("boder_colour"))
            } else
                e > 1 && (2 == e && a.addClass("boder_colour"),
                    t.val(--e))
        })
    },
    heart: function () {
        var isLogin = this.isLogin;
        $(".detail_footer_ico3").on("click", function () {
            // 判断是否登录
            if (isLogin()) {
                // 判断是否已经收藏
                if ($(this).hasClass("icon-d-goods-xin2")) {
                    // 如果已经收藏过
                    // 1.发送ajax从数据库取消收藏
                    $("body").append("<div class='mui-toast-container'><div class='mui-toast-message'>取消成功</div>");
                    $(".mui-toast-container").addClass("mui-active");
                    $(".mui-toast-container")[0].addEventListener("webkitTransitionEnd", function () {
                        if (!$(".mui-toast-container").hasClass("mui-active")) {
                            $(".mui-toast-container").remove();
                        }
                    });
                    setTimeout(function () {
                        if ($(".mui-toast-container")) {
                            $(".mui-toast-container").removeClass("mui-active");
                        }
                    }, 1000);
                    $(".detail_footer_ico3").removeClass("icon-d-goods-xin2");
                } else {
                    // 如果还没有收藏过
                    // 1.发送ajax从数据库收藏
                    $("body").append("<div class='mui-toast-container'><div class='mui-toast-message'>收藏成功</div>");
                    $(".mui-toast-container").addClass("mui-active");
                    $(".mui-toast-container")[0].addEventListener("webkitTransitionEnd", function () {
                        if (!$(".mui-toast-container").hasClass("mui-active")) {
                            $(".mui-toast-container").remove();
                        }
                    });
                    setTimeout(function () {
                        if ($(".mui-toast-container")) {
                            $(".mui-toast-container").removeClass("mui-active");
                        }
                    }, 1000);
                    $(".detail_footer_ico3").addClass("icon-d-goods-xin2")
                }
            } else {
                location.href = "login.html";
            }
        })
    },
    isLogin: function () {
        if (getCookie("user")) {
            return true;
        } else {
            return false;
        }
    },
    title: function () {
        $(".wb_more").on("click", function () {
            $(".ol_show").toggleClass("h");
        });
        $(window).scroll(function () {
            $(window).scrollTop() >= 50 && $(".ol_show").addClass("h")
        })
    },
    removeByValue: function (e, t) {
        for (var o = 0; o < e.length; o++)
            if (e[o] == t) {
                e.splice(o, 1);
                break
            }
    }
    ,
    popularity: function () {
        var e = this;
        var t = $(".purchase_cont")
            , o = t.find("li")
            , a = []
            , n = []
            , i = []
            , r = []
            , c = t.find("li").eq(0).find(".sp2").children("b").html();
        t.on("click", "li span.icon-a-mj_yixuan", function () {
            var t = $(this);
            if (t.hasClass("icon-a-white-tik")) {
                t.removeClass("icon-a-white-tik");
                for (var s = 1; s < o.length; s++)
                    if (!o.eq(s).find("span.choose").hasClass("icon-a-white-tik")) {
                        var d, l = o.eq(s).find("span.sp2").children("b").html(), u = o.eq(s).find("p.p1 span").children("em").html(), p = [], h = [], _ = {};
                        _ = {
                            value: s,
                            text: l
                        },
                            d = {
                                value: s,
                                text: u
                            },
                            p.push(_),
                            h.push(d);
                        for (var b = 0; b < p.length; b++)
                            -1 == n.indexOf(p[b].value) && (n.push(p[b].value),
                                a.push(p[b].text));
                        for (var b = 0; b < h.length; b++)
                            -1 == i.indexOf(h[b].value) && (i.push(p[b].value),
                                r.push(h[b].text))
                    }
                for (var g = Number(c), m = 0, v = 0; v < a.length; v++)
                    g += Number(a[v]);
                for (var f = 0; f < r.length; f++)
                    m += Number(r[f]);
                e.CartFooter(g, m)
            } else {
                t.addClass("icon-a-white-tik");
                var w = t.siblings("a").find("p.p2").find("span.sp2").children("b").html()
                    , C = t.siblings("a").find("p.p1").find("span").children("em").html()
                    , x = t.parents("li").index();
                e.removeByValue(a, w),
                    e.removeByValue(n, x),
                    e.removeByValue(r, C),
                    e.removeByValue(i, x);
                var k = Number(c)
                    , y = 0;
                if (a.length < 1)
                    k = 0;
                else {
                    for (var S = 0; S < a.length; S++)
                        k += Number(a[S]);
                    for (var j = 0; j < r.length; j++)
                        y += Number(r[j])
                }
                e.CartFooter(k, y)
            }
        })
    }
    ,
    CartFooter: function (e, t) {
        var o = $(".purchase_footer");
        o.children(".sp1").find("em").text(e || 0),
            o.children(".sp2").find("em").text(t || 0)
    }
    ,
    getGoods:function(){

        var href=location.href;
        var arr=href.split("=");
        var goodsCode=arr[1];
        $.ajax({
            type: "get",
            url: "api/dmDetail.php",
            dataType: "json",
            data:{goodsCode:goodsCode},
            success: function (data) {
                console.log(data)
                if(!data.error){
                    $(".choice_content-a_title_bian").attr("data-index",data.detail["0"].Id);
                    $(".wbPrice").text(data.detail["0"].price)
                    $(".title_b.share_text").text(data.detail["0"].details)
                    $(".choice_content-a_title_bian").find("span").text(data.detail["0"].Id)
                }
            }
        })
    },
    init: function () {
        this.getGoods();
        this.swipers();
        this.detailsTab();
        this.storeTab();
        this.evaluateTab();
        this.evaluateMock();
        this.productEval();
        this.setHeight();
        this.ejectAll();
        this.add();
        this.heart();
        this.title();
        this.popularity();
        this.productAllEval();
    },
};
detailJS.init();
