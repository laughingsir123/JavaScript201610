/**
 * Created by xiao lei on 2016/9/13.
 */
var utils={
    //makeArray：类数组转数组
    makeArray:function makeArray(arg){
        var ary=[];
        try{
            ary=Array.prototype.slice.call(arg);
        }catch(e){
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
        }
        return ary;
    },
    //jsonParse：JSON格式的字符串转成JSON格式的对象
    jsonParse:function(jsonStr){
        return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')')
    }
}