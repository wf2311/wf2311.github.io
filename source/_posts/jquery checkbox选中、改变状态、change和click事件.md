id: 34861580000825344
title: jquery checkbox选中、改变状态、change和click事件
date: 2017-05-25 10:55:13
categories: 前端
tags: [jquery,笔记]
type: 3
---------
[原文](http://www.cnblogs.com/zqifa/p/jquery-checkbox-1.html)

* jquery判断checked的三种方法:
```js
    .attr('checked'); //看版本1.6+返回:”checked”或”undefined” ;1.5-返回:true或false
    .prop('checked'); //1.6+:true/false
    .is(':checked'); //所有版本:true/false//别忘记冒号哦
```

* jquery赋值checked的几种写法:
```js
    //所有的jquery版本都可以这样赋值:
    $("#cb1").attr("checked", "checked");
    $("#cb1").attr("checked", true);
    //jquery1.6+:prop的4种赋值:
    $("#cb1").prop("checked", true);
    $("#cb1").prop({checked: true});
    $("#cb1").prop("checked", function () {
        return true;//函数返回true或false
    });

    //记得还有这种哦:
    $("#cb1″).prop("checked","checked");
```

* checkbox click和change事件
```js
    //方法1:
    $("#ischange").change(function () {
        alert("checked");
    });

    //方法2:
    $(function () {
        if ($.browser.msie) {
            $('input:checkbox').click(function () {
                this.blur();
                this.focus();
            });
        }
    });

    //方法3：
    $("#ischange").change(function () {
        alert("checked");
    });

    //方法4:
    $(function () {
        if ($.browser.msie) {
            $('input:checkbox').click(function () {
                this.blur();
                this.focus();
            });
        }
    });

    //方法5:
    $(document).ready(function () {
        $("testCheckbox").change(function () {
            alert("Option changed!");
        });
    });
```

