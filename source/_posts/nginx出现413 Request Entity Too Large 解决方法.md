id: 201705241550
title: nginx出现413 Request Entity Too Large 解决方法
date: 2017-05-24 15:50:14
categories: 其它
tags: [nginx,笔记]
type: 4
---------
**nginx.conf**中默认没有设置`client_max_body_size`，这个参数默认只是1M，
解决办法：
增加如下两行到**nginx.conf**的`http{}`段， 增大nginx上传文件大小限制
```shell
#设置允许发布内容为8M
client_max_body_size 8M;
client_body_buffer_size 128k;
```

