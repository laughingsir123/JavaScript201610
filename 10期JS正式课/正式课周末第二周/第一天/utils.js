/**
 * Created by xiao lei on 2016/9/16.
 */
var utils={
    /**
     * makeArray:类数组转数组
     * @param arg：类数组
     * @returns {Array}：数组
     */
    makeArray:function(arg){
        var ary=[];
        try{
            ary=[].slice.call(arg);
        }catch(e){
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
        }
        return ary;
    },
    jsonParse:function(str){
        return 'JSON' in window?JSON.parse(str):eval('('+str+')');
    }
}