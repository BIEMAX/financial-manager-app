const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');

let mainWindow, serve, indexFile = '/dist/index.html';

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
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, indexFile),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// function teste () {
//   const indexFile = '/dist/index.html';

//   if (!fs.exists(indexFile))
//     console.log(`\u001b[${31}m$ Arquivo '${indexFile}' não localizado \u001b[0m`)
// }

// teste()

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})