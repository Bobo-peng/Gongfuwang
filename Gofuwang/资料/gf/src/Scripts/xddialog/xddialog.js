// JavaScript Document

if (jQuery) (function ($) {

    var XdDialogClass = function () {
        this.defaults = {
            // 消息内容
            content: null,

            // 标题
            title: 'Message',

            //显示模示：normal 标准，simple 简单
            mode: 'normal',

            //是否有关闭按钮
            closeButton: true,

            // 自定义按钮
            buttons: null,

            // 确定按钮回调函数
            ok: null,

            // 取消按钮回调函数
            cancel: null,

            // 对话框初始化后执行的函数
            init: null,

            // 对话框关闭前执行的函数
            beforeUnload: null,

            callback: null,

            // 确定按钮文本
            okValue: '确定',

            // 取消按钮文本
            cancelValue: '取消',

            // 内容宽度
            width: 'auto',

            // 内容高度
            height: 'auto',

            // 内容与边界填充距离
            padding: '20px 25px',

            // 皮肤名(多皮肤共存预留接口)
            skin: null,

            // 自动关闭时间
            time: null,

            // 是否支持Esc键关闭
            esc: true,

            // 是否支持对话框按钮自动聚焦
            focus: true,

            // 初始化后是否显示对话框
            visible: true,

            // 让对话框跟随某元素
            follow: null,

            // 是否锁屏
            lock: false,

            // 锁屏遮罩透明度
            opacity: 0.3,

            // 是否固定定位
            fixed: false,

            // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
            zIndex: 1100,

            //显示最大化按钮
            max: false,

            //最大化显示
            isMax: false,

            //显示到根文档
            toTop: true
        };

        this.htmlStr = '<table cellpadding="0" cellspacing="0" border="0" class="xd-border">'
+ '<tr>'
        //+ '<td class="xd-nw"></td>'
        //+ '<td class="xd-n"></td>'
        //+ '<td class="xd-ne"></td>'
        //+ '</tr>'
        //+ '<tr>'
        //+ '<td class="xd-w"></td>'
+ '<td class="xd-c">'
+ '<div class="xd-outer">'
+ '<div class="xd-inner">'
+ '<table cellpadding="0" cellspacing="0" border="0" width="100%" class="xd-dialog-tbl">'
+ '<tr>'
+ '<td class="xd-header">'
+ '<div class="xd-titleBar">'
+ '<table cellpadding="0" cellspacing="0" border="0" width="100%">'
+ '<tr>'
+ '<td class="xd-title"></td>'
+ '<td width="88" align="right" valign="top" class="xd-top-buttons"></td>'
+ '</tr>'
+ '</table>'
+ '</div>'
+ '</td>'
+ '</tr>'
+ '<tr>'
+ '<td class="xd-main" valign="top">'
+ '<div class="xd-content"></div>'
+ '</td>'
+ '</tr>'
+ '<tr>'
+ '<td class="xd-footer">'
+ '<div class="xd-buttons"></div>'
+ '</td>'
+ '</tr>'
+ '</table>'
+ '</div>'
+ '</div>'
+ '</td>'
        //+ '<td class="xd-e"></td>'
        //+ '</tr>'
        //+ '<tr>'
        //+ '<td class="xd-sw"></td>'
        //+ '<td class="xd-s"></td>'
        //+ '<td class="xd-se"></td>'
+ '</tr>'
+ '</table>';

        this.children = {};

        this.parent = false;
    };


    XdDialogClass.prototype = {
        create: function (isFrame, options) {
            var self = this;
            self.defaults = $.extend(self.defaults, options);

            if (self.defaults.id && $.xdDialog.list[self.defaults.id])
                return;

            self.dialogID = "XDDIALOG" + new Date().getTime();
            self.isFrame = isFrame;
            self.topWindow = self.window = window;
            self.opener = window;
            self.isMax = self.defaults.isMax;

            if (self.defaults.id)
                self.dialogID = self.defaults.id;

            if (self.topWindow != window.top) {
                self.topWindow = window.top;
                self.defaults.zIndex = Math.max(self.defaults.zIndex, ($.xdDialog.data("XdZIndex") | 0) + 2);
            }

            $.xdDialog.data("XdZIndex", self.defaults.zIndex);

            self.doc = window.document;
            var body = window.document.body;

            if (self.defaults.toTop) {
                self.doc = self.topWindow.document;
                body = self.topWindow.document.body;
            }

            var win = window;

            if (win != window.parent) {
                var pID = window.name;
                var parent = $.xdDialog.data(pID);
                if (parent && self.dialogID != pID) {
                    self.parent = parent;
                    parent.children[self.dialogID] = self;
                }
            }

            $.xdDialog.list[self.dialogID] = true;
            $.xdDialog.data(self.dialogID, self);


            //加入样式表
            self.dir = '';
            $('script[src*=xddialog]').each(function () {
                var s = $(this).attr('src');
                s = s.replace(/[\\]/g, '/');
                if (s.match(/xddialog[^\/]*\.js/i)) {
                    self.dir = s.replace(/xddialog[^\/]*\.js/i, '');
                    return false;
                }
            });

//            if ($(self.doc).find('#xddialogcss').length == 0) {

//                if ($.browser.msie) {
//                    self.dir = window.location.protocol + '//' + window.location.host + self.dir;
//                }

//                var link = self.createNode('link', self.doc);
//                link.attr({ id: "xddialogcss", rel: "stylesheet", href: self.dir + 'xddialog.css' });
//                $(self.doc).find('head').append(link);
//            }


            self.hasMask = false;

            if (self.defaults.lock) {
                self.hasMask = true;
            } else {
                if ($.browser.msie && $.browser.version < 8)
                    self.hasMask = true;
            }

            if (self.hasMask) {
                self.overlay = self.createNode('div', self.doc);
                self.overlay.addClass("xdOverlay");
                $(body).append(self.overlay);

                if ($.browser.msie && $.browser.version < 8) {
                    self.overlay.html('<iframe src="about:blank" frameborder="0" class="xdOverlay" style="width:100%; height:100%"></iframe>');
                }

                self.overlay.css({ "z-index": self.defaults.zIndex++, "opacity": self.defaults.opacity, "filter": "alpha(opacity=" + (self.defaults.opacity * 100) + ")" });
            }

            self.dialog = self.createNode('div', self.doc);
            $(body).append(self.dialog);
            self.dialog.addClass("xdDialog");

            self.dialog.attr("tabindex", 0);
            self.dialog.css("z-index", self.defaults.zIndex++);

            self.dialog.html(self.htmlStr);

            self.defaults.buttons = $.extend([], $.makeArray(self.defaults.buttons));

            if (self.defaults.cancel) {
                self.defaults.buttons.unshift({ "name": self.defaults.cancelValue, "callback": self.defaults.cancel });
            }

            if (self.defaults.ok) {
                self.defaults.buttons.unshift({ "name": self.defaults.okValue, "focus": true, "callback": self.defaults.ok });
            }

            self.content = self.dialog.find(".xd-content");

            self.setSize();

            self.setOverlaySize();

            self.setTitle();

            self.setContent();

            self.setButtons();

            self.setPositionN();

            if (self.defaults.toTop) {
                $(self.topWindow).bind('scroll', function () {
                    self.setOverlaySize();
                    self.setPosition();
                });
            } else {
                $(window).bind('scroll', function () {
                    self.setOverlaySize();
                    self.setPosition();
                });
            }

            $(self.topWindow).bind('resize', function () {
                self.setOverlaySize();
                self.setPosition();
            });

            $(self.doc).bind("keydown", function (event) {
                switch (event.keyCode) {
                    case 27:
                        if (self.defaults.esc) {
                            self.close();
                        }
                        break;
                }
            });

            $(window).bind('unload', function () {
                for (var id in $.xdDialog.list) {
                    if ($.xdDialog.list[id] && $.xdDialog.data(id)) {
                        $.xdDialog.data(id).close();
                    }
                }
            });

            if (self.defaults.time) {
                self.time();
            }

            if (self.defaults.init) {
                var fn = self.defaults.init;
                if (typeof fn == 'function')
                    fn.call(self, window);
            }

            if (self.defaults.mode == "normal" && !self.defaults.fixed) {
                self.dialog.xdSimpleDragable({ handler: self.dialog.find(".xd-titleBar"), doc: self.doc });

                self.dialog.bind("xdMoveEvent", function () {
                    if (self.hasMask && !self.defaults.lock) {
                        self.overlay.css({ "left": self.dialog.css("left"), "top": self.dialog.css("top") });
                    }
                });
            }

            //self.dialog[0].focus();
            //self.dialog[0].blur();
        },

        createNode: function (nodeName, doc) {
            var node;

            if ($.browser.msie && $.browser.version < 8) {
                var elmt = doc.createElement(nodeName);
                node = $(elmt);
            } else {
                node = $('<' + nodeName + '>');
            }

            return node;
        },

        setTitle: function () {
            var self = this;

            if (self.defaults.mode == "normal") {
                self.dialog.find(".xd-title").html(self.defaults.title);
                var divBtn = self.dialog.find(".xd-top-buttons");

                if (self.defaults.max) {
                    var btnMax = self.createNode('a', self.doc);
                    divBtn.append(btnMax);
                    btnMax.addClass("xd-max");
                    btnMax.click(function () {
                        self.dialog.css({ "left": 0, "top": 0 });
                        self.isMax = !self.isMax;
                        self.setSize();
                        self.setPositionN();
                    });
                }

                var btnClose = self.createNode('a', self.doc);
                divBtn.append(btnClose);
                btnClose.addClass("xd-close");

                if (self.defaults.max) {
                    btnClose.addClass("xd-close-1");
                }

                btnClose.click(function () {
                    self.close();
                });
            }
            else {
                if (self.defaults.closeButton) {
                    var divBtn = self.dialog.find(".xd-outer-1");

                    var btnClose = self.createNode('div', self.doc);
                    btnClose.html('&times;');
                    btnClose.addClass("xd-close-2");
                    divBtn.append(btnClose);

                    btnClose.click(function () {
                        self.close();
                    });
                }
            }
        },

        setContent: function () {
            var self = this;

            if (self.isFrame) {
                self.content.addClass("xd-loading");
                
                self.content.html('<iframe src="' + self.defaults.url + '" name="' + self.dialogID + '" frameborder="0" style="width:100%; height:100%;"></iframe>');
                self.frame = self.content.children('iframe');
                $(self.frame[0].document).ready(function () {
                    self.frame.show();
                    self.content.removeClass("xd-loading");
                });

            } else {
                if (self.defaults.content) {
                    if (self.defaults.icon) {
                        self.content.html('<div style="padding:' + self.defaults.padding + '"><table cellpadding="0" cellspacing="0" border="0">' +
                        '<tr><td width="60"><img src="' + self.dir + 'images/' + self.defaults.icon + '.png"/></td>' +
                        '<td>' + self.defaults.content + '</td>' +
                        '</tr></table></div>');
                    } else {
                        self.content.html('<div style="padding:' + self.defaults.padding + '">' + self.defaults.content + '</div>');
                    }
                } else {
                    self.content.addClass("xd-loading");
                }
            }
        },

        setButtons: function () {
            var self = this;

            if (self.defaults.buttons.length > 0) {
                var divBtn = self.dialog.find(".xd-buttons");

                $.each(self.defaults.buttons, function (i, btnObj) {
                    var btn = self.createNode('button', self.doc);
                    divBtn.append(btn);
                    btn.html(btnObj.name);

                    if (btnObj.focus) {
                        btn.addClass("xd-state-highlight");
                    }

                    btn.click(function () {
                        var fn = btnObj.callback;
                        typeof fn !== 'function' || fn.call(self, window) !== false ? self.close() : self;
                    });
                });
            }
        },

        setPosition: function () {
            var self = this;

            if (self.defaults.fixed) {
                self.setPositionN();
            }
        },

        setPositionN: function () {
            var self = this;

            var w = 0;
            var h = 0;

            var tbl = self.dialog.children("table");
            self.dialog.width(Math.max(tbl.width(), 150));
            tbl.css("width", "100%");

            var l1 = Math.max(window.document.documentElement.scrollLeft, window.document.body.scrollLeft);
            var t1 = Math.max(window.document.documentElement.scrollTop, window.document.body.scrollTop);

            if (self.defaults.toTop) {

                if (self.defaults.follow) {

                    var follow = $(self.defaults.follow);
                    var offset = follow.offset();

                    w = offset.left - l1;
                    h = offset.top - t1;

                    var win = window;
                    while (win != window.parent) {
                        var frame = $(win.frameElement);
                        var offset1 = $(win.document.body).offset();
                        var w1 = offset1.left;
                        var h1 = offset1.top;

                        win = window.parent;

                        l1 = Math.max(win.document.documentElement.scrollLeft, win.document.body.scrollLeft);
                        t1 = Math.max(win.document.documentElement.scrollTop, win.document.body.scrollTop);

                        offset1 = frame.offset();
                        w += offset1.left + w1 - l1;
                        h += offset1.top + h1 - t1;
                    }

                    //高度不足向上显示
                    if (h + follow.outerHeight() + self.dialog.height() > $(self.topWindow).height()) {
                        h = h - self.dialog.height();
                    }
                    else {
                        h = h + follow.outerHeight();
                    }

                    //宽度不足向左显示
                    if (w + self.dialog.width() > $(self.topWindow).width()) {
                        w = w - self.dialog.width() + follow.outerWidth();
                        //左显示时高度小于0 宽度向左移跟随对象宽度
                        if (h < 0)
                            w = w - follow.outerWidth();
                    } else {
                        //右显示时高度小于0 宽度向右移跟随对象宽度
                        if (h < 0)
                            w = w + follow.outerWidth();
                    }

                } else {

                    if (!self.isMax) {

                        w = ($(self.topWindow).width() - self.dialog.width()) / 2;
                        h = ($(self.topWindow).height() - self.dialog.height()) / 2;
                    }

                    var h2 = Math.max(window.document.documentElement.scrollTop, window.document.body.scrollTop);

                    if (window.top != window)
                        h2 = Math.max(window.top.document.documentElement.scrollTop, window.top.document.body.scrollTop);

                    h += h2;
                }

            } else {

                w = l1 + ($(self.window).width() - self.dialog.width()) / 2;
                h = t1 + ($(self.window).height() - self.dialog.height()) / 2;
            }

            self.dialog.css({ "left": Math.max(w, 0), "top": Math.max(h, 0) });

            if (self.hasMask && !self.defaults.lock) {
                self.overlay.css({ "left": self.dialog.css("left"), "top": self.dialog.css("top") });

                self.overlay.width(self.dialog.width());
                self.overlay.height(self.dialog.height());
            }
        },

        setSize: function () {
            var self = this;
            var n = 10;

            if (self.defaults.mode == 'normal') {
                n = 29;
            } else {
                self.dialog.find(".xd-outer").removeClass().addClass("xd-outer-1");
            }

            if (self.defaults.buttons.length > 0) {
                n += 40;
                var divBtn = self.dialog.find(".xd-buttons");
                divBtn.css({ "padding": "8px 15px 0 0", "height": "32px" });
            }

            self.dialog.find(".xd-border").css("width", "100%");
            //self.dialog.css({ "left": 0, "top": 0 });

            if (self.isMax) {
                self.dialog.width($(self.topWindow).width());
                self.dialog.find(".xd-main").height($(self.topWindow).height() - n - 2);
            }
            else {
                if (self.defaults.width != "auto") {
                    var winWidth = $(self.topWindow).width();
                    var width = self.defaults.width > winWidth ? winWidth : self.defaults.width;
                    self.dialog.width(width);
                } else {
                    self.dialog.find(".xd-border").css("width", "auto");
                }

                if (self.defaults.height != "auto") {
                    var winHeight = $(self.topWindow).height();
                    var height = self.defaults.height > winHeight ? winHeight : self.defaults.height;
                    self.dialog.find(".xd-main").height(height - n);
                }
            }
        },

        setOverlaySize: function () {
            var self = this;

            if (self.overlay) {
                if (self.defaults.lock) {
                    self.overlay.css({ "width": "100%", "height": "100%" });
                } else {
                    self.overlay.width(self.dialog.width());
                    self.overlay.height(self.dialog.height());
                }
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

            $.xdDialog.list[self.dialogID] = false;
            delete $.xdDialog.list[self.dialogID];
            $.xdDialog.removeData(self.dialogID);
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

        toContent: function (str) {
            var self = this;
            if (!self.isFrame) {
                self.defaults.content = str;
                self.content.html('<div style="padding:' + self.defaults.padding + '">' + self.defaults.content + '</div>');
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

    $.extend({ xdDialog: {
        dialog: function (options) {
            var ctl = new XdDialogClass();
            ctl.create(false, options);

            return ctl;
        },

        open: function (url, options) {
            options = $.extend(options, { 'url': url });
            var ctl = new XdDialogClass();
            ctl.create(true, options);

            return ctl;
        },

        close: function () {
            $.xdDialog.data(window.name).close();
        },

        getDialog: function () {
            return $.xdDialog.data(window.name);
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
            return $.xdDialog.data(window.name).opener;
        },

        list: {},

        alert: function (content, action, title, icon) {
            var ctl = new XdDialogClass();
            ctl.create(false, {
                id: 'alert',
                icon: icon || 'warning',
                fixed: true,
                lock: true,
                title: title || 'message',
                content: content,
                ok: true,
                beforeUnload: function (param) {
                    return action && action.call(this, param);
                }
            });
        },

        pop: function (content, action, title, time) {
            var ctl = new XdDialogClass();
            ctl.create(false, {
                id: 'pop',
                fixed: true,
                lock: true,
                title: title || 'message',
                content: content,
                time: time || 3,
                toTop: false,
                beforeUnload: function (param) {
                    return action && action.call(this, param);
                }
            });
        },

        confirm: function (content, yes, no, title) {
            var ctl = new XdDialogClass();
            ctl.create(false, {
                id: 'confirm',
                icon: 'question',
                fixed: true,
                lock: true,
                title: title || 'message',
                content: content,
                ok: function (param) {
                    return yes.call(this, param);
                },
                cancel: function (param) {
                    return no && no.call(this, param);
                }
            });
        },

        prompt: function (content, yes, value) {
            value = value || '';
            var input;

            var ctl = new XdDialogClass();
            ctl.create(false, {
                id: 'prompt',
                icon: 'question',
                fixed: true,
                lock: true,
                content: '<div style="margin-bottom:5px;font-size:12px">' + content + '</div>' +
			    '<div><input value="' + value + '" style="width:18em; padding:6px 4px" /></div>',
                init: function () {
                    input = this.content.find('input')[0];
                    input.focus();
                },
                ok: function (param) {
                    return yes && yes.call(this, input.value, param);
                },
                cancel: true
            });
        },

        tips: function (content, time) {
            var ctl = new XdDialogClass();
            ctl.create(false, {
                id: 'tips',
                mode: 'simple',
                closeButton: false,
                fixed: true,
                content: content,
                time: time || 3,
                toTop: false
            });
        }
    }
    });

    //拖动
    var Ctl = function () {
        this.boundLeft = 0;
        this.boundTop = 0;
        this.boundRight = 0;
        this.boundBottom = 0;
        this.defaults = {};
    };

    Ctl.prototype = {

        create: function (src, options) {
            var self = this;
            self.src = src;

            self.defaults = $.extend({}, self.defaults, options);

            if (self.defaults.bound) {
                self.bound = $(self.defaults.bound);
            }

            self.handler = src;

            if (self.defaults.handler) {
                self.handler = $(self.defaults.handler);
            }

            self.doc = document;

            if (self.defaults.doc) {
                self.doc = self.defaults.doc;
            }

            var draging = false;
            var startLeft, startTop, startCssLeft, startCssTop;
            var startX, startY;

            self.handler.bind("mouseover", function () {
                if (draging)
                    self.handler.css('cursor', 'move');
                else
                    self.handler.css('cursor', 'auto');
            });

            self.handler.bind("mousedown", function (event) {

                if (self.defaults.bound) {
                    var parentOffset = self.bound.offset();
                    var borderLeft = parseInt(self.bound.css('border-left-width')) || 0;
                    var borderTop = parseInt(self.bound.css('border-top-width')) || 0;

                    self.boundLeft = parentOffset.left + borderLeft;
                    self.boundTop = parentOffset.top + borderTop;
                    self.boundRight = parentOffset.left + borderLeft + self.bound.width();
                    self.boundBottom = parentOffset.top + borderTop + self.bound.height();
                }

                var offset = src.offset();
                startLeft = offset.left;
                startTop = offset.top;
                startCssLeft = parseInt(src.css("left")) || 0;
                startCssTop = parseInt(src.css("top")) || 0;
                startX = event.pageX;
                startY = event.pageY;

                draging = true;
                self.handler.css('cursor', 'move');

                return false;
            });

            self.handler.bind("mouseout", function (event) {
                if (!draging) return;
                var deltaX = event.pageX - startX;
                var deltaY = event.pageY - startY;

                if (self.defaults.bound) {
                    var left = self.boundX(startLeft + deltaX, src.width());
                    var top = self.boundY(startTop + deltaY, src.height());

                    src.css('left', (left - self.boundLeft) + 'px').css('top', (top - self.boundTop) + 'px');

                } else {
                    var left = startCssLeft + deltaX;
                    var top = startCssTop + deltaY;

                    src.css('left', left + 'px').css('top', top + 'px');
                }

                src.trigger("xdMoveEvent");

                return false;
            });

            $(self.doc).bind("mousemove", function (event) {
                if (!draging) return;
                var deltaX = event.pageX - startX;
                var deltaY = event.pageY - startY;

                if (self.defaults.bound) {
                    var left = self.boundX(startLeft + deltaX, src.width());
                    var top = self.boundY(startTop + deltaY, src.height());

                    src.css('left', (left - self.boundLeft) + 'px').css('top', (top - self.boundTop) + 'px');

                } else {
                    var left = startCssLeft + deltaX;
                    var top = startCssTop + deltaY;

                    src.css('left', left + 'px').css('top', top + 'px');
                }

                src.trigger("xdMoveEvent");

                return false;

            }).bind("mouseup", function (event) {
                draging = false;
                self.handler.css('cursor', 'auto');
            });

            if ($(self.src).find("iframe").size() > 0) {
                var iframe = $(self.src).find("iframe");
                if ($.browser.msie) {
                    $(iframe[0].contentWindow.document).bind("mousemove", function (event) {
                        if (!draging) return;
                        var deltaX = event.pageX - startX + iframe.offset().left;
                        var deltaY = event.pageY - startY + iframe.offset().top;

                        if (self.defaults.bound) {
                            var left = self.boundX(startLeft + deltaX, src.width());
                            var top = self.boundY(startTop + deltaY, src.height());

                            src.css('left', (left - self.boundLeft) + 'px').css('top', (top - self.boundTop) + 'px');

                        } else {
                            var left = startCssLeft + deltaX;
                            var top = startCssTop + deltaY;

                            src.css('left', left + 'px').css('top', top + 'px');
                        }

                        src.trigger("xdMoveEvent");

                        return false;

                    }).bind("mouseup", function (event) {
                        draging = false;
                        self.handler.css('cursor', 'auto');
                    });
                }
                else {
                    $(iframe[0].contentWindow).bind("mousemove", function (event) {
                        if (!draging) return;
                        var deltaX = event.pageX - startX + iframe.offset().left;
                        var deltaY = event.pageY - startY + iframe.offset().top;

                        if (self.defaults.bound) {
                            var left = self.boundX(startLeft + deltaX, src.width());
                            var top = self.boundY(startTop + deltaY, src.height());

                            src.css('left', (left - self.boundLeft) + 'px').css('top', (top - self.boundTop) + 'px');

                        } else {
                            var left = startCssLeft + deltaX;
                            var top = startCssTop + deltaY;

                            src.css('left', left + 'px').css('top', top + 'px');
                        }

                        src.trigger("xdMoveEvent");

                        return false;

                    }).bind("mouseup", function (event) {
                        draging = false;
                        self.handler.css('cursor', 'auto');
                    });
                }
            }
        },

        boundX: function (x, extra) {
            return Math.max(Math.min(x || 0, this.boundRight - (extra || 0)), this.boundLeft);
        },

        boundY: function (y, extra) {
            return Math.max(Math.min(y || 0, this.boundBottom - (extra || 0)), this.boundTop);
        }
    };

    $.fn.extend({ xdSimpleDragable: function (method, data) {

        var create = function (src, data) {
            if (src.tagName.toLowerCase() !== 'div') return;

            src = $(src);

            if (src.data("xddrag-control")) return;

            var myCtl = new Ctl();
            myCtl.create(src, data);

            src.data("xddrag-control", myCtl);
        };

        switch (method) {
            default:

                $(this).each(function () {
                    create(this, method);
                });

                break;
        }

        return $(this);
    }
    });

    var XdMap = function () {
        this.keys = new Array();
        this.data = new Object();

        Array.prototype.remove = function (s) {
            for (var i = 0; i < this.length; i++) {
                if (s == this[i])
                    this.splice(i, 1);
            }
        };

        this.put = function (key, value) {
            if (this.data[key] == null) {
                this.keys.push(key);
            }
            this.data[key] = value;
        };

        this.get = function (key) {
            return this.data[key];
        };

        this.remove = function (key) {
            this.keys.remove(key);
            this.data[key] = null;
        };

        this.each = function (fn) {
            if (typeof fn != 'function') {
                return;
            }

            var len = this.keys.length;
            for (var i = 0; i < len; i++) {
                var k = this.keys[i];
                fn(k, this.data[k], i);
            }
        };

        this.entrys = function () {
            var len = this.keys.length;
            var entrys = new Array(len);
            for (var i = 0; i < len; i++) {
                entrys[i] = {
                    key: this.keys[i],
                    value: this.data[i]
                };
            }
            return entrys;
        };

        this.isEmpty = function () {
            return this.keys.length == 0;
        };

        this.size = function () {
            return this.keys.length;
        };

        this.toString = function () {
            var s = "{";
            for (var i = 0; i < this.keys.length; i++, s += ',') {
                var k = this.keys[i];
                s += k + "=" + this.data[k];
            }
            s += "}";
            return s;
        };
    }
})(jQuery);