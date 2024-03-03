const {  contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  hello: (name = 'world') => `hello ${name}`,
  ping: (name = 'world') => ipcRenderer.invoke('ping', name),
  
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('events', {
  load: (from, to) => ipcRenderer.invoke('load-events', { from, to }),
  add: (obj) => ipcRenderer.invoke('add-event', obj),
  update: (query, update) => ipcRenderer.invoke('update-event', {query, update}),
  delete: (query) => ipcRenderer.invoke('delete-event', {query}),
})

