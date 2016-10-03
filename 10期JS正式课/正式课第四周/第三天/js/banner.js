/**
 * Created by 39753 on 2016/9/29.
 */
(function(){
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var data=null;
    var timer=null;
    var n=0;//n决定让第几张图片显示
    //1.渐隐渐现的轮播图 2.焦点自动轮播 3.移入停止，移出继续 4.点击焦点手动切换 5.点击左右按钮进行切换
    //让谁显示的时候，应该把谁的层级提到1（他此时透明度为0），把他的兄弟元素的层级变成0；
    //让显示的这张图片透明度从0-1（运动）；等运动结束后，他的兄弟元素，透明度为0；
    clearInterval(timer);
    timer=setInterval(autoMove,2000);
    function autoMove(){
        if(n>=aImg.length-1){
            n=-1;
        }
        n++;
        setBanner();
    }
    function setBanner(){
        for(var i=0; i<aImg.length; i++){
            if(i===n){//要显示的图片的层级为1；同时，其他的图片层级为0；
                utils.css(aImg[i],'zIndex',1);
                //把要显示的这张图片的透明度从0-1的展示，等运动结束后，让他的兄弟元素的透明度都为0；
                animate(aImg[i],{opacity:1},{
                    duration:1000,
                    callback:function(){
                        var siblings=utils.siblings(this);//求出当前元素的所有兄弟元素
                        for(var j=0; j<siblings.length; j++){
                            utils.css(siblings[j],'opacity',0);
                        }
                    }
                })
                continue;
            }
            utils.css(aImg[i],'zIndex',0)
        }
    }










})();