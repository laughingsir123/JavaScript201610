/**
 * Created by 39753 on 2016/9/28.
 */
$(function(){
    var $btn=$('#div');
    var timer=null;
    var bOk=false;
    //手动+定时器；
    $(window).on('scroll',computedDisplay);//给scroll行为绑定事件computedDisplay
    function computedDisplay(){
        //判断浏览器被卷去高度>可视区的高度，让按钮显示，否则，按钮隐藏；
        if(bOk) clearInterval(timer);//在定时器把bOk变成false之前，关闭定时器；
        bOk=true;
        if($(window).scrollTop()>$(window).height()){
            $btn.show();
        }else{
            $btn.hide();
        }
    }
    $btn.click(function(){
        var target=$(window).scrollTop();//浏览器卷去的高度
        var duration=1000;
        var interval=50;
        var step=target/duration*interval;
        clearInterval(timer);
        timer=setInterval(function(){//只受定时器的影响；
            var curTop=$(window).scrollTop();
            if(curTop<=0){
                clearInterval(timer);
                return;
            }
            curTop-=step;
            $(window).scrollTop(curTop);
            bOk=false;
        },interval)


    })
})