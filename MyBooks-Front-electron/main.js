"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    var menu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Books',
            submenu: [
                {
                    label: 'Create',
                    click: function () {
                        win.loadURL("file:" + __dirname + "/dist/index.html#/books/new");
                    }
                },
                {
                    label: 'List',
                    click: function () {
                        win.loadURL("file:" + __dirname + "/dist/index.html#/books/list");
                    }
                }
            ]
        },
        {
            label: 'Author',
            submenu: [
                {
                    label: 'Create',
                    click: function () {
                        win.loadURL("file:" + __dirname + "/dist/index.html#/authors/new");
                    }
                },
                {
                    label: 'List',
                    click: function () {
                        win.loadURL("file:" + __dirname + "/dist/index.html#/authors/list");
                    }
                }
            ]
        },
        {
            label: 'Publishers',
            submenu: [
                {
                    label: 'Create',
                    click: function () {
                        win.loadURL("file:" + __dirname + "/dist/index.html#/publishers/new");
                    }
                },
                {
                    label: 'List',
                    click: function () {
                        win.loadURL("file:" + __dirname + "/dist/index.html#/publishers/list");
                    }
                }
            ]
        }
    ]);
    electron_1.Menu.setApplicationMenu(menu);
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    win = new electron_1.BrowserWindow({
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
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
try {
    electron_1.ipcMain.on('update-badge-count', function (event, arg) {
        electron_1.app.setBadgeCount(arg.count);
    });
    electron_1.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        if (win === undefined) {
            createWindow();
        }
    });
    electron_1.app.on('ready', function () {
        createWindow();
    });
}
catch (e) {
    throw e;
}
