/**
 * Created by admin on 3/30/16.
 */

var calendar = function () {
    var mouth = document.querySelector('.date-month'),
        date = new Date();
    var option = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    },
        week = {
        0: "Su",
        1: "Mo",
        2: "Tu",
        3: "We",
        4: "Th",
        5: "Fr",
        6: "Sa"
    };
    var monDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Detach an event or set of events from an element
    var remove = function (elem, types, handler, selector, mappedTypes) {
        var j,
            handleObj,
            tmp,
            origCount,
            t,
            events,
            special,
            handlers,
            type,
            namespaces,
            origType,
            elemData = jQuery.hasData(elem) && jQuery._data(elem);

        if (!elemData || !(events = elemData.events)) {
            return;
        }

        // Once for each type.namespace in types; type may be omitted
        types = (types || "").match(rnotwhite) || [""];
        t = types.length;
        while (t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();

            // Unbind all events (on this namespace, if provided) for the element
            if (!type) {
                for (type in events) {
                    jQuery.event.remove(elem, type + types[t], handler, selector, true);
                }
                continue;
            }

            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

            // Remove matching events
            origCount = j = handlers.length;
            while (j--) {
                handleObj = handlers[j];

                if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                    handlers.splice(j, 1);

                    if (handleObj.selector) {
                        handlers.delegateCount--;
                    }
                    if (special.remove) {
                        special.remove.call(elem, handleObj);
                    }
                }
            }

            // Remove generic event handler if we removed something and no more handlers exist
            // (avoids potential for endless recursion during removal of special event handlers)
            if (origCount && !handlers.length) {
                if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                    jQuery.removeEvent(elem, type, elemData.handle);
                }

                delete events[type];
            }
        }

        // Remove the expando if it's no longer used
        if (jQuery.isEmptyObject(events)) {
            delete elemData.handle;

            // removeData also checks for emptiness and clears the expando if empty
            // so use it instead of delete
            jQuery._removeData(elem, "events");
        }
    };

    //若是一月份,则年份减一,否则返回本年份;
    var convertYear = function (argument, year, index) {
        //index=-1,表示执行'<'操作
        if (index === -1) {
            if (argument === 0) {
                year = year - 1;
                return year;
            }
            return year;
        }
        if (index === 1) {
            if (argument === 11) {
                return ++year;
            }
            return year;
        }
    };

    var convertMonth = function (argument, index) {
        //index=0,表示正常加载当前日历
        if (index === 0) {
            var key = date.getMonth();
            return option[key];
        }
        //index=-1,表示向前一个月
        if (index === -1) {
            if (argument === 0 && typeof argument === "number") {
                return option[11];
            }
            if (argument != "" && typeof argument === "number") {
                return option[--argument];
            }
        }
        //index=1,表示向后一个月
        if (index === 1) {
            if (argument === 11 && typeof argument === "number") {
                return option[0];
            }
            if (argument != "" && typeof argument === "number") {
                return option[++argument];
            }
        }
    };

    //判断给定月份的上一个月天数
    var convertMonthDays = function (argument) {
        if (argument === 0) {
            return monDays[11];
        } else {
            return monDays[argument - 1];
        }
    };

    var convertWeek = function (argument) {
        if (!argument && typeof argument === "number") {
            return week[argument];
        } else {
            var today = date.getDay();
            return week[today];
        }
    };

    var convertNum = function (argument) {
        for (var key = 0; key < Object.keys(option).length; key++) {
            if (option[key] === argument) return key;
        }
    };

    //为每月的第一天找到日历中的坐标
    var findPostion = function (argument, month) {
        //找到给定日期在日历中的坐标
        var firstLine = document.querySelector('.row3');
        var moreLine = document.querySelectorAll('tr');

        for (var index = 1; index < 7; index++) {
            for (var key = 0; key < 7; key++) {
                var td = document.createElement('td');
                moreLine[index].appendChild(td); //为每一行添加七个td
            }

            var tds = moreLine[index].querySelectorAll('td');
            for (var selector = 0; selector < tds.length; selector++) {
                if (selector >= 7) {
                    tds[selector].remove();
                }
            }
        }
        if (typeof month === "number") {
            if (month === -1) {
                month = 11;
            }
            var numDay = monDays[month]; //给定月份的天数
            var preNumday = convertMonthDays(month); //给定月份前一个月的天数
            var day = 1;
            var num = 1;
            var col = 8 - argument; //第一周的星期天
            var firstLineCol = firstLine.getElementsByTagName('td');

            //日历头一行
            if (argument < 7) {
                firstLineCol[argument].innerText = day;
            }
            for (var m = argument - 1; m >= 0; m--) {
                firstLineCol[m].innerText = preNumday--;
            }
            for (var i = argument; i < 7; i++) {
                firstLineCol[argument++].innerText = day++;
            }

            //日历中间行
            for (var j = 2; j < 7; j++) {
                var currentLineCol = moreLine[j].getElementsByTagName('td');
                for (var jj = 0; jj < 7; jj++) {
                    if (col <= numDay) {
                        currentLineCol[jj].innerText = col++;
                    } else {
                        currentLineCol[jj].innerText = num++;
                    }
                }
            }
        }
    };

    //构建一个3*4的矩阵,存放12个月
    var matrix = function () {
        var parentNode = document.querySelector('.row9');
        var str = '<div class="month-row1"><span class="month col1">{0}</span><span class="month col2">{1}</span><span class="month col3">{2}</span><span class="month col4">{3}</span></div>' + '<div class="month-row2"><span class="month col1">{4}</span><span class="month col2">{5}</span><span class="month col3">{6}</span><span class="month col4">{7}</span></div>' + '<div class="month-row3"><span class="month col1">{8}</span><span class="month col2">{9}</span><span class="month col3">{10}</span><span class="month col4">{11}</span></div>';

        var append = function () {
            return this.domManip(arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        };

        if (!String.format) {
            String.format = function (format) {
                var args = Array.prototype.slice.call(arguments, 1);
                return format.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined' ? args[number] : match;
                });
            };
        }
        var childNode = String.format(str, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
        //parentNode.appendChild(childNode);
        parentNode.insertAdjacentHTML('beforeend', childNode);
    };

    mouth.textContent = convertMonth(getMouth, 0) + " " + date.getFullYear();
    var dateArray = mouth.textContent.split(' '),
        getMouth = convertNum(dateArray[0]),
        getYear = dateArray[1];

    var firstDate = new Date(getYear, getMouth),
        firstWeek = firstDate.getDay();
    //WeekDay = convertWeek(firstWeek);   //将每月的第一天转化为周几
    findPostion(firstWeek, getMouth);

    return {
        searchPreMonth: function () {
            var array = mouth.textContent.split(' '),
                currentMouth = convertNum(array[0]),
                getYear = array[1],
                preMouth = currentMouth - 1,
                currentYear = array[1];

            var secondDate = new Date(currentYear, preMouth),
                preFirstweek = secondDate.getDay();
            mouth.textContent = convertMonth(currentMouth, -1) + " " + convertYear(currentMouth, getYear, -1); //点击'<'之后,日历框第一行的值
            findPostion(preFirstweek, preMouth);
        },
        searchNextMonth: function () {
            var array = mouth.textContent.split(' '),
                currentMouth = convertNum(array[0]),
                getYear = array[1],
                nextMouth = currentMouth + 1,
                currentYear = array[1];

            var secondDate = new Date(currentYear, nextMouth),
                preFirstweek = secondDate.getDay();
            mouth.textContent = convertMonth(currentMouth, 1) + " " + convertYear(currentMouth, getYear, 1); //点击'>'之后,日历框第一行的值
            findPostion(preFirstweek, nextMouth);
        },
        listMonth: function (element) {
            var table = document.querySelector('table');
            var tbody = document.querySelector('.table tbody');

            tbody.style.display = "none";
            //element.style.

            var row9 = document.createElement('tr');
            row9.className = "row9";
            table.appendChild(row9);
            matrix();
        },
        listYear: function (element) {}
    };
}();

//点击'<'触发的事件
var prevTarget = document.querySelector('.prev');
prevTarget.addEventListener("click", function () {
    calendar.searchPreMonth();
});

//点击'>'触发的事件
var nextTarget = document.querySelector('.next');
nextTarget.addEventListener("click", function () {
    calendar.searchNextMonth();
});

//点击中间日期触发事件
var dateTarget = document.querySelector('.date-month');
dateTarget.addEventListener("click", function (element) {
    calendar.listYear(element);
    calendar.listMonth(element);

    //鼠标移入移出事件
    var mousetarget = document.querySelectorAll('span.month');
    Array.from(mousetarget).forEach(function (element) {
        element.addEventListener('mouseover', function (event) {
            event.target.style.color = 'blue';
        });
        element.addEventListener('mouseout', function (event) {
            event.target.style.color = 'black';
        });
    });
});
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map