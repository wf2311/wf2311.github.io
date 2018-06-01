id: 201707281649
title: Maven命令备忘
date: 2017-07-28 16:49:07
categories: 其它
tags: [maven,命令,笔记]
type: 4
---------
- 更新父模块到指定版本号
```shell
mvn versions:set -DnewVersion=1.0.1-SNAPSHOT
```
- 更新子模块版本到与模块相同
```shell
mvn -N versions:update-child-modules
```
- 发布版本到指定本地仓库
```shell
mvn deploy -DskipTests -DaltDeploymentRepository=wf2311-mvn-repo::default::file:D:/Projects/open-source/maven-repo/repository/
```
- 跳过测试
```shell
-DskipTests
```
- 跳过gpg签名
```shell
-DskipGPG
```
- 查看执行过程
```shell
-X
```
- 把jar包加入本地仓库
```shell
mvn install:install-file -Dfile=D:\thrift-0.9.2.jar -DgroupId=org.apache.thrift -DartifactId=libthrift -Dversion=0.9.2 -Dpackaging=jar 
```
