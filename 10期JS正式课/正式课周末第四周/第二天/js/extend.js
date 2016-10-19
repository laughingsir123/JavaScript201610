/**
 * Created by 39753 on 2016/10/9.
 */
//给原型上扩充插件，实例可以使用；
$.fn.extend({
    changeColor:function(color){
        //this：实例，也就是jQuery元素；
        console.log(this)
        this.css('background',color)
    }
})