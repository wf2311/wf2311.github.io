id: 201901301755
title: 彻底搞懂字符串比较问题和String.intern()方法的作用
date: 2019-01-30 17:55:56
categories: Java
tags: [Java,String]
type: 2
---------
> 网上看面试题时经常看到各种字符串比较的问题，有时看着答案也不知道为什么。于是今天花了一点时间对此做了一下深入的学习，在此记录一下。
<!-- more -->

## 创建字符串时需要注意的规则
这里列的规则是我结合JDK里的文档和《[Java-String.intern的深入研究][1]》、《[几张图轻松理解String.intern()][2]》这两篇文章，对于理解下面的实例中我认为比较关键的几点，可能有些理解不正确。

1、通过`new String(String original)`会有涉及到两个对象。
例如 `String str = new String("a")`语句,会先将构造函数里的参数`original`指向在字符串常量池(简称SCP),如果常量池中不存在，则会在常量池中生成字符串**a**，再在堆(HEAP)中生成变量`str`;

2、如果一个字符串`str`是由多个常量字符串通过**+**拼接的，则字符串`str`会直接生成或指向在字符串常量池中。

情况一：
```java
String str = "a" + "b";
```
情况二：
```java
String b = "b";
String str = "a" + b;
```
情况三：
```java
final String b = "b";
String str = "a" + b;
```
在上面的三种情况中，第一种和第三种情况的`str`都是由常量字符串直接拼接的，所以`str`会直接指向字符串常量池；而情况二中由于存在局部变量`b`,编译器将会通过`StringBuilder.append()`方法拼接字符串`a`和变量`b`后，最终再通过`StringBuilder.toString()`方法得到`str`，`str`会在堆中生成。

3、JDK 1.7后，在执行 `String.intern()`方法时，虚拟机会去字符串常量池检查是否已存在该字符串，如果存在则会直接引用常量池中该字符串的地址作为返回结果的引用地址；如果不存在，则会在常量池中生成一个对在原字符串(位于堆中)的引用作为，而不是像 JDK 1.6之前仍将原字符串拷贝到常量池中。

## 实例
### 实例1
```java
@Test
public void test1() {
    String c = "ab";    //SCP
    String i = "a" + "b"; //SCP
    String j = i.intern();  //SCP
    System.out.println(i == j);
    System.out.println(c == j);
}
```
`String c = "ab"`将直接在字符串常量池生成字符串**ab**；由于`i`是由两个字符串常量**a**和**b**直接拼接而成，所以`i`也会指向字符串常量池；由于`i.intern()`得到的字符串在常量池中已存在，所以`j`也指向常量池。因此`c`、`i`、`j`指向的同一个地址。因此输出结果为：
```bash
true
true
true
```

