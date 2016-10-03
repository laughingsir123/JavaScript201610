/**
 * Created by 39753 on 2016/9/28.
 */
$(function(){
    var $btn=$('#div');
    $(window).on('scroll',computedDisplay);//给scroll行为绑定事件computedDisplay
    function computedDisplay(){
        //判断浏览器被卷去高度>可视区的高度，让按钮显示，否则，按钮隐藏；
        if($(window).scrollTop()>$(window).height()){
            $btn.show();
        }else{
            $btn.hide();
        }
    }
    $btn.click(function(){
        $(this).hide();
        //解除事件绑定
        $(window).off('scroll',computedDisplay)
        var target=$(window).scrollTop();//浏览器卷去的高度
        var duration=1000;
        var interval=30;
        var step=target/duration*interval;
        clearInterval(timer);
        var timer=setInterval(function(){
            var curTop=$(window).scrollTop();
            if(curTop<=0){
                clearInterval(timer);
                $(window).on('scroll',computedDisplay);
                return;
            }
            curTop-=step;
            $(window).scrollTop(curTop);
        },interval)


    })
})