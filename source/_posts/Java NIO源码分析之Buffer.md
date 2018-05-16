id: 37085722808815616
title: Java NIO源码分析之Buffer
date: 2017-07-20 19:19:19
categories: Java
tags: [nio]
type: 1
---------
# `Buffer`是特定基元类型数据的容器
`Buffer`(缓冲区)是一种特定基元类型的线性、有限序列。除了内容之外，缓冲区的基本属性是`capacity`(容量)、`limit`(上限)和`position`(位置)以及`mark`(标记):
>`capacity` 缓冲区能够容纳的数据元素的最大数量。这一容量在缓冲区创建时被设定，并且永远不能被改变。 
> `limit` 缓冲区的第一个不能被读或写的元素。或者说，缓冲区中现存元素的计数。 
> `position` 下一个要被读或写的元素的索引。位置会自动由相应的`get()`和`put()`函数更新。 
> `mark` 一个备忘位置。调用`mark()`来设定mark = postion。调用`reset()`设定position = mark。标记在设定前是未定义的(undefined)。 
> 这四个属性之间总是遵循以下关系： 
```java
0 <= mark <= position <= limit <= capacity
```


