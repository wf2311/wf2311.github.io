id: 201901162043
title: 如何优雅地在Hexo博客中嵌入SVG文件
date: 2019-01-16 20:43:39
categories: 前端
tags: [Hexo,SVG,笔记]
type: 1
---------
> 今天遇到一个问题：想在自己的Hexo博客中展示SVG格式的思维导图，本文简单的记录一下如何解决这个问题。

## 在Markdown文件中嵌入SVG
我们知道在 MarkDown 文件中可以直接使用 HTML 元素，所以可以直接使用写 HTML 结构的形式应该就可以实现，下面说说我尝试过的三种方案：

### iframe
最开始想到的是用 iframe 的形式，在正文中加入如下代码：
```html
<iframe width="100%" height="auto" src="xxx.svg"></iframe>
```
结果如下：
![iframe展示SVG](https://file.wf2311.com/images/20190116210140.png)
效果显然不行，放弃此种方案。
### img
接着尝试了使用 img 元素的方法，代码如下：

展示结果如下：
![img展示SVG](https://file.wf2311.com/images/20190116215335.png)

这种方法的展示效果虽然比使用 iframe 要好，但是 svg 的内容还是收到了父元素宽度的限制，并且里面的文本无法被复制。此方案也不太理想。

### object
最终在网上搜到了这篇文章 [The Best Way to Embed SVG on HTML (2019)](https://vecta.io/blog/best-way-to-embed-svg/) ,里面介绍了多种在 HTML 页面中嵌入 SVG 的方式，我尝试了里面说到的第二种，可以达到按照原始大小显示 SVG 中内容的效果。
代码如下：
```html
<object type="image/svg+xml" data="xxx.svg"></object>
```
页面效果：
![object展示SVG](https://file.wf2311.com/images/20190116215609.png)

可以看出 SVG 中的内容虽然是按照原始比例显示的，但是可能会超出父元素的宽度。
接下来就要解决第二个问题：在子元素宽度超出父元素后，如何让子元素在父元素内滑动，而不是溢出父元素。

## 子元素比父元素宽的布局显示问题
由于不是专业前端，此问题描述清楚后，通过搜索引擎就可以很轻松的找到答案，在此只是记录一下：
对上一节中的 `object`节点 外面定义一个父元素，样式如下：
```css
.post-svg-container{
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
```
对`object`节点定义如下样式：
```css
.post-svg-container > object{
      justify-content: center;
      height:100%;
}      
```
在 MarkDown 中这样引入 SVG 文件：
```html
<div class="post-svg-container">
    <object type="image/svg+xml" data="xxx.svg"></object>
</div>
```
即可达到最终想要的效果:
![](https://file.wf2311.com/images/20190116215757.png)

## 参考
1. [https://vecta.io/blog/best-way-to-embed-svg](https://vecta.io/blog/best-way-to-embed-svg/)
