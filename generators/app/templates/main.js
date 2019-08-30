const { app, BrowserWindow, BrowserView, ipcMain, Menu  } = require('electron')
const { template } = require('./app-menu-template')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.removeMenu()
  win.loadFile('index.html')
  win.maximize();
  let view = new BrowserView()
  win.setBrowserView(view)
  //view.setBounds({ x: 0, y: 0})
  let bounds= win.getBounds();
  bounds.height -= 30;
  bounds.y = 30;
  view.setBounds(bounds);//{ x: 0, y: 30, width: win.getBounds, height: 300 })
  view.webContents.loadURL("<%= websiteURL %>")
  //win.loadURL("https://www.google.com")

  win.show();
  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})


ipcMain.on('display-app-menu', (event, arg) => {
  const appMenu = Menu.buildFromTemplate(template)
  if(win) {
    appMenu.popup(win, arg.x, arg.y)
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

