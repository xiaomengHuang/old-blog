>本文采用[markdown](http://www.bootcdn.cn/markdown.js/)语法编写

on(events,[selector],[data],fn) 在选择元素上绑定一个或多个事件的事件处理函数

bind(type,[data],fn) 为每个匹配元素的特定事件绑定事件处理函数

EG:::::::
***

 `$(document).ready(function(){};`

 `$(" #tag_are ").on("click",".my_tag",function(){`

  `$(this).addClass("test"); //这种情况test会加在点击的 my_tag元素上`

 `});`

 `$(document).ready(function(){};`

 `$(" #tag_are ").on("click",".my_tag",function(){`

 `$(this).addClass("test"); //这种情况test会加在tag_are上。`

 `});`
 ***
 也就是触发事件后，this是有区别的。

 on上的类被作为选择器处理，**selector**

 bind上的类被作为判断数据处理。**data**