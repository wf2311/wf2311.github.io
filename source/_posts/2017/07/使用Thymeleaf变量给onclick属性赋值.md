id: 201707150947
title: 使用Thymeleaf变量给onclick属性赋值
date: 2017-07-15 09:47:13
categories: Java Web
tags: [Thymeleaf,笔记]
type: 4
---------
在使用thymeleaf渲染页面时，遇到如下情况：
```html
<button onclick="submit('publish');">提交</button>
```
`submit`函数的参数会根据后端参数的不同而动态改变，Google搜索到了一些类似问题，记录一下解决方法。

已经测试可用的：
```html
th:onclick="'alert(\'' + ${myVar} + '\');'"
```
还未测试：
```html
<button th:onclick="'javascript:upload(' + ${gallery} + ')'"></button>

th:onclick="|upload('${command['class'].simpleName}', '${gallery}')|"

<div th:style="'background:url(' + @{/<path-to-image>} + ');'"></div>

```
