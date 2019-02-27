if (jQuery) (function ($) {

    var XdDatePickerClass = function () {
        this.defaults = {
            dateFormat: 'yyyy-MM-dd',
            isRead: false,
            isClear: true,
            isClick: true,
            isFocus: false,
            vueStore: false,
            isMobile: false,
            lineHeight: 36,
            colWidth : 36
        };
    };

    XdDatePickerClass.prototype = {

        create: function (src, data) {
            var self = this;
            self.src = src;
            self.defaults = $.extend({}, self.defaults, data);
            self.visible = false;

            if (!self.defaults.isRead)
                self.src.attr("readonly", true);
            
            self.hasYear = self.defaults.dateFormat.indexOf('y') >= 0;
            self.hasMonth = self.defaults.dateFormat.indexOf('M') >= 0;
            self.hasDay = self.defaults.dateFormat.indexOf('d') >= 0;
            self.hasHour = self.defaults.dateFormat.indexOf('H') >= 0;
            self.hasMinute = self.defaults.dateFormat.indexOf('m') >= 0;
            self.hasSecond = self.defaults.dateFormat.indexOf('s') >= 0;

            self.hasDate = self.hasYear || self.hasMonth || self.hasDay;
            self.hasTime = self.hasHour || self.hasMinute || self.hasSecond;

            self.timeDivCount = 0;
            if (self.hasHour) self.timeDivCount++;
            if (self.hasMinute) self.timeDivCount++;
            if (self.hasSecond) self.timeDivCount++;
            
            $(document).click(function (event) {
                if (event.target != self.src.get(0)) {
                    if (self.visible) {
                        self.div.remove();
                        self.visible = false;
                    }
                }
            });

            if (self.defaults.isClick) {
                self.src.click(function () {
                    self.openPicker();
                });
            }

            if (self.defaults.isFocus) {
                self.src.focus(function () {
                    self.openPicker();
                });
            }
        },

        openPicker: function () {
            var self = this;
            if (!self.visible) {
                self.visible = true;
                self.val = self.src.val();

                if (self.div) self.div.remove();

                var width = self.defaults.colWidth * 7;
                self.defaults.width = width;
                self.defaults.pickerWidth = width + 2;

                var rows = 9;
                if (self.hasDate && self.hasTime) {
                    rows += 1;
                }
                var height = rows * self.defaults.lineHeight + 5;
                self.defaults.pickerHeight = height;

                var offset = self.src.offset();
                self.srcLeft = offset.left;
                self.srcTop = offset.top;

                var ww = $(window).width();
                self.divLeft = self.srcLeft;
                var divLeft = self.srcLeft + self.defaults.pickerWidth;
                if (divLeft > ww)
                    self.divLeft = self.srcLeft + self.src.outerWidth() - self.defaults.pickerWidth + 2;

                var wh = $(window).scrollTop() + $(window).height() / 2;
                self.divTop = self.srcTop + self.src.outerHeight() + 2;
                if (self.srcTop > wh)
                    self.divTop = self.srcTop - height - 4;

                self.div = $('<div style="position:absolute; left:' + self.divLeft + 'px; top:' + self.divTop + 'px; width:' + width + 'px; background-color:#ffffff; border:solid 1px #999999; font-size:14px; text-align:center;"></div>');
                self.div.appendTo($(document.body));

                self.divInner = $('<div style="line-height:' + self.defaults.lineHeight + 'px;"></div>');
                self.div.append(self.divInner);

                self.mask = $('<div style="position:absolute; left:0; top:0; width:' + width + 'px; height:' + height + 'px; background-color:#000000; opacity:0.3; "></div>');
                self.div.append(self.mask);
                self.mask.hide();

                self.mask.click(function () {
                    self.mask.hide();
                    if (self.dialogType == "year") {
                        self.divYear.remove();
                    }
                    else if (self.dialogType == "month") {
                        self.divMonth.remove();
                    }
                    else if (self.dialogType == "hour") {
                        self.divHour.remove();
                    }
                    else if (self.dialogType == "minute") {
                        self.divMinute.remove();
                        self.divMinuteA.remove();
                    }
                    else if (self.dialogType == "second") {
                        self.divSecond.remove();
                        self.divSecondA.remove();
                    }
                });

                self.div.click(function () {
                    return false;
                });

                var date = new Date();
                if (self.val != "") {
                    var arr = [
                            "y+",
                            "M+",
                            "d+",
                            "H+",
                            "m+",
                            "s+"
                        ];

                    var str = self.dateToFormatText(date, "yyyy-MM-dd HH:mm:ss");

                    var fmt = self.defaults.dateFormat;

                    for (var i = 0; i < arr.length; i++) {
                        if (new RegExp("(" + arr[i] + ")").test(fmt)) {
                            var m = fmt.match(RegExp.$1);
                            var s = self.val.substr(m.index, m[0].length);
                            if (arr[i] == "y+") {
                                var yStr = "2000";
                                var yNew = "";
                                if (s.length < 4) {
                                    yNew = yStr.substr(0, 4 - s.length) + s;
                                }
                                else {
                                    yNew = s;
                                }
                                date.setFullYear(parseInt(yNew));
                            }
                            else if (arr[i] == "M+") {
                                date.setMonth(parseInt(s) - 1);
                            }
                            else if (arr[i] == "d+") {
                                date.setDate(parseInt(s));
                            }
                            else if (arr[i] == "H+") {
                                date.setHours(parseInt(s));
                            }
                            else if (arr[i] == "m+") {
                                date.setMinutes(parseInt(s));
                            }
                            else if (arr[i] == "s+") {
                                date.setSeconds(parseInt(s));
                            }
                        }
                    }
                }

                self.displayDatePicker(date);
            }
        },

        displayDatePicker: function (date) {
            var self = this;
            self.date = date;

            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            var today = new Date(year + '-' + month + '-' + date.getDate());

            var monthDay = new Date(year + '-' + month + '-1');
            var monthWeek = monthDay.getDay();
            var nextMonthDay = self.dateAdd(new Date(monthDay), 1, 'm');

            var firstDate = self.dateAdd(new Date(monthDay), -monthWeek, 'd');

            var html = '';
            if (self.hasYear || self.hasMonth) {
                html += '<table cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size:16px;">';
                html += '<tr>';

                if (self.hasYear) {
                    html += '<td align="left">';
                    html += '<table cellspacing="0" cellpadding="0" border="0" style="width:112px">';
                    html += '<tr>';
                    html += '<td align="center" style="width:24px;"><a id="btnPrevYear" href="javascript:;" style="font-size:24px;">&laquo;</a></td>';
                    html += '<td align="center" ><a id="btnYear" href="javascript:;">' + year + '年</a></td>';
                    html += '<td align="center" style="width:24px;"><a id="btnNextYear" href="javascript:;" style="font-size:24px;">&raquo;</a></td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '</td>';
                }

                if (self.hasMonth) {
                    var month_w = self.defaults.colWidth + 48;
                    html += '<td align="right">';
                    html += '<table cellspacing="0" cellpadding="0" border="0" style="width:88px">';
                    html += '<tr>';
                    html += '<td align="center" style="width:24px;"><a id="btnPrevMonth" href="javascript:;" style="font-size:24px;">&laquo;</a></td>';
                    html += '<td align="center" ><a id="btnMonth" href="javascript:;">' + month + '月</a></td>';
                    html += '<td align="center" style="width:24px;"><a id="btnNextMonth" href="javascript:;" style="font-size:24px;">&raquo;</a></td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '</td>';
                }

                html += '</tr>';
                html += '</table>';
            }

            if (self.hasDay) {
                html += '<table cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f0f0f0;">';
                html += '<tr>';
                html += '<td style="width:' + self.defaults.colWidth + 'px">日</td>';
                html += '<td style="width:' + self.defaults.colWidth + 'px">一</td>';
                html += '<td style="width:' + self.defaults.colWidth + 'px">二</td>';
                html += '<td style="width:' + self.defaults.colWidth + 'px">三</td>';
                html += '<td style="width:' + self.defaults.colWidth + 'px">四</td>';
                html += '<td style="width:' + self.defaults.colWidth + 'px">五</td>';
                html += '<td style="width:' + self.defaults.colWidth + 'px">六</td>';
                html += '</tr>';
                html += '</table>';

                html += '<table id="tblDay" cellspacing="0" cellpadding="0" border="0" width="100%">';
                var n = 0;
                for (var i = 0; i < 6; i++) {
                    html += '<tr>';
                    for (var j = 0; j < 7; j++) {
                        var d = new Date(firstDate);
                        d = self.dateAdd(d, n, 'd');

                        var y = d.getFullYear();
                        var m = d.getMonth() + 1;
                        var day = d.getDate();
                        html += '<td xdval="' + y + '-' + m + '-' + day + '"';
                        
                        var days = new Date(y + '-' + m + '-' + day);
                        if (days.getTime() < monthDay.getTime() || days.getTime() >= nextMonthDay.getTime())
                            html += ' style="color:#999999;width:' + self.defaults.colWidth + 'px;" ';
                        else if (days.getTime() == today.getTime())
                            html += ' style="color:#CC0000; font-weight:bold; width:' + self.defaults.colWidth + 'px;" ';

                        html += '>' + day + '</td>';
                        n++;
                    }
                    html += '</tr>';
                }

                html += '</table>';
            }
            else {
                html += '<div style="text-align:left;">';
                html += '<table cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f0f0f0; padding-left:4px;">';
                html += '<tr><td>&nbsp;快速选择</td></tr>';
                html += '</table>';

                html += '<table id="tblQuick" cellspacing="0" cellpadding="0" border="0" width="100%" style="padding-left:4px;">';

                for (var i = 0; i < 6; i++) {
                    html += '<tr><td xdval="' + self.getQuickValue(i) + '">&nbsp;' + self.getQuickText(i) + '</td></tr>';
                }

                html += '</table>';
                html += '</div>';
            }

            if (self.hasTime) {
                html += '<table cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f0f0f0;">';
                html += '<tr>';

                var w = "";
                if (self.timeDivCount == 2) w = 'width:' + (self.defaults.width / 2) + 'px;';
                else if (self.timeDivCount == 3) w = 'width:' + (self.defaults.width / 3) + 'px;';

                var s = "";
                if (self.timeDivCount > 1) s = 'border-left:solid 1px #ffffff;';

                if (self.hasHour) {
                    html += '<td id="btnHour" style="' + w + '">' + hour + '时</td>';
                }

                if (self.hasMinute) {
                    html += '<td id="btnMinute" style="' + w + s + '">' + minute + '分</td>';
                }

                if (self.hasSecond) {
                    html += '<td id="btnSecond" style="' + w + s + '">' + second + '秒</td>';
                }

                html += '</tr>';
                html += '</table>';
            }

            html += '<table cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top:solid 1px #999999;">';
            html += '<tr style="height:' + self.defaults.lineHeight + 'px">';
            if (self.defaults.isClear) {
                var btnWidth = (self.defaults.width / 3);
                html += '<td id="btnClear" style="width:' + btnWidth + 'px;">清除</td>';
                html += '<td id="btnToday" style="width:' + btnWidth + 'px;border-left:solid 1px #999999;">现在</td>';
                html += '<td id="btnSure"  style="width:' + btnWidth + 'px;border-left:solid 1px #999999;">确定</td>';
            }
            else {
                var btnWidth = (self.defaults.width / 2);
                html += '<td id="btnToday" style="width:' + btnWidth + 'px;">现在</td>';
                html += '<td id="btnSure"  style="width:' + btnWidth + 'px;border-left:solid 1px #999999;">确定</td>';
            }
            html += '</tr>';
            html += '</table>';

            self.divInner.html(html);

            if (self.hasYear) {
                self.div.find("#btnPrevYear").click(function () {
                    var d = self.dateAdd(new Date(self.date), -1, 'y');
                    self.displayDatePicker(d);
                });

                self.div.find("#btnNextYear").click(function () {
                    var d = self.dateAdd(new Date(self.date), 1, 'y');
                    self.displayDatePicker(d);
                });

                self.div.find("#btnYear").click(function () {
                    self.mask.show();
                    self.dialogType = "year";

                    var width = self.defaults.colWidth * 3;
                    var height = self.defaults.lineHeight * 6 + 2;
                    var left = (self.defaults.pickerWidth - width) / 2;
                    var top = (self.defaults.pickerHeight - height) / 2;

                    self.divYear = $('<div style="position:absolute; left:' + left + 'px; top:' + top + 'px; width:' + width + 'px; height:' + height + 'px;  line-height:' + self.defaults.lineHeight + 'px;  background-color:#ffffff; border:solid 1px #999999;"></div>');
                    self.div.append(self.divYear);

                    self.displayYearPicker(year, year);
                });
            }

            if (self.hasMonth) {
                self.div.find("#btnPrevMonth").click(function () {
                    var d = self.dateAdd(new Date(self.date), -1, 'm');
                    self.displayDatePicker(d);
                });

                self.div.find("#btnNextMonth").click(function () {
                    var d = self.dateAdd(new Date(self.date), 1, 'm');
                    self.displayDatePicker(d);
                });

                self.div.find("#btnMonth").click(function () {
                    self.mask.show();
                    self.dialogType = "month";

                    var width = self.defaults.colWidth * 3;
                    var height = self.defaults.lineHeight * 6 + 2;
                    var left = (self.defaults.pickerWidth - width) / 2;
                    var top = (self.defaults.pickerHeight - height) / 2;

                    self.divMonth = $('<div style="position:absolute; left:' + left + 'px; top:' + top + 'px; width:' + width + 'px; height:' + height + 'px; line-height:' + self.defaults.lineHeight + 'px;  background-color:#ffffff; border:solid 1px #999999;"></div>');
                    self.div.append(self.divMonth);

                    self.displayMonthPicker(month);
                });
            }

            if (self.hasDay) {
                self.div.find("#tblDay").find("td").click(function () {
                    var d = new Date($(this).attr("xdval"));
                    self.date.setFullYear(d.getFullYear());
                    self.date.setMonth(d.getMonth());
                    self.date.setDate(d.getDate());
                    if (!self.hasTime) {
                        self.complete();
                        self.visible = false;
                    }
                    else {
                        self.displayDatePicker(self.date);
                    }
                });
            }
            else {
                self.div.find("#tblQuick").find("td").click(function () {
                    self.date = new Date($(this).attr("xdval"));
                    self.complete();
                    self.visible = false;
                });
            }

            if (self.hasHour) {
                self.div.find("#btnHour").click(function () {
                    self.mask.show();
                    self.dialogType = "hour";

                    var width = self.defaults.colWidth * 5;
                    var height = self.defaults.lineHeight * 6 + 2;
                    var left = (self.defaults.pickerWidth - width) / 2;
                    var top = (self.defaults.pickerHeight - height) / 2;

                    self.divHour = $('<div style="position:absolute; left:' + left + 'px; top:' + top + 'px; width:' + width + 'px; height:' + height + 'px; line-height:' + self.defaults.lineHeight + 'px; background-color:#ffffff; border:solid 1px #999999;"></div>');
                    self.div.append(self.divHour);

                    var hour = self.date.getHours();
                    self.displayHourPicker(hour);
                });
            }

            if (self.hasMinute) {
                self.div.find("#btnMinute").click(function () {
                    self.mask.show();
                    self.dialogType = "minute";

                    var width = self.defaults.colWidth + 2;
                    var height = self.defaults.lineHeight * 6 + 2;
                    var left = (self.defaults.pickerWidth - width * 3) / 2;
                    var top = (self.defaults.pickerHeight - height) / 2;

                    self.divMinute = $('<div style="position:absolute; left:' + left + 'px; top:' + top + 'px; width:' + width + 'px; height:' + height + 'px; line-height:' + self.defaults.lineHeight + 'px;background-color:#ffffff; border:solid 1px #999999;"></div>');
                    self.div.append(self.divMinute);

                    var widthA = width * 2;
                    var leftA = left + width + 2;
                    var heightA = self.defaults.lineHeight * 5 + 2;
                    var topA = (self.defaults.pickerHeight - heightA) / 2;

                    self.divMinuteA = $('<div style="position:absolute; left:' + leftA + 'px; top:' + topA + 'px; width:'+widthA+'px; height:' + heightA + 'px; line-height:' + self.defaults.lineHeight + 'px;background-color:#ffffff; border:solid 1px #999999;"></div>');
                    self.div.append(self.divMinuteA);

                    var minute = self.date.getMinutes();
                    self.displayMinutePicker(minute);
                });
            }

            if (self.hasSecond) {
                self.div.find("#btnSecond").click(function () {
                    self.mask.show();
                    self.dialogType = "second";

                    var width = self.defaults.colWidth + 2;
                    var height = self.defaults.lineHeight * 6 + 2;
                    var left = (self.defaults.pickerWidth - width * 3) / 2;
                    var top = (self.defaults.pickerHeight - height) / 2;

                    self.divSecond = $('<div style="position:absolute; left:' + left + 'px; top:' + top + 'px; width:' + width + 'px; height:' + height + 'px; line-height:' + self.defaults.lineHeight + 'px;background-color:#ffffff; border:solid 1px #999999;"></div>');
                    self.div.append(self.divSecond);

                    var widthA = width * 2;
                    var leftA = left + width + 2;
                    var heightA = self.defaults.lineHeight * 5 + 2;
                    var topA = (self.defaults.pickerHeight - heightA) / 2;

                    self.divSecondA = $('<div style="position:absolute; left:' + leftA + 'px; top:' + topA + 'px; width:' + widthA + 'px; height:' + heightA + 'px; line-height:' + self.defaults.lineHeight + 'px;background-color:#ffffff; border:solid 1px #999999;"></div>');
                    self.div.append(self.divSecondA);

                    var second = self.date.getSeconds();
                    self.displaySecondPicker(second);
                });
            }

            self.div.find("#btnClear").click(function () {
                self.src.val('');
                if (self.defaults.vueStore) self.defaults.vueStore[self.src.attr("name")] = self.src.val();
                self.div.remove();
                self.visible = false;
            });

            self.div.find("#btnToday").click(function () {
                self.date = new Date();
                self.complete();
                self.visible = false;
            });

            self.div.find("#btnSure").click(function () {
                self.complete();
                self.visible = false;
            });
        },

        complete: function () {
            var self = this;
            self.src.val(self.dateToFormatText(self.date, self.defaults.dateFormat));
            if (self.defaults.vueStore) self.defaults.vueStore[self.src.attr("name")] = self.src.val();
            self.div.remove();
        },

        getQuickValue: function (n) {
            var self = this;

            var d = new Date(self.date);
            if (self.hasSecond) {
                d.setSeconds(n * 10);
            }
            else if (self.hasMinute) {
                d.setMinutes(n * 10);
            }
            else if (self.hasHour) {
                d.setHours(d.getHours() - 3 + n);
            }
            else if (self.hasMonth) {
                d.setMonth(d.getMonth() - 3 + n);
            }
            else if (self.hasYear) {
                d.setFullYear(d.getFullYear() - 3 + n);
            }

            return self.dateToFormatText(d, "yyyy-MM-dd HH:mm:ss");
        },

        getQuickText: function (n) {
            var self = this;

            var d = new Date(self.date);
            if (self.hasSecond) {
                d.setSeconds(n * 10);
            }
            else if (self.hasMinute) {
                d.setMinutes(n * 10);
            }
            else if (self.hasHour) {
                d.setHours(d.getHours() - 3 + n);
            }
            else if (self.hasMonth) {
                d.setMonth(d.getMonth() - 3 + n);
            }
            else if (self.hasYear) {
                d.setFullYear(d.getFullYear() - 3 + n);
            }

            return self.dateToFormatText(d, self.defaults.dateFormat);
        },

        displayYearPicker: function (y1, year) {
            var self = this;

            var h = '<table id="tblYear" cellspacing="0" cellpadding="0" border="0" width="100%">';
            for (var i = 0; i < 5; i++) {
                var y = y1 + i;
                h += '<tr>';
                if (year == y - 5)
                    h += '<td align="center" style="width:'+ self.defaults.colWidth +'px;color:#CC0000; font-weight:bold;">' + (y - 5) + '</td>';
                else
                    h += '<td align="center" style="width:' + self.defaults.colWidth + 'px;">' + (y - 5) + '</td>';

                if(year == y)
                    h += '<td align="center" style="width:' + self.defaults.colWidth + 'px;color:#CC0000; font-weight:bold;">' + y + '</td>';
                else
                    h += '<td align="center" style="width:' + self.defaults.colWidth + 'px;">' + y + '</td>';

                h += '</tr>';
            }
            h += '</table>';

            h += '<table cellspacing="0" cellpadding="0" border="0" width="100%">';
            h += '<tr><td style="width:' + self.defaults.colWidth + 'px;"><a id="btnPrevYearPage" href="javascript:;" style="font-size:24px;">&laquo;</a></td><td style="width:' + self.defaults.colWidth + 'px;"><a id="btnNextYearPage" href="javascript:;" style="font-size:24px;">&raquo;</a></td></tr>';
            h += '</table>';

            self.divYear.html(h);

            self.divYear.find("#btnPrevYearPage").click(function () {
                self.displayYearPicker(y1 - 10, year);
            });

            self.divYear.find("#btnNextYearPage").click(function () {
                self.displayYearPicker(y1 + 10, year);
            });

            self.divYear.find("#tblYear").find("td").click(function () {
                self.mask.hide();
                self.divYear.remove();
                var y = parseInt($(this).html());
                self.date.setFullYear(y);
                self.displayDatePicker(self.date);
            });
        },

        displayMonthPicker: function (month) {
            var self = this;

            var h = '<table id="tblMonth" cellspacing="0" cellpadding="0" border="0" width="100%">';
            for (var i = 0; i < 6; i++) {
                h += '<tr style="height:' + self.defaults.lineHeight + 'px">';
                if( month == i + 1)
                    h += '<td align="center" style="width:' + self.defaults.colWidth + 'px;color:#CC0000; font-weight:bold;">' + (i + 1) + '</td>';
                else
                    h += '<td align="center" style="width:' + self.defaults.colWidth + 'px;">' + (i + 1) + '</td>';

                if(month == i + 7)
                    h += '<td align="center" style="width:' + self.defaults.colWidth + 'px;color:#CC0000; font-weight:bold;">' + (i + 7) + '</td>';
                else
                    h += '<td align="center" style="width:' + self.defaults.colWidth + 'px;">' + (i + 7) + '</td>';

                h += '</tr>';
            }
            h += '</table>';

            self.divMonth.html(h);

            self.divMonth.find("#tblMonth").find("td").click(function () {
                self.mask.hide();
                self.divMonth.remove();
                var m = parseInt($(this).html());
                self.date.setMonth(m - 1);
                self.displayDatePicker(self.date);
            });
        },

        displayHourPicker: function (hour) {
            var self = this;

            var h = '<table id="tblHour" cellspacing="0" cellpadding="0" border="0" width="100%">';
            for (var i = 0; i < 6; i++) {
                h += '<tr style="height:' + self.defaults.lineHeight + 'px">';
                if (hour == i)
                    h += '<td width="25%" style="color:#CC0000; font-weight:bold;">' + (i) + '</td>';
                else
                    h += '<td width="25%">' + (i) + '</td>';

                if (hour == i + 6)
                    h += '<td width="25%" style="color:#CC0000; font-weight:bold;">' + (i + 6) + '</td>';
                else
                    h += '<td width="25%">' + (i + 6) + '</td>';

                if (hour == i + 12)
                    h += '<td width="25%" style="color:#CC0000; font-weight:bold;">' + (i + 12) + '</td>';
                else
                    h += '<td width="25%">' + (i + 12) + '</td>';

                if (hour == i + 18)
                    h += '<td width="25%" style="color:#CC0000; font-weight:bold;">' + (i + 18) + '</td>';
                else
                    h += '<td width="25%">' + (i + 18) + '</td>';
                h += '</tr>';
            }
            h += '</table>';

            self.divHour.html(h);

            self.divHour.find("#tblHour").find("td").click(function () {
                self.mask.hide();
                self.divHour.remove();
                var hour = parseInt($(this).html());
                self.date.setHours(hour);
                self.div.find("#btnHour").html(hour + "时");
            });
        },

        displayMinutePicker: function (n) {
            var self = this;

            var n1 = Math.floor(n / 10) * 10;

            var h = '<table id="tblMinute" cellspacing="0" cellpadding="0" border="0" width="100%">';
            for (var i = 0; i < 6; i++) {
                if (n >= i * 10 && n < (i + 1) * 10) {
                    h += '<tr style="height:' + self.defaults.lineHeight + 'px"><td>' + (i * 10) + '</td></tr>';
                } else {
                    h += '<tr style="height:' + self.defaults.lineHeight + 'px"><td>' + (i * 10) + '</td></tr>';
                }
            }
            h += '</table>';

            self.divMinute.html(h);
            self.displayMinuteAPicker(n1, n);

            self.divMinute.find("#tblMinute").find("td").click(function () {
                var minute = parseInt($(this).html());
                self.displayMinuteAPicker(minute, n);
            });
        },

        displayMinuteAPicker: function (n1, n) {
            var self = this;

            var width = self.defaults.colWidth + 2;

            var h = '<table id="tblMinuteA" cellspacing="0" cellpadding="0" border="0" width="100%">';
            for (var i = 0 ; i < 5; i++) {
                h += '<tr style="height:' + self.defaults.lineHeight + 'px">';
                if (n == n1 + i)
                    h += '<td align="center" style="width:' + width + 'px;color:#CC0000; font-weight:bold;">' + (n1 + i) + '</td>';
                else
                    h += '<td align="center" style="width:' + width + 'px;">' + (n1 + i) + '</td>';

                if (n == n1 + i + 5)
                    h += '<td align="center" style="width:' + width + 'px;border-left:solid 1px #999999;color:#CC0000; font-weight:bold;">' + (n1 + i + 5) + '</td>';
                else
                    h += '<td align="center" style="width:' + width + 'px;border-left:solid 1px #999999;">' + (n1 + i + 5) + '</td>';

                h += '</tr>'
            }
            h += '</table>';

            self.divMinuteA.html(h);

            self.divMinuteA.find("#tblMinuteA").find("td").click(function () {
                self.mask.hide();
                self.divMinute.remove();
                self.divMinuteA.remove();
                var m = parseInt($(this).html());
                self.date.setMinutes(m);
                self.div.find("#btnMinute").html(m + "分");
            });
        },

        displaySecondPicker: function (n) {
            var self = this;

            var n1 = Math.floor(n / 10) * 10;

            var h = '<table id="tblSecond" cellspacing="0" cellpadding="0" border="0" width="100%">';
            for (var i = 0; i < 6; i++) {
                if (n >= i * 10 && n < (i + 1) * 10) {
                    h += '<tr style="height:' + self.defaults.lineHeight + 'px"><td>' + (i * 10) + '</td></tr>';
                } else {
                    h += '<tr style="height:' + self.defaults.lineHeight + 'px"><td>' + (i * 10) + '</td></tr>';
                }
            }
            h += '</table>';

            self.divSecond.html(h);
            self.displaySecondAPicker(n1, n);

            self.divSecond.find("#tblSecond").find("td").click(function () {
                var minute = parseInt($(this).html());
                self.displaySecondAPicker(minute, n);
            });
        },

        displaySecondAPicker: function (n1, n) {
            var self = this;

            var width = self.defaults.colWidth + 2;

            var h = '<table id="tblSecondA" cellspacing="0" cellpadding="0" border="0" width="100%">';
            for (var i = 0 ; i < 5; i++) {
                h += '<tr style="height:' + self.defaults.lineHeight + 'px">';
                if (n == n1 + i)
                    h += '<td align="center" style="width:' + width + 'px;color:#CC0000; font-weight:bold;">' + (n1 + i) + '</td>';
                else
                    h += '<td align="center" style="width:' + width + 'px;">' + (n1 + i) + '</td>';

                if (n == n1 + i + 5)
                    h += '<td align="center" style="width:' + width + 'px;border-left:solid 1px #999999;color:#CC0000; font-weight:bold;">' + (n1 + i + 5) + '</td>';
                else
                    h += '<td align="center" style="width:' + width + 'px;border-left:solid 1px #999999;">' + (n1 + i + 5) + '</td>';

                h += '</tr>'
            }
            h += '</table>';

            self.divSecondA.html(h);

            self.divSecondA.find("#tblSecondA").find("td").click(function () {
                self.mask.hide();
                self.divSecond.remove();
                self.divSecondA.remove();
                var m = parseInt($(this).html());
                self.date.setSeconds(m);
                self.div.find("#btnSecond").html(m + "秒");
            });
        },

        dateToFormatText: function (date, fmt) {
            if (date) {
                var o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "H+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds()
                };

                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }

                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }

                return fmt;
            }
            else
                return "";
        },

        dateAdd: function (date, number, interval) {
            var k = { 'y': 'FullYear', 'q': 'Month', 'm': 'Month', 'w': 'Date', 'd': 'Date', 'h': 'Hours', 'n': 'Minutes', 's': 'Seconds', 'ms': 'MilliSeconds' };
            var n = { 'q': 3, 'w': 7 };
            eval('date.set' + k[interval] + '(date.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')');
            return date;
        },

        dateDiff: function (date1, date2, interval) {
            var i = {}, t = date1.getTime(), t2 = date2.getTime();
            i['y'] = date2.getFullYear() - date1.getFullYear();
            i['q'] = i['y'] * 4 + Math.floor(date2.getMonth() / 4) - Math.floor(date1.getMonth() / 4);
            i['m'] = i['y'] * 12 + date2.getMonth() - date1.getMonth();
            i['ms'] = date2.getTime() - date1.getTime();
            i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
            i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
            i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
            i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
            i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
            return i[interval];
        }
    };

    $.fn.extend({ xdDatePicker: function (method, data) {

        var create = function (src, data) {
            if (src.tagName.toLowerCase() !== 'input') return;

            src = $(src);

            if (src.attr("type").toLowerCase() !== 'text') return;

            if (src.data("xddatepicker-control")) return;

            var myCtl = new XdDatePickerClass();
            myCtl.create(src, data);

            src.data("xddatepicker-control", myCtl);
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