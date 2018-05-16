id: 34861570559447040
title: java8中利用Stream过滤属性重复的元素
date: 2017-05-23 11:10:08
categories: Java
tags: [java8,stream]
type: 1
---------
# 根据属性过滤重复的元素
[参考地址](http://stackoverflow.com/questions/27870136/java-lambda-stream-distinct-on-arbitrary-key)
```java
    /**
     * 根据属性过滤重复的元素
     */
    public static <T> Predicate<T> distinctByKey(Function<? super T,Object> keyExtractor) {
        Map<Object,Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }
```

# 测试
```java
    static String[] data = new String[]{
            "1,2,a,4,5,6",
            "2,2,b,4,5,6",
            "3,2,a,4,5,6",
            "4,2,d,4,5,6",
            "5,2,b,5,5,6",
            "6,2,f,4,5,6",
            "7,2,c,4,5,6",
            "8,2,g,4,5,6",
            "9,2,d,4,5,6",
            "10,2,g,5,5,6",
    };

    /**
     * 根据单个属性过滤
     */
    @Test
    public void test1() {
        int[] arrays = Stream.of(data).map(d -> d.split(","))
                .filter(array -> !array[0].equals("1"))
                .filter(distinctByKey(array -> array[2]))
                .mapToInt(array -> Integer.valueOf(array[0]))
                .toArray();
        Assert.assertArrayEquals(new int[]{2, 3, 4, 6, 7, 8}, arrays);
    }

    /**
     * 根据多个属性过滤
     */
    @Test
    public void test2() {
        int[] arrays = Stream.of(data).map(d -> d.split(","))
                .filter(distinctByKey(array -> array[2] + array[3]))
                .mapToInt(array -> Integer.valueOf(array[0]))
                .toArray();
        Assert.assertArrayEquals(new int[]{1, 2, 4, 5, 6, 7, 8, 10}, arrays);
    }
```

