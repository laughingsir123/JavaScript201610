/**
 * Created by xiao lei on 2016/9/14.
 */
(function(){
    //1.请求并解析数据   2.绑定数据 3.隔行换色 4.表格排序
    var oTab=document.getElementById('tab');
    var tHead=oTab.tHead;//表头只有一个；
    var tCells=tHead.rows[0].cells;//获取第一行的所有列
    var tBody=oTab.tBodies[0];
    var aRows=tBody.rows;//所有的行-他是类数组
    var data=null;
    //1.请求并解析数据
    getData();
    function getData(){
        //1.创建一个xml对象
        var xml=new XMLHttpRequest;
        //2.打开地址
        //参1：请求方式 get post; 参2：请求路径-数据地址 参3：是否异步
        xml.open('get','data.txt',false); //false：同步 true：异步
        //3.响应请求
        /*0：请求未初始化（还没有调用 open()）。
         1：请求已经建立，但是还没有发送（还没有调用 send()）。
         2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
         3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
         4：响应已完成；您可以获取并使用服务器的响应了。*/
        xml.onreadystatechange=function(){//
            //reacyState：准备状态    status 响应状态码:2xx-代表成功
           if(xml.readyState==4 && /^2\d{2}$/.test(xml.status)){
               data=utils.jsonParse(xml.responseText);
           }
        }
        //4.发送请求；
        xml.send(null);
    }
    //2.绑定数据
    bind();
    function bind(){
        var frg=document.createDocumentFragment();
        for(var i=0; i<data.length; i++){
            var cur=data[i];//每一个对象；
            var oTr=document.createElement('tr');
            for(var attr in cur){//遍历拿到的对象中的每一项内容
                var oTd=document.createElement('td');
                if(attr=='sex'){
                    cur[attr]=cur[attr]===0?'男':'女';
                }
                oTd.innerHTML=cur[attr];
                oTr.appendChild(oTd);
            }
            frg.appendChild(oTr)
        }
        tBody.appendChild(frg);
        frg=null;
    }
    //3.隔行换色
    changeColor();
    function changeColor(){
        for(var i=0; i<aRows.length; i++){
            aRows[i].className='bg'+i%2;
        }
    }
    //4.表格排序
    function sort(n){
        //当点击某一列的时候，只让当前这一列的flag*=-1；让其他的列都恢复初始值-1;
        for(var i=0; i<tCells.length; i++){
            /*if(i==n){//说明他是我现在点击的这一列；
                tCells[i].frag*=-1;
            }else{//其他的列，都恢复初始值-1
                tCells[i].frag=-1;
            }*/
            tCells[i].frag=i==n?tCells[i].frag*-1:-1;
        }

        //1.类数组转数组
        var ary=utils.makeArray(aRows);
        //2.sort排序
        ary.sort(function(a,b){
            a= a.cells[n].innerHTML;//当前行中的索引为1的列
            b= b.cells[n].innerHTML;//下一行中索引为1的列；
            if(isNaN(a) || isNaN(b)){
                return a.localeCompare(b)*tCells[n].frag;
            }
            return (a-b)*tCells[n].frag; //1 -1 1 -1.....
        });
        //3.把排好序的数组重新插入页面
        var frg=document.createDocumentFragment();
        for(var i=0; i<ary.length; i++){
            frg.appendChild(ary[i]);
        }
        tBody.appendChild(frg);
        changeColor();
    }
    for(var i=0; i<tCells.length; i++){
        if(tCells[i].className=='cursor'){
            tCells[i].frag=-1;//从小到大，从大到小的指标
            tCells[i].index=i;
            tCells[i].onclick=function(){
                sort(this.index);
            }
        }
    }
    //思路：1.先把sort函数中的固定值1变为可变的值n;--n就是所点击按钮的索引
    //2.通过循环，让每个按钮都能点击；
    //3.通过className进行过滤判断
    /*tCells[1].frag=-1;
    tCells[1].index=1;
    tCells[1].onclick=function(){
        sort(this.index);
    }*/




})();