const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const { platform } = require('os')
const { join }     = require('path')

let win
app.on('ready', () => {
  win = new BrowserWindow({
    width:800,
    height: 600,
    show: false,
    frame: false,
    transparent: platform() == 'darwin' ? true : false,
    titleBarStyle : 'hidden-inset',
    icon: join(__dirname, 'parts', 'icon.png')
  })

  win.setMenu(null)
  win.loadURL(`file://${__dirname}/dist/index.html`)

  // Show devtools only if you're in development mode
  if(process.env.NODE_ENV == 'development') win.webContents.openDevTools()
})

ipcMain.on('ready', () => {
  win.show()
  win.focus()
})

ipcMain.on('bootstrap_error', () => {
  win.show()
  win.webContents.openDevTools()
})
