const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('path');
const db = require('./databases');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  
  if (!process.env.ELECTRON_ENV) {
    win.setMenu(null);
  }
  
  win.loadFile(path.resolve(__dirname, '..', 'web', 'index.html'))
}

app.whenReady().then(() => {
    ipcMain.handle('load-events', async (_, {from, to}) => {
        return await db['events'].find();
    });
    ipcMain.handle('add-event', async (_, obj) => {
        await db['events'].insert(obj);
    });
    ipcMain.handle('update-event', async (_, {query, update}) => {
        await db['events'].update(query, update);
    });
    ipcMain.handle('delete-event', async (_, {query}) => {
        await db['events'].deleteOne(query);
    });
    createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})