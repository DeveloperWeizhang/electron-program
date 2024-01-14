/*
 * @Copyright (c): Knowdee All rights reserved.
 * @Description: 主进程，运行在node环境中
 * @Author: wangwz@knowdee.com
 * @LastEditors: wangwz@knowdee.com
 * @Date: 2024-01-11 18:00:56
 * @LastEditTime: 2024-01-14 19:08:12
 * @FilePath: /my-electron-app/main.js
 */
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron/main')
const path = require('node:path')
console.log('跨平台的路径获取：', path.join(__dirname, 'preload.js'))
// fixme: 无法使用 报错
// const fn = require('update-electron-app') // 自动更新
// fn.updateElectronApp()

// 设置原生窗口标题
function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

// 打开文件对话框
async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
}

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

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => win.webContents.send('update-counter', 1),
          label: '递增'
        },
        {
          click: () => win.webContents.send('update-counter', -1),
          label: '递减'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  // 监听渲染进程发送的set-title事件
  ipcMain.on('set-title', handleSetTitle)
  // 监听渲染进程发送的dialog:openFile事件
  ipcMain.handle('dialog:openFile', handleFileOpen)
  // 监听渲染进程发送的ping事件
  ipcMain.handle('ping', (e, arg) => {
    console.log('主线程收到ping的数据', JSON.stringify(arg))
    return 'pong'
  })
  createWindow()

  // 如果没有窗口打开则打开一个窗口 (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
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