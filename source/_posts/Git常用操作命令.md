id: 36694405947723776
title: Git常用操作命令
date: 2017-07-19 17:24:22
categories: 其它
tags: [git,常用命令]
type: 4
---------
# 克隆远程制定分支到本地
```shell
git clone -b <branch> <remote_repo> ## branch为分支名，remote_repo为远程仓库
```

### 强制覆盖本地文件
```shell
git fetch --all
git reset --hard origin/master
git pull
```

### 提交文件
```shell
git add a.file b.fle
git commit -m "备注"
git push
```

# 标签相关
## 切换到指定分支
```shell
git checkout <branch>
```
## 检出指定分支
```shell
git checkout tags/<tag_name> -b <branch_name>
```
## 新建标签
```shell
git tag <tagName>
```

## 查看所有标签
```shell
git tag
```
