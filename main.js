const {app, BrowserWindow, ipcMain} = require('electron')

let win
app.on('ready', () => {
  win = new BrowserWindow({width:800, height: 600, transparent: true, frame: false})
  win.hide()
  win.setMenu(null)
  win.loadURL(`file://${__dirname}/dist/index.html`)
  win.webContents.openDevTools()
})

ipcMain.on('ready', () => win.show())
