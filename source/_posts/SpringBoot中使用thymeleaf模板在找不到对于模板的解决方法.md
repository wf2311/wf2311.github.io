id: 201707291104
title: SpringBoot中使用thymeleaf模板在找不到对于模板的解决方法
date: 2017-07-28 11:04:21
categories: SpringBoot
tags: [thymeleaf,SpringBoot]
type: 1
---------
# 问题描述
SpringBoot中使用thymeleaf模板，在IDEA中以main方法运行可以正常显示页面，但在打包之后就会提示找不到模板页面的错误信息:
```bash
[THYMELEAF][http-nio-4000-exec-1] Exception processing template "/blog/index": Error resolving template "/blog/index", template might not exist or might not be accessible by any of the configured Template Resolvers
org.thymeleaf.exceptions.TemplateInputException: Error resolving template "/blog/index", template might not exist or might not be accessible by any of the configured Template Resolvers
        at org.thymeleaf.engine.TemplateManager.resolveTemplate(TemplateManager.java:870) ~[thymeleaf-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.engine.TemplateManager.parseAndProcess(TemplateManager.java:607) ~[thymeleaf-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.TemplateEngine.process(TemplateEngine.java:1098) [thymeleaf-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.TemplateEngine.process(TemplateEngine.java:1072) [thymeleaf-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.spring4.view.ThymeleafView.renderFragment(ThymeleafView.java:353) [thymeleaf-spring4-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.spring4.view.ThymeleafView.render(ThymeleafView.java:191) [thymeleaf-spring4-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.springframework.web.servlet.DispatcherServlet.render(DispatcherServlet.java:1286) [spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.DispatcherServlet.processDispatchResult(DispatcherServlet.java:1041) [spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:984) [spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:901) [spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:970) [spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:861) [spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:635) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:846) [spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:742) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52) [tomcat-embed-websocket-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.servlet.resource.ResourceUrlEncodingFilter.doFilter(ResourceUrlEncodingFilter.java:59) [spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:99) [spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.filter.HttpPutFormContentFilter.doFilterInternal(HttpPutFormContentFilter.java:105) [spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.filter.HiddenHttpMethodFilter.doFilterInternal(HiddenHttpMethodFilter.java:81) [spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:197) [spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:198) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:478) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:140) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:80) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:87) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:799) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:868) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1455) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142) [?:1.8.0_74]
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617) [?:1.8.0_74]
        at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at java.lang.Thread.run(Thread.java:745) [?:1.8.0_74]
Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.thymeleaf.exceptions.TemplateInputException: Error resolving template "/blog/index", template might not exist or might not be accessible by any of the
 configured Template Resolvers] with root cause
org.thymeleaf.exceptions.TemplateInputException: Error resolving template "/blog/index", template might not exist or might not be accessible by any of the configured Template Resolvers
        at org.thymeleaf.engine.TemplateManager.resolveTemplate(TemplateManager.java:870) ~[thymeleaf-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.engine.TemplateManager.parseAndProcess(TemplateManager.java:607) ~[thymeleaf-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.TemplateEngine.process(TemplateEngine.java:1098) ~[thymeleaf-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.TemplateEngine.process(TemplateEngine.java:1072) ~[thymeleaf-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.spring4.view.ThymeleafView.renderFragment(ThymeleafView.java:353) ~[thymeleaf-spring4-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.thymeleaf.spring4.view.ThymeleafView.render(ThymeleafView.java:191) ~[thymeleaf-spring4-3.0.7.RELEASE.jar!/:3.0.7.RELEASE]
        at org.springframework.web.servlet.DispatcherServlet.render(DispatcherServlet.java:1286) ~[spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.DispatcherServlet.processDispatchResult(DispatcherServlet.java:1041) ~[spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:984) ~[spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:901) ~[spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:970) ~[spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:861) ~[spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:635) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:846) ~[spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:742) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52) ~[tomcat-embed-websocket-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.servlet.resource.ResourceUrlEncodingFilter.doFilter(ResourceUrlEncodingFilter.java:59) ~[spring-webmvc-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:99) ~[spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.filter.HttpPutFormContentFilter.doFilterInternal(HttpPutFormContentFilter.java:105) ~[spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.filter.HiddenHttpMethodFilter.doFilterInternal(HiddenHttpMethodFilter.java:81) ~[spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:197) ~[spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-4.3.10.RELEASE.jar!/:4.3.10.RELEASE]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:198) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:478) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:140) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:80) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:87) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:799) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:868) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1455) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142) [?:1.8.0_74]
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617) [?:1.8.0_74]
        at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) [tomcat-embed-core-8.5.16.jar!/:8.5.16]
        at java.lang.Thread.run(Thread.java:745) [?:1.8.0_74]

```
# 错误原因
参考[stackflow](https://stackoverflow.com/questions/26493831/spring-boot-thymeleaf-not-resolving-fragments-after-packaging#answer-26503954 "stackflow") 类似的问题
> You don't need the leading / on the view name, i.e. you should return fragments :: nodeList rather than /fragments :: nodeList. Having made this change Thymeleaf should be able to find the template when run from your IDE or from a jar file.
If you're interested, here's what's happening under the hood:
The view name is used to search for a resource on the classpath. fragments :: nodeList means that the resource name is /templates/fragments.html and /fragments :: nodeList means that the resource name is /templates//fragments.html (note the double slash). When you're running in your IDE the resource is available straight off the filesystem and the double slash doesn't cause a problem. When you're running from a jar file the resource is nested within that jar and the double slash prevents it from being found. I don't fully understand why there's this difference in behaviour and it is rather unfortunate. I've opened an issue so that we (the Spring Boot team) can see if there's anything we can do to make the behaviour consistent.

简单来说就是在springboot配置文件里的`spring.thymeleaf.prefix=classpath:/templates/`的与返回页面的视图设置`mav.setViewName("/blog/write");` 在组成url路径时会构成一个双斜杠`//`，在IDEA中运行时是可以被识别的，但在程序打包运行之后就不能被识别了，所以会出现这个问题。
# 解决办法
根据上面的错误原因分析，目前的解决办法就是让模板的路径中不会出现双斜杠`//`，或者支持双斜杠`//`路径(目前已经有人在jira中提出了该[bug](https://jira.spring.io/browse/SPR-15596 "bug") 期待在之后的版本中能狗支持双斜杠`//`路径)
1. 去掉返回视图页面最前面的斜杠：
	`mav.setViewName("/blog/write");`
	改为
	`mav.setViewName("blog/write");`
2. 或者在配置文件里去掉最后的斜杠：
	`spring.thymeleaf.prefix=classpath:/templates/`
	改为
	`spring.thymeleaf.prefix=classpath:/templates`
	同时需要修改thymeleaf模板文件中的相关内容，比如
	`layout:decorate="~{blog/common/common}`
	此时应变为
	`layout:decorate="~{/blog/common/common}`
