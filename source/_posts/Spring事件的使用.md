id: 201801152157
title: Spring事件的使用
date: 2018-01-15 21:57:13
categories: Spring
tags: [Spring,SpringBoot,ApplicationEvent]
type: 2
---------
# 简介
> Spring 的事件(Spring Application Event)为 Bean 与 Bean 之间传递消息。一个 Bean 处理完了希望其余一个接着处理。这时我们就需要其余的一个 Bean 监听当前 Bean 所发送的事件。

Spring 事件使用步骤如下:
1. 先自定义事件: 需要继承`ApplicationEvent` ;
2. 定义事件监听者: 使用注解`@EventListener`或者实现`ApplicationListener`;
3. 使用容器对事件进行发布;
# 基于注解监听模式的基本用法
以下用一个每天的定时同步任务为例进行讲解:
## 定义同步事件
`SyncEvent`:
```java
/**
 * 同步任务事件
 * @author wf2311
 */
public class SyncEvent extends ApplicationEvent{
    public SyncEvent(Object source) {
        super(source);
    }
}
```
## 事件监听者
定义一个 MailHandler.java 在监听到事件后发送邮件:
```java
/**
 * 邮件发送处理器
 *
 * @author wf2311
 */
@Service
public class MailHandler {
    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    @EventListener
    public void sendSycResult(SyncEvent event)  throws InterruptedException {
        log.debug("MailHandler接收到同步结果:{}",event);
        TimeUnit.SECONDS.sleep(1);
        log.debug("mock send sync data ...");
    }
}
```
在`void sendSycResult(SyncEvent event)`方法上使用注解`@EventListener`, 表明`sendSycResult`方法将会监听`SyncEvent`事件;

`EventListener`的源码如下:
```java
@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface EventListener {

	/**
	 * classes的别名
	 */
	@AliasFor("classes")
	Class<?>[] value() default {};

	/**
	 * 要监听的事件类。
	 * 如果该属性只绑定了一个监听类，那使用该注解的方法最多只能有一个参数，并且参数类型需要该属性绑定的监听类相匹配(即参数类型需是监听类或者其父类);
	 * 如果该属性绑定了多个监听类，那使用该注解的方法不能带有任何参数。
	 */
	@AliasFor("value")
	Class<?>[] classes() default {};

	/**
	 * 匹配条件，SpEL表达式；
	 * 默认为空，表示总是匹配
	 */
	String condition() default "";

}
```

## 发布事件
`SyncService`:
```java
/**
 * 数据同步服务
 *
 * @author wf2311
 */
@Service
public class SyncService {
    private static final Logger log = LoggerFactory.getLogger(SyncService.class);

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    public void syncDayData(LocalDate day) throws InterruptedException {
        log.debug("开始同步{}的数据", day);
        long start = System.currentTimeMillis();
        TimeUnit.SECONDS.sleep(1);
        long end = System.currentTimeMillis();
        long speed = end - start;
        log.debug("{}的数据同步完成,耗时{} ms", day, speed);
        SyncData syncData = SyncData.builder().day(day).speed(speed).data(new Object()).build();
        applicationEventPublisher.publishEvent(new SyncEvent(syncData, "mail"));

        TimeUnit.SECONDS.sleep(3);
        long end2 = System.currentTimeMillis();
        log.debug("sleep {} ns", end2 - end);
    }
}
```
## 测试
```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringEventApplicationTests {

	@Autowired
	private SyncService syncService;

	@Test
	public void testSyncData() throws InterruptedException {
		syncService.syncDayData(LocalDate.now());
	}

}
```
运行测试方法`testSyncData()`,得到如下结果:
```bash
2018-01-15 16:37:11.387 DEBUG 132812 --- [           main] c.w.s.e.s.SyncService                    : 开始同步2018-01-15的数据
2018-01-15 16:37:12.389 DEBUG 132812 --- [           main] c.w.s.e.s.SyncService                    : 2018-01-15的数据同步完成,耗时1001 ms
2018-01-15 16:37:12.390 DEBUG 132812 --- [           main] c.w.s.e.h.MailHandler                    : MailHandler接收到同步结果:SyncEvent(type=mail)
2018-01-15 16:37:13.391 DEBUG 132812 --- [           main] c.w.s.e.h.MailHandler                    : mock send sync data ...
2018-01-15 16:37:16.391 DEBUG 132812 --- [           main] c.w.s.e.s.SyncService                    : sleep 4002 ns
```
由测试结果可知：在方法`syncDayData()`运行到`applicationEventPublisher.publishEvent(new SyncEvent(syncData))`后就会立即自动调用`void sendSycResult(SyncEvent event)`方法。

