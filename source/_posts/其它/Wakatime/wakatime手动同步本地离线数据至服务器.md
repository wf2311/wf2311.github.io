id: 201910201340
title: wakatime手动同步本地离线数据至服务器
date: 2019-10-20 13:40:33
categories: 其它
tags: [WakaTime]
type: 1
---------

1. 控制台执行
```bash
sudo pip install --upgrade wakatime
```
<!-- more -->
2. 同步本地的9999条heartbeat数据至服务器
```bash
wakatime --sync-offline-activity 9999
```
# 参考
1. [How can i force sync all my coding activity?](https://github.com/wakatime/wakatime/issues/157)