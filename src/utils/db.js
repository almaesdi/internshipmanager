const sqlite3 = require('sqlite3')
let db

function conn () {
  if (!db || !db.open) {
    db = new sqlite3.Database('./public/data.db')
  }
  return db
}

function closeConn() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

export const initTable = () => {
  return new Promise((resolve, reject) => {
    let db = conn()
    db.serialize(() => {
      db.run('CREATE TABLE if not exists TreeTable (id int primary key, name varchar(64), fatherId int)')
      db.run('CREATE TABLE IF NOT EXISTS ProductTable (id int primary key, name varchar(64))')
      resolve()
    })
  })
}

export const queryAllStudents = () => {
  return new Promise((resolve, reject) => {
    let db = conn()
    let query = 'SELECT * FROM Student'
    db.all(query, (err, rows) => {
      if (err) reject(err)
      resolve(rows || [])
    })
    closeConn()
  })
}

export const queryInsertStudent = (student) => {
  return new Promise((resolve, reject) => {
    let db = conn()

    let query = 'INSERT INTO Student(rut,name,lastname1,lastname2,gender,profession) VALUES (?,?,?,?,?,?)'
    let params = [student.rut,student.name,student.lastname1,student.lastname2,student.gender,student.profession]

    db.run(query, params, function(err) {
      if (err) reject(err)
      resolve(this.lastID)
    })
    closeConn()
  })
}

export const queryUpdateStudent = (student) => {
  return new Promise((resolve, reject) => {
    let db = conn()

    let query = 'UPDATE Student SET rut = ?,name= ?,lastname1= ?,lastname2= ?,gender= ?,profession= ? WHERE id = ?'
    let params = [student.rut,student.name,student.lastname1,student.lastname2,student.gender,student.profession, student.id]

    db.run(query, params, function(err) {
      if (err) reject(err)
      resolve(this.changes)
    })
    closeConn()
  })
}

export const queryDeleteStudent = (studentId) => {
  return new Promise((resolve, reject) => {
    let db = conn()
    let query = 'DELETE FROM Student WHERE id=?'
    let params = studentId //or [studentId]

    db.run(query, params, function(err) {

      if (err) reject(err)
      resolve(this.changes)
    })
    closeConn()
  })
}