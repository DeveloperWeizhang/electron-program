/*
 * @Copyright (c): Knowdee All rights reserved.
 * @Description: Type your file description
 * @Author: Type your email address
 * @LastEditors: wangwz@knowdee.com
 * @Date: 2024-01-11 18:00:56
 * @LastEditTime: 2024-01-11 21:20:31
 * @FilePath: /my-electron-app/main.js
 */
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
console.log('跨平台的路径获取：', path.join(__dirname, 'preload.js'))
// 创建一个原生窗口
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

// 创建一个原生窗口
const createWindow2 = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL('http://scello.knowdee.com/#/detail/environmentdev')
}

app.whenReady().then(() => {  
  ipcMain.handle('ping', (e, arg) => {
    console.log('主线程收到ping的数据', JSON.stringify(arg))
    return 'pong'
  })
  createWindow()

  // 如果没有窗口打开则打开一个窗口 (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      // createWindow2()
    }
  })
  
})

// window或者linux系统下，关闭窗口时，退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // 退出应用
    app.quit()
  }
})