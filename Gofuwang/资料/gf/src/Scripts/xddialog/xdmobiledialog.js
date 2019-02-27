// JavaScript Document

if (jQuery) (function ($) {

    var XdDialogClass = function () {
        this.defaults = {
            // 消息内容
            content: null,

            // 标题
            title: 'Message',

            //是否有关闭按钮
            closeButton: true,

            // 内容宽度
            width: 0,

            // 内容高度
            height: 0,

            // 内容与边界填充距离
            padding: '20px 25px',

            // 对话框初始化后执行的函数
            init: null,

            // 对话框关闭前执行的函数
            beforeUnload: null,

            callback: null,

            // 是否显示的最外层窗口
            toTop: false,

            // 初始化后是否显示对话框
            visible: true,

            // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
            zIndex: 1100,
        };

        this.htmlStr = '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" class="xd-dialog-tbl">'
+ '<tr>'
+ '<td class="xd-header" style="height:24pt;">'
+ '<div class="xd-titleBar">'
+ '<table cellpadding="0" cellspacing="0" border="0" width="100%">'
+ '<tr>'
+ '<td class="xd-title"></td>'
+ '<td align="right" valign="top" class="xd-top-buttons"></td>'
+ '</tr>'
+ '</table>'
+ '</div>'
+ '</td>'
+ '</tr>'
+ '<tr>'
+ '<td class="xd-main" style="padding:0 1pt 1pt 1pt;" valign="top">'
+ '<div class="xd-content"></div>'
+ '</td>'
+ '</tr>'
+ '</table>';

        this.children = {};

        this.parent = false;
    };


    XdDialogClass.prototype = {
        create: function (options) {
            var self = this;
            self.defaults = $.extend(self.defaults, options);

            if (self.defaults.id && $.xdMobileDialog.list[self.defaults.id])
                return;

            self.dialogID = "XDDIALOG" + new Date().getTime();
            self.topWindow = self.window = window;
            self.opener = window;

            if (self.defaults.id)
                self.dialogID = self.defaults.id;

            if (self.topWindow != window.top) {
                self.topWindow = window.top;
                self.defaults.zIndex = Math.max(self.defaults.zIndex, ($.xdMobileDialog.data("XdZIndex") | 0) + 2);
            }

            $.xdMobileDialog.data("XdZIndex", self.defaults.zIndex);

            self.doc = window.document;
            var body = window.document.body;

            if (self.defaults.toTop) {
                self.doc = self.topWindow.document;
                body = self.topWindow.document.body;
            }

            var win = window;

            if (win != window.parent) {
                var pID = window.name;
                var parent = $.xdMobileDialog.data(pID);
                if (parent && self.dialogID != pID) {
                    self.parent = parent;
                    parent.children[self.dialogID] = self;
                }
            }

            $.xdMobileDialog.list[self.dialogID] = true;
            $.xdMobileDialog.data(self.dialogID, self);

            self.dialog = self.createNode('div', self.doc);
            $(body).append(self.dialog);
            self.dialog.addClass("xdDialog");

            self.dialog.attr("tabindex", 0);
            self.dialog.css("z-index", self.defaults.zIndex++);

            self.dialog.html(self.htmlStr);

            self.content = self.dialog.find(".xd-content");

            self.setTitle();

            self.setContent();

            self.setSize();

            $(window).bind('unload', function () {
                for (var id in $.xdMobileDialog.list) {
                    if ($.xdMobileDialog.list[id] && $.xdMobileDialog.data(id)) {
                        $.xdMobileDialog.data(id).close();
                    }
                }
            });

            if (self.defaults.init) {
                var fn = self.defaults.init;
                if (typeof fn == 'function')
                    fn.call(self, window);
            }
        },

        createNode: function (nodeName, doc) {
            var node;

            node = $('<' + nodeName + '>');

            return node;
        },

        setTitle: function () {
            var self = this;

            self.dialog.find(".xd-title").html(self.defaults.title);

            if (self.defaults.closeButton) {
                var divBtn = self.dialog.find(".xd-top-buttons");

                var btnClose = self.createNode('a', self.doc);
                divBtn.append(btnClose);
                btnClose.addClass("xd-close glyphicon glyphicon-remove");

                btnClose.click(function () {
                    self.close();
                });
            }
        },

        setContent: function () {
            var self = this;
            
            if (self.defaults.content) {
                self.content.html(self.defaults.content);
            } else {
                self.content.addClass("xd-loading");
                self.content.html('<iframe src="' + self.defaults.url + '" name="' + self.dialogID + '" frameborder="0" style="width:100%; height:100%; display:none"></iframe>');
                self.frame = self.content.children('iframe');
                $(self.frame[0].document).ready(function () {
                    self.frame.show();
                    self.content.removeClass("xd-loading");
                });
            }
        },

        setSize: function () {
            var self = this;
            var n = self.dialog.find(".xd-title").outerHeight();
            var m = self.dialog.find(".xd-outer").outerHeight() - self.dialog.find(".xd-inner").height();
            
            if (self.defaults.width > 0) {
                var winWidth = $(self.topWindow).width();
                var width = self.defaults.width > winWidth ? winWidth : self.defaults.width;
                self.dialog.width(width);

                var left = (winWidth - width) / 2;
                if (left > 0) {
                    self.dialog.css({ "left": Math.max(left, 0) });
                }
            }

            if (self.defaults.height > 0) {
                var winHeight = $(self.topWindow).height();
                var height = self.defaults.height > winHeight ? winHeight : self.defaults.height;
                self.dialog.height(height);

                self.dialog.css({ "top": 20 });
            }
        },

        close: function () {
            var self = this;

            if (self.defaults.beforeUnload) {
                var fn = self.defaults.beforeUnload;
                if (typeof fn === 'function')
                    fn.call(self, window);
            }

            for (var childId in self.children) {
                if (self.children[childId]) {
                    self.children[childId].close();
                    self.children[childId] = false;
                    delete self.children[childId];
                }
            }

            if (self.parent && self.parent.children[self.dialogID]) {
                self.parent.children[self.dialogID] = false;
                delete self.parent.children[self.dialogID];
            }

            if (self.overlay) {
                self.overlay.remove();
            }

            $(document).unbind("keydown");

            if (self.isFrame) {
                self.frame.attr("src", "about:blank");
                self.frame.remove();
            }

            if (self.dialog) self.dialog.remove();

            $.xdMobileDialog.list[self.dialogID] = false;
            delete $.xdMobileDialog.list[self.dialogID];
            $.xdMobileDialog.removeData(self.dialogID);
        },

        time: function () {
            var self = this;

            self.timer && clearTimeout(self.timer);

            if (self.defaults.time) {
                self.timer = setTimeout(function () {
                    self.close();
                }, 1000 * self.defaults.time);
            };
        },

        title: function (str) {
            var self = this;

            if (self.defaults.title) {
                self.defaults.title = str;
                self.dialog.find(".xd-title").html(self.defaults.title);
            }
        },

        content: function (str) {
            var self = this;

            if (!self.isFrame) {
                self.defaults.content = str;
                self.content.html(self.defaults.content);
            }
        },

        toUrl: function (url) {
            var self = this;

            if (self.isFrame && self.frame) {

                self.frame.attr("src", url);
            }
        },

        callback: function (obj) {
            var self = this;
            var fn = self.defaults.callback;
            if (typeof fn === 'function')
                fn.call(self, obj);
        }
    };

    $.extend({ xdMobileDialog: {
        dialog: function (options) {
            var ctl = new XdDialogClass();
            ctl.create(options);
            return ctl;
        },
        open: function (url, options) {
            options = $.extend(options, { 'url': url });
            var ctl = new XdDialogClass();
            ctl.create(options);

            return ctl;
        },

        close: function () {
            $.xdMobileDialog.data(window.name).close();
        },

        getDialog: function () {
            return $.xdMobileDialog.data(window.name);
        },

        callback: function (obj) {
            return $.xdMobileDialog.data(window.name).callback(obj);
        },

        data: function (name, value) {
            var topWin = window;

            if (window != window.top)
                topWin = window.top;

            var dataStr = "XDDIALOG_DATA";

            var cache = topWin[dataStr] || {};
            topWin[dataStr] = cache;

            if (name !== undefined) {
                if (value !== undefined) {
                    cache[name] = value;
                } else {
                    return cache[name];
                }
            }

            return cache;
        },

        removeData: function (name) {
            var topWin = window;
            if (window != window.top) {
                topWin = window.top;
            }

            var dataStr = "XDDIALOG_DATA";

            var cache = topWin[dataStr];
            if (cache && cache[name]) {
                cache[name] = false;
                delete cache[name];
            }
        },

        getOpener: function () {
            return $.xdMobileDialog.data(window.name).opener;
        },

        list: {}
    }
    });
})(jQuery);