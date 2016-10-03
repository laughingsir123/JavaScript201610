/**
 * Created by 39753 on 2016/9/28.
 */
(function(id){
    var oBox=document.getElementById(id);
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var data=null;
    var timer=null;
    var n=0;
    //1.获取并解析数据 2.绑定数据 3.延迟加载 4.图片自动轮播 5.按钮自动轮播 6.鼠标移入停止，移除继续 7.点击焦点按钮手动切换 8.点击左右按钮进行切换
    //1.获取并解析数据
    getData();
    function getData(){
        var xml=new XMLHttpRequest;
        xml.open('get','json/data.txt?='+Math.random(),false);
        xml.onreadystatechange=function(){
            console.log(xml.readyState)
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
            }
        };
        xml.send();
    }
    //2.绑定数据： img  li
    bind();
    function  bind(){
        var strImg='';//图片拼接字符串
        var strLi='';//按钮拼接字符串
        for(var i=0; i<data.length; i++){
            strImg+='<img src="" realImg="'+data[i].imgSrc+'" alt="">';
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }//记得在拼接完图片之后，还需要再多拼接一张图片，同时改变oBoxInner的宽度
        strImg+='<img src="" realImg="'+data[0].imgSrc+'" alt="">';
        oBoxInner.innerHTML=strImg;
        oBoxInner.style.width=aImg.length*aImg[0].offsetWidth+'px';
        oUl.innerHTML=strLi;
    }
    //3.图片延迟加载
    setTimeout(lazyImg,600)
    function lazyImg(){
        for(var i=0; i<aImg.length; i++){
            (function(index){
                var tmpImg=new Image;
                tmpImg.src=aImg[index].getAttribute('realImg');
                tmpImg.onload=function(){
                    aImg[index].src=this.src;
                    tmpImg=null;
                }
            })(i);
        }
    }
    //4.图片自动轮播
    clearInterval(timer);
    timer=setInterval(autoMove,1000);
    function autoMove(){
        if(n>=aImg.length-1){
            n=0;
            utils.css(oBoxInner,{left:-n*1000});
        }
        n++;
        animate(oBoxInner,{left:-n*1000},{duration:600});
        bannerTip();
    }
    //5.焦点自动轮播
    function  bannerTip(){
        //n:0 1 2 3 4
        var tmp=n>=aLi.length?0:n;
        for(var i=0; i<aLi.length; i++){//索引i是 0 1 2 3
            aLi[i].className=i==tmp?'on':null;
        }
    }
    //6.鼠标移入停止，移除继续
    oBox.onmouseover=function(){
        clearInterval(timer);
        oBtnLeft.style.display=oBtnRight.style.display='block';
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,1000)
        oBtnLeft.style.display=oBtnRight.style.display='none';
    };
    //7.点击焦点手动切换
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                n=this.index;
                animate(oBoxInner,{left:-n*1000},{duration:600});
                bannerTip();
            }
        }
    }
    //8.点击左右按钮进行切换
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(n<=0){
            n=aImg.length-1;
            utils.css(oBoxInner,{left:-n*1000});
        }
        n--;
        animate(oBoxInner,{left:-n*1000},{duration:600});
        bannerTip();
    }










})();