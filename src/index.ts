import Editor from './editor/index'

const div = document.createElement('div')
div.setAttribute('id', 'root')
document.body.append(div)

const editor = new Editor('root')
editor.create()