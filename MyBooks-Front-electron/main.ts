import {app, BrowserWindow, screen, ipcMain, Menu} from 'electron';

import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | undefined, serve: boolean | undefined;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {
  const menu = Menu.buildFromTemplate([
    {
      label: 'Books',
      submenu: [
        {
          label: 'Create',
          click() {
            win.loadURL(`file:${__dirname}/dist/index.html#/books/new`);
          }
        },
        {
          label: 'List',
          click() {
            win.loadURL(`file:${__dirname}/dist/index.html#/books/list`);
          }
        }
      ]
    },
    {
      label: 'Author',
      submenu: [
        {
          label: 'Create',
          click() {
            win.loadURL(`file:${__dirname}/dist/index.html#/authors/new`);
          }
        },
        {
          label: 'List',
          click() {
            win.loadURL(`file:${__dirname}/dist/index.html#/authors/list`);
          }
        }
      ]
    },
    {
      label: 'Publishers',
      submenu: [
        {
          label: 'Create',
          click() {
            win.loadURL(`file:${__dirname}/dist/index.html#/publishers/new`);
          }
        },
        {
          label: 'List',
          click() {
            win.loadURL(`file:${__dirname}/dist/index.html#/publishers/list`);
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu);
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

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
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

try {
  ipcMain.on('update-badge-count', (event: any, arg: { count: number }) => {
    app.setBadgeCount(arg.count);
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === undefined) {
      createWindow();
    }
  });

  app.on('ready', () => {
    createWindow();
  });
} catch (e) {
  throw e;
}
