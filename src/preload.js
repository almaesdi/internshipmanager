import { contextBridge, ipcRenderer } from 'electron'



// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    // Array of all ipcRenderer Channels used in the client for sending data to electron (vue use this to send data to electron)
    let validChannels = ['getStudentsRequest','addStudentRequest','editStudentRequest','deleteStudentRequest']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },

  on: (channel, func) => {
    // Array of all ipcRenderer Channels used in the client for recieve data from electron (electron use this to send data to vue)
    let validChannels = ['getStudentsResponse','addStudentResponse','editStudentResponse','deleteStudentResponse']
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  }
})