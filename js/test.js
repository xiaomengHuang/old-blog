/**
 * Created by hk60 on 2016/7/11.
 */
/*
// IIFE(立即调用函数表达式);  [参考 http://suqing.iteye.com/blog/1981591/]
;(function ($) {
    // 扩展这个方法到jQuery.
    // $.extend() 是吧方法扩展到 $ 对象上，和 $.fn.extend 不同。 扩展到 $.fn.xxx 上后，
    // 调用的时候就可以是 $(selector).xxx()
    $.fn.extend({
        // 插件名字
        pluginName: function () {
            // 遍历匹配元素的集合
            // 注意这里有个"return"，作用是把处理后的对象返回，实现链式操作
            return this.each(function () {
                // 在这里编写相应的代码进行处理
            });
        }
    });
// 传递jQuery到内层作用域去, 如果window,document用的多的话, 也可以在这里传进去.
// })(jQuery, window, document, undefined);
})(jQuery);
// 调用方式 $(".selector").pluginName().otherMethod();
*/
/*


!(function($){
    $.fn.pluginName = function(options) {
        // 合并参数，通过“extend”合并默认参数和自定义参数
        var args = $.extend({}, $.fn.pluginName.defaults, options);
        return this.each(function() {
            console.log(args.text);

            // to do something...
        });
    };
    // 默认参数
    $.fn.pluginName.defaults = {
        text : "hello"
    };
})(jQuery);*/

!(function($){
    $.fn.pluginName = function (method) {
        // 如果第一个参数是字符串, 就查找是否存在该方法, 找到就调用; 如果是object对象, 就调用init方法;.
        if (methods[method]) {
            // 如果存在该方法就调用该方法
            // apply 是吧 obj.method(arg1, arg2, arg3) 转换成 method(obj, [arg1, arg2, arg3]) 的过程.
            // Array.prototype.slice.call(arguments, 1) 是把方法的参数转换成数组.
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            // 如果传进来的参数是"{...}", 就认为是初始化操作.
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.pluginName');
        }
    };
    // 不把方法扩展在 $.fn.pluginName 上. 在闭包内建个"methods"来保存方法, 类似共有方法.
    var methods = {
        /**
         * 初始化方法
         * @param _options
         * @return {*}
         */
        init : function (_options) {
            return this.each(function () {
                var $this = $(this);
                var args = $.extend({}, $.fn.pluginName.defaults, _options);
                // ...
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
        }
    };
    // 默认参数
    $.fn.pluginName.defaults = {
        text:'hello'
    };
})(jQuery);
// 调用方式
// $("div").pluginName({...});  // 初始化
// $("div").pluginName("publicMethod");  // 调用方法
/*(function ($) {
    var Plugin = function (element, options) {
        this.element = element;
        this.options = options;
    };
    Plugin.prototype = {
        create: function () {
            console.log(this.element);
            console.log(this.options);
        }
    };
    $.fn.pluginName = function (options) {
        // 合并参数
        return this.each(function () {
            // 在这里编写相应的代码进行处理
            var ui = $._data(this, "pluginName");
            // 如果该元素没有初始化过(可能是新添加的元素), 就初始化它.
            if (!ui) {
                var opts = $.extend(true, {}, $.fn.pluginName.defaults, typeof options === "object" ? options : {});
                ui = new Plugin(this, opts);
                // 缓存插件
                $._data(this, "pluginName", ui);
            }
            // 调用方法
            if (typeof options === "string" && typeof ui[options] == "function") {
                // 执行插件的方法
                ui[options].apply(ui, args);
            }
        });
    };
    $.fn.pluginName.defaults = {};
})(jQuery);*/
/*!function ($) {
    // ecma262v5 的新东西, 强制使用严谨的代码编写.
    "use strict";
    // BUTTON PUBLIC CLASS DEFINITION
    // ==============================
    var Button = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Button.DEFAULTS, options);
    };
    Button.DEFAULTS = {
        loadingText: 'loading...'
    };
    Button.prototype.setState = function (state) {
        // ...
    };
    Button.prototype.toggle = function () {
        // ...
    };
    // BUTTON PLUGIN DEFINITION
    // ========================
    var old = $.fn.button; // 这里的 $.fn.button 有可能是之前已经有定义过的插件，在这里做无冲突处理使用。
    $.fn.button = function (option) {
        return this.each(function () {
            var $this = $(this);
            // 判断是否初始化过的依据
            var data = $this.data('bs.button');
            var options = typeof option == 'object' && option;
            // 如果没有初始化过, 就初始化它
            if (!data) $this.data('bs.button', (data = new Button(this, options)));
            if (option == 'toggle') data.toggle();
            else if (option) data.setState(option)
        })
    };
    // ① 暴露类名, 可以通过这个为插件做自定义扩展
    $.fn.button.Constructor = Button;
    // 扩展的方式
    // 设置 : $.fn.button.Constructor.newMethod = function(){}
    // 使用 : $btn.button("newMethod");
    // ② 无冲突处理
    $.fn.button.noConflict = function () {
        $.fn.button = old;
        return this
    };
    // ③ 事件代理, 智能初始化
    $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
        var $btn = $(e.target);
        // 查找要初始化的对象
        if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');
        // 直接调用方法, 如果没有初始化, 内部会先进行初始化
        $btn.button('toggle');
        e.preventDefault();
    });
}(jQuery);*/
