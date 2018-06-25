id: 201709210933
title: IDEA 远程调试spring boot项目
date: 2017-09-21 09:33:52
categories: SpringBoot
tags: [SpringBoot,远程调试]
type: 1
---------
# IDEA 远程调试spring boot项目
## 1. Dokcer容器中
### 在Dockefile中配置(方法1)
在Dockerfile文件中加入参数`-agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=n`,
例如：
```bash
...
ENV JAVA_OPTS="-agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=n"
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]
```
启动docker命令：
```bash
docker run -p 8000:8000 -p 4000:4000 -t imageName
```
参数说明：
- `-p 8000:8000` 表示把在Dockerfile中定义的远程调试端口8000映射到服务器端口8000中；
- `-p 4000:4000` 表示把在应用程序的启动端口4000映射到服务器端口4000中；
### 启动命令中配置(方法2)
在启动命令中加上参数`-e "JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=y"`，例如：
```bash
docker run -e "JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=y" -p 8000:8000 -p 4000:4000 -t imageName
```
## 2. 以嵌入式web容器运行时
在启动命令中加上参数`-e "-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8000`，例如：
```bash
java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8000 -jar application.jar
```
## 3. 以`mvn spring-boot:run`运行时
在pom.xml中加入如下插件:
```xml
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
            <jvmArguments>
                -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
            </jvmArguments>
        </configuration>
    </plugin>
```
## 参考资料
1. [debug spring-boot in docker](https://stackoverflow.com/questions/31070671/debug-spring-boot-in-docker)
2. [spring boot + IDEA 远程调试](https://stacktrace.tech/2017-03-21/spring-boot-idea-remote-debug/)
3. [Spring Boot Maven Plugin - Debug the application](https://docs.spring.io/spring-boot/docs/current/maven-plugin/examples/run-debug.html)

