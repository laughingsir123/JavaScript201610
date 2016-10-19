/**
 * Created by 39753 on 2016/10/16.
 */
function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else{
        //1.把所有要绑定的方法，都放进自己事件池这个数组中；
        if(!ele['aEvent'+type]){
            ele['aEvent'+type]=[];
            //2.给系统事件池绑定run方法，当系统行为被触发的时候，可以执行run方法；
            ele.attachEvent('on'+type,function(){
                run.call(ele);
            });
        }
        var a=ele['aEvent'+type];
        for(var i=0; i< a.length; i++){
            if(a[i]==fn) return;
        }
        a.push(fn);

    }
}
function run(){//run中所有的操作，只针对IE；
    var e=window.event;
    var type= e.type;
    var a=this['aEvent'+type];
    e.target= e.srcElement;
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
    e.preventDefault=function(){
        e.returnValue=false;
    };
    e.stopPropagation=function(){
        e.cancelBubble=true;
    };
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(typeof a[i] === 'function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function off(ele,type,fn){//解除事件绑定不兼容时：解除的自己事件池中的函数；
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false)
    }else{
        var a=ele['aEvent'+type];
        if(a && a.length){
            for(var i=0; i< a.length; i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }

}