# 多个事件监听者
如果在同步任务完成后，不仅需要发送邮件，还需要对数据进行缓存和消息推送，只需要仿照`MailHandler`,再建立相应的类。
`CacheHandler`:
```java
/**
 * 缓存处理器
 * @author wf2311
 */
@Component
public class CacheHandler {

    private static final Logger log = LoggerFactory.getLogger(CacheHandler.class);

    @EventListener
    public void cacheSycResult(SyncEvent event) throws InterruptedException {
        log.debug("CacheHandler接收到同步结果:{}", event.getSource());
        TimeUnit.SECONDS.sleep(2);
        log.debug("mock cache sync data ...");
    }

}
```

`MqHandler`:
```java
@Component
public class MqHandler {
    private static final Logger log = LoggerFactory.getLogger(MqHandler.class);

    @EventListener
    public void pushSycResult(SyncEvent event) throws InterruptedException {
        log.debug("MqHandler接收到同步结果:{}", event.getSource());
        TimeUnit.SECONDS.sleep(3);
        log.debug("mock push sync data ...");
    }
}
```
运行`syncDayData()`测试方法得到如下结果:
```bash
2018-01-15 16:44:57.280 DEBUG 135208 --- [           main] c.w.s.e.s.SyncService                    : 开始同步2018-01-15的数据
2018-01-15 16:44:58.281 DEBUG 135208 --- [           main] c.w.s.e.s.SyncService                    : 2018-01-15的数据同步完成,耗时1001 ms
2018-01-15 16:44:58.282 DEBUG 135208 --- [           main] c.w.s.e.h.CacheHandler                   : CacheHandler接收到同步结果:SyncData(day=2018-01-15, speed=1001, data=java.lang.Object@3f9270ed)
2018-01-15 16:45:00.282 DEBUG 135208 --- [           main] c.w.s.e.h.CacheHandler                   : mock cache sync data ...
2018-01-15 16:45:00.282 DEBUG 135208 --- [           main] c.w.s.e.h.MailHandler                    : MailHandler接收到同步结果:SyncEvent(type=mail)
2018-01-15 16:45:01.283 DEBUG 135208 --- [           main] c.w.s.e.h.MailHandler                    : mock send sync data ...
2018-01-15 16:45:01.283 DEBUG 135208 --- [           main] c.w.s.e.h.MqHandler                      : MqHandler接收到同步结果:SyncData(day=2018-01-15, speed=1001, data=java.lang.Object@3f9270ed)
2018-01-15 16:45:04.283 DEBUG 135208 --- [           main] c.w.s.e.h.MqHandler                      : mock push sync data ...
2018-01-15 16:45:07.283 DEBUG 135208 --- [           main] c.w.s.e.s.SyncService                    : sleep 9002 ns
```
由测试结果可以看出，在方法`syncDayData()`运行到`applicationEventPublisher.publishEvent(new SyncEvent(syncData))`后就会立即依次调用我们定义的多个监听者。
但是如果我们对邮件发送、消息推送、缓存更新的执行顺序由特定的需求怎么办？(经简单测试，在有多个监听者时，默认情况下监听者的执行顺序是安装监听者所在的类名(不是beanName)来执行的)

## 使用`@Order`来指定监听者执行顺序
查看`EventListener`的API文档，其中有这样一段描述：
> It is also possible to define the order in which listeners for a certain event are to be invoked. To do so, add Spring's common @Order annotation alongside this event listener annotation.

