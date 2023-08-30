# electron-vite-vue-template

Electron + Vite + Vue 模板，base on [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue)

## 使用

```sh
# clone the project
git clone https://github.com/webB1an/electron-vite-vue-template

# enter the project directory
cd daily-remind

# install dependency
npm install

# develop
npm run dev

# build for mac
npm run build:mac

# build for win
npm run build:win
```

## electron 主进程和渲染进程双向通信

### 主进程到渲染进程通信

在主进程中，你可以通过 `webContents` 对象向渲染进程发送消息。下面是一个简单的例子：

主进程代码：

```js
import { BrowserWindow, app } from 'electron'

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow()
  mainWindow.loadFile('index.html')
})

// 发送消息到渲染进程
mainWindow.webContents.send('message-from-main', 'Hello from main process!')
```

渲染进程代码（在 index.html 中）：

```js
import { ipcRenderer } from 'electron'

ipcRenderer.on('message-from-main', (event, message) => {
  console.log(message) // 输出: Hello from main process!
})
```

### 渲染进程到主进程通信

在渲染进程中，你可以使用 `ipcRenderer` 对象将消息发送到主进程，主进程可以通过 `ipcMain` 对象接收这些消息。

渲染进程代码（在渲染进程中）：

```js
import { ipcRenderer } from 'electron'

ipcRenderer.send('message-from-renderer', 'Hello from renderer process!')
```

主进程代码：

```js
import { BrowserWindow, app, ipcMain } from 'electron'

app.on('ready', () => {
  const mainWindow = new BrowserWindow()
  mainWindow.loadFile('index.html')

  ipcMain.on('message-from-renderer', (event, message) => {
    console.log(message) // 输出: Hello from renderer process!
  })
})
```
