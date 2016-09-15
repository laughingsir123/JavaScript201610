/**
 * Created by xiao lei on 2016/9/13.
 */
var utils={
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
    }
}