所以我们可以用`@Order`来配合`@EventListener`来指定多个监听者的执行顺序。
分别修改
`MailHandler`:
```java
    @EventListener
    @Order(1)
    public void sendSycResult(SyncEvent event)  throws InterruptedException {
       //...
    }
```

`CacheHandler`:
```java
    @EventListener
    @Order(2)
    public void cacheSycResult(SyncEvent event)  throws InterruptedException {
       //...
    }
```

`MqHandler`:
```java
    @EventListener
    @Order(3)
    public void pushSycResult(SyncEvent event) throws InterruptedException {
       //...
    }
```
以上的代码为我们指定了3个监听者的依次执行顺序为: MailHandler、CacheHandler、MqHandler
再次运行`syncDayData()`测试方法得到如下结果:
```java
2018-01-15 17:09:34.830 DEBUG 138192 --- [           main] c.w.s.e.s.SyncService                    : 开始同步2018-01-15的数据
2018-01-15 17:09:35.831 DEBUG 138192 --- [           main] c.w.s.e.s.SyncService                    : 2018-01-15的数据同步完成,耗时1001 ms
2018-01-15 17:09:35.832 DEBUG 138192 --- [           main] c.w.s.e.h.MailHandler                    : MailHandler接收到同步结果:SyncEvent(type=mail)
2018-01-15 17:09:36.832 DEBUG 138192 --- [           main] c.w.s.e.h.MailHandler                    : mock send sync data ...
2018-01-15 17:09:36.832 DEBUG 138192 --- [           main] c.w.s.e.h.CacheHandler                   : CacheHandler接收到同步结果:SyncData(day=2018-01-15, speed=1001, data=java.lang.Object@129bd55d)
2018-01-15 17:09:38.833 DEBUG 138192 --- [           main] c.w.s.e.h.CacheHandler                   : mock cache sync data ...
2018-01-15 17:09:38.833 DEBUG 138192 --- [           main] c.w.s.e.h.MqHandler                      : MqHandler接收到同步结果:SyncData(day=2018-01-15, speed=1001, data=java.lang.Object@129bd55d)
2018-01-15 17:09:41.833 DEBUG 138192 --- [           main] c.w.s.e.h.MqHandler                      : mock push sync data ...
2018-01-15 17:09:44.834 DEBUG 138192 --- [           main] c.w.s.e.s.SyncService                    : sleep 9003 ns
```
测试顺序与设置的顺序一致。

# 基于多个监听者的链式调用
同样是在`EventListener`的API文档中，有这样一段描述：
> Annotated methods may have a non-void return type. When they do, the result of the method invocation is sent as a new event. If the return type is either an array or a collection, each element is sent as a new individual event.

大概意思是说: `EventListener`注解的方法，可以返回一个非空的类型。并且该方法的返回结果可以作为一个新的事件被发送。如果返回类型是数组或集合，则将每个元素作为新的单独事件发送。
我们可以基于此特性，实现多个监听者的链式调用。
1. 定义 `OrderInfo`:
```java
/**
 * @author wf2311
 */
@Data
@Builder
public class OrderInfo{
    private String customer;
    private LocalDateTime orderTime;
    private Integer emailResultId;
    private Integer cacheResultId;
    private Integer mqResultId;
}
```
2. 订单事件类 `OrderEvent`
```java
/**
 * 订单事件
 * @author wf2311
 */
@Data
public class OrderEvent  extends ApplicationEvent {
    private String nextListenerType;

    public OrderEvent(Object source, String nextListenerType) {
        super(source);
        this.nextListenerType = nextListenerType;
    }
}
```
3. 设置订单事件监听者
`MqHandler`中,添加:
```java
    @EventListener(condition = "#event.nextListenerType == 'mq'")
    public OrderEvent pushOrderInfo(OrderEvent event) {
        log.debug("MqHandler接收到订单信息:{}", event);
        ((OrderInfo) event.getSource()).setMqResultId(1);
        log.debug("mock push order event ...");
        event.setNextListenerType("cache");
        return event;
    }
```

