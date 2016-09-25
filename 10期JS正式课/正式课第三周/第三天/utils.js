/**
 * Created by xiao lei on 2016/9/20.
 */
var utils=(function(){
    //惰性思想：属于JS高级编程思想之一；
    var flg='getComputedStyle' in window; //布尔值：true-标准浏览器，false-IE678；
    return {
        //makeArray:类数组转数组
        makeArray:function(arg){
            var ary=[];
            if(flg){
                ary=Array.prototype.slice.call(arg);
            }else{
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
        win:function(attr,value){
            //定义了value形参，但没有赋值拿到的undefined;
            //typeof value === 'undefined'; 所有通过typeof打印出来的，外面都是字符串，里面包裹的才是数据类型；
            if(typeof value=='undefined'){
                return document.documentElement[attr]||document.body[attr];
            }
            document.documentElement[attr]=document.body[attr]=value;
        },
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
            return {left:l,top:t}
        },
        rnd:function(n,m){
            //1.把参数转为数据类型
            n=Number(n);
            m=Number(m);
            //2.如果参数无法转为数据类型，返回一个0-1之间的随机小数做为报错的提示；
            if(isNaN(n) || isNaN(m)){
                return Math.random();
            }
            //3.如果n>m；交换n和m的位置
            if(n>m){
                var tmp=m;
                m=n;
                n=tmp;
            }
            //4.输出随机数公式
            return Math.round(Math.random()*(m-n)+n);
        },
        //getByClass:在当前元素下，通过className来获取元素
        getByClass:function(strClass,curEle){
            curEle=curEle||document;
            if(flg){//标准浏览器直接getElementsByClassName
                return this.makeArray(curEle.getElementsByClassName(strClass))
            }
            //1.字符串转为数组：先去除首尾空格 ，再通过split切成数组
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            //2.拿到该容器下所有的元素
            var nodeList=curEle.getElementsByTagName('*');
            var ary=[];
            //3.判断每个元素的className是否包含数组中的每一项：假设法
            for(var i=0; i<nodeList.length; i++){
                var curList=nodeList[i];
                var bOk=true;//假设该元素的class中包含数组中每一项
                for(var j=0; j<aryClass.length; j++){
                    var reg=new RegExp('\\b'+aryClass[j]+'\\b');
                    if(!reg.test(curList.className)){
                        bOk=false;
                        break;
                    }
                }
                if(bOk){
                    ary.push(curList);
                }
            }
            return ary;
        },
        //hasClass:判断元素身上是否有某个class名 --只能一个个的判断
        hasClass:function(curEle,cName){ //'box1 box2box3 '   box3
            var reg=new RegExp('\\b'+cName+'\\b');
            return reg.test(curEle.className);
        },
        //addClass:如果元素的class上没有这个class名，才给元素添加此样式 'box1 box2'
        addClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            for(var i=0; i<aryClass.length; i++){
                var curClass=aryClass[i];
                if(!this.hasClass(curEle,curClass)){
                    curEle.className+=' '+curClass;
                }
            }
        },
        //removeClass:删除某个class名
        removeClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            for(var i=0; i<aryClass.length; i++){
                var reg=new RegExp('\\b'+aryClass[i]+'\\b');
                if(reg.test(curEle.className)){
                    curEle.className=curEle.className.replace(reg,'').replace(/(^ +)|( +$)/g,'').replace(/\s+/g,' ');
                }
            }
            //如果class属性上没有值的话，就把class干掉；
            if(!curEle.className.length){
                curEle.removeAttribute('class');
            }
        },
        getCss:function(curEle,attr){
            var val=null;
            var reg=null;
            //1.处理浏览器的兼容性
            if(flg){
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
        //setCss:设置一个样式-给 谁 身上设置什么样式；
        setCss:function(curEle,attr,value){
            //升级2：处理浮动的问题；
            if(attr==='float'){
                curEle.style.cssFloat=value;//firefox,chorme,safari
                curEle.style.styleFloat=value;//IE
                return;
            }
            //升级2：处理透明度的问题
            if(attr==='opacity'){
                curEle.style.opacity=value;
                curEle.style.filter='alpha(opacity='+value*100+')';
                return;
            }
            //升级1：自动添加单位 'left width height lightHeight margin marginLeft';
            var reg=/^(width|height|left|top|right|bottom|((margin|padding)(left|top|right|bottom)?))$/gi;
            //处理了可能有单位的属性名 和 value值中带%号的问题
            if(reg.test(attr) && value.indexOf('%')===-1){
                value=parseFloat(value)+'px';
            }
            curEle.style[attr]=value;
        }

    }
})();