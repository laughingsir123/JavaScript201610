/**
 * Created by 39753 on 2016/9/29.
 */
$(function(){
    //获取元素
    var $box=$('#box');
    var $boxInner=$box.find('.boxInner');
    var $aImg=null;
    var $ul=$box.find('ul');
    var $aLi=null;
    var $btnLeft=$box.children('.left');
    var $btnRight=$box.children('.right');
    var data=null;
    var n=0;
    var timer=null;
    //1.获取并解析数据
    getData();
    function getData(){
        $.ajax({
            url:'json/data.txt',
            type:'GET',
            async:false,//同步
            dataType:'json',
            cache:false,
            success:function(val){
                data=val;
            }
        })
    }
    //2.绑定数据
    bind();
    function bind(){
        var strImg='';
        var strLi='';
        $.each(data,function(index,item){
            strImg+='<img src="" realImg="'+item.imgSrc+'" alt="">';
            strLi+=index==0?'<li class="on"></li>':'<li></li>';
        });
        $boxInner.html(strImg);
        $ul.html(strLi);
    }
    //3.图片延迟加载
    $aImg=$boxInner.children('img');//在JQ中，没有DOM映射；
    lazyImg();
    function lazyImg(){
        $.each($aImg,function(index,item){
            var tmpImg=new Image;
            tmpImg.src=$(item).attr('realImg');
            tmpImg.onload=function(){
                item.src=this.src;
                tmpImg=null;
                //JQ中，通过stop()来关闭没用的定时器
                //if(index==0) $(item).css('zIndex',1).stop().animate({opacity:1},1000);
                if(index==0) $(item).css('zIndex',1).stop().fadeIn(1000)
            }
        })
    }
    //4.图片渐隐渐现
    clearInterval(timer);
    timer=setInterval(autoMove,2000);
    function  autoMove(){
        if(n>=$aImg.length-1){
            n=-1;
        }
        n++;
        setBanner();
    }
    function  setBanner(){
        $.each($aImg,function(index,item){
            if(index===n){
                $(item).css('zIndex',1).siblings().css('zIndex',0);
                $(item).stop().fadeIn(1000,function(){
                    $(this).siblings('img').stop().fadeOut();
                })
            }
        })
        bannerTip();
    }
    //5.焦点自动轮播；
    $aLi=$ul.children('li');
    function bannerTip(){
        $.each($aLi,function(index,item){
            item.className=index==n?'on':null;
        })
    }
    //6.移入停止，移出继续
    $box.mouseover(function(){
        clearInterval(timer);
        $btnLeft.show();
        $btnRight.show();
    });
    $box.mouseout(function(){
        timer=setInterval(autoMove,2000);
        $btnLeft.hide();
        $btnRight.hide();
    });
    //7.点击焦点，手动切换
    handleChange();
    function handleChange(){
        $.each($aLi,function(index,item){
            $(item).click(function(){
                n=index;
                setBanner();
            })

        })
    }
    //8.点击左右按钮进行切换
    $btnRight.click(function(){
        autoMove();
    })
    $btnLeft.click(function(){
        if(n<=0){
            n=$aImg.length;
        }
        n--;
        setBanner();
    })












})