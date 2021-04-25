# 如何利用github进行多人协作开发

## 1. 首先fork他人的仓库

fork跟clone有些类似，clone别人的代码这代码的所有权还是别人的，我们没有更新的权力，该副本的远程仓库链接仍是别人的仓库，但是fork不同，fork后会在本人的github创建别人仓库的副本，我们可以对fork的项目随意更改，一般fork后我们会创建新的分支更改代码然后推送到远程分支

## 2. pull request

顾名思义，pull request就是请求别人pull你的仓库，我们fork别人的仓库后会创建新分支然后修改内容，完成修改后可以到pull request点击new pull request，左边是原项目基于哪个分支，右边是你自己fork的项目基于某分支，这些可以自己选择，当选择分支且两者代码不同时此时页面会出现create pull request按钮，点击按钮就可以填写请求信息说明做了哪些更改，填完后点击create pull request按钮即可，之后项目维护者收到我们的请求后如果同意我们所作的更改就会更新上去。

## 3. 同步更新仓库

当我们再更改代码的同时维护者也会更新代码，为了使我们的代码保持最新，需要拉取维护者最新代码

首先`git remote -v`查看远程仓库，最开始是没有维护者的远程仓库的，此时我们可以主动添加仓库，使用命令`git remote add upstream url`

## 4. 合并分支

### git merge 
当我们在xx分支更改完代码后需要将其更新到master分支就可以在master分支上执行`git merge xx`

### git rebase 
git rebase 可以合并最近commit记录，比如`git rebase -i HEAD~2`会合并最近两次提交记录，但更重要的是同merge一样用来合并分支`git rebase xx`,rebase会把提交历史整理成一条直线，看上去更直观

## Code Review

代码审查其实是团队一起做的，需要团队对代码做一些规范，然后审查代码的时候一一比对规范，没有代码规范，审查也没太大意义