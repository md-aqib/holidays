const express = require('express')
const router = express.Router()
const validate = require('../validations/validate').reg
const validateGet = require('../validations/validate').getLeave

// Register Leave
const regLeave = require('./registerLeave')
router.post('/registerLeave', validate, regLeave)

// Get Leaves
const getLeaves = require('./getLeaves')
router.post('/getLeaves', validateGet, getLeaves)

// Download csv
const downloadCSV = require('./downloadCSV')
router.post('/downloadCSV', downloadCSV)

module.exports = router