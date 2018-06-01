id: 201709270924
title: 有了Closeable为什么还要定义AutoCloseable
date: 2017-09-27 09:24:31
categories: Java
tags: [java基础,io]
type: 2
---------
# 从`try-with-resources`语法块说起
我们知道java7中引入了新的语法块`try-with-resources`:实现了`java.lang.AutoCloseable`的对象都可以作为**资源**，在`try`后面的括号类声明实例化，在后面的`{...}`语句块执行完后被自动关闭(`close()`方法被自动调用)。例如：在java7前，我们需要这样定义语句:
```java
    public void writeFile(String path,byte[] data){
        OutputStream os = null;
        try {
            os = new FileOutputStream(path);
            os.write(data);
            os.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (os!=null){
                os.close();
            }
        }
    }
```
而在java7后，可以变成这样：
```java
    public void writeFile(String path,byte[] data){
        try ( OutputStream os  = new FileOutputStream(path)){
            os.write(data);
            os.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```
# `Closeable`与`AutoCloseable`的关系与区别
`AutoCloseable`的源码如下:
```java
/**
 * @since 1.7
 */
public interface AutoCloseable {
    void close() throws Exception;
}
```
`Closeable`的源码如下:
```java
/**
 * @since 1.5
 */
public interface Closeable extends AutoCloseable {
    public void close() throws IOException;
}
```
由上可知`Closeable`在jdk1.5中就定义了，而`AutoCloseable`在jdk1.7才被引入，并且`Closeable`继承了`AutoCloseable`。为什么要这样设计呢？答案很简单，仔细查看源码就可以知道原因:
因为`Closeable`的`close()`方法只会抛出`IOException`异常，而`AutoCloseable`的`close()`方法抛出的是`Exception`异常。如此一来`try-with-resources`的适用性就更大了。
# 参考
1. https://stackoverflow.com/questions/19572537/why-is-autocloseable-the-base-interface-for-closeable-and-not-vice-versa
