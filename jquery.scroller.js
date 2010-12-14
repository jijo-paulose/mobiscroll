﻿/*!
 * jQuery MobiScroll v1.0beta
 * http://code.google.com/p/mobiscroll/
 *
 * Copyright 2010, Acid Media
 * Licensed under the MIT license.
 *
 */
(function ($) {

    function Scroller(elm, dw, settings) {
        var that = this;
        var elm = elm;
        var dw = dw;
        var yOrd;
        var mOrd;
        var dOrd;

        this.settings = settings;
        this.values = null;
        this.val = null;
        // Temporary values
        this.temp = null;

        this.setValue = function (input) {
            if (input == undefined) input = true;
            var v = this.formatResult();
            this.val = v;
            this.values = this.temp.slice(0);
            if (input && $(elm).is('input')) $(elm).val(v).change();
        }

        this.getDate = function () {
            var d = this.values;
            var s = this.settings;
            if (s.preset == 'date')
                return new Date(d[yOrd], d[mOrd], d[dOrd]);
            if (s.preset == 'time') {
                var hour = (s.ampm && d[s.seconds ? 3 : 2] == 'PM' && (d[0] - 0) < 12) ? (d[0] - 0 + 12) : d[0];
                return new Date(1970, 0, 1, hour, d[1], s.seconds ? d[2] : null);
            }
            if (s.preset == 'datetime') {
                var hour = (s.ampm && d[s.seconds ? 6 : 5] == 'PM' && (d[3] - 0) < 12) ? (d[3] - 0 + 12) : d[3];
                return new Date(d[yOrd], d[mOrd], d[dOrd], hour, d[4], s.seconds ? d[5] : null);
            }
        }

        this.setDate = function (d, input) {
            var s = this.settings;
            if (s.preset.match(/date/i)) {
                this.temp[yOrd] = d.getFullYear();
                this.temp[mOrd] = d.getMonth();
                this.temp[dOrd] = d.getDate();
            }
            if (s.preset == 'time') {
                var hour = d.getHours();
                this.temp[0] = (s.ampm) ? (hour > 12 ? (hour - 12) : (hour == 0 ? 12 : hour)) : hour;
                this.temp[1] = d.getMinutes();
                if (s.seconds) this.temp[2] = d.getSeconds();
                if (s.ampm) this.temp[s.seconds ? 3 : 2] = hour > 11 ? 'PM' : 'AM';
            }
            if (s.preset == 'datetime') {
                var hour = d.getHours();
                this.temp[3] = (s.ampm) ? (hour > 12 ? (hour - 12) : (hour == 0 ? 12 : hour)) : hour;
                this.temp[4] = d.getMinutes();
                if (s.seconds) this.temp[2] = d.getSeconds();
                if (s.ampm) this.temp[s.seconds ? 6 : 5] = hour > 11 ? 'PM' : 'AM';
            }
            this.setValue(input);
        }

        this.parseValue = function (val) {
            var s = this.settings;
            if (this.preset) {
                var result = [];
                if (s.preset == 'date') {
                    try { var d = methods.parseDate(s.dateFormat, val, s); } catch (e) { var d = new Date(); };
                    result[yOrd] = d.getFullYear();
                    result[mOrd] = d.getMonth();
                    result[dOrd] = d.getDate();
                }
                else if (s.preset == 'time') {
                    try { var d = methods.parseDate(s.timeFormat, val, s); } catch (e) { var d = new Date(); };
                    var hour = d.getHours();
                    result[0] = (s.ampm) ? (hour > 12 ? (hour - 12) : (hour == 0 ? 12 : hour)) : hour;
                    result[1] = d.getMinutes();
                    if (s.seconds) result[2] = d.getSeconds();
                    if (s.ampm) result[s.seconds ? 3 : 2] = hour > 11 ? 'PM' : 'AM';
                }
                else if (s.preset == 'datetime') {
                    try { var d = methods.parseDate(s.dateFormat + ' ' + s.timeFormat, val, s); } catch (e) { var d = new Date(); };
                    var hour = d.getHours();
                    result[yOrd] = d.getFullYear();
                    result[mOrd] = d.getMonth();
                    result[dOrd] = d.getDate();
                    result[3] = (s.ampm) ? (hour > 12 ? (hour - 12) : (hour == 0 ? 12 : hour)) : hour;
                    result[4] = d.getMinutes();
                    if (s.seconds) result[5] = d.getSeconds();
                    if (s.ampm) result[s.seconds ? 6 : 5] = hour > 11 ? 'PM' : 'AM';
                }
                return result;
            }
            return methods.parseValue(val);
        }

        this.formatResult = function () {
            var s = this.settings;
            var d = this.temp;
            if (this.preset) {
                if (s.preset == 'date') {
                    return methods.formatDate(s.dateFormat, new Date(d[yOrd], d[mOrd], d[dOrd]), s);
                }
                else if (s.preset == 'datetime') {
                    var hour = (s.ampm && d[s.seconds ? 6 : 5] == 'PM' && (d[3] - 0) < 12) ? (d[3] - 0 + 12) : d[3];
                    return methods.formatDate(s.dateFormat + ' ' + s.timeFormat, new Date(d[yOrd], d[mOrd], d[dOrd], hour, d[4], s.seconds ? d[5] : null), s);
                }
                else if (s.preset == 'time') {
                    var hour = (s.ampm && d[s.seconds ? 3 : 2] == 'PM' && (d[0] - 0) < 12) ? (d[0] - 0 + 12) : d[0];
                    return methods.formatDate(s.timeFormat, new Date(1970, 0, 1, hour, d[1], s.seconds ? d[2] : null), s);
                }
            }
            return methods.formatResult(d);
        }

        this.validate = function(i) {
            var s = this.settings;
            // If target is month, show/hide days
            if (this.preset && s.preset.match(/date/i) && ((i == yOrd) || (i == mOrd))) {
                var days = 32 - new Date(this.temp[yOrd], this.temp[mOrd], 32).getDate() - 1;
                var day = $('ul:eq(' + dOrd + ')', dw);
                $('li', day).show();
                $('li:gt(' + days + ')', day).hide();
                if (this.temp[dOrd] > days) {
                    if (s.fx) {
                        day.animate({ 'margin-top': (h * (m - days - 1)) + 'px' }, 'fast');
                    }
                    else {
                        day.css({ marginTop: (h * (m - days - 1)) });
                    }
                    this.temp[dOrd] = $('li:eq(' + days + ')', day).data('val');
                }
            }
            else {
                methods.validate(i);
            }
        }

        this.hide = function () {
            $(':input:not(.dwtd)').attr('disabled', '').removeClass('dwtd');
            dw.hide();
            dwo.hide();
            if (this.preset) this.settings.wheels = null;
        }

        this.show = function () {
            var s = this.settings;
            // Set global wheel element height
            h = s.height;
            m = Math.round(s.rows / 2);

            inst = this;

            this.init();

            if (this.preset) {
                // Create preset wheels
                s.wheels = new Array();
                if (s.preset.match(/date/i)) {
                    var w = {};
                    for (var k = 0; k < 3; k++) {
                        if (k == yOrd) {
                            w[s.yearText] = {};
                            for (var i = s.startYear; i <= s.endYear; i++)
                                w[s.yearText][i] = i.toString().substr(2, 2);
                        }
                        else if (k == mOrd) {
                            w[s.monthText] = {};
                            for (var i = 0; i < 12; i++)
                                w[s.monthText][i] = (i < 9) ? ('0' + (i + 1)) : (i + 1);
                        }
                        else if (k == dOrd) {
                            w[s.dayText] = {};
                            for (var i = 1; i < 32; i++)
                                w[s.dayText][i] = (i < 10) ? ('0' + i) : i;
                        }
                    }
                    s.wheels.push(w);
                }
                if (s.preset.match(/time/i)) {
                    var w = {};
                    w[s.hourText] = {};
                    for (var i = 1; i < (s.ampm ? 13 : 24); i++)
                        w[s.hourText][i] = (i < 10) ? ('0' + i) : i;
                    w[s.minuteText] = {};
                    for (var i = 0; i < 60; i++)
                        w[s.minuteText][i] = (i < 10) ? ('0' + i) : i;
                    if (s.seconds) {
                        w[s.secText] = {};
                        for (var i = 0; i < 60; i++)
                            w[s.secText][i] = (i < 10) ? ('0' + i) : i;
                    }
                    if (s.ampm) {
                        w[s.ampmText] = {};
                        w[s.ampmText]['AM'] = 'AM';
                        w[s.ampmText]['PM'] = 'PM';
                    }
                    s.wheels.push(w);
                }
            }

            // Create wheels containers
            $('.dwc', dw).remove();
            for (var i = 0; i < s.wheels.length; i++) {
                var dwc = $('<span class="dwc"><span class="dwlc"></span><span class="dwwc"><span class="dws"></span></span></span>').insertBefore($('.dwbc', dw));
                // Create wheels
                for (var label in s.wheels[i]) {
                    var to1 = $('.dwwc .dws', dwc);
                    var to2 = $('.dwlc', dwc);
                    var w = $('<span class="dww"><ul></ul><span class="dwwo"></span></span>').insertBefore(to1);
                    $('<span class="dwl">' + label + '</span>').appendTo(to2);
                    // Create wheel values
                    for (var j in s.wheels[i][label]) {
                        $('<li class="val_' + j + '">' + s.wheels[i][label][j] + '</li>').data('val', j).appendTo($('ul', w));
                    }
                }
            }

            // Set scrollers to position
            $('.dww ul', dw).each(function(i) {
                var x = $('li', this).index($('li.val_' + that.temp[i], this));
                var val = h * (m - (x < 0 ? 0 : x) - 1);
                $(this).css('margin-top', val);
            });
            // Set value text
            $('.dwv', dw).html(this.formatResult());

            // Set sizes
            $('.dww, .dwl', dw).width(s.width);
            $('.dww, .dwwc', dw).height(s.rows * h);
            $('.dwbc a', dw).attr('class', s.btnClass);
            $('.dww li', dw).css({
                height: h,
                lineHeight: h + 'px'
            });
            $('.dws', dw).css({
                height: h,
                marginTop: (m - 1) * h - 3
            });

            // Init buttons
            $('#dw_set', dw).text(s.setText).unbind().click(function () {
                that.setValue();
                s.onSelect(that.val, inst);
                s.onClose(that.val, inst);
                that.hide();
                return false;
            });

            $('#dw_cancel', dw).text(s.cancelText).unbind().click(function () {
                that.settings.onClose(that.val, inst);
                that.hide();
                return false;
            });

            // Disable inputs to prevent bleed through (Android bug)
            $(':input:disabled').addClass('dwtd');
            $(':input').attr('disabled', 'disabled');
            // Show
            dwo.show();
            dw.show();
        }

        this.init = function() {
            var s = this.settings;
            // Set year-month-day order
            var ty = s.dateOrder.search(/y/i);
            var tm = s.dateOrder.search(/m/i);
            var td = s.dateOrder.search(/d/i);
            yOrd = (ty < tm) ? (ty < td ? 0 : 1) : (ty < td ? 1 : 2);
            mOrd = (tm < ty) ? (tm < td ? 0 : 1) : (tm < td ? 1 : 2);
            dOrd = (td < ty) ? (td < tm ? 0 : 1) : (td < tm ? 1 : 2);
            this.preset = (s.wheels === null);
            // Set values
            if (this.values !== null) {
                // Clone values array
                this.temp = this.values.slice(0);
            }
            else {
                this.temp = this.parseValue($(elm).val() ? $(elm).val() : '');
                this.setValue(false);
            }
        }

        this.init();

        // Set element readonly, save original state
        $(elm).is('input') ? $(elm).data('readonly', $(elm).attr('readonly')).attr('readonly', 'readonly') : false;

        // Init show datewheel
        $(elm).addClass('scroller').unbind('focus.dw').bind('focus.dw', function () {
            if (!that.settings.disabled && that.settings.showOnFocus) {
                that.settings.beforeShow(elm, inst);
                that.show();
            }
        });
    }

    var dw;
    var dwo;
    var h;
    var m;
    var inst; // Current instance
    var scrollers = {}; // Scroller instances
    var date = new Date();
    var uuid = date.getTime();
    var move = false;
    var target = null;
    var start;
    var stop;
    var pos;
    var touch = ('ontouchstart' in window);
    var START_EVENT = touch ? 'touchstart' : 'mousedown';
    var MOVE_EVENT = touch ? 'touchmove' : 'mousemove';
    var END_EVENT = touch ? 'touchend' : 'mouseup';

    var defaults = {
        // Options
        width: 70,
        height: 40,
        rows: 3,
        cols: 3,
        fx: false,
        disabled: false,
        showOnFocus: true,
        wheels: null,
        preset: 'date',
        dateFormat: 'mm/dd/yy',
        dateOrder: 'mdy',
        ampm: true,
        seconds: false,
        timeFormat: 'hh:ii A',
        startYear: date.getFullYear() - 10,
        endYear: date.getFullYear() + 10,
        monthNames: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        shortYearCutoff: '+10',
        monthText: 'Month',
        dayText: 'Day',
        yearText: 'Year',
        hourText: 'Hours',
        minuteText: 'Minutes',
        secText: 'Seconds',
        ampmText: '',
        setText: 'Set',
        cancelText: 'Cancel',
        btnClass: 'dwb',
        // Events
        beforeShow: function() {},
        onClose: function() {},
        onSelect: function() {}
    };

    var methods = {
        init: function (options) {
            var settings = $.extend({}, defaults, options);

            if ($('.dwo').length) {
                dwo = $('.dwo');
                dw = $('.dw');
            }
            else {
                // Create html
                dwo = $('<div class="dwo"></div>').hide().appendTo('body');
                dw = $('<div class="dw" style="text-align:center;">' +
                    '<div class="dwv">&nbsp;</div>' +
                    '<div class="dwbc">' +
                        '<a id="dw_set" href="#"></a>' +
                        '<a id="dw_cancel" href="#"></a>' +
                    '</div>' +
                '</div>');

                dw.hide().appendTo('body');

                $(document).bind(MOVE_EVENT, function (e) {
                    if (move) {
                        stop = touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
                        target.css('margin-top', (pos + stop - start) + 'px');
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                });

                $(document).bind(END_EVENT, function (e) {
                    if (move) {
                        var val = Math.round((pos + stop - start) / h) * h;
                        val = val > ((m - 1) * h) ? ((m - 1) * h) : val;
                        val = val < (m * h - $('li:visible', target).length * h) ? (m * h - $('li:visible', target).length * h) : val;
                        if (inst.settings.fx) {
                            target.stop(true, true).animate({ 'margin-top': val + 'px' }, 'fast');
                        }
                        else {
                            target.css({ marginTop: val });
                        }
                        var i = $('ul', dw).index(target);
                        // Set selected scroller value
                        inst.temp[i] = $('li:eq(' + (m - 1 - val / h) + ')', target).data('val');
                        // Validate
                        inst.validate(i);
                        // Set value text
                        $('.dwv', dw).html(inst.formatResult());
                        move = false;
                        target = null;
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });

                $('.dwwc').live(START_EVENT, function (e) {
                    var x1 = touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
                    var x2 = $(this).offset().left;
                    var width = $('.dww', this).outerWidth(true);/*inst.settings.width + 5;*/
                    var i = 0;
                    while (((x1 - x2) > ((i + 1) * width)) && (i < (inst.settings.cols - 1))) i++;
                    move = true;
                    target = $('ul:visible:eq(' + i + ')', this);
                    pos = target.css('margin-top').replace(/px/i, '') - 0;
                    start = touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
                    e.preventDefault();
                    e.stopPropagation();
                });
            }

            return this.each(function () {
                if (!this.id) {
                    uuid += 1;
                    this.id = 'scoller' + uuid;
                }
                scrollers[this.id] = new Scroller(this, dw, settings);
            });
        },
        setDefaults: function(o) {
            $.extend(defaults, options);
        },
        formatDate: function (format, date, settings) {
            if (!date) return null;
            var s = $.extend({}, defaults, settings);
            // Check whether a format character is doubled
            var look = function(m) {
                var n = 0;
                while (i + 1 < format.length && format.charAt(i + 1) == m) { n++; i++; };
                return n;
            };
            // Format a number, with leading zero if necessary
            var f1 = function(m, val, len) {
                var n = '' + val;
                if (look(m))
                    while (n.length < len)
                        n = '0' + n;
                return n;
            };
            // Format a name, short or long as requested
            var f2 = function(m, val, s, l) {
                return (look(m) ? l[val] : s[val]);
            };
            var output = '';
            var literal = false;
            for (var i = 0; i < format.length; i++) {
                if (literal)
                    if (format.charAt(i) == "'" && !look("'"))
                        literal = false;
                    else
                        output += format.charAt(i);
                else
                    switch (format.charAt(i)) {
                        case 'd':
                            output += f1('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += f2('D', date.getDay(), s.dayNamesShort, s.dayNames);
                            break;
                        case 'o':
                            output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                            break;
                        case 'm':
                            output += f1('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += f2('M', date.getMonth(), s.monthNamesShort, s.monthNames);
                            break;
                        case 'y':
                            output += (look('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                            break;
                        case 'h':
                            var h = date.getHours();
                            output += f1('h', (h > 12 ? (h - 12) : (h == 0 ? 12 : h)), 2);
                            break;
                        case 'H':
                            output += f1('H', date.getHours(), 2);
                            break;
                        case 'i':
                            output += f1('i', date.getMinutes(), 2);
                            break;
                        case 's':
                            output += f1('s', date.getSeconds(), 2);
                            break;
                        case 'a':
                            output += date.getHours() > 11 ? 'pm' : 'am';
                            break;
                        case 'A':
                            output += date.getHours() > 11 ? 'PM' : 'AM';
                            break;
                        case "'":
                            if (look("'"))
                                output += "'";
                            else
                                literal = true;
                            break;
                        default:
                            output += format.charAt(i);
                    }
            }
            return output;
        },
        parseDate: function (format, value, settings) {
            var def = new Date();
            if (!format || !value) return def;
            value = (typeof value == 'object' ? value.toString() : value + '');
            var s = $.extend({}, defaults, settings);
            var year = def.getFullYear();
            var month = def.getMonth();
            var day = def.getDate();
            var doy = -1;
            var hours = def.getHours();
            var minutes = def.getMinutes();
            var seconds = def.getSeconds();
            var ampm = 0;
            var literal = false;
            // Check whether a format character is doubled
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            // Extract a number from the string value
            var getNumber = function(match) {
                lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 :
                    (match == 'y' ? 4 : (match == 'o' ? 3 : 2))));
                var digits = new RegExp('^\\d{1,' + size + '}');
                var num = value.substring(iValue).match(digits);
                if (!num)
                    throw 'Missing number at position ' + iValue;
                iValue += num[0].length;
                return parseInt(num[0], 10);
            };
            // Extract a name from the string value and convert to an index
            var getName = function(match, s, l) {
                var names = (lookAhead(match) ? l : s);
                for (var i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
                        iValue += names[i].length;
                        return i + 1;
                    }
                }
                throw 'Unknown name at position ' + iValue;
            };
            // Confirm that a literal character matches the string value
            var checkLiteral = function() {
                if (value.charAt(iValue) != format.charAt(iFormat))
                    throw 'Unexpected literal at position ' + iValue;
                iValue++;
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        checkLiteral();
                else
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            day = getNumber('d');
                            break;
                        case 'D':
                            getName('D', s.dayNamesShort, s.dayNames);
                            break;
                        case 'o':
                            doy = getNumber('o');
                            break;
                        case 'm':
                            month = getNumber('m');
                            break;
                        case 'M':
                            month = getName('M', s.monthNamesShort, s.monthNames);
                            break;
                        case 'y':
                            year = getNumber('y');
                            break;
                        case 'H':
                            hours = getNumber('H');
                            break;
                        case 'h':
                            hours = getNumber('h');
                            break;
                        case 'i':
                            minutes = getNumber('i');
                            break;
                        case 's':
                            seconds = getNumber('s');
                            break;
                        case 'a':
                            ampm = getName('a', ['am', 'pm'], ['am', 'pm']) - 1;
                            break;
                        case 'A':
                            ampm = getName('A', ['am', 'pm'], ['am', 'pm']) - 1;
                            break;
                        case "'":
                            if (lookAhead("'"))
                                checkLiteral();
                            else
                                literal = true;
                            break;
                        default:
                            checkLiteral();
                    }
            }
            if (year < 100)
                year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                    (year <= s.shortYearCutoff ? 0 : -100);
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = 32 - new Date(year, month - 1, 32).getDate();
                    if (day <= dim)
                        break;
                    month++;
                    day -= dim;
                } while (true);
            }
            if (ampm && hours < 12) hours += 12;
            var date = new Date(year, month - 1, day, hours, minutes, seconds);
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
                throw 'Invalid date'; // E.g. 31/02/*
            return date;
        },
        formatResult: function(d) {
            var out = '';
            for (var i = 0; i < d.length; i++) {
                out += (i > 0 ? ' ' : '') + d[i];
            }
            return out;
        },
        parseValue: function(val) {
            return val.split(' ');
        },
        validate: function() { },
        enable: function() {
            return this.each(function () {
                if (scrollers[this.id]) scrollers[this.id].settings.disabled = false;
            });
        },
        disable: function() {
            return this.each(function () {
                if (scrollers[this.id]) scrollers[this.id].settings.disabled = true;
            });
        },
        isDisabled: function() {
            if (scrollers[this[0].id])
                return scrollers[this[0].id].settings.disabled;
        },
        option: function(option, value) {
            return this.each(function () {
                if (scrollers[this.id]) {
                    if (typeof option === 'object')
                        $.extend(scrollers[this.id].settings, option);
                    else
                        scrollers[this.id].settings[option] = value;
                    scrollers[this.id].init();
                }
            });
        },
        setValue: function(d, input) {
            if (input == undefined) input = false;
            return this.each(function () {
                if (scrollers[this.id]) {
                    scrollers[this.id].temp = d;
                    scrollers[this.id].setValue(d, input);
                }
            });
        },
        getValue: function() {
            if (scrollers[this[0].id])
                return scrollers[this[0].id].values;
        },
        setDate: function(d, input) {
            if (input == undefined) input = false;
            return this.each(function () {
                if (scrollers[this.id]) {
                    scrollers[this.id].setDate(d, input);
                }
            });
        },
        getDate: function() {
            if (scrollers[this[0].id])
                return scrollers[this[0].id].getDate();
        },
        show: function() {
            if (scrollers[this[0].id])
                return scrollers[this[0].id].show();
        },
        hide: function() {
            return this.each(function () {
                if (scrollers[this.id])
                    scrollers[this.id].hide();
            });
        },
        destroy: function() {
            return this.each(function () {
                if (scrollers[this.id]) {
                    $(this).unbind('focus.dw').removeClass('scroller');
                    $(this).is('input') ? $(this).attr('readonly', $(this).data('readonly')) : false;
                    delete scrollers[this.id];
                }
            });
        }
    };

    $.fn.scroller = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Unknown method');
        }
    }

})(jQuery);
