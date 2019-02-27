if (jQuery) (function ($) {

    var Ctl = function () {
        this.barHeight = 18;
        this.defaults = { fixHeadAndFoot: true, hasHead: true, hasLeft: true, headerSelectedClass: "", headerLeftSelectedClass: "" };
    };

    Ctl.prototype = {

        create: function (src, options) {
            var self = this;
            self.src = src;

            self.defaults = $.extend({}, self.defaults, options);

            self.src.addClass("fixedTable");

            self.bodyDiv = self.src.children(".body");
            self.bodyDiv.addClass("fixedTableBody");

            self.headHeight = 0;
            self.leftWidth = 0;

            if (self.defaults.hasHead) {
                self.headBodyDiv = self.src.children(".headBody");
                self.headBodyDiv.addClass("fixedTableHeadBody");
                self.headHeight = self.headBodyDiv.outerHeight();
            }

            if (self.defaults.hasLeft) {
                self.leftDiv = self.src.children(".left");
                self.leftDiv.addClass("fixedTableLeft");
                self.leftWidth = self.leftDiv.outerWidth();

                if (self.defaults.hasHead) {
                    self.headLeftDiv = self.src.children(".headLeft");
                    self.headLeftDiv.addClass("fixedTableHeadLeft");
                    self.headHeight = self.headLeftDiv.outerHeight();
                }

                self.leftDiv.css("padding-top", self.headHeight);
            }

            self.bodyDiv.css("padding-top", self.headHeight);
            self.bodyDiv.css("padding-left", self.leftWidth);

            if (self.defaults.hasHead)
                self.headBodyDiv.css("padding-left", self.leftWidth);

            self.bodyHeight = self.bodyDiv.outerHeight();
            self.src.height(self.bodyHeight + self.barHeight);
            self.bodyWidth = self.src.width();
            self.bodyScrollWidth = self.bodyDiv[0].scrollWidth;
            self.hasScrollBar = self.bodyWidth < self.bodyScrollWidth;

            if (self.hasScrollBar) {
                self.bodyDiv.width(self.bodyWidth - self.leftWidth);

                if (self.defaults.hasHead)
                    self.headBodyDiv.width(self.bodyWidth - self.leftWidth);

                self.scrollBarDiv = $('<div style="position:absolute; width:' + self.bodyWidth + 'px; height:' + self.barHeight + 'px; left:0; top:' + self.bodyHeight + 'px; overflow-x:scroll; overflow-y:hidden; z-index:2"></div>');
                self.src.append(self.scrollBarDiv);
                //self.scrollBarDiv.niceScroll({ cursorcolor: "#999999", cursorwidth: "8px", cursorborderradius: "0px", cursorborder: "", background: "#cccccc", autohidemode: false });

                self.scrollBodyDiv = $('<div style="height:1px; width:' + self.bodyScrollWidth + 'px; font-size:0; line-height:0;"></div>');
                self.scrollBarDiv.append(self.scrollBodyDiv);

                self.scrollBarDiv.scroll(function () {
                    self.bodyDiv.scrollLeft(self.scrollBarDiv.scrollLeft());

                    if (self.defaults.hasHead)
                        self.headBodyDiv.scrollLeft(self.scrollBarDiv.scrollLeft());
                });
            }

            if (self.defaults.fixHeadAndFoot) {
                self.myTop = self.src.offset().top;
                self.myLeft = self.src.offset().left;
                self.isIe6 = !window.XMLHttpRequest;

                setInterval(function () {
                    var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
                    var wndHeight = $(window).outerHeight();

                    if (self.defaults.hasHead) {
                        if (self.myTop > scrollTop || scrollTop > self.myTop + self.bodyHeight) {
                            if (self.defaults.hasLeft) {
                                self.headLeftDiv.css({ position: "absolute", left: 0, top: 0 });
                                if (self.defaults.headerLeftSelectedClass != "")
                                    self.headLeftDiv.removeClass(self.defaults.headerLeftSelectedClass);
                            }

                            self.headBodyDiv.css({ position: "absolute", left: 0, top: 0 });
                            if (self.defaults.headerSelectedClass != "")
                                self.headBodyDiv.removeClass(self.defaults.headerSelectedClass);
                        }
                        else {
                            if (self.isIe6) {
                                var t = scrollTop - self.myTop;

                                if (self.defaults.hasLeft) {
                                    self.headLeftDiv.css({ position: "absolute", left: 0, top: t + "px" });
                                    if (self.defaults.headerLeftSelectedClass != "")
                                        self.headLeftDiv.addClass(self.defaults.headerLeftSelectedClass);
                                }

                                self.headBodyDiv.css({ position: "absolute", left: 0, top: t + "px" });
                                if (self.defaults.headerSelectedClass != "")
                                    self.headBodyDiv.addClass(self.defaults.headerSelectedClass);
                            }
                            else {
                                if (self.defaults.hasLeft) {
                                    self.headLeftDiv.css({ position: "fixed", left: self.myLeft + "px", top: 0 });
                                    if (self.defaults.headerLeftSelectedClass != "")
                                        self.headLeftDiv.addClass(self.defaults.headerLeftSelectedClass);
                                }

                                self.headBodyDiv.css({ position: "fixed", left: self.myLeft + "px", top: 0 });
                                if (self.defaults.headerSelectedClass != "")
                                    self.headBodyDiv.addClass(self.defaults.headerSelectedClass);
                            }
                        }
                    }

                    if (self.hasScrollBar) {
                        if (self.myTop + self.headHeight > scrollTop + wndHeight || self.myTop + self.bodyHeight < scrollTop + wndHeight) {
                            self.scrollBarDiv.css({ position: "absolute", left: 0, top: self.bodyHeight + "px" });
                        }
                        else {
                            if (self.isIe6) {
                                var t = scrollTop + wndHeight - self.myTop - self.barHeight;
                                self.scrollBarDiv.css({ position: "absolute", left: 0, top: t + "px" });
                            }
                            else {
                                self.scrollBarDiv.css({ position: "fixed", left: self.myLeft + "px", top: wndHeight - self.barHeight });
                            }
                        }
                    }

                }, 100);
            }
        }
    };

    $.fn.extend({ xdFixedTableHeader: function (methodName, data) {

        var create = function (src, data) {

            if (src.tagName.toLowerCase() != "div")
                return;

            src = $(src);

            if (src.data("xdFixedTableHeader") != undefined)
                return;

            var ctl = new Ctl();
            ctl.create(src, data);

            src.data("xdFixedTableHeader", ctl);
        };

        switch (methodName) {
            default:
                $(this).each(function () {
                    create(this, methodName);
                });
                break;
        }

        return $(this);
    }
    });
})(jQuery);