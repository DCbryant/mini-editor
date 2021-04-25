import {createElement, attr} from '../utils/index'
import './index.css'
// 
class Editor {
  // 包裹父节点
  public container: HTMLElement
  // 工具栏
  private toolsBar: HTMLElement
  // 用户编辑区域
  private editorArea: HTMLElement
  // 选中位置
  private selection: Selection | null;
  // 框选区域
  private range: Range | null;
  // 菜单选项
  public toolConfig = [
    {title: '标题', text: 'H'},
    {title: '加粗', text: 'B'},
    {title: '颜色', text: 'C'}
  ];

  constructor(selector: string) {
    this.container = document.querySelector(selector)
    this.selection = window.getSelection();
    if (!this.container) {
      throw Error('can not find dom selector, please check your selector ')
    }
  }

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

  recoverRange = () => {
    const { selection, range } = this;

    if (selection && range) {
      // 选区数量>0
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection?.addRange(range.cloneRange());
    }
  }

  storeRange = () => {
    const { selection } = this;
    // 存在selection但是没有框选
    if (selection && !selection.isCollapsed) {
      const range = selection?.getRangeAt(0);
      this.range = range;
    }
  }

  handleClick = (text: string) => {
    this.recoverRange()
    if (text === 'B') {
      this.setBold()
    } else if (text === 'C') {
      this.setColor()
    } else if(text === 'H') {
      this.setSize()
    }
  }

  create = () => {
    this.createContainer()
    this.createToolBar()
    this.createEditorArea()
  }

  createContainer = () => {
    attr(this.container, "style", "border: 1px solid #c9d8db; height: 300px")
    attr(this.container, "class", "container")
  }

  // 创建工具栏
  createToolBar = () => {
    const toolsBar = createElement('div')
    this.toolsBar = toolsBar
    attr(this.toolsBar, "style", "border-bottom: 1px solid #eee; height: 60px")
    this.container.appendChild(this.toolsBar)


    const toolItemWrapper = createElement('ul')
    attr(toolItemWrapper, "class", "tool-box")
    let lis = ''
    this.toolConfig.forEach(({title, text}) => {
      lis += `<li class="tool-box-title" title="${title}">${text}</li>`
    })
    // 事件代理绑定事件
    toolItemWrapper.addEventListener('click', (e) => {
      const item = e.target as HTMLElement
      if (item.nodeName === 'LI') {
        this.handleClick(item.innerText)
      }
    })
    toolItemWrapper.innerHTML = lis;
    this.toolsBar.appendChild(toolItemWrapper)
  }

  // 创建编辑器区域
  createEditorArea = () => {
    const editorArea = createElement('div')
    this.editorArea = editorArea
    attr(this.editorArea, "contenteditable", "true")
    attr(this.editorArea, "style", "height: 240px")
    this.container.appendChild(this.editorArea)

    // 失去焦点后需要记录选中内容
    this.editorArea?.addEventListener("blur", () => {
      this.storeRange();
    });
  }
}

export default Editor