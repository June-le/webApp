// 筛选选项
function ck(){
$('.p-btn li').click(function (e) {
    e.preventDefault();
    $(this).addClass("banner-nav").siblings().removeClass("banner-nav")
})


//点击筛选,出现筛选列表
$('.banner-filt').click(function(){
    $('.p-filt').show();
})
//点击蒙层空白处,筛选列表关闭
$('.p-filt').click(function(){
    $(this).hide();
})
$('.p-filt .filt-l').click(function(e){
    e.stopPropagation();
})
//点击×,筛选列表关闭
$('.f-shut').click(function(){
    $('.p-filt').hide();
})
//筛选列表点击
//万表服务选项点击
$('.f-conta .f-cont-ul1 li').click(function(){
    $(this).toggleClass("f-cont1-a");
})
//全部分类选项点击
$('.f-conta .f-cont-ul2 li').first().addClass("f-cont1-a");
$('.f-conta .f-cont-ul2 li').click(function () {
    $(this).addClass("f-cont1-a").siblings().removeClass("f-cont1-a")
})
//品牌点击
$('.f-cont-ul3 li').click(function () {
    if($(this).hasClass("f-cont1-a")){
        $(this).removeClass("f-cont1-a").siblings().show();
    }else{
        $(this).addClass("f-cont1-a").siblings().hide();
    }
})
//清空点击
$('.bottom-clear').click(function(){
    $('.filt-content li').removeClass("f-cont1-a").show();
})
}
ck();
//上拉回弹
function wrap(){
var myScroll = new IScroll('.wrapper',{
    scrollX: false,
    scrollY: true,
});
}
wrap();