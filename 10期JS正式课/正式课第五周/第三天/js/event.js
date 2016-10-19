/**
 * Created by 39753 on 2016/10/13.
 */
//事件绑定
//<div aEvent=[fn1]/>  //click  fn1->aEvent这个数组中是否已经有fn1
//<div aEvent=[fn1]/>  //mouseover fn1->aEvent1这个数组中是否有fn1;
function bind(ele,type,fn){
    //1.浏览器的兼容处理
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{//IE浏览器
        var fnTemp=function(){
            fn.call(ele);
        };
        fnTemp.name=fn;
        //目的为了不同的行为上，可以绑定相同的方法；
        if(!ele['aEvent'+type]){//数组只会被创建一个；只有当没有的时候，才会创建数组
            ele['aEvent'+type]=[];
        }
        var a=ele['aEvent'+type];
        for(var i=0; i< a.length; i++){
            if(a[i].name==fn) return;//解决了重复绑定的问题；
        }
        a.push(fnTemp) //往自己事件池中添加方法
        ele.attachEvent('on'+type,fnTemp);//系统事件池中添加方法；
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
                    ele.detachEvent('on'+type,a[i]);//解除了系统事件池；
                    a.splice(i,1);//解除自己事件池；把他放在detachEvent的下面，避免数组塌陷的问题；
                    break;
                }
            }
        }

    }
}
//............
function  on(ele,type,fn){//绑定事件
    if(!ele['onEvent'+type]){
        ele['onEvent'+type]=[];
    }
    var a=ele['onEvent'+type];//自己事件池
    a.push(fn);//把fn1,fn2...都放到自己事件池；而且这个自定义事件池在其他作用域也可以拿到；
    bind(ele,type,run);//把run方法保存到了系统事件池
}
function  run(e){
    e=e||window.event;
    var type= e.type;//当前行为类型
    var a=this['onEvent'+type];
    if(a && a.length){
        //预防数组塌陷：思路1； i--
        for(var i=0; i< a.length;i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;//预防数组塌陷
            }
        }
        //预防数组塌陷：思路2；i++;
        /*for(var i=0; i< a.length;){
            if(typeof a[i]==='function'){
                a[i].call(this,e);
                i++;//预防数组塌陷
            }else{
                a.splice(i,1);
            }
        }*/
    }
}

function  off(ele,type,fn){
    var a=ele['onEvent'+type];//自己事件池中存了一大堆的fn ;
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(a[i]==fn){
                a[i]=null;
                break;
            }
        }
    }
}










