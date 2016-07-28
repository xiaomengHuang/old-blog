>本文采用[markdown](http://www.bootcdn.cn/markdown.js/)编写
***
    `
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }//W3C
    window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome
    `

结合浏览器判断，区别火狐和其他浏览器。

然后判断滑动事件返回值**+-3**（火狐） **大于0 上滑**，**小于0 下滑**

**+-120** 其他浏览器**大于0 下滑**，**小于0上滑**

###key words
***
    `
    if (navigator.userAgent.indexOf('Firefox') >= 0) {

    if (e.detail > 0) {

    var scrollFunc = function (e) {

    if (e.wheelDelta > 0) {
    `

滑动过程中可能会存在一些问题，结合是否处在动画中判断是否添加新事件。

因为：测试发现除火狐以外都会触发两次事件。比较麻烦。
