'use strict'

const express = require('express');
const router = express.Router();
const { Campus } = require('../../db/models');

module.exports = router;

// Get all campuses
router.get('/', function (req, res, next) {
  Campus.findAll()
  .then(campuses => {
    res.json(campuses);
  })
  .catch(next)
})

// Create new campus
router.post('/', function (req, res, next) {
  Campus.findOrCreate({where: req.body })
  .spread(campus => {
    res.json(campus);
  })
  .catch(next);
})

//Get campus by ID
router.get('/:campusId', function (req, res, next) {
  Campus.findById(req.params.campusId)
  .then(campus => {
    res.json(campus);
  })
  .catch(next)
})

//Update campus by ID
router.put('/:campusId', function (req, res, next) {
  Campus.findById(req.params.campusId)
    .then(campus => {
      return campus.update(req.body);
    })
    .then(campus => res.json(campus))
    .catch(next)
})

//Delete campus by ID
router.delete('/:campusId', function (req, res, next) {
  Campus.findById(req.params.campusId)
  .then(campus => {
    campus.destroy();
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})
