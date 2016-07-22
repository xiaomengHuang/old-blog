/**
 * Created by hk60 on 2016/7/22.
 */
!(function($){
    $.fn.Carousel = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.pluginName');
        }
    };
    var methods = {
        init : function (_options) {
            return this.each(function () {
                var $this = $(this);
                console.log($this);
                var args = $.extend({}, $.fn.Carousel.defaults, _options);
                var ulClass = args.ulClass;
                var num=$('.'+ulClass+' li').length;//获取焦点图的个数
                private_methods.initLiIndex(ulClass,num);
                private_methods.appendBtn($this,num);
                private_methods.btnBindEvent();
                var sec=args.time;//时间切换间隔
                var picTimer = private_methods.getTimePicker(ulClass,num,sec);
                $this.mouseover(
                    function(){
                        clearInterval(picTimer);
                    });
                $this.bind("mouseout",function(){
                    picTimer = private_methods.getTimePicker(ulClass,num,sec);
                });


                console.log(args);
            })
        },
        publicMethod : function(){
            private_methods.demoMethod();
        }
    };
    // 私有方法
    var  private_methods = {
        demoMethod : function(){
            console.log('private function');
        },
        getTimePicker:function(ulClass,num,sec){
           return setInterval(function(){
               private_methods.animateFunc(ulClass,num);
           },sec);
        },
        initLiIndex:function(ulClass,num){
            for(var i=0;i<num;i++){
                $('.'+ulClass+' li').eq(i).css({"z-index":parseInt(num)-i})
            }
        },
        animateFunc:function(ulClass,num){
            var $ulLi = $('.'+ulClass+' li');
            var $btnLi = $(".btn li");
            var position = $btnLi.index($(".on"));//取得 当前焦点图的位置，即class为on的序号。
            if(position === num-1){
                $btnLi.eq(0).addClass("on").siblings().removeClass("on");
            } else{
                $btnLi.eq(position+1).addClass("on").siblings().removeClass("on");
            }
            $ulLi.eq(position).animate({"opacity":0},1000);
            setTimeout(function(){
                $ulLi.eq(position).css({"z-index":0});
                for(var i =0;i<num;i++){
                    $ulLi.eq(i).css({"z-index":parseInt($ulLi.eq(i).css("z-index"))+1,"opacity":1});
                }
            },1000);
        },
        appendBtn : function($this,num){
            var btn = '<ul class="btn"><li class="on">1</li>';
            var end = '</ul>';
            for(var i=2;i<=num;i++){
                btn += '<li>'+i+'</li>';
            }
            btn += end;
            if(num == 1){
                btn = null
            }
            $this.append(btn);//自动根据焦点图个数，添加切换按钮，如果只有一张图片则不显示切换按钮。
            $('.btn').css({'z-index':parseInt(num)+1});
        },
        btnBindEvent :function(){
            $(".btn li").bind("click",function(){
                //$(this).addClass("on").siblings().removeClass("on");
                var len =$(".btn li").length;
                var index = $(this).index();
                var index2 = $(".on").index();
                console.log(index,index2,len);


            }
            );//鼠标指向按钮，焦点图切换到对应位置，按钮样式改变。mouseover是鼠标经过时，这里也可以改成click，通过点击切换焦点图。
        }
    };
    // 默认参数
    $.fn.Carousel.defaults = {
    };
})(jQuery);