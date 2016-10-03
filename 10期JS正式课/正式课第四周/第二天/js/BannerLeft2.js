/**
 * Created by 39753 on 2016/9/28.
 */
function Banner(){
    //全局变量都作为私有属性；
    this.oBox=document.getElementById('box');
    this.oBoxInner=this.oBox.getElementsByTagName('div')[0];
    this.aImg=this.oBoxInner.getElementsByTagName('img');
    this.oUl=this.oBox.getElementsByTagName('ul')[0];
    this.aLi=this.oUl.getElementsByTagName('li');
    this.oBtnLeft=this.oBox.getElementsByTagName('a')[0];
    this.oBtnRight=this.oBox.getElementsByTagName('a')[1];
    this.data=null;
    this.timer=null;
    this.n=0;
    this.init();
}
//全局函数都做为公有方法
Banner.prototype={
    constructor:Banner,
    init:function(){//init中写核心思路
        var _this=this;
        //1.获取并解析数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.延迟加载
        setTimeout(function(){
            _this.lazyImg();
        },600)
        //4.图片自动轮播
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove();
        },1000);
    },
    getData:function getData(){
        var _this=this;
        var xml=new XMLHttpRequest;
        xml.open('get','json/data.txt?='+Math.random(),false);
        xml.onreadystatechange=function(){
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                _this.data=utils.jsonParse(xml.responseText);
            }
        };
        xml.send();
    },
    bind:function  bind(){
        var strImg='';//图片拼接字符串
        var strLi='';//按钮拼接字符串
        for(var i=0; i<this.data.length; i++){
            strImg+='<img src="" realImg="'+this.data[i].imgSrc+'" alt="">';
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }//记得在拼接完图片之后，还需要再多拼接一张图片，同时改变oBoxInner的宽度
        strImg+='<img src="" realImg="'+this.data[0].imgSrc+'" alt="">';
        this.oBoxInner.innerHTML=strImg;
        this.oBoxInner.style.width=this.aImg.length*this.aImg[0].offsetWidth+'px';
        this.oUl.innerHTML=strLi;
    },
    lazyImg:function lazyImg(){
        var _this=this;
        for(var i=0; i<_this.aImg.length; i++){
            (function(index){
                var tmpImg=new Image;
                tmpImg.src=_this.aImg[index].getAttribute('realImg');
                tmpImg.onload=function(){
                    _this.aImg[index].src=this.src;
                    tmpImg=null;
                }
            })(i);
        }
    },
    autoMove:function autoMove(){
        if(this.n>=this.aImg.length-1){
            this.n=0;
            utils.css(this.oBoxInner,{left:-this.n*1000});
        }
        this.n++;
        animate(this.oBoxInner,{left:-this.n*1000},{duration:600});
        //this.bannerTip();
    }
}









