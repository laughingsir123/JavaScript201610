/**
 * Created by 39753 on 2016/9/28.
 */
$.extend({//给类上直接扩充插件
    tab:function(strId){
        var $box=$(strId);
        var aBtn=$box.children('input');
        var aDiv=$box.find('div');
        aBtn.click(function(){
            $(this).addClass('on').siblings().removeClass('on');
            aDiv.eq($(this).index()).addClass('show').siblings().removeClass('show');
        })
    }
})
