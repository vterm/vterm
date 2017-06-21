const {app, BrowserWindow, ipcMain} = require('electron')

let win
app.on('ready', () => {
  win = new BrowserWindow({
    width:800,
    height: 600,
    transparent: true,
    frame: false
  })

  win.hide()
  win.setMenu(null)
  win.loadURL(`file://${__dirname}/dist/index.html`)

  // Show devtools only if you're in development mode
  if(process.env.NODE_ENV == 'development') win.webContents.openDevTools()
})

ipcMain.on('ready', () => win.show())
