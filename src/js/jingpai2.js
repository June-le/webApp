// 页面加载发起ajax请求渲染页面限时竞拍
$(function(){
    var page = 0;
    $.ajax({
        url : 'api/jingpai2.php',
        type : 'GET',
        data : {
            page : page
        },
        dataType: 'json',
        success :function (data){
            var template = $("#list").html();
            var html = ejs.render(template,{
                data : data
            });
            $(".content").append(html);
        }
    })
})
// 页面加载发起ajax请求渲染页面限时竞拍



// 倒计时
setInterval(lxfEndtime, 60);
        //倒计时
        function lxfEndtime() {
            $(".time").each(function () {
                //var lxfday=$(this).attr("lxfday");//用来判断是否显示天数的变量
                var endtime = new Date($(this).attr("id")).getTime(); //取结束日期(毫秒值)
                // console.log(endtime);                
                var nowtime = new Date().getTime(); //今天的日期(毫秒值)
                // console.log(nowtime);
                var youtime = endtime - nowtime; //还有多久(毫秒值)
                // console.log(youtime);
                var seconds = youtime / 1000; //秒
                var minutes = Math.floor(seconds / 60); //分
                var hours = Math.floor(minutes / 60); //小时
                var days = Math.floor(hours / 24); //天
                var CDay = days;
                var CHour = hours % 24;
                var CMinute = minutes % 60;
                var CSecond = Math.floor(seconds % 60); //"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
                var c = new Date();
                var millseconds = c.getMilliseconds();
                var Cmillseconds = Math.floor(millseconds % 100);
                if (CSecond < 10) { //如果秒数为单数，则前面补零
                    CSecond = "0" + CSecond;
                }
                if (CMinute < 10) { //如果分钟数为单数，则前面补零
                    CMinute = "0" + CMinute;
                }
                if (CHour < 10) { //如果小时数为单数，则前面补零
                    CHour = "0" + CHour;
                }
                if (Cmillseconds < 10) { //如果毫秒数为单数，则前面补零
                    Cmillseconds = "0" + Cmillseconds;
                }else {
                    $(this).html("<span>" + CHour + "</span><i class='txt'>:</i><span>" +
                        CMinute +
                        "</span><i class='txt'>:</i><span>" + CSecond +"</span>");
                }
            });
        }

// 倒计时
