if (jQuery) (function ($) {

    var currentIndex = null;

    var XdIndexClass = function () {
        this.defaults = {
            src : null,
            data_id: "",
            data_url: "",
            data_index: 0
        };
    };

    XdIndexClass.prototype = {

        create: function (src, data) {
            var self = this;
            self.defaults = $.extend({}, self.defaults, data);

            self.defaults.src = src;
            self.defaults.data_id = src.attr("data_id");
            self.defaults.data_url = src.attr("data_url");
            self.defaults.data_index = src.attr("data_index");

            currentIndex = self;

            self.curr_index = $('<div class="curr_index">' + self.defaults.data_index + '</div>').
			appendTo(self.defaults.src).
			hover(function () {
			    self.show();
			});

            self.curr_block = $('<div class="curr_block"></div>').
			appendTo(self.defaults.src).hover(function () { }, function () { self.hide() }).hide();

            self.curr_up = $('<div class="curr_up" title="上移"></div>').
			appendTo(self.curr_block).click(function(){
			    self.moveUp();
			});

            self.curr_input = $('<div class="curr_input" title="回车提交"></div>').
			appendTo(self.curr_block);

            self.txt_input = $('<input type="text" class="txt_index" name="txtIndex" value="' + self.defaults.data_index + '" />').
			appendTo(self.curr_input).keydown(function (event) {
			    var keyCode = event.keyCode ? event.keyCode : event.which;
			    if (keyCode == 13) {
			        self.orderIndex();
			    }
			});

            self.curr_down = $('<div class="curr_down" title="下移"></div>').
			appendTo(self.curr_block).
			click(function () {
			    self.moveDown();
			});
        },

        moveUp: function () {
            var self = this;
            jQuery.post(self.defaults.data_url, { act: "moveup", id: self.defaults.data_id }, function (str) {
                var result = eval("(" + str + ")");
                if (result.success > 0) {
                    self.defaults.data_index = result.index;
                    window.location.href = window.location.href;
                } else {
                    alert(result.msg);
                }
            });
        },

        moveDown: function () {
            var self = this;
            jQuery.post(self.defaults.data_url, { act: "movedown", id: self.defaults.data_id }, function (str) {
                var result = eval("(" + str + ")");
                if (result.success > 0) {
                    self.defaults.data_index = result.index;
                    window.location.href = window.location.href;
                } else {
                    alert(result.msg);
                }
            });
        },

        orderIndex: function () {
            var self = this;
            var idx = self.txt_input.val();
            jQuery.post(self.defaults.data_url, { act: "orderindex", id:self.defaults.data_id, index:idx }, function (str) {
                var result = eval("(" + str + ")");
                if (result.success > 0) {
                    self.defaults.data_index = result.index;
                    //self.hide();
                } else {
                    alert(result.msg);
                }
            });
        },

        hide: function () {
            var self = this;
            self.curr_index.html(self.defaults.data_index);
            self.curr_block.hide();
            self.curr_index.show();
        },

        show: function () {
            var self = this;
            self.curr_index.hide();
            self.curr_input.val(self.defaults.data_index);
            self.curr_block.show();
            self.txt_input.focus();
            self.txt_input.select();
        }
    };

    $.fn.extend({
        xdIndex: function (data) {

            var create = function (src, data) {
                if (src.tagName.toLowerCase() !== 'div') return;

                src = $(src);

                //var data1 = { data_id: src.attr("data_id"), data_url: src.attr("data_url"), data_index: src.attr("data_index") };

                if (src.data("xdindex-control")) return;

                var myCtl = new XdIndexClass();
                myCtl.create(src, data);

                src.data("xdindex-control", myCtl);
            };

            $(this).each(function () {
                create(this, data);
            });

            return $(this);
        }
    });

})(jQuery);