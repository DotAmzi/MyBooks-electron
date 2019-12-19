import {app, BrowserWindow, screen, ipcMain} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | undefined, serve: boolean | undefined;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: size.width / 2 - 600,
    y: size.height / 2 - 400,
    minWidth: 800,
    minHeight: 600,
    width: 1200,
    height: 800,
    titleBarStyle: 'hiddenInset',
    fullscreenWindowTitle: true,
    show: true
  });


  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/MyBooks-Front-electron/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.

  ipcMain.on('update-badge-count', (event: any, arg: { count: number }) => {
    app.setBadgeCount(arg.count);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === undefined) {
      createWindow();
    }
  });

  app.on('ready', () => {
    createWindow();
  });
} catch (e) {
  // Catch Error
  throw e;
}
