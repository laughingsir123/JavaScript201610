/**
 * Created by 39753 on 2016/10/16.
 */
function bind(ele,type,fn){//绑定
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false)
    }else{//IE浏览器
        fnTemp=function(){
            fn.call(ele);//fn3
        };
        fnTemp.name=fn;
        if(!ele['aEvent'+type]){//数组只被创建一次；
            ele['aEvent'+type]=[];//把数组存在元素的自定义属性上；
        }
        var a=ele['aEvent'+type];
        for(var i=0; i< a.length; i++){
            if(a[i].name==fn) return;//去除重复绑定的问题
        }
        a.push(fnTemp);//把匿名函数放到自己事件池
        ele.attachEvent('on'+type,fnTemp);//把匿名函数放到系统事件池
    }
}
function unbind(ele,type,fn){//解除绑定
    if(ele.removeEventListener){//标准浏览器
        ele.removeEventListener(type,fn,false)
    }else{//IE浏览器
        var a=ele['aEvent'+type];
        if(a && a.length){//[function(){fn.call(ele)},]
            for(var i=0; i< a.length; i++){
                if(a[i].name==fn){
                    ele.detachEvent('on'+type,a[i]);//解除系统的事件绑定
                    a.splice(i,1);//删除自己事件绑定；
                    break;
                }
            }
        }
    }
}
//...............................................
function on(ele,type,fn){
    //1.把所有要绑定的方法，都不重复存在自己事件池；
    if(!ele['onEvent'+type]){
        ele['onEvent'+type]=[];
    }
    var a=ele['onEvent'+type];
    for(var i=0; i< a.length; i++){
        if(a[i]==fn) return;
    }
    a.push(fn);
    //2.给当前行为绑定一个临时的方法run，绑定到系统事件池；
    bind(ele,type,run);//run方法被绑定到系统事件池-只有一个run方法
}
function  run(e){
    e=e||window.event;
    var type= e.type;
    //3.当某个行为发生的时候，系统事件池默认会执行run方法-》把自己事件池中的所有方法都顺序调用；
    var a=this['onEvent'+type];
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function off(ele,type,fn){
    var a=ele['onEvent'+type];
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(a[i]==fn){
                a[i]=null;
                break;
            }
        }
    }
}











