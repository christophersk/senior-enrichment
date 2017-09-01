const { User, Campus, Student } = require('./db/models');
const db = require('./db');

const campuses = [
  {name: 'Mercury', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg'},
  {name: 'Venus', image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Venus_globe.jpg'},
  {name: 'Mars', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.jpg'},
  {name: 'Neptune', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/1200px-Neptune_Full.jpg'}
]

const students = [
  {name: 'Chris', email: 'chris@chris.com', campusId: 1},
  {name: 'Dave', email: 'Dave@Dave.com', campusId: 2},
  {name: 'vader', email: 'vader@vader.com', campusId: 3},
  {name: 'star-lord', email: 'star-lord@star-lord.com', campusId: 4},
  {name: 'Hal', email: 'Hal@Hal.com', campusId: 1},
  {name: 'norby', email: 'norby@norby.com', campusId: 2}
]

const seed = () => {
  Promise.all(campuses.map(campus =>
    Campus.create(campus)
  ))
  .then(() => console.log('campuses created'))
  .then(() =>
  Promise.all(students.map(student =>
    Student.create(student)
  )))
  .then(() => console.log('students created'))
}

const main = () => {
  console.log('syncing db');
  db.didSync
    .then(() => {
      return seed();
    })
    .then(() => {
      //db.close();
    })
    .catch(console.error)
}

main();

module.exports = main;
