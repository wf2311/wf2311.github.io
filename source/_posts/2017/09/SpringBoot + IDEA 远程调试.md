id: 201709191020
title: SpringBoot + IDEA 远程调试
date: 2017-09-19 10:20:54
categories: SpringBoot
tags: [SpringBoot,远程调试]
type: 1
---------
# 配置
若想调试远端web容器内部的应用，需要接入web容器的jvm，以Tomcat为例，需修改web容器的配置
```bash
// bin\startup.bat（.sh）文件，在里面添加
 
// windows
set CATALINA_OPTS="-agentlib:jdwp=transport=dt_socket,address=8888（自定义调试端口）,server=y,suspend=n %CATALINA_OPTS%"
 
// linux
export CATALINA_OPTS="-agentlib:jdwp=transport=dt_socket,address= 8888（自定义调试端口）,server=y,suspend=n $CATALINA_OPTS"

```
若是使用了spring boot并将工程打成了可执行JAR包
```bash
// 在使用java指令启动程序时需要附加额外的参数以开启外部调试，如下
-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8888（自定义调试端口）
 
// 完整的启动指令是类似下面酱的
java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8888（自定义调试端口） -jar application.jar

```

# IDEA连接远端调试
![](https://file.wf2311.com/2017/09/19/15/WechatIMG2478.jpeg)
![](https://file.wf2311.com/2017/09/19/15/WX20170321-035338@2x.png)
![](https://file.wf2311.com/2017/09/19/15/WX20170321-035510@2x.png)
填写远端JMV所在服务器IP和调试端口号，保存即可：
![](https://file.wf2311.com/2017/09/19/15/WX20170321-035733@2x.png)
连接远端JVM启动调试：
![](https://file.wf2311.com/2017/09/19/14/WX20170321-040105@2x.png)
如若连接成功，调试控制台将输出以下内容，如果没成功，请自行检查服务器防火墙以及网络
![](https://file.wf2311.com/2017/09/19/15/WX20170321-040237@2x.png)
接下来的操作就和在本地调试一样了，打断点，远端JVM会通过网络同步调试信息，和在本地没什么两样，要注意调试的时候和本地一样都是会暂停JVM继续往下执行的。
