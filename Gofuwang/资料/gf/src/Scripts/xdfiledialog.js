if (jQuery) (function ($) {

    var XdFileDialogClass = function () {
        this.defaults = { imageList:[] };
        this.imageList = [];
    };

    XdFileDialogClass.prototype = {

        create: function (src, data) {
            var self = this;
            self.src = src;
            self.defaults = $.extend({}, self.defaults, data);

            self.src.click(function () {
                var fn = self.defaults.openDialog;
                if (typeof fn === 'function')
                    fn.call(self);
            });
            
            $.each(self.defaults.imageList, function (i, item) {
                self.addImage(item);
            });
        },

        addImage: function(imageUrl) {
            var self = this;
            if (self.defaults.listObj) {

                var html = '<div style="width:60px; height:60px; padding:5px; float:left;">';
                html += '<div class="galleryBlock" style="width:60px; height:60px; position:relative;" align="center">';
                html += '<img src="' + imageUrl + '" border="0" width="60" height="60" onload="resizeImage(this,60,60)" />';
                html += '<div class="btnDelete" style="width:17px; height:17px; position:absolute; left:43px; top:43px; background-image:url(/styles/management/images/btnDel_1.gif);"></div>';
                html += '</div>';
                html += '</div>';

                var divImage = $(html);

                self.imageList.push(imageUrl);
                self.defaults.listObj.append(divImage);

                divImage.find(".btnDelete").click(function () {
                    self.deleteImage(imageUrl);
                    divImage.remove();
                });
            }
        },

        addImageList: function (imageStr) {
            var self = this;
            if (imageStr) {
                var arr = imageStr.split(",");
                for (var i = 0; i < arr.length; i++) {
                    self.addImage(arr[i]);
                }
            }
        },

        deleteImage: function (imageUrl) {
            var self = this;
            var index = -1;
            for (var i = 0; i < self.imageList.length; i++) {
                if (imageUrl == self.imageList[i]) {
                    index = i;
                    break;
                }
            }

            if (index >= 0)
                self.imageList.splice(index, 1);
        },

        getImageList: function () {
            var self = this;
            return self.imageList.join(",");
        }
    };

    $.fn.extend({
        xdFileDialog: function (method, data) {

            var create = function (src, data) {

                src = $(src);

                if (src.data("xdfiledialog-control")) return;

                var myCtl = new XdFileDialogClass();
                src.data("xdfiledialog-control", myCtl);

                try {
                    myCtl.create(src, data);
                }
                catch (ex) {
                    alert(ex.message);
                }
            };

            var getCtl = function (src) {

                src = $(src);
                if (src.data("xdfiledialog-control"))
                    return src.data("xdfiledialog-control");

                return false;
            };

            var getImageList = function (src) {
                
                var myCtl = getCtl(src);
                if (myCtl) return myCtl.getImageList();
                return "";
            };

            var addImageList = function (src, imageStr) {

                var myCtl = getCtl(src);
                if (myCtl) return myCtl.addImageList(imageStr);
                return "";
            };
            
            switch (method) {
                case "getImageList":
                    return getImageList(this);
                    break;
                case "addImageList":
                    return addImageList(this, data);
                    break;
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