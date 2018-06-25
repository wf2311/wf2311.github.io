id: 201707191724
title: Git常用命令备忘
date: 2017-07-19 17:24:22
categories: 其它
tags: [git,命令,笔记]
type: 4
---------
# 克隆远程制定分支到本地
```bash
git clone -b <branch> <remote_repo> ## branch为分支名，remote_repo为远程仓库
```

### 强制覆盖本地文件
```bash
git fetch --all
git reset --hard origin/master
git pull
```

### 提交文件
```bash
git add a.file b.fle
git commit -m "备注"
git push
```

# 标签相关
## 切换到指定分支
```bash
git checkout <branch>
```
## 检出指定分支
```bash
git checkout tags/<tag_name> -b <branch_name>
```
## 新建标签
```bash
git tag <tagName>
```

## 查看所有标签
```bash
git tag
```
# 统计相关
## 查看git上个人代码量
```bash
git log --author="<username>" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

## 统计每个人的增删行数
```bash
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

## 查看仓库提交者排名前 5
```bash
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 5
```
## 贡献者统计
```bash
git log --pretty='%aN' | sort -u | wc -l
```

## 提交数统计
```bash
git log --oneline | wc -l
```

# 参考
1. [git统计项目中各成员代码量](https://rzrobert.github.io/2017/02/04/git%E7%BB%9F%E8%AE%A1%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%90%84%E6%88%90%E5%91%98%E4%BB%A3%E7%A0%81%E9%87%8F/)