if (jQuery) (function ($) {

    var XdUploadClass = function () {
        this.defaults = {};
    };

    XdUploadClass.prototype = {

        create: function (src, data) {
            var self = this;
            self.src = src;
            self.defaults = $.extend({}, self.defaults, data);

            self.src.wrap('<div class="btnFileUpload"></div>');

            self.parent = self.src.parent();
            self.parent.prepend('<span>上传</span>')

            if ($("#XdUploadContainer").size() == 0) {
                self.div = $('<div id="XdUploadContainer" style="display:none"></div>');
                $(document.body).append(self.div);
            }
            else
                self.div = $("#XdUploadContainer");

            self.src.change(function () {

                var isOk = true;

                var fnLoad = self.defaults.load;
                if (typeof fnLoad === 'function')
                    isOk = fnLoad.call(self);

                if (!isOk) {
                    self.src.val('');
                    return;
                }

                var id = new Date().getTime();

                var frame = $('<iframe name="XdUploadFrame_' + id + '"></iframe>');
                self.div.append(frame);

                var form = $('<form name="XdUploadForm_' + id + '" action="' + self.defaults.actionUrl + '" method="post" target="XdUploadFrame_' + id + '" enctype="multipart/form-data"></form>');
                self.div.append(form);

                form.append(self.src);

                if (self.defaults.postData) {
                    for (var key in self.defaults.postData) {
                        var value = self.defaults.postData[key];
                        $('<input type="hide" name="' + key + '" value="' + value + '" />').appendTo(form);
                    }
                }

                frame.load(function () {

                    var txt = "";

                    try {
                        if (frame.get(0).contentWindow) {
                            txt = frame.get(0).contentWindow.document.body ? frame.get(0).contentWindow.document.body.innerHTML : null;
                        } else if (frame.get(0).contentDocument) {
                            txt = frame.get(0).contentDocument.document.body ? frame.get(0).contentDocument.document.body.innerHTML : null;
                        }

                        var fn = self.defaults.success;
                        if (typeof fn === 'function')
                            fn.call(self, txt);
                    }
                    catch (ex) {
                        var fn = self.defaults.error;
                        if (typeof fn === 'function')
                            fn.call(self, ex.message);
                    }

                    self.src.val('');
                    self.parent.append(self.src);

                    form.remove();
                    frame.remove();
                });

                form.submit();
            });
        }
    };

    $.fn.extend({ xdUpload: function (method, data) {

        var create = function (src, data) {
            if (src.tagName.toLowerCase() !== 'input') return;

            src = $(src);

            if (src.attr("type").toLowerCase() !== 'file') return;

            if (src.data("xdupload-control")) return;

            var myCtl = new XdUploadClass();
            myCtl.create(src, data);

            src.data("xdupload-control", myCtl);
        };

        switch (method) {
            default:
                $(this).each(function () {
                    create(this, $.extend({}, method, data));
                });
                return $(this);
                break;
        }
    }
    });
})(jQuery);