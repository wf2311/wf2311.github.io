id: 201901261313
title: 使用正则表达式解析Nginx默认日志
date: 2019-01-26 13:13:03
categories: [Java,其他]
tags: [Java,Nginx,笔记,正则表达式]
type: 4
---------
## 背景
想通过 Nginx 的 access.log 分析网站的访问情况，但是直接通过日志文件看不太直观，于是想通过代码把日志文件解析并保存数据库中，这样分析起来更方便。

## 实现
参考 [nginx日志解析：java正则解析][1] 这篇文章，通过使用正则表达式把日志文件中的各个参数解析出来即可。

比如，我的服务器上 Nginx 记录的日志格式如下：
```bash
203.208.60.89 - - [04/Jan/2019:16:06:38 +0800] "GET /atom.xml HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
```
对应的 Java 正则表达式就是：
```
(?<ip>\d+\.\d+\.\d+\.\d+)( - - \[)(?<datetime>[\s\S]+)(?<t1>\][\s"]+)(?<request>[A-Z]+) (?<url>[\S]*) (?<protocol>[\S]+)["] (?<code>\d+) (?<sendbytes>\d+) ["](?<refferer>[\S]*)["] ["](?<useragent>[\S\s]+)["]
```
完整代码如下：

### `LogEntity`类用于保存解析后的日志信息
```java
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @author <a href="mailto:wf2311@163.com">wf2311</a>
 * @since 2019-01-25 19:37.
 */
@Data
@Table
@Entity(name = "log")
public class LogEntity {

    /**
     * 主键ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * 客户端IP
     */
    private String ip;
    /**
     * 访问时间
     */
    private LocalDateTime time;
    /**
     * 请求方式 GET/POST/PUT 等
     */
    private String request;
    /**
     * 访问的url地址
     */
    private String url;
    /**
     * http协议
     */
    private String protocol;
    /**
     * 请求结果响应码
     */
    private Integer code;
    /**
     * 请求访问的字节数量
     */
    private Integer sendByteSize;
    /**
     * 访问者访问渠道来源
     */
    private String refferer;
    /**
     * 访问者的用户代理
     */
    private String useAgent;
    /**
     * 访问者是不是爬虫或机器人
     */
    private boolean isBot;
    /**
     * 访问的是不是静态资源文件，例如：css、js、图片等文件
     */
    private boolean isResource;
    /**
     * 当前项目名称
     */
    private String project;

}
```

### `NginxLogConverter`类实现解析的具体逻辑
```java
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * @author <a href="mailto:wf2311@163.com">wf2311</a>
 * @since 2019-01-25 19:35.
 */
@Slf4j
public class NginxLogConverter {

    private static final String PATTERN = "(?<ip>\\d+\\.\\d+\\.\\d+\\.\\d+)( - - \\[)(?<datetime>[\\s\\S]+)(?<t1>\\][\\s\"]+)(?<request>[A-Z]+) (?<url>[\\S]*) (?<protocol>[\\S]+)[\"] (?<code>\\d+) (?<sendbytes>\\d+) [\"](?<refferer>[\\S]*)[\"] [\"](?<useragent>[\\S\\s]+)[\"]";

    /**
     * 解析转换逻辑
     *
     * @param text    单条的日志记录
     * @param project 项目名称
     * @return 解析成功则返回具体的对象，解析失败返回<code>null</code>
     */
    public static LogEntity parse(String text, String project) {
        Pattern r = Pattern.compile(PATTERN);
        Matcher m = r.matcher(text);

        while (m.find()) {
            LogEntity log = new LogEntity();
            log.setIp(m.group("ip"));
            log.setProject(project);
            String datetime = m.group("datetime");
            log.setTime(convertTime(datetime));
            log.setRequest(m.group("request"));
            log.setUrl(m.group("url"));
            log.setProtocol(m.group("protocol"));
            log.setCode(Integer.valueOf(m.group("code")));
            log.setSendByteSize(Integer.valueOf(m.group("sendbytes")));
            log.setRefferer(m.group("refferer"));
            log.setUseAgent(m.group("useragent"));
            log.setBot(isBot(log.getUseAgent()));
            log.setResource(isResource(log.getUrl()));
            return log;
        }
        log.error(String.format("%s 格式化错误", text));
        return null;
    }

    /**
     * 提取转换时间
     *
     * @param s 格式化的时间文本：26/Jan/2019:06:51:27 +0800]
     * @return LocalDateTime 时间
     */
    private static LocalDateTime convertTime(String s) {
        String t = s.substring(0, s.indexOf(" "));
        return LocalDateTime.parse(t, DateTimeFormatter.ofPattern("dd/MMM/yyyy:HH:mm:ss", Locale.ENGLISH));
    }

    /**
     * 通过 userAgent 字段判断是不是爬虫或机器人的访问记录
     *
     * @param userAgent 访问者的用户代理
     * @return 是否是爬虫或机器人的访问记录
     */
    private static boolean isBot(String userAgent) {
        String t = userAgent.toLowerCase();
        return t.contains("bot") || t.contains("spider");
    }

    /**
     * 通过 url 字段判断访问的是不是静态资源文件
     *
     * @param url 访问的url路径
     * @return 访问的是否是静态资源文件
     */
    private static boolean isResource(String url) {
        String t = url.toLowerCase();
        return t.contains(".js")
                || t.contains(".css")
                || t.contains(".png")
                || t.contains(".ico")
                || t.contains(".gif")
                || t.contains(".txt")
                || t.contains(".woff")
                || t.contains(".eot")
                || t.contains(".jpg");
    }
}
```

### 使用方式
```java
    public static void main(String[] args) {
        Path path = Paths.get("/xx/xxx/access.log");
        try {
            List<String> logs = Files.readAllLines(path);
            List<LogEntity> list = logs.stream().map(s -> parse(s, "${projectName}")).collect(Collectors.toList());
            System.out.println(list.size());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```
## 参考
1. [nginx日志解析：java正则解析][1]
[1]: https://blog.csdn.net/thlzjfefe/article/details/83349548