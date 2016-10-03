/**
 * Created by 39753 on 2016/9/27.
 */
(function(){
    var zhufengEffect ={
        Linear:function(t,b,c,d){
            return b+c/d*t;
        }
    };
    //{left:xx,top:xxx}
    function  move(obj,target,callback,duration){
        clearInterval(obj.timer);
        //1.为linear公式准备参数
        var begin={};
        var change={};
        //求出begin和change的值；
        for(var attr in target){ //left top
            begin[attr]=utils.css(obj,attr);
            change[attr]=target[attr]-begin[attr];
        }
        duration=duration||2000;
        var time=null;
        //2.开启定时器，累加时间，求出最新的位置，并且设置最新的位置；
        obj.timer=setInterval(function(){
            time+=10;
            //判断关闭定时器的条件
            if(time>=duration){
                utils.css(obj,target);
                clearInterval(obj.timer);
                //等运动结束，想干什么事；
                if(typeof callback==='function') callback.call(obj);
                return;
            }
            for(var attr in change){
                //求出每个属性的最新位置；left，top,width,height
                var curPos=zhufengEffect.Linear(time,begin[attr],change[attr],duration);
                utils.css(obj,attr,curPos);//赋值每个最新的位置；
            }
        },10)

    }
    window.animate=move;
})();