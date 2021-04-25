# Ts从零实现文本编辑武器

## 目标
1. 从零配置webpack搭建ts环境开发项目实现简单文本编辑器
2. 编辑器支持文字大小、颜色、加粗等设置


## 项目环境搭建

使用`npm init -y`初始化项目，为了配置webpack，需要安装webpack，webpack-cli，webpack-dev-server等依赖，为了可以使用css和webpack，需要安装css-loader，style-loader，typescript-loader等webpack插件，随后在webpack.config.js里面配置一下loader即可；值得注意一下的是，webpack4/5使用webpack-dev-server的时候不能使用`webpack-dev-server`命令，使用这个命令会报错，需要更改成`"webpack serve`，项目环境搭建后就可以正式开发了

## 了解核心api

工欲善其事必先利其器，想要先开发文本编辑器需要先了解一下它的核心api：

### document.execCommand

查看mdn可知，该方法允许运行命令来操纵可编辑内容区域的元素，使用方法如下：

```js
const bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
```

值得一提的是该方法已被mdn标记为废弃方法，这就有点危险了。

### Window.getSelection

该方法返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置，语法如下：

```js
const selection = window.getSelection() ;
```

### HTMLElement.contentEditable
HTMLElement.contentEditable 属性用于表明元素是否是可编辑的，设置元素的contentEditable为true该元素文字即可被编辑

### 项目开发

可以先设计一下用户是如何使用的，这点可以学习wangeditor：
```
const editor = new Editor('#root')
editor.create()
```

在开发之前，我们分析一下需要开发哪些内容，大多数编辑器分为编辑menu，和编辑区域，编辑menu提供功能按钮来提供操作文字大小、颜色、和加粗，编辑区域就可以直接编辑文字了。那么在create里面需要做的就是创建外层容器，创建menu头部和创建编辑区域

```js
create = () => {
    this.createContainer()
    this.createToolBar()
    this.createEditorArea()
}
```

在createContainer里需要判断元素是否存在，不存在就报错，在createToolBar需要使用dom动态创建多个按钮，并且在这里需要事件代理来给每个按钮绑定事件，在createEditorArea需要设置元素contentEditable为true


整个编辑创建完后需要交互，选中编辑区域的文字后再点击menu中的按钮这时应该能设置文字，我们可以封装exec方法

```ts
exec(cmd: string, showUI: boolean = false, value: string = "") {
    document.execCommand(cmd, showUI, value);
}

// 文字大小1到7
setSize = () => {
    const size = prompt("请输入文字大小");
    this.exec("fontSize", true, size);
}

setBold = () => {
    this.exec("bold");
}

setColor = () => {
    const color = prompt("请输入颜色");
    this.exec("backColor", true, color);
}
```

点击按钮的时候执行上述方法即可，但是在实际点击的时候却发现上述方法并未起到作用，经过debug和查阅资料可知，点击上述按钮的时候编辑区域就会失去焦点，从而不知道选中哪些文字，因此我们需要在编辑区域失去焦点的时候先把选中内容存储起来

```ts
this.editorArea?.addEventListener("blur", () => {
    this.storeRange();
});

storeRange = () => {
    const { selection } = this;
    // 存在selection但是没有框选
    if (selection && !selection.isCollapsed) {
      const range = selection?.getRangeAt(0);
      this.range = range;
    }
  }
```

在点击menu按钮的时候再还原选中位置

```ts
recoverRange() {
    const { selection, range } = this;

    if (selection && range) {
        // 选区数量>0
        if (selection.rangeCount > 0) selection.removeAllRanges();
        selection?.addRange(range.cloneRange());
    }
}
```

此时就大功告成了！

## 实现效果

![img](/pic.png)
