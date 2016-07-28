>本文采用[markdown](http://www.bootcdn.cn/markdown.js/)编写
***
首先介绍find命令：

1．命令格式：

    ``
    find pathname -options [-print -exec -ok ...]
    ``
eg:

    `
    find /home/huangxiaomeng/  -mtime +3 -name "*.txt" -exec rm -rf {} \;
    `
如上所示，该命令可分为上面四个部分，

1，[/home/huangxiaomeng/]()为需要执行命令的目录，比如需要删除文件所在的目录。

2，[-mtime +3]()为时间修饰，比如需要删除3天前的文件就“+3”，删除几天前就+几。当然可以不加该部分。

3，[-name "*.txt"]()以文件名查找。上述为查找所有txt文件。

4.完成前面三步后需要执行的操作。-exec 需要执行的操作。上述为删除。

综上所述，上面例子的执行结果为删除目录下3天前的所有txt文件。

如果觉得每次执行麻烦的话可以将该命令写入脚本，让**crontab** 执行就行。

可以结合*date*命令，每天删除前一天的文件等等。