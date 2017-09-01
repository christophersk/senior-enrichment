'use strict'
const api = require('express').Router()
const db = require('../db')

api.use('/campuses', require('./api/campuses'));
api.use('/students', require('./api/students'));
api.use('/users', require('./api/users'));

module.exports = api
