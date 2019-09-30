id: 201909301536
title: ssh快捷登录并执行命令
date: 2019-09-30 15:36:15
categories: Linux
tags: [ssh]
type: 2
---------

> 公司有很多测试服务器，经常需要登录这些服务器测试来查看服务日志。由于这些测试服务器只能通过账号+密码的方式登录，Windows下可以通过Xshell实现自动登录，但在MacOS中并没有发现比较好的工具，
> 在终端通过SSH方式登录时每次都需要输入密码，十分麻烦，经过一番搜索，最终实现了使用`expect`在终端直接ssh自动登录,并在登录成功后执行指定脚本。
<!-- more -->

# 安装expect
## MacOS:
直接通过[Homebrew](https://brew.sh/index_zh-cn)来安装：
```bash
brew install expect
```
## Linux系统
请自行搜索

# 编写脚本
在`/usr/local/bin`目录下新建脚本`auth_ssh.sh`和`do_ssh.sh`：

## auto_ssh.sh
```bash
#!/bin/bash
host=$1
port=$2
user=$3
pswd=$4
cmd=$5

if [ -z "$cmd" ];
then
    cmd = "cd ~/"
fi

do_ssh.sh $host $port $user $pswd "$cmd"
```

## do_ssh.sh
```bash
#!/usr/bin/expect

set timeout 30
set host [lindex $argv 0]
set port [lindex $argv 1]
set user [lindex $argv 2]
set pswd [lindex $argv 3]
set cmd [lindex $argv 4]

spawn ssh -p $port $user@$host
expect {
        "(yes/no)?"
        {send "yes\n";exp_continue}
        "password:"
        {send "$pswd\n"}
        "Password:"
        {send "$pswd\n"}
}
expect  {
    "login"
    {send "$cmd\n"}
} 
interact
```
注意：第20行的`login`表示期待登录成功后的输出会包含字符串`login`，请根据实际情况做修改

之后在终端执行命令 `auto_ssh <host> <port> <user> <pswd> "<cmd>"`即可。

# 为登录命令配置别名
在`~/.bash_profile`添加命令别名,例如:
```bash
 alias ss76="auto_ssh.sh 192.168.12.76 22 root abcd \"cd /home/tomcat/\""
```
然后执行
```bash
source ~/.bash_profile
```
之后在终端`ss76`即可自动登录到`192.168.12.76`并切换到`/home/tomcat/`目录中


# 参考
1. [iterm2 配合 expect 实现 SSH 自动登陆](https://adolphor.com/blog/2017/06/26/iterm2-expect-auto-ssh-login.html)
2. [linux expect详解(ssh自动登录，部署)](http://zyy1217.com/2017/07/02/linux%20expect%E8%AF%A6%E8%A7%A3/)