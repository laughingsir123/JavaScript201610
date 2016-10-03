/**
 * Created by 39753 on 2016/9/28.
 */
function Banner(id,opt){//私有变量：把普通函数中的全局变量，都作为构造函数的私有变量
    this.opt=opt||{};
    this.oBox=document.getElementById(id);
    this.oBoxInner=this.oBox.getElementsByTagName('div')[0];
    this.aImg=this.oBoxInner.getElementsByTagName('img');
    this.oUl=this.oBox.getElementsByTagName('ul')[0];
    this.aLi=this.oUl.getElementsByTagName('li');
    this.oBtnLeft=this.oBox.getElementsByTagName('a')[0];
    this.oBtnRight=this.oBox.getElementsByTagName('a')[1];
    this.data=null;
    this.timer=null;
    this.n=0;
    this.url=this.opt.url||'json/data.txt';
    this.interval=this.opt.interval||1000;
    this.init();
}
//把全局函数都作为公有方法：prototype上；
Banner.prototype={
    constructor:Banner,
    init:function(){//书写思路
        var _this=this;
        //1.获取并解析数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.图片延迟加载
        this.lazyImg();
        //4.图片自动轮播
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove();
        },this.interval);
        //6.鼠标移入停止，移除继续
        this.overout();
        //7.点击焦点手动切换
        this.handleChange();
        //8.点击左右按钮进行切换
        this.leftRight();
    },
    getData:function getData(){
        var _this=this;
        var xml=new XMLHttpRequest;
        xml.open('get',this.url+'?='+Math.random(),false);
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
        for(var i=0; i<this.aImg.length; i++){
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
        this.bannerTip();
    },
    bannerTip:function  bannerTip(){
        //n:0 1 2 3 4
        var tmp=this.n>=this.aLi.length?0:this.n;
        for(var i=0; i<this.aLi.length; i++){//索引i是 0 1 2 3
            this.aLi[i].className=i==tmp?'on':null;
        }
    },
    overout:function overout(){
        var _this=this;
        _this.oBox.onmouseover=function(){
            clearInterval(_this.timer);
            _this.oBtnLeft.style.display=_this.oBtnRight.style.display='block';
        };
        _this.oBox.onmouseout=function(){
            _this.timer=setInterval(function(){
                _this.autoMove();
            },_this.interval)
            _this.oBtnLeft.style.display=_this.oBtnRight.style.display='none';
        };
    },
    handleChange:function handleChange(){
        var _this=this;
        for(var i=0; i<_this.aLi.length; i++){
            _this.aLi[i].index=i;
            _this.aLi[i].onclick=function(){
                _this.n=this.index;
                animate(_this.oBoxInner,{left:-_this.n*1000},{duration:600});
                _this.bannerTip();
            }
        }
    },
    leftRight:function(){
        var _this=this;
        _this.oBtnRight.onclick=function(){
            _this.autoMove();
        };
        _this.oBtnLeft.onclick=function(){
            if(_this.n<=0){
                _this.n=_this.aImg.length-1;
                utils.css(_this.oBoxInner,{left:-_this.n*1000});
            }
            _this.n--;
            animate(_this.oBoxInner,{left:-_this.n*1000},{duration:600});
            _this.bannerTip();
        }
    }

}










