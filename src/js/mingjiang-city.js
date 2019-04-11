$(function () {

    function Ejs() {
        // 热门城市
        var tpl = document.getElementById('tpl').innerHTML;
        var html = ejs.render(tpl, {
            list: area.hot
        });
        $(".hot-list").html(html)


        // 城市列表
        var tpl1 = document.getElementById('tpl1').innerHTML;
        var html1 = ejs.render(tpl1, {
            list1: area.cities
        });
        $(".city-list ul").html(html1)

        // 右侧字母导航
        var tpl2 = document.getElementById('tpl2').innerHTML;
        var html2 = ejs.render(tpl2, {
            list2: area.cities
        });
        $(".city-index ul").html(html2)

    }
    Ejs()

    function Iscroll() {
        var myScroll = new IScroll('.wrapper', {
            scrollX: false,
            scrollY: true,
            snap: "li",
            probeType: 3
        });
        var ulList = document.querySelector(".city-index ul");
        for (var i = 0; i < ulList.children.length; i++) {
            ulList.children[i].index = i;
            ulList.children[i].onclick = function () {
                console.log(this.index)
                // 0：水平方向到第0个，7: 垂直方向滚动向第7个
                myScroll.goToPage(0, this.index, 1000, IScroll.utils.ease.circular);
                myScroll.refresh();
            }
        }
    }

    Iscroll()

    //城市点击
    function adder() {
        if(localStorage.adder){
            $(".icon-d-position").after("<div class=\"Add\">" + localStorage.adder + "</div>")
        }else{
            $(".Add").remove();
        }   
        
        $(".city-box a").click(function (e) {
            $(".Add").remove();
            e.preventDefault();
            localStorage.adder = $(this).html();
            // console.log(localStorage.adder)
            $(".icon-d-position").after("<div class=\"Add\">" + localStorage.adder + "</div>")
            window.history.back()
        })
    }
    adder()
})