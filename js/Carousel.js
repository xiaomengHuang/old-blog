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
            $.error('方法： ' + method + '不存在！');
        }
    };
    var methods = {
        init : function (_options) {
            return this.each(function () {
                var $this = $(this);
                var args = $.extend({}, $.fn.Carousel.defaults, _options);
                var ulClass = args.ulClass;
                var num=$('.'+ulClass+' li').length;
                private_methods.initLiIndex(ulClass,num);
                private_methods.appendBtn($this,num);
                private_methods.appendStyle($this);
                private_methods.btnBindEvent(ulClass,num,$this);
                var sec=args.time;
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
        appendStyle:function($this){
            var style = '<style>\
            body,ul,li{ margin:0; padding:0}\
            ul,li{ list-style:none;}\
            .HXM-tec-lunBo-ul{ position:absolute;padding:0;}\
            .carouselBtn{ overflow:hidden; height:30px;position:absolute; bottom:3px; left:50%; margin-left:-100px;}\
            .carouselBtn li{ float:left; margin:0 10px; padding:5px; cursor:pointer; background: #ea644a;border:1px #ea644a solid;border-radius:12px; height:22px; width:22px; overflow:hidden; text-align:center; line-height:10px;opacity:0.6; float:left;}\
            .carouselBtn li.on{ background: #ea644a; color:white;}\
            </style>';
            $this.append(style);
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
            var $btnLi = $(".carouselBtn li");
            var position = $(".on").index();
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
            var btn = '<ul class="carouselBtn"><li class="on">1</li>';
            var end = '</ul>';
            for(var i=2;i<=num;i++){
                btn += '<li>'+i+'</li>';
            }
            btn += end;
            if(num == 1){
                btn = null
            }
            $this.append(btn);
            $('.carouselBtn').css({'z-index':parseInt(num)+2});
        },
        btnBindEvent :function(ulClass,num,$this){
            $(".carouselBtn li").bind("click",function(){
                var $ulLi = $('.'+ulClass+' li');
                //console.log($ulLi);
                //    $ulLi[0].addEventListener("webkitAnimationEnd", function(e){ //动画结束时事件
                //        console.log('dasdasd',e);
                //    }, false);
                //    $ulLi[0].addEventListener("animationend", function(e){ //动画结束时事件
                //        console.log('dasdasd',e);
                //    }, false);
                var index = $(this).index();
                var index2 = $(".on").index();
                if(index!==index2){
                    var z_index = 0;
                    $ulLi.eq(index2).css({"z-index":parseInt(num)+1,"opacity":1}).animate({"opacity":0},1000);
                    $ulLi.eq(index).css({"z-index":num,"opacity":1});
                    $(this).addClass("on").siblings().removeClass("on");
                    setTimeout(function(){
                        for(var i=0;i<num;i++){
                            if(i<index){
                                z_index = index-i;
                            }else if(i===index){
                                z_index = num;
                            }else{
                                z_index = num-i+index;
                            }
                            $ulLi.eq(i).css({"z-index":z_index,"opacity":1});
                        }
                    },1000);
                }
            });
        }
    };
    // 默认参数
    $.fn.Carousel.defaults = {
        time:4000
    };
})(jQuery);