### 实例2
```java
@Test
public void test2() {
    String c = "ab";    //SCP
    String i = new String("a") + new String("b"); //HEAP
    String j = i.intern();  //SCP
    System.out.println(c == i);
    System.out.println(i == j);
    System.out.println(c == j);
}
```
`String i = new String("a") + new String("b");`语句会在字符串常量池中生成两个字符串**a**和**b**,在堆中生成3个对象：两个是由`new String()`生成的，另外一个是`i`。结合[实例1](#实例1)的说明，可知：`c`和`j`指向字符串常量池中指向地址，而`i`指向堆中。因此输出结果为：
```bash
false
false
true
```

### 实例3
```java
@Test
public void test3() {
    String c = "ab";    //SCP
    String i = new String("ab"); //HEAP
    String j = i.intern();  //SCP
    System.out.println(c == i);
    System.out.println(i == j);
    System.out.println(c == j);
}
```
和[实例2](#实例2)中类似，`String i = new String("ab");`语句中构造函数里的字符串**ab**会直接指向由`String c = "ab";`语句在字符串常量池中生成的字符串的地址，在堆中生成一个字符串对象`i`。所以输出结果和[实例2](#实例2)一样：
```bash
false
false
true
```

### 实例4
```java
@Test
public void test4() {
    String c = "ab";    //SCP
    String b = "b";
    String i = "a" + b; //HEAP
    String j = i.intern();  //SCP
    System.out.println(c == i);
    System.out.println(i == j);
    System.out.println(c == j);
}
```
根据本文开头的第2点规则，可知`String i = "a" + b;`语句中生成的变量`i`是位于堆中的，而`c`和`j`都指向字符串常量池。因此输入结果为：
```bash
false
false
true
```

### 实例5
```java
@Test
public void test5() {
    String b = "b";
    String i = "a" + b; //HEAP
    String j = i.intern();  //SCP -> HEAP
    String c = "ab";    //SCP -> HEAP
    System.out.println(i == j);
    System.out.println(c == j);
}
```
与[实例4](#实例4)中不同的是，虽然`i`是位于堆中，但是在执行`String j = i.intern()`时，由于字符串常量池中不存在字符串**ab**，根据本文开头的第3点规则，此时并不会直接把字符串**ab**复制在字符串常量池中，而是在常量池中为字符串**ab**生成指向堆中对象**i**的引用，包括之后的语句`String c = "ab";`中`c`指向的也是常量池中指向堆中对象**i**的引用，所有`c`、`i`、`j`指向的实际是同一个地址。因此输入结果为：
```bash
true
true
```

### 实例6
```java
@Test
public void test6() {
    String i = new String("ab"); //HEAP
    String j = i.intern();  //SCP
    String c = "ab";    //SCP
    System.out.println(i == j);
    System.out.println(c == j);
}
```
如果不仔细思考，可能会认为输出结果应该和[实例5](#实例5)一样，但实际的输出结果却是如下：
```bash
false
true
```
参考[实例3](#实例3)，想清楚`String i = new String("ab");`是会先在字符串常量池生成字符串**ab**这一点后，就很容易知道和[实例5](#实例5)的区别了。

### 实例7
```java
@Test
public void test7() {
    final String b = "b";
    String i = "a" + b; //SCP
    String j = i.intern();  //SCP
    String c = "ab";    //SCP
    System.out.println(i == j);
    System.out.println(c == j);
}
```
与[实例5](#实例5)的区别在于对象`b`是用`final`修饰的，可以看做局部常量，字符串对象`i`是由两个字符串常量通过`+`直接拼接而成，`i`将指向字符串常量池。因此输入结果为：
```bash
true
true
```

### 实例8
```java
private void test8(final String b) {
    String i = "a" + b; //HEAP
    String j = i.intern();  //HEAP -> SCP
    String c = "ab";    //HEAP -> SCP
    System.out.println(i == j);
    System.out.println(c == j);
}

@Test
public void test8() {
    String b = "b";
    test8(b);
}
```
这个实例的结果和[实例7](#实例7)一样：
```bash
true
true
```
但是含义不同，虽然在方法`test8(final String b)`中，形参`b`是用`final`修饰的，但`b`的值仍然是外部传来的，所以不能看做字符串常量。因此`i`是执行堆中的对象，而`j`和`c`是因为执行`i.intern()`之后，间接通过常量池指向了和`i`同一个地址。
调换一下上述方法中语句的位置，也可以验证改实例：
```java
private void test8_1(final String b) {
    String c = "ab";    //SCP
    String i = "a" + b; //HEAP
    String j = i.intern();  //SCP
    System.out.println(i == j);
    System.out.println(c == j);
}

@Test
public void test8_1() {
    String b = "b";
    test8_1(b);
}
```
将`String c = "ab"; `语句提至方法内第一行后，在执行`i.intern()`时，由于常量池中已存在字符串**ab**，因此`j`将直接指向常量池中字符串**ab**的地址，而`i`是位于堆中的对象，所以输出结果为：
```bash
false
true
```

### 实例9
```java
@Test
public void test9() {
    String b = "b";
    String i = "a" + b; //HEAP_1
    String l = "a" + b; //HEAP_2
    String j = l.intern();  //SCP -> HEAP_2
    String c = "ab";     //SCP -> HEAP_2
    System.out.println(i.equals(j));
    System.out.println(i == j);
    System.out.println(l == j);
    System.out.println(l == c);
}
```
结合前面的例子可知，`i`和`j`是位于堆中两个独立的对象。由于有`l.intern()`操作，`j`、`c`和`l`最终都指向了同一个地址。因此输入结果为：
```bash
false
true
true
true
```

## 参考
1. [https://www.cnblogs.com/Kidezyq/p/8040338.html][1]
2. [https://blog.csdn.net/soonfly/article/details/70147205][2]
3. [https://www.geeksforgeeks.org/interning-of-string/][3]

[1]: https://www.cnblogs.com/Kidezyq/p/8040338.html
[2]: https://blog.csdn.net/soonfly/article/details/70147205
[3]: https://www.geeksforgeeks.org/interning-of-string/