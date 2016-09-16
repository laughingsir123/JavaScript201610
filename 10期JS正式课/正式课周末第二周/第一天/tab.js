/**
 * Created by xiao lei on 2016/9/16.
 */
//1.请求数据并解析 2.绑定数据 3.隔行换色 4.表格排序
(function(){
    var oTab=document.getElementById('tab');
    var tHead=oTab.tHead;
    var tCells=tHead.rows[0].cells;
    var tBody=oTab.tBodies[0];
    var aRow=tBody.rows;
    var data=null;
    getData();
    function getData(){
        //1.获取xml对象
        var xml=new XMLHttpRequest();
        //2.打开地址的方法;
        //参1：请求方式； 参2：请求地址； 参3：是否异步 ：true异步 false同步
        xml.open('get','data.txt',false);
        //3.响应请求
        xml.onreadystatechange=function(){
            //1.是否准备好：xml.readyState 2.xml.status:状态码 成功：2xx;
            if(xml.readyState==4 && /^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
            }
        };
        //4.发送请求
        xml.send();
    }
    bind();
    //思路1：字符串绑定数据
    /*function bind(){
        var str='';
        for(var i=0; i<data.length; i++){
            var cur=data[i];
            cur.sex=cur.sex==0?'男':'女';
            str+='<tr>\
                <td>'+cur.name+'</td>\
                <td>'+cur.age+'</td>\
                <td>'+cur.score+'</td>\
                <td>'+cur.sex+'</td>\
                </tr>';
        }
        tBody.innerHTML=str;
    }*/
    //思路2：动态创建
    function bind(){
        var frg=document.createDocumentFragment();
        for(var i=0; i<data.length; i++){
            var cur=data[i];
            var oTr=document.createElement('tr');
            for(var attr in cur){
                var oTd=document.createElement('td');
                if(attr === 'sex'){
                    cur[attr]=cur[attr]==0?'男':'女';
                }
                oTd.innerHTML=cur[attr];
                oTr.appendChild(oTd);
            }
            frg.appendChild(oTr);
        }
        tBody.appendChild(frg);
        frg=null;
    }
    //3.隔行换色
    changeColor();
    function changeColor(){
        for(var i=0; i<aRow.length; i++){
            aRow[i].className='bg'+i%2;
        }
    }
    //4.表格排序
    function sort(n){//n就是当前所点击按钮的索引；
        for(var i=0; i<tCells.length; i++){
            /*if(i==n){//是当前点击的按钮
                tCells[i].flag*=-1;
            }else{//不是当前点击的按钮
                tCells[i].flag=-1;
            }*/
            tCells[i].flag=i==n?tCells[i].flag*-1:-1;
        }
        /*tCells[n].flag*=-1;*/
        //1.类数组转数组
        var ary=utils.makeArray(aRow);
        //2.sort排序
        ary.sort(function(a,b){
            a = a.cells[n].innerHTML;
            b = b.cells[n].innerHTML;
            if(isNaN(a) || isNaN(b)){
                return a.localeCompare(b)*tCells[n].flag;
            }
            return (a-b)*tCells[n].flag; //1 -1 1 -1........
        });
        //3.把排好序的数组内容，重新插入页面
        var frg=document.createDocumentFragment();
        for(var i=0; i<ary.length; i++){
            frg.appendChild(ary[i]);
        }
        tBody.appendChild(frg);
        frg=null;
        changeColor();
    }
    for(var i=0; i<tCells.length; i++){
        if(tCells[i].className==='cursor'){
            tCells[i].flag=-1;
            tCells[i].index=i;
            tCells[i].onclick=function(){
                sort(this.index);
            }
        }
    }
    /*tCells[1].flag=-1;
    tCells[1].index=1;
    tCells[1].onclick=function(){
        sort(this.index);
    }*/


})();