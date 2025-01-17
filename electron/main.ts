// Modules to control application life and create native browser window
import { app, BrowserWindow } from "electron";
import path from 'path';
import url from 'url';
import { Server } from '../packages/server/build/index';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow;

let server = Server()

const createWindow = async () => {
  // Start server
  server.start()

  // Create the browser window.
  mainWindow = new BrowserWindow({
    darkTheme: true,
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3201");
  } else {
    const startUrl = url.format({
      pathname: path.join(__dirname, '../packages/client/build/index.html'),
      protocol: 'file:',
      slashes: true,
    })
    mainWindow.loadURL(startUrl);
  }

  // Show window once it is ready to show.
  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize()
    mainWindow.show()
  });

  // Emitted when the window is about to be closed.
  mainWindow.on("close", () => {
    // Stop server
    server.stop()
  })

  // Emitted when the window is closed.
  mainWindow.on("closed", async () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
