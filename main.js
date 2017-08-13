const {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} = require('electron')
const { fork } = require('child_process')
const { join }  = require('path')

let win
app.on('ready', () => {
  win = new BrowserWindow({
    width:800,
    height: 600,
    show: false,
    frame: false,
    transparent: true,
    titleBarStyle : 'hidden-inset',
    icon: join(__dirname, 'parts', 'icon.png')
  })

  win.loadURL(`file://${__dirname}/dist/index.html`)

  // Show devtools only if you're in development mode
  if(process.env.NODE_ENV == 'development')
    win.webContents.openDevTools()

  // Create the Application's main menu
  const template = [
    {
      label: 'Application',
      submenu: [
        { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Reload', accelerator: 'CmdOrCtrl+R',
          click: function(item, _window) {
            if (_window) _window.reload()
          }
        },
        { label: 'Toggle Developer Tools',
          accelerator: process.platform == 'darwin'
            ? 'Alt+Command+I'
            : 'Ctrl+Shift+I',
          click: function(item, _window) {
            if (_window) _window.toggleDevTools()
          }
        }
      ]
    },
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})

ipcMain.on('ready', () => {
  win.show()
  win.focus()
})

ipcMain.on('bootstrap_error', () => {
  win.show()
  win.webContents.openDevTools()
})

ipcMain.on('YARN_START', ({ sender }, path, cmd, props) => {
  // Log these options for debugging
  const info = [
    'Starting yarn with:',
    path,
    cmd.join(' '),
    JSON.stringify(props)
  ].join('\n')

  sender.send(JSON.stringify({ type: 'info', data: info }))

  // Start the process
  const yarn = fork(path, cmd, props)

  // Pipe the output to the renderer
  yarn.stdout.on('data', data => sender.send('YARN_LOG', data.toString()))
  yarn.stderr.on('data', data => sender.send('YARN_ERR', data.toString()))

  yarn.on('exit', code => sender.send('YARN_EXIT', code))
})
