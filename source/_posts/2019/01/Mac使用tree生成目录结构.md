id: 201901021214
title: Mac使用tree生成目录结构
date: 2019-01-02 12:14:02
categories: 其它
tags: [命令,MAC]
type: 3
author: 陈惠超
source_url: https://chenhuichao.com/2016/12/17/mac/mac-tree-usage/
---------
## 前言
程序员经常会有需求，需要列出项目的结构树。Mac或者Linux下可以使用tree列出项目结构，如下图这种：
```bash
├── build
├── config
├── docs
│   └── static
│       ├── css
│       └── js
├── src
│   ├── assets
│   ├── components
│   ├── store
│   │   └── modules
│   └── views
│       ├── book
│       └── movie
└── static
```
使用起来也非常简单。
Mac下可以使用`brew install tree`进行安装。安装后，在terminal中输入`tree -a`便可以查看某个文件夹下的所有文件。

## 常用的命令
当然了，我们的需求肯定不止列出所有文件这么简单。下面介绍几个常用的命令：

* `tree -d` 只显示文件夹；
* `tree -L n` 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3；
* `tree -I pattern` 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用`tree -I "node_modules"`；
* `tree > tree.md` 将项目结构输出到tree.md这个文件。

举个例子，如果我们要显示某个项目下3层的所有文件结构，同时又过滤node_modules文件夹，最后输出到tree.md，可以这么写
```bash
tree -L 3 -I "node_modules"
```
结果为：
```bash
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── docs
│   ├── index.html
│   └── static
│       ├── css
│       └── js
├── git.sh
├── index.html
├── npm-debug.log
├── open
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── list.scss
│   │   ├── logo.png
│   │   ├── search-btn.png
│   │   └── style.scss
│   ├── components
│   │   ├── Hello.vue
│   │   ├── Spinner.vue
│   │   └── header.vue
│   ├── main.js
│   ├── router.js
│   ├── store
│   │   ├── api.js
│   │   ├── modules
│   │   ├── store.js
│   │   └── types.js
│   └── views
│       ├── book
│       ├── index.vue
│       ├── movie
│       └── vuex-demo.vue
├── static
└── tree.md
```
更多命令的使用可以查看`tree --help`。