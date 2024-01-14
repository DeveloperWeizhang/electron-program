/*
 * @Copyright (c): Knowdee All rights reserved.
 * @Description: 渲染器进程（运行在类似浏览器的环境进程中，也就是页面在浏览器中打开（类似））
 * @Author: wangwz@knowdee.com
 * @LastEditors: wangwz@knowdee.com
 * @Date: 2024-01-11 20:32:29
 * @LastEditTime: 2024-01-14 19:12:14
 * @FilePath: /my-electron-app/renderer.js
 */
/**
 * 渲染进程
 */

const information = document.getElementById('info')
information.innerText = `
  本应用正在使用
  Chrome (v${versions.chrome()}),
  Node.js (v${versions.node()}),
  和 Electron (v${versions.electron()})
  用户信息:
  ${JSON.stringify(info.userInfo())}
`

// 渲染进程通过预加载脚本暴漏的函数，调用主进程的函数，并传递参数
const func = async () => {
  const response = await versions.ping(information.innerHTML)

  // fixme: 这里的response 目前是undefined，需要解决
  information.innerText += response
}
func()

// 渲染进程通过预加载脚本暴漏的函数，调用主进程的函数，并传递参数 title
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})

// 点击打开原生文件对话框
const btn = document.getElementById('btn-file')
const filePathElement = document.getElementById('filePath')
btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})

// 主进程触发渲染器进程更新页面
const counter = document.getElementById('counter')
window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
})