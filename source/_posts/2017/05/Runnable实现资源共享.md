id: 201705251703
title: Runnable实现资源共享
date: 2017-05-25 17:03:18
categories: Java
tags: [Thread,Java]
type: 1
---------
**[参考地址](http://www.cnblogs.com/skywang12345/p/3479063.html)**

以抢票或秒杀为例
1. 错误示例1：
* Service
```java
class Service implements Runnable {
    private int remain = 100;

    public AtomicInteger count = new AtomicInteger(0);

    @Override
    public void run() {
        while (remain > 0) {
            System.out.println(Thread.currentThread().getName() + " 剩余：" + this.remain--);
            count.addAndGet(1);
        }
    }
}
```
* 测试方法：
```java
public class Main {

    public static int buy() throws InterruptedException {
        Service service = new Service();

        Thread[] threads = new Thread[100];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(service);
        }
        for (int i = 0; i < threads.length; i++) {
            threads[i].start();
        }
        Thread.sleep(50);
        return service.count.get();
    }

    public static void main(String[] args) throws InterruptedException {
        int[] array = new int[100];
        for (int i = 0; i < array.length; i++) {
            array[i] = buy();
        }
        long a = Arrays.stream(array).filter(i -> i > 100).count();
        System.out.println("执行次数大于100的个数：" + a);
    }
}
```
* 测试结果：

![截图](https://file.wf2311.com/2017/05/25/17/QQ截图20170525171025.png )
执行100次中出现了13次下单次数大于100次的情况

* 原因分析:
在上述方法中，多个线程共享一个变量，会存在并发争抢资源的问题，可能多买票的现象。

