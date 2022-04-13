const { app, BrowserWindow, Menu } = require('electron')

let mainWindow, serve;

const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

if (serve) {
  require('electron-reload')(__dirname, {});
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, `/dist/electron-app/index.html`),
  //     protocol: "file:",
  //     slashes: true
  //   })
  // );

  mainWindow.loadURL('http://localhost:4200');

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})