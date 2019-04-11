//搜索框接口
        
function peri(data) {
    $(".search-list").html("")
    var html = '';
    // console.log(data.data[0].keywords)
    if (data.data.length) {
       $(".search-list").removeClass("h");
       $(".search-hot").addClass("h")
        for (var i=0; i<data.data.length; i++) {
            html += '<a target="_blank" href="#" class="pi"><span class="pi_text">'+ data.data[i].keywords +'</span><i class="icon-a-autofill"></i></a>';
        }
        $(".search-list").append( html) 
    } else {
        $(".search-list").addClass("h");
       $(".search-hot").removeClass("h")
    }
} 
$(".search").keyup(function(){
    if($(this).val() != '') {
        var oScript = document.createElement('script');
        oScript.src = 'http://www.xbiao.com/search/suggestion/?wd='+this.value+'&callback=peri';
        document.body.append(oScript);
    }else {
        $(".search-list").addClass("h");
       $(".search-hot").removeClass("h")
    }
})