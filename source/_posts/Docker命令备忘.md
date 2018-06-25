id: 201806011220
title: Docker命令备忘
date: 2018-06-01 12:20:24
categories:
- 其它
- 命令
tags: [docker,命令,笔记]
type: 4
music_id: 2200001353
music_type: 0
---------
# 镜像相关
## 列出所有镜像
```bash
docker images
```

## 删除镜像
```bash
docker image rm [选项] <镜像1> [<镜像2> ...]
```

## 删除名称或标签为none的镜像
```bash
docker rmi -f  `docker images | grep '<none>' | awk '{print $3}'`
```

# 容器相关
## 创建并启动容器
```bash
$ docker run -d --name MyJenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```
* **docker run** : 由 image 建立 container 并执行之;
* **-d** : 建立 container 后，就脱离目前 process
* **—name** : 替 container 设置一个易识别的名字 `MyJenkins` (若省略，Docker 将随机命名，不易维护)
* **-p** : Docker 外部与 Jenkins 內部所对应的 port，其中左边为外部 Docker 的 port，右边为 Jenkins 內部的 port
* **-v** : 建立 `JENKINS_HOME` 环境变量，其目录在 `/var/jenkins_home`，为 Jenkins 的工作目录

## 重命名容器名称
```bash
docker rename <old_name> <new_name>
```

## 显示所有容器
```bash
docker ps -a
```

## 根据容器名称启动/停止容器
```bash
docker [stop] [start] <container_name>
```

## 进入容器
```bash
docker exec -it <container_name> /bin/bash
```
## 退出容器
```bash
exit
```

## 上传文件到容器
```bash
docker cp [本地文件路径] <container_name>: [目标路径]
```

## 查看容器日志
```
docker logs -t -f <container_name>
```

## 删除异常停止的docker容器
```bash
docker rm `docker ps -a | grep Exited | awk '{print $1}'`
```

# 参考

* [如何使用 Docker 安裝 Jenkins ?][1]


  [1]: http://oomusou.io/docker/jenkins/ "如何使用 Docker 安裝 Jenkins ?"