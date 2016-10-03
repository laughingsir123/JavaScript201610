/**
 * Created by 39753 on 2016/9/28.
 */
(function(){
    //获取元素
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var n=0;//决定让第几张图片显示,决定了让第几个按钮变亮
    //给boxInner的末尾添加第一张图片,boxInner宽度也会发生改变
    oBoxInner.innerHTML+='<img src="img/banner1.jpg" alt="">';
    oBoxInner.style.width=aImg.length*aImg[0].offsetWidth+'px';
    clearInterval(autoTimer);
    var autoTimer=setInterval(autoMove,1000);
    //1.图片自动轮播
    function  autoMove(){
        if(n>=aImg.length-1){
            n=0;
            utils.css(oBoxInner,{left:-n*1000});
        }
        n++;//把n当做索引，决定让第几张图片显示，
        //utils.css(oBoxInner,{left:-n*1000})
        animate(oBoxInner,{left:-n*1000},{
            duration:600, //速度的快慢
            effect:1//运动效果
        })
        bannerTip();//把n当做索引，决定让第几个按钮点亮
    }
    //2.按钮自动轮播
    function  bannerTip(){
        //n:0 1 2 3 4
        var tmp=n>=aLi.length?0:n; //tmp已经被处理为0 1 2 3
        for(var i=0; i<aLi.length; i++){//0 1 2 3
            /*if(i===tmp){
                utils.addClass(aLi[i],'on');
            }else{
                utils.removeClass(aLi[i],'on');
            }*/
            aLi[i].className=tmp==i?'on':'';
        }
    }
    //3.鼠标移入停止，移除继续
    oBox.onmouseover = function(){
        clearInterval(autoTimer);
        utils.css(oBtnLeft,'display','block');
        utils.css(oBtnRight,'display','block');
    };
    oBox.onmouseout=function(){
        autoTimer=setInterval(autoMove,1000);
        utils.css(oBtnLeft,'display','none');
        utils.css(oBtnRight,'display','none');
    };
    //4.点击按钮手动切换
    handleChange();
    function  handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                n=this.index;//把元素的索引赋值给n，n决定让第几张图片动态显示；
                animate(oBoxInner,{left:-n*1000},{
                    duration:600
                });
                bannerTip();//n决定让第几个按钮点亮
            }
        }
    }
    //5.点击左右按钮进行切换
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(n<=0){
            n=aImg.length-1; //4
            utils.css(oBoxInner,'left',-n*1000);//
        }
        n--;
        animate(oBoxInner,{left:-n*1000},{
            duration:600
        })
        bannerTip();
    }









})();