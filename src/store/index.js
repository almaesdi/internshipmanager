import { createStore } from 'vuex'

export default createStore({
  state: {
    students: []
  },
  mutations: {
    setStudents(state , students){
      state.students = students
    },
    addStudent(state , student){
      state.students.push(student)
    },
    editStudent(state , student){
      const index = state.students.findIndex(item => item.id === student.id)
      state.students[index] = student
    },
    deleteStudent(state , studentId){
      const index = state.students.findIndex(item => item.id === studentId)
      state.students.splice(index, 1);
    }
  },
  actions: {
    getStudentsFromFile({commit}){

      window.ipcRenderer.send('getStudentsRequest');

      window.ipcRenderer.on('getStudentsResponse', (payload) => {
        commit('setStudents', payload.students)
      });

    },
    addStudent({commit}, student){
      //IPC not support Proxy Object: Transforming proxy object to json object
      student = JSON.parse(JSON.stringify(student));
      
      window.ipcRenderer.send('addStudentRequest',student);
      window.ipcRenderer.on('addStudentResponse', (payload) => {
        student.id = payload.lastId
        commit('addStudent', student)
      });

    },
    editStudent({commit}, student)
    {
      //IPC not support Proxy Object: Transforming proxy object to json object
      student = JSON.parse(JSON.stringify(student));

      window.ipcRenderer.send('editStudentRequest',student);
      window.ipcRenderer.on('editStudentResponse', (payload) => {
        let changes = payload.changes
        commit('editStudent', student)
      });      

    },
    deleteStudent({commit, state}, studentId){
      if(confirm("Precaucion!: Confirmacion de ELIMINACION\nSi elimina al usuario, eliminaras todos sus registro de manera permanente\n¿Realmente desea continuar?")){

        window.ipcRenderer.send('deleteStudentRequest',{studentId});
        window.ipcRenderer.on('deleteStudentResponse', (payload) => {
          let changes = payload.changes
          commit('deleteStudent', studentId)
        });

      }
    },
  },
  modules: {
  }
})
