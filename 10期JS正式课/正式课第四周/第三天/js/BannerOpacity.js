/**
 * Created by 39753 on 2016/9/29.
 */
/**
 *
 * @param opt:
 *  id:传id元素 或 class元素 或 者标签
 *  url:可传可不传,不传的时候，按照默认的'json/data.txt'
 * @constructor
 */
function Banner(opt){//构造函数
    //要定义的全局变量，都作为私有属性放在构造函数里；
    opt=opt||{};
    this.$box=$(opt.id);
    this.url=opt.url||'json/data.txt';
    this.duration=opt.duration||1000;
    this.$boxInnner=this.$box.find('.boxInner');
    this.$aImg=null;
    this.$ul=this.$box.find('ul');
    this.$aLi=null;
    this.$btnLeft=this.$box.find('.left');
    this.$btnRight=this.$box.find('.right');
    this.data=null;
    this.timer=null;
    this.n=0;
    this.init();//init的调用，必须放在构造函数的最下面；
}
Banner.prototype={//原型
    constructor:Banner,
    init:function(){//书写核心思路；
        var _this=this;
        //1.获取并解析数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.延迟加载
        this.lazyImg();
        //4.渐隐渐现的轮播图
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove();
        },2000)

    },
    getData:function(){
        var _this=this;
        $.ajax({
            url:_this.url,
            type:'GET',
            async:false,
            cache:false,
            dataType:'json',
            success:function(val){
                _this.data=val;
            }
        })
    },
    bind:function(){
        var strImg="";
        var strLi="";
        $.each(this.data,function(index,item){
            strImg+='<img src="" realImg="'+item.imgSrc+'" alt="">';
            strLi+=index==0?'<li class="on"></li>':'<li></li>';
        });
        this.$boxInnner.html(strImg);
        this.$ul.html(strLi)
    },
    lazyImg:function(){
        var _this=this;
        //重新获取img集合，因为JQ中没有DOM映射
        this.$aImg=this.$boxInnner.children('img');
        $.each(this.$aImg,function(index,item){
            var tmpImg=new Image;
            tmpImg.src=item.getAttribute('realImg');
            tmpImg.onload=function(){
                item.src=this.src;
                tmpImg=null;
                _this.$aImg.eq(0).css('zIndex',1).stop().fadeIn(_this.duration);
            }
        })
    },
    autoMove:function(){
        if(this.n>=this.$aImg.length-1){
            this.n=-1;
        }
        this.n++;
        this.setBanner();
    },
    setBanner:function(){
        var _this=this;
        $.each(this.$aImg,function(index,item){
            if(index==_this.n){
                $(item).css('zIndex',1).siblings().css('zIndex',0);
                $(item).stop().fadeIn(_this.duration,function(){
                    $(this).siblings().stop().hide();
                })
            }
        });
        this.bannerTip();
    },
    bannerTip:function(){
        var _this=this;
        this.$aLi=this.$ul.find('li');
        $.each(this.$aLi,function(index,item){
            item.className=index==_this.n?'on':null;
        })
    }

}