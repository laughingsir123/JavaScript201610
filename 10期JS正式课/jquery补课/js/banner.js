/**
 * Created by 39753 on 2016/9/28.
 */
$(function(){
    //获取元素
    var $box=$('#box');
    var $boxInner=$box.find('.boxInner');
    var $aImg=null;
    var $ul=$box.find('ul');
    var $aLi=null;
    var $btnLeft=$box.find('.left');
    var $btnRight=$box.find('.right');
    var data=null;
    var timer=null;
    var n=0;
    //1.获取并解析数据 2.绑定数据 3.延迟加载 4.自动轮播 5.焦点自动轮播 6.鼠标移入停止，移出继续 7.点击焦点手动切换 8.点击左右按钮切换
    //1.获取并解析数据--学到JQ中如何获取数据
    getData();
    function  getData(){
        $.ajax({
            url:'json/data.txt',//地址
            dataType:'json',//返回的数据类型
            async:false,//同步
            cache:false,//无缓存
            success:function(val){//成功后接收数据
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
        })
        strImg+='<img src="" realImg="'+data[0].imgSrc+'" alt="">';
        $boxInner.html(strImg).css('width',(data.length+1)*1000);
        $ul.html(strLi);
    }
    //3.延迟加载
    $aImg=$boxInner.find('img');
    setTimeout(lazyImg,400);
    function lazyImg(){
        $.each($aImg,function(index,item){
            //item.realImg 为何不能用？怎么能用？--思考题
            $(item).attr('src',$(item).attr('realImg'))
        })
    }
    //4.自动轮播
    clearInterval(timer);
    timer=setInterval(autoMove,1000);
    function autoMove(){
        if(n>=$aImg.length-1){
            n=0;
            $boxInner.css('left',-n*1000);
        }
        n++;
        /*$boxInner.css('left',-n*1000)*/
        $boxInner.animate({left:-n*1000},600)
        bannerTip();
    }
    //5.焦点自动轮播
    $aLi=$ul.find('li');
    function bannerTip(){
        //n:0 1 2 3 4
        var tmp=n>=$aLi.length?0:n;
        $.each($aLi,function(index,item){
            //index==tmp?$(item).addClass('on'):$(item).removeClass('on');//JQ
            item.className=index==tmp?'on':null;//JS
        })

    }
    //6.鼠标移入停止，移出继续
    $box.mouseover(function(){
        clearInterval(timer);
        $btnLeft.show();
        $btnRight.show();
    });
    $box.mouseout(function(){
        timer=setInterval(autoMove,1000)
        $btnLeft.hide();
        $btnRight.hide();
    });
    //7.点击焦点手动切换
    handleChange();
    function handleChange(){
        $.each($aLi,function(index,item){
            $(item).click(function(){
                n=$(this).index();
                $boxInner.animate({left:-n*1000},600)
                bannerTip();
            })
        })
    }
    //8.点击左右按钮切换
    $btnRight.click(function(){
        autoMove();
    });
    $btnLeft.click(function(){
        if(n<=0){
            n=$aImg.length-1;
            $boxInner.css('left',-n*1000);
        }
        n--;
        $boxInner.animate({left:-n*1000},600)
        bannerTip();
    })











})