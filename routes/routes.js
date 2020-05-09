const express = require('express')
const router = express.Router()

// Register Leave
const regLeave = require('./registerLeave')
router.post('/registerLeave', regLeave)



module.exports = router