`CacheHandler`中,添加:
```java
    @EventListener(condition = "event.nextListenerType == 'cache'")
    public OrderEvent cacheOrderInfo(OrderEvent event) {
        log.debug("CacheHandler接收到订单信息:{}", event.getSource());
        ((OrderInfo) event.getSource()).setCacheResultId(2);
        log.debug("mock cache order info ...");
        event.setNextListenerType("mail");
        return event;
    }
```

在`MailHandler`中,添加:
```java
    @EventListener(condition = "#event.nextListenerType == 'mail'")
    public OrderEvent sendOrderInfo(OrderEvent event) {
        log.debug("MailHandler接收到订单信息:{}", event.getSource());
        ((OrderInfo) event.getSource()).setMqResultId(3);
        log.debug("mock send order event ...");
        event.setNextListenerType(null);
        return event;
    }
```

以上各个`EventListener`中的`condition`表示，只有当对应的事件中对应的自定义属性`nextListenerType`等于对应值时，才会执行该方法。

4. 设置事件发布者:
`OrderService`:
```java
/**
 * 订单服务
 * @author wf2311
 */
@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    public void saveOrder(String customer, LocalDateTime time) throws InterruptedException {
        OrderInfo order = OrderInfo.builder().orderTime(time).customer(customer).build();
        log.debug("保存订单信息:{}", order);
        TimeUnit.SECONDS.sleep(3);
        applicationEventPublisher.publishEvent(new OrderEvent(order, "mq"));
    }
}
```
5. 测试方法：
```java
	@Autowired
	private OrderService orderService;
	@Test
	public void testOrderInfo() throws InterruptedException {
		orderService.saveOrder("test", LocalDateTime.now());
	}
```
运行后得到如下结果：
```bash
2018-01-15 18:51:46.677 DEBUG 135904 --- [           main] c.w.s.e.s.OrderService                   : 保存订单信息:OrderInfo(customer=test, orderTime=2018-01-15T18:51:46.674, emailResultId=null, cacheResultId=null, mqResultId=null)
2018-01-15 18:51:49.702 DEBUG 135904 --- [           main] c.w.s.e.h.MqHandler                      : MqHandler接收到订单信息:OrderEvent(nextListenerType=mq)
2018-01-15 18:51:49.702 DEBUG 135904 --- [           main] c.w.s.e.h.MqHandler                      : mock push order event ...
2018-01-15 18:51:49.703 DEBUG 135904 --- [           main] c.w.s.e.h.CacheHandler                   : CacheHandler接收到订单信息:OrderInfo(customer=test, orderTime=2018-01-15T18:51:46.674, emailResultId=null, cacheResultId=null, mqResultId=1)
2018-01-15 18:51:49.703 DEBUG 135904 --- [           main] c.w.s.e.h.CacheHandler                   : mock cache order info ...
2018-01-15 18:51:49.703 DEBUG 135904 --- [           main] c.w.s.e.h.MailHandler                    : MailHandler接收到订单信息:OrderInfo(customer=test, orderTime=2018-01-15T18:51:46.674, emailResultId=null, cacheResultId=2, mqResultId=1)
2018-01-15 18:51:49.703 DEBUG 135904 --- [           main] c.w.s.e.h.MailHandler                    : mock send order event ...
```
6. 结果分析：
`saveOrder()`发布的事件中`event.nextListenerType` = 'mq',只有`pushOrderInfo()`方法符合条件；
执行完`pushOrderInfo()`后，`event.nextListenerType`变为'cache',只有`cacheOrderInfo()`方法符合条件；
执行完`cacheOrderInfo()`后,`event.nextListenerType`变为'mail',只有`sendOrderInfo()`方法符合条件；
执行完`sendOrderInfo()`后,`event.nextListenerType`变为null,无符合条件的事件监听者，结束事件监听；

# 基于实现`ApplicationListener`的事件监听者
参考[Spring Application Event Example](实现ApplicationListener)

