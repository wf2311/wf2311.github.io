id: 41717694277488640
title: Java的枚举类使用技巧
date: 2017-08-02 14:05:07
categories: Java
tags: [enum,json]
type: 2
---------
# 枚举接口
在web开发中我们常常会定义一些enum来表示常量，比如:
```java
    enum BlogType {
        BLOG(1, "原创博文"),
        REPRINT(2, "转载文章"),
        QUESTION(3, "问答"),
        VOTE(4, "投票"),
        SUBJECT(5, "专栏");

        private Integer code;
        private String name;

        BlogType(Integer code, String name) {
            this.code = code;
            this.name = name;
        }

        public Integer getCode() {
            return code;
        }

        public String getName() {
            return name;
        }
    }
```
以及:
```java
    enum BlogStatus {
        PRIVATE(1, "自己可见"),
        FRIEND(2, "好友可见"),
        ONLINE(3, "登陆用户可见"),
        PUBLISH(4, "公开");
        private Integer code;
        private String name;

        BlogStatus(Integer code, String name) {
            this.code = code;
            this.name = name;
        }

        public Integer getCode() {
            return code;
        }

        public String getName() {
            return name;
        }
    }
```
可以看出它们的结构一样，都有`code`和`name`这两个属性，以及对应的`getter`方法，因此可以定义一个如下的接口：
```java
    public interface Common<C, N> {
        C getCode();

        N getName();

    }
```
所有如上面的常量枚举类都可以实现该接口。
```java
    enum BlogType implements Common {
        //...
    }
    
    enum BlogStatus implements Common {
        //...
    }
```
#  公用静态方法

我们可以在在`Common`接口中定义一个如下的静态方法：
```java
    static <E extends Enum<E> & Common, C> E getByCode(Class<E> clazz, C code) {
        return Arrays.stream(clazz.getEnumConstants())
                .filter(t -> t.getCode().equals(code))
                .findFirst().orElse(null);
    }
```
使用此方法可以根据code来查找指定的`Common`实现类中的值，比如：
```java
    Assert.assertEquals(BlogType.QUESTION, Common.getByCode(BlogType.class, BlogType.QUESTION.getCode()));
    Assert.assertEquals(BlogStatus.PUBLISH, Common.getByCode(BlogType.class, BlogStatus.PUBLISH.getCode()));
```
#  自定义序列化

当我们定义如下的方法
```java
    @GetMapping("/consts")
    public ApiResult consts() {
        ApiResult result = new ApiResult();
        Map<String, Object> consts = new HashMap<>();
        consts.put("blogType", BlogType.values());
        consts.put("blogStatus", BlogStatus.values());
        result.setData(consts);
        return result;
    }
```
通过请求，得到的结果格式是
```json
{
  "code": 0,
  "success": true,
  "data": {
    "blogStatus": [
      "PRIVATE",
      "FRIEND",
      "ONLINE",
      "PUBLISH"
    ],
    "blogType": [
      "BLOG",
      "REPRINT",
      "QUESTION",
      "VOTE",
      "SUBJECT"
    ]
  }
}
```
而我们期待的到是格式是包含`code`和`name`的键值对的形式，而不是以上的形式。通过在`Common`接口中添加以上方法可以实现：
```java
    @JsonValue
    default Map<C, N> toMap() {
        Map<C, N> map = new HashMap<>(1);
        map.put(getCode(), getName());
        return map;
    }
```
此时再次通过页面请求，得到的结果将如下：
```json
{
  "code": 0,
  "success": true,
  "data": {
    "blogStatus": [
      {
        "1": "自己可见"
      },
      {
        "2": "好友可见"
      },
      {
        "3": "登陆用户可见"
      },
      {
        "4": "公开"
      }
    ],
    "blogType": [
      {
        "1": "原创博文"
      },
      {
        "2": "转载文章"
      },
      {
        "3": "问答"
      },
      {
        "4": "投票"
      },
      {
        "5": "专栏"
      }
    ]
  }
}
```
此外，如果想通过使用`fastjson`的`JSON.toJSONString()`也能得到如上格式的结果，可以让`Common`继承`com.alibaba.fastjson.JSONAware`,并在`Common`中实现`JSONAware`的`toJSONString`方法:
```java
    @Override
    default String toJSONString() {
        return JSON.toJSONString(toMap());
    }
```
以下代码将会通过:
```java
   Assert.assertEquals("{2:\"转载文章\"}", JSON.toJSONString(BlogType.REPRINT));
```
# 完整代码
```java
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONAware;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * @author wf2311
 */
public interface Enums {
    interface Common<C, N> extends JSONAware {
        C getCode();

        N getName();

        static <E extends Enum<E> & Common, C> E getByCode(Class<E> clazz, C code) {
            return Arrays.stream(clazz.getEnumConstants())
                    .filter(t -> t.getCode().equals(code))
                    .findFirst().orElse(null);
        }

        @JsonValue
        default Map<C, N> toMap() {
            Map<C, N> map = new HashMap<>(1);
            map.put(getCode(), getName());
            return map;
        }

        @Override
        default String toJSONString() {
            return JSON.toJSONString(toMap());
        }

    }

    enum BlogType implements Common {
        BLOG(1, "原创博文"),
        REPRINT(2, "转载文章"),
        QUESTION(3, "问答"),
        VOTE(4, "投票"),
        SUBJECT(5, "专栏");

        private Integer code;
        private String name;

        BlogType(Integer code, String name) {
            this.code = code;
            this.name = name;
        }

        public Integer getCode() {
            return code;
        }

        public String getName() {
            return name;
        }
    }

    enum BlogStatus implements Common {
        PRIVATE(1, "自己可见"),
        FRIEND(2, "好友可见"),
        ONLINE(3, "登陆用户可见"),
        PUBLISH(4, "公开");
        private int code;
        private String name;

        BlogStatus(Integer code, String name) {
            this.code = code;
            this.name = name;
        }

        public Integer getCode() {
            return code;
        }

        public String getName() {
            return name;
        }
    }
}
```

