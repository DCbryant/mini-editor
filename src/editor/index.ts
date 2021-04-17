
import './index.css'

class Editor {
  // 包裹父节点
  public container: HTMLElement
  // 工具栏
  private toolsBar: HTMLDivElement
  // 用户编辑区域
  private editorArea: HTMLDivElement
  public toolConfig = {
    bold: {
      title: 'B',
      command: 'bold'
    },
    title: {
      title: '标题',
      children: [{
        title: 'h1',
        command: 'formatTitle',
        params: 'H1'
      },
      {
        title: 'h2',
        command: 'formatTitle',
        params: 'H2'
      },]
    },
    color: {
      title: '颜色',
      children: [{
        title: 'red',
        command: 'forecolor',
        params: '#ff0000'
      },]
    }
  };
  constructor(selector: string) {
    this.container = document.getElementById(selector)
    this.container.style.border = '1px solid red'
    this.container.style.height = '300px'
    this.container.classList.add('container')
    if (!this.container) {
      throw Error('')
    }
  }

  create = () => {
    this.createToolBar()
    this.createEditorArea()
  }

  // 创建工具栏
  createToolBar = () => {
    const toolsBar = document.createElement('div')
    this.toolsBar = toolsBar
    this.toolsBar.style.height = '60px'
    this.container.appendChild(this.toolsBar)

    const configList = Object.keys(this.toolConfig)
    const toolItemWrapper = document.createElement('ul')
    const toolItemItem = document.createElement('li')

    this.toolsBar.appendChild(toolItemWrapper)

  }

  // 创建编辑器区域
  createEditorArea = () => {
    const editorArea = document.createElement('div')
    this.editorArea = editorArea
    this.editorArea.style.height = '240px'
    this.container.appendChild(this.editorArea)
  }
}

export default Editor