'use strict'

const express = require('express');
const router = express.Router();
const { Student } = require('../../db/models');

module.exports = router;

// Get all students
router.get('/', function (req, res, next) {
  Student.findAll()
    .then(students => {
      res.json(students);
    })
    .catch(next)
})

// Create a new student
router.post('/', function (req, res, next) {
  Student.findOrCreate({where: req.body })
    .spread(student => {
      res.json(student)
    })
    .catch(next);
})

// Get student by ID
router.get('/:studentId', function (req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      res.json(student);
    })
    .catch(next)
})

// Update an existing student
router.put('/:studentId', function (req, res, next) {
  console.log('req body is', req.body)
  Student.findById(req.params.studentId)
    .then(student => {
      return student.update(req.body);
    })
    .then(student => res.json(student))
    .catch(next)
})

// Delete a student
router.delete('/:studentId', function (req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      student.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next)
})
