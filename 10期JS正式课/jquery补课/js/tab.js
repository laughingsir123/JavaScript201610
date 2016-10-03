/**
 * Created by 39753 on 2016/9/28.
 */
$.fn.extend({//给原型上扩充插件，能使用它的都是实例； $.fn==$.prototype
    tab:function(){
        //this实例，原生的；
        var $box=$(this);
        var aBtn=$box.children('input');
        var aDiv=$box.find('div');
        aBtn.click(function(){
            $(this).addClass('on').siblings().removeClass('on');
            aDiv.eq($(this).index()).addClass('show').siblings().removeClass('show');
        })
    },
    changeColor:function(strColor){
        $(this).click(function(){
            $(this).css('background',strColor)
        })
    }
})
