/**
 * Created by 39753 on 2016/10/13.
 */
function bind(ele,type,fn){
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{//IE处理
        var fnTemp=function(){
            fn.call(ele);
        };
        fnTemp.name=fn;
        if(!ele['aEvent'+type]){//只让数组创建一次；
            ele['aEvent'+type]=[];
        }
        var a=ele['aEvent'+type];
        for(var i=0; i< a.length; i++){
            if(a[i].name==fn) return;
        }
        a.push(fnTemp);//自己事件池
        ele.attachEvent('on'+type,fnTemp);//系统事件池
    }
}
function unbind(ele,type,fn){
    if(ele.removeEventListener){//标准浏览器
        ele.removeEventListener(type,fn,false);
    }else{//IE浏览器
        var a=ele['aEvent'+type];
        if(a && a.length){
            for(var i=0; i< a.length; i++){
                if(a[i].name==fn){
                    ele.detachEvent('on'+type,a[i]);
                    break;
                }
            }
        }
    }
}
//把元素某个行为的所有方法，都存到自己事件池；
// 当点击行为被触发的时候，只调用一个run方法；run方法中，负责把该行为下，存的所有函数进行顺序调用；
function  on(ele,type,fn){
    if(!ele['onEvent'+type]){
        ele['onEvent'+type]=[];
    }
    var a=ele['onEvent'+type];
    for(var i=0; i< a.length; i++){
        if(a[i]==fn) return;
    }
    a.push(fn);//存到自己事件池；
    bind(ele,type,run);
}
function run(e){
    e=e||window.event;
    var type= e.type;
    //想把自己事件池中所有的方法，都顺序调用；
    var a=this['onEvent'+type];
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}

function  off(ele,type,fn){
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









