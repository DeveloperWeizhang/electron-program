/*
 * @Copyright (c): Knowdee All rights reserved.
 * @Description: 预加载脚本
 *  预加载脚本包含在浏览器窗口加载网页之前运行的代码。 
 *  其可访问 DOM 接口和 Node.js 环境（ electron > e20 只能使用部分Api ）
 *  并且经常在其中使用 contextBridge 接口将特权接口暴露给渲染器。
 * @Author: wangwz@knowdee.com
 * @LastEditors: wangwz@knowdee.com
 * @Date: 2024-01-11 20:26:49
 * @LastEditTime: 2024-01-14 19:09:00
 * @FilePath: /my-electron-app/preload.js
 * // todo？: ipcRenderer 中 invoke 和 send 的区别
 */
const { contextBridge, ipcRenderer } = require('electron')

// 通过contextBridge接口，将特权接口暴露给渲染器
contextBridge.exposeInMainWorld('versions', {
  node: () => {
    return process.versions.node
  },
  chrome: () => {
    return process.versions.chrome
  },
  electron: () => {
    return process.versions.electron
  },
  ping: (res) => {
    ipcRenderer.invoke('ping', res)
  }
  // 除函数之外，我们也可以暴露变量
})

// 通过contextBridge接口，将特权接口暴露给渲染器
contextBridge.exposeInMainWorld('info', {
  userInfo: () => {
    return [{
      name: 'wangwz',
      age: 18,
      sex: '男'
    }]
  }
  // 除函数之外，我们也可以暴露变量
})

// 通过contextBridge接口，将特权接口暴露给渲染器
contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
})
