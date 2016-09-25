/**
 * Created by xiao lei on 2016/9/24.
 */
var utils={
    //makeArray:类数组转数组
    makeArray:function(arg){
        var ary=[];
        try{
            return Array.prototype.slice.call(arg);
        }catch(e){
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i])
            }
        }
        return ary;
    },
    //jsonParse:把JSON格式的字符串转为JSON格式的数据（对象）
    jsonParse:function(jsonStr){
        return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')')
    },
    //getCss:获取元素身上的某个属性值
    getCss:function(curEle,attr){
        var val=null;
        var reg=null;
        if('getComputedStyle' in window){
            val=getComputedStyle(curEle,false)[attr]
        }else{
            //处理透明度
            if(attr==='opacity'){
                val=curEle.currentStyle.filter; //'alpha(opacity=30)'
                reg=/^alpha\(opacity[=:](\d+)\)$/gi;
                //RegExp.$1 --第一个小分组   ；他不受全局g的影响，但是用RegExp之前，一定要先影响lastIndex；能影响lastIndex的属性有两个（test，exec）
                //注意。通过RegExp最多只能拿到$9；第九个小分组之后都拿不到；
                //return reg.test(val)?reg.exec(val)[1]/100:1;
                return reg.test(val)?RegExp.$1/100:1;
            }
            val=curEle.currentStyle[attr];
        }
        //处理单位
        reg=/^([+-])?(\d+(\.\d+)?(px|pt|rem|em))$/i;
        return reg.test(val)?parseFloat(val):val;
    },
    //win:处理浏览器盒子模型的兼容性
    win:function(attr,value){
        /*//思路2：判断arguments
        if(arguments.length==1){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=document.body[attr]=value;*/
        //思路1：通过判断第二个参数是否传了，来解决 获取 和 设置 的问题；
        //if(value==null)
        if(typeof value==='undefined'){//第二个参数没传-作用用来“获取”
            return document.documentElement[attr]||document.body[attr];
        }
        //用来设置
        document.documentElement[attr]=document.body[attr]=value;
    },
    //offset:求盒子模型到body的偏移量
    offset:function(curEle){
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var par=curEle.offsetParent;
        while(par){
            if(window.navigator.userAgent.indexOf('MSIE 8.0') === -1){
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par=par.offsetParent;
        }
        return {left:l,top:t};
    }
};









