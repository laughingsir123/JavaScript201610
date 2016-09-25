/**
 * Created by xiao lei on 2016/9/20.
 */
var utils={
    //makeArray:类数组转数组
    makeArray:function(arg){
        var ary=[];
        try{
            ary=Array.prototype.slice.call(arg);
        }catch(e){
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
        }
        return ary;
    },
    //jsonParse:把JSON格式的字符串转为JSON格式的数据（对象）
    jsonParse:function(jsonStr){
        return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')')
    },
    getCss:function(curEle,attr){
        var val=null;
        var reg=null;
        //1.处理浏览器的兼容性
        if('getComputedStyle' in window){
            val=getComputedStyle(curEle,false)[attr];
        }else{//IE678
            //处理透明度
            if(attr === 'opacity'){
                val=curEle.currentStyle.filter; //当用户获取opacity透明度时，在IE下取的实际是filter的值 "alpha(opacity=10)"
                reg=/^alpha\(opacity[=:](\d+)\)$/;
               // return reg.test(val)?reg.exec(val)[1]/100:1;//用这种在reg中不能加全局g;
                return reg.test(val)?RegExp.$1/100:1;//用这种reg中加不加全局g都可以；
            }
            val=curEle.currentStyle[attr];
        }
        reg=/^(\+|-)?(\d+(\.\d+)?(px|pt|rem|em))$/gi;
        return reg.test(val)?parseFloat(val):val;
    },
    win:function(attr,value){
        //定义了value形参，但没有赋值拿到的undefined;
        //typeof value === 'undefined'; 所有通过typeof打印出来的，外面都是字符串，里面包裹的才是数据类型；
        if(typeof value=='undefined'){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=document.body[attr]=value;
    },













}