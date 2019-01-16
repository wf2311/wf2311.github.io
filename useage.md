# 文章类型
|id|name| 
|:-|:-|
|0|草稿|
|1|普通|
|2|原创|
|3|转载|
|4|笔记|
|5|专栏|

# 文章中嵌入特殊元素
## 嵌入svg
```html
<div class="post-svg-container">
    <object type="image/svg+xml" data="xxx.svg"></object>
</div>
```

## 流程图
```mermaid
graph TD
A[模块A] -->|A1| B(模块B)
B --> C{判断条件C}
C -->|条件C1| D[模块D]
C -->|条件C2| E[模块E]
C -->|条件C3| F[模块F]
```

## 甘特图
```mermaid
gantt
title 甘特图
dateFormat  YYYY-MM-DD
section 项目A
任务1           :a1, 2018-06-06, 30d
任务2     :after a1  , 20d
section 项目B
任务3      :2018-06-12  , 12d
任务4      : 24d
```

## 时序图
```mermaid
sequenceDiagram
A->>B: 是否已收到消息？
B-->>A: 已收到消息
```
