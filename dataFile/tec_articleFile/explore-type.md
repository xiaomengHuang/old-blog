>本文采用[markdown](http://www.bootcdn.cn/markdown.js/)编写
###下面整理的是一套判断方法：
***
    `function getExplorer() {
        var explorer = window.navigator.userAgent ;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
        alert("ie");
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
        alert("Firefox");
        }
        //Chrome
        else if(explorer.indexOf("Chrome") >= 0){
        alert("Chrome");
        }
        //Opera
        else if(explorer.indexOf("Opera") >= 0){
        alert("Opera");
        }
        //Safari
        else if(explorer.indexOf("Safari") >= 0){
        alert("Safari");
        }
    }`