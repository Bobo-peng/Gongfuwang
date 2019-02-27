if (jQuery) (function ($) {

    var currentPage = null;

    var XdPageClass = function () {
        this.defaults = {
            pageBlock: false,
            navBlock: false,
            pageName: "未标题",
            canClose: true,
            minWidth: 1000,
            isFullMenu: 0
        };

        this.title = false;

        this.page = false;

        this.isFullScreen = false;

        this.visible = true;

        this.isFullMenu = false;
    };

    XdPageClass.prototype = {

        create: function (data) {
            var self = this;
            self.defaults = $.extend({}, self.defaults, data);

            if (!self.defaults.pageBlock)
                return;

            if (!self.defaults.navBlock)
                return;

            var hasObj = false;
            self.defaults.navBlock.find("li").each(function (i, item) {
                var obj = $(item).data("xdPageObj");
                if (obj.defaults.url == self.defaults.url) {
                    obj.show();
                    hasObj = true;
                    return false;
                } else if (obj.isFullScreen && obj.defaults.isFullMenu == 1) {
                    obj.defaults.url = self.defaults.url;
                    obj.title.html(self.defaults.pageName);
                    obj.frame[0].contentWindow.location = self.defaults.url;
                    obj.show();
                    hasObj = true;
                    return false;
                }

                obj.hide();
            });

            if (hasObj)
                return;

            currentPage = self;

            self.title = $('<li class="selected">' + self.defaults.pageName + '</li>').
			appendTo(self.defaults.navBlock).
			click(function () {
			    self.show();
			});

            if (self.defaults.canClose) {
                self.btnClose = $('<a href="javascript:;">&nbsp;</a>').
				appendTo(self.title).
				click(function () {
				    self.close();
				});
            }

            self.page = $('<div class="pageItem"></div>').
			appendTo(self.defaults.pageBlock);

            self.frame = $('<iframe src="' + self.defaults.url + '" width="100%" height="100%" frameborder="0"></iframe>').
			appendTo(self.page);

            self.btnBlock = $('<div class="btnBlock"></div>').
			appendTo(self.page);

            self.btnFirst = $('<div class="btnRefresh" title="刷新"></div>').
			appendTo(self.btnBlock).
			click(function () {
			    self.refresh();
			});

            self.btnFullScreen = $('<div class="btnFullScreen" title="缩放"></div>').
			appendTo(self.btnBlock).
			click(function () {
			    self.fullScreen();
			});

            self.btnBackTop = $('<div class="btnBackTop" title="顶部"></div>').
			appendTo(self.btnBlock).
			click(function () {
			    self.backTop();
			});

            self.btnFullMenu = $('<div class="btnFullMenu" title="菜单"></div>').
			appendTo(self.btnBlock).
			click(function () {
			    self.fullMenu();
			});

            self.fullMenuBlock = $('<div class="fullMenuBlock" v="0"></div>').
			appendTo(self.btnBlock);

            self.title.data("xdPageObj", self);

            self.setPosition();

            $(window).resize(function () {
                self.setSize();
            });
        },

        fullScreen: function () {
            var self = this;
            if (self.isFullScreen) {
                self.page.removeClass("fullScreen");
                self.btnFullScreen.removeClass("btnNormal");
                self.isFullScreen = false;
                self.btnBlock.width(74);
                self.btnFullMenu.hide();
                self.fullMenuBlock.hide();
            }
            else {
                self.page.addClass("fullScreen");
                self.btnFullScreen.addClass("btnNormal");
                self.isFullScreen = true;
                if (self.defaults.isFullMenu == 1 && self.defaults.url.indexOf("index.aspx") < 0) {
                    self.btnBlock.width(99);
                    self.btnFullMenu.show();
                }
            }

            self.setPosition();
            self.setSize();

        },

        refresh: function () {
            var self = this;
            var doc = self.frame[0].contentWindow.document;
            if (doc) {
                var form = doc.forms["form2"];
                if (form && form != "undefined") {
                    var m = $(form).attr("method");
                    if (m && m != "undefined") {
                        if (m.toUpperCase() == "POST") {
                            form.elements["act"].value = "query";
                            form.submit();
                            return;
                        }
                    }
                }
            }

            try {
                //var url = self.frame[0].contentWindow.location.href;
                //var index = url.indexOf("?");
                //if (url.length > 0 && index > 0) {
                //    url = url.substring(0, index);
                //    self.frame[0].contentWindow.location = url;
                //} else {
                    self.frame[0].contentWindow.location = self.frame[0].contentWindow.location;
                //}
            } catch (e) {
                self.frame[0].contentWindow.location = self.frame[0].contentWindow.location;
                //self.frame.attr("src", self.frame.attr("src"));
            }
        },

        fullMenu: function () {
            var self = this;
            if (!self.isFullMenu) {
                self.isFullMenu = true;
                loadFullMenu();
            }
            if (!self.fullMenuBlock.is(':visible')) {
                self.fullMenuBlock.show();
            }
            else {
                self.fullMenuBlock.hide();
            }
        },

        backTop:function(){
            var self = this;
            var doc = self.frame[0].contentWindow.document;
            if (doc) {
                if (doc.documentElement && doc.documentElement.scrollTop)
                    doc.documentElement.scrollTop = 0;
                else if (doc.body)
                    doc.body.scrollTop = 0;
            }
        },

        close: function () {
            var self = this;

            var next = self.title.next();
            if (next.data("xdPageObj")) {
                next.data("xdPageObj").show();
            }
            else {
                var prev = self.title.prev();
                if (prev.data("xdPageObj")) {
                    prev.data("xdPageObj").show();
                }
            }

            self.frame.attr("src", "about:blank");
            self.title.empty();
            self.title.remove();
            self.page.empty();
            self.page.remove();
        },

        hide: function () {
            var self = this;
            self.visible = false;
            self.title.removeClass("selected");
            self.page.hide();
        },

        show: function () {
            var self = this;

            self.defaults.navBlock.find("li").each(function (i, item) {
                $(item).data("xdPageObj").hide();
            });

            self.visible = true;
            self.title.addClass("selected");
            self.page.show();

            self.setPosition();
            self.setSize();
        },

        setPosition: function () {
            var self = this;
            var last = self.defaults.navBlock.find("li:last");
            var navList = self.defaults.navBlock.parent();
            var navWidth = navList.width();

            if (navWidth >= last.position().left + last.outerWidth()) {
                navList.scrollLeft(0);
            }
            else {
                var left = self.title.position().left;
                var width = self.title.outerWidth();
                var navLeft = navList.scrollLeft();

                if (left < navLeft) {
                    navList.scrollLeft(left);
                }

                if (left + width > navLeft + navWidth) {
                    navList.scrollLeft(left + width - navWidth);
                }
            }
        },

        setSize: function () {
            var self = this;
            if (self.isFullScreen) {
                var w = $(window).outerWidth() < self.defaults.minWidth ? self.defaults.minWidth : $(window).outerWidth();
                self.page.width(w);
                self.page.height($(window).outerHeight());
            }
            else {
                self.page.width(self.defaults.pageBlock.width());
                self.page.height(self.defaults.pageBlock.height());
                self.page.css({ width: "100%", height: "100%" });
            }
        }
    };

    $.extend({ xdPage: {
        open: function (url, options) {
            options = $.extend(options, { 'url': url });
            var ctl = new XdPageClass();
            ctl.create(options);

            return ctl;
        },

        closeAll: function () {
            if (!currentPage)
                return;

            if (!currentPage.defaults.navBlock)
                return;

            currentPage.defaults.navBlock.find("li").each(function (i, item) {
                var obj = $(item).data("xdPageObj");
                if (obj.defaults.canClose) {
                    obj.close();
                }
            });
        },

        goPrev: function () {
            if (!currentPage)
                return;

            if (!currentPage.defaults.navBlock)
                return;

            var selected = currentPage.defaults.navBlock.find(".selected");

            var prev = selected.prev();
            if (prev.data("xdPageObj")) {
                prev.data("xdPageObj").show();
            }
        },

        goNext: function () {
            if (!currentPage)
                return;

            if (!currentPage.defaults.navBlock)
                return;

            var selected = currentPage.defaults.navBlock.find(".selected");

            var next = selected.next();
            if (next.data("xdPageObj")) {
                next.data("xdPageObj").show();
            }
        }
    }
    });

})(jQuery);