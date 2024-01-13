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