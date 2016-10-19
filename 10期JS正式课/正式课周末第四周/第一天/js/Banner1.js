/**
 * Created by 39753 on 2016/10/8.
 */
/**
 * Banner:左右切换的轮播图
 * @param opt ：id:让哪个容器轮播； url:数据地址； interval:图片轮播速度的快慢; effect:运动效果-》可以写数字，也可以写数组；
 */
function Banner(opt){//全局变量都作为私有属性放在构造函数中；
    opt=opt||{};
    if(!opt.id) return;
    this.defaultOpt={//默认的值；
        url:'json/data.txt',
        interval:1000,
        effect:0
    };
    for(var attr in opt){//拷贝继承
        this.defaultOpt[attr]=opt[attr];
    }
    this.oBox=document.getElementById(this.defaultOpt.id);
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
Banner.prototype={
    constructor:Banner,
    init:function(){// init函数中写的是所有调用的思路；
        var _this=this;
        //1.获取并解析数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.图片延迟加载；
        setTimeout(function(){
            _this.lazyImg();
        },500);
        //4.图片自动轮播；
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove();
        },this.defaultOpt.interval)
        //6.鼠标移入停止，移除继续
        this.overout();
        //7.点击焦点手动切换
        this.handleChange();
        //8.点击左右按钮进行切换
        this.leftRight();
    },
    getData:function(){
        var _this=this;
        var xml=new XMLHttpRequest();
        xml.open('get',this.defaultOpt.url+'?='+Math.random(),false);
        xml.onreadystatechange=function(){
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                _this.data=utils.jsonParse(xml.responseText)
            }
        };
        xml.send(null);
    },
    bind:function(){
        var strImg='';
        var strLi='';
        for(var i=0; i<this.data.length; i++){
            strImg+='<img src="" realImg="'+this.data[i].imgSrc+'" alt="">';
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        strImg+='<img src="" realImg="'+this.data[0].imgSrc+'" alt="">';
        this.oBoxInner.innerHTML=strImg;
        this.oBoxInner.style.width=this.aImg.length*this.aImg[0].offsetWidth+'px';
        this.oUl.innerHTML=strLi;
    },
    lazyImg:function(){
        var _this=this;
        for(var i=0; i<this.aImg.length; i++){
            (function(index){
                var curImg=_this.aImg[index];
                var tmpImg=new Image;
                tmpImg.src=curImg.getAttribute('realImg');
                tmpImg.onload=function(){
                    curImg.src=this.src;
                }
            })(i);
        }
    },
    autoMove:function(){//通过累加n，决定让第几张图片显示，让第几个按钮变亮；
        if(this.n>=this.aImg.length-1){
            this.n=0;
            utils.css(this.oBoxInner,'left',-1000*this.n);//当看到最后一张（跟第一张长得一模一样的那张）的时候，快速切换到第一张；
        }
        this.n++;
        animate(this.oBoxInner,{left:-1000*this.n},{duration:700,effect:this.defaultOpt.effect})
        //utils.css(this.oBoxInner,'left',-1000*this.n);
        this.bannerTip();//5.焦点自动轮播
    },
    bannerTip:function(){
        var tmp=this.n>=this.aLi.length?0:this.n;
        for(var i=0; i<this.aLi.length; i++){
            this.aLi[i].className=tmp==i?'on':null;
        }
    },
    overout:function(){
        var _this=this;
        this.oBox.onmouseover=function(){
            clearInterval(_this.timer);
            _this.oBtnLeft.style.display=_this.oBtnRight.style.display='block';
        };
        this.oBox.onmouseout=function(){
            _this.timer=setInterval(function(){
                _this.autoMove();
            },_this.defaultOpt.interval);
            _this.oBtnLeft.style.display=_this.oBtnRight.style.display='none';
        };
    },
    handleChange:function(){
        var _this=this;
        for(var i=0; i<this.aLi.length; i++){
            this.aLi[i].index=i;//自定义属性保存正确的索引
            this.aLi[i].onclick=function(){
                _this.n=this.index;
                animate(_this.oBoxInner,{left:-1000*_this.n},{duration:700,effect:_this.defaultOpt.effect});
                _this.bannerTip();
            }
        }
    },
    leftRight:function(){
        var _this=this;
        this.oBtnRight.onclick=function(){
            _this.autoMove();
        };
        this.oBtnLeft.onclick=function(){
            if(_this.n<=0){
                _this.n=_this.aImg.length-1;
                utils.css(_this.oBoxInner,'left',-_this.n*1000);
            }
            _this.n--;
            animate(_this.oBoxInner,{left:-1000*_this.n},{duration:700,effect:_this.defaultOpt.effect});
            _this.bannerTip();
        }
    }
}