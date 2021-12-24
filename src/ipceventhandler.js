//import './utils/db.js'

import * as dba from './utils/db.js'

const { ipcMain } = require('electron')


//*****************************EXAMPLE(it should be deleted):******************************** */
//Payload recived from renderer (vue)
ipcMain.on('rendererInputChannelTest', (event, payload) => {
    console.log(payload.data)
  });
  //*****************************/EXAMPLE(it should be deleted):******************************** */
  
  ipcMain.on('dataRequest', (event, payload) => {
    event.reply('dataResponse','q wea queri');
  });
  

  
  //Get all Students
  ipcMain.on('getStudentsRequest', async (event, payload) => {
    const students = await dba.queryAllStudents();
    event.reply('getStudentsResponse',{students});
  });

  //Add Student
  ipcMain.on('addStudentRequest', async (event, payload) => {
    const lastId = await dba.queryInsertStudent(payload);
    event.reply('addStudentResponse',{lastId});
  });

  //Edit Student
  ipcMain.on('editStudentRequest', async (event, payload) => {
    const changes = await dba.queryUpdateStudent(payload);
    event.reply('editStudentResponse',{changes});
  });

  //Delete Student
  ipcMain.on('deleteStudentRequest', async (event, payload) => {
    const changes = await dba.queryDeleteStudent(payload.studentId);
    event.reply('deleteStudentResponse',{changes});
  });