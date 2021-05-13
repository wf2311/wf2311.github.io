id: 201705260953
title: 在SpringBoot里面使用Thymeleaf3
date: 2017-05-26 09:53:26
categories: 
- Spring
- SpringBoot
tags:
- Thymeleaf
- SpringBoot  
type: 1
---------
最近在一个`springboot`项目里使用`thymeleaf`模板，访问页面时一直报错。而之前的项目中没发现过这种情况发生。
和之前的项目对比发现，在`springboot`项目中引入
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```
引入的`thymeleaf`版本居然是`2.x.x`版本，之前项目引入的是`3.x.x`版本的 
![之前项目](https://file.wf2311.com/2017/05/26/10/QQ截图20170526100433.png ) 
![该项目](https://file.wf2311.com/2017/05/26/10/QQ截图20170526100404.png )

查看相应的pom文件发现，`thymeleaf.version`确实是`2.x.x`的。
![截图](https://file.wf2311.com/2017/05/26/10/QQ截图20170526095909.png )
究竟怎么回事呢？搜索`springboot`文档中相关`thymeleaf`的段落，发现了如下[描述](http://docs.spring.io/spring-boot/docs/1.5.3.RELEASE/reference/htmlsingle/#howto-use-thymeleaf-3):
![描述](https://file.wf2311.com/2017/05/26/10/QQ截图20170526100534.png )

原来在`spring-boot-starter-thymeleaf`中默认引入的版本`thymeleaf`是`2.1`,如果需要使用`thymeleaf3`,需要在`pom.xml`中加入如下配置：
```xml
<properties>
    <thymeleaf.version>3.0.2.RELEASE</thymeleaf.version>
    <thymeleaf-layout-dialect.version>2.1.1</thymeleaf-layout-dialect.version>
</properties>
```

