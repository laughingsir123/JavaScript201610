/**
 * Created by 39753 on 2016/10/9.
 */
$.extend({//给类扩充插件；
    changeColor:function(ele,color){
        //this：类； ele：是jQuery元素；
        ele.css('background',color)
    },
    tab:function(ele){//扩充选项卡插件 ele:jquery元素
        var $btn=ele.children('input');//当前元素下 所有的按钮
        var $div=ele.children('div');//当前元素下 所有的内容框
        $btn.click(function(){ //让当前按钮变亮，让他的兄弟元素都变灭；
            $(this).addClass('on').siblings().removeClass('on');
            $div.eq($(this).index()).addClass('show').siblings().removeClass('show');//让当前按钮对应的内容框显示，让其他内容框都隐藏
        });

    },
    /**
     * banner:渐隐渐现的轮播图
     * @param ele：让哪个容器进行渐隐渐现，他是jQuery元素
     * @param url：后台的api地址；就是获取数据的地址；
     */
    banner:function(ele,url){//ele让哪个容器进行渐隐渐现，jQuery元素
        //获取元素
        url=url||'json/data.txt';
        var $boxInner=ele.find('.boxInner');
        var $img=null;
        var $ul=ele.find('ul');
        var $li=null;
        var $btnLeft=ele.find('.left');
        var $btnRight=ele.find('.right');
        var data=null;
        var timer=null;
        var n=0;
        //1.获取并解析数据
        $.ajax({//ajax是异步，我们现在让他是同步状态；
            url:url,//URL地址
            type:'get',//请求方式
            dataType:'json',//返回的数据类型为json格式
            cache:false,//无缓存
            async:false,//同步
            success:function(val){//成功之后返回数据
                data=val;
            }
        });
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
        };
        //3.延迟加载
        //因为jq中没有DOM映射，所以，在绑定数据后，需要重新获取所有图片和所有按钮；
        $img=$boxInner.find('img');
        $li=$ul.find('li');
        lazyImg();
        function lazyImg(){
            $.each($img,function(index,item){
                var tmp=new Image;
                tmp.src=$(item).attr('realImg');
                tmp.onload=function(){
                    item.src=this.src;
                    //第一张图片层级提高，并且，渐现出来；
                    $img.first().css('zIndex',1).stop().fadeIn(1000);
                    tmp=null;
                }
            });
        }
        //4.图片渐隐渐现
        clearInterval(timer);
        timer=setInterval(autoMove,2000);
        function autoMove(){
            if(n>=$img.length-1){
                n=-1;
            }
            n++;
            setBanner();
        }
        function setBanner(){
            $.each($img,function(index,item){
                if(index==n){//谁的索引等于n，就让谁层级提高，并且让他渐显出来，等他渐显出来后，让他的兄弟元素都渐隐；
                   $(item).css('zIndex',1).stop().fadeIn(1000,function(){
                       $(this).siblings().fadeOut();//hide();
                   })
                }else{
                    $(item).css('zIndex',0);
                }
            });
            bannerTip();
        }
        //5.焦点自动轮播
        function bannerTip(){
            $.each($li,function(index,item){
                item.className=index==n?'on':null;
            })
        }
        //6.鼠标移入停止，移出继续
        ele.mouseover(function(){
            clearInterval(timer);
            $btnLeft.show();
            $btnRight.show();
        });
        ele.mouseout(function(){
            timer=setInterval(autoMove,2000);
            $btnLeft.hide();
            $btnRight.hide();
        });
        //7.点击焦点手动切换
        handleChange();
        function handleChange(){
            $.each($li,function(index,item){
                $(item).click(function(){
                    n=index;
                    setBanner();
                })
            })
        }
        //8.点击左右按钮进行切换
        $btnRight.click(function(){
            autoMove();
        });
        $btnLeft.click(function(){
            if(n<=0){
                n=$img.length;
            }
            n--;
            setBanner();
        })

    }
});