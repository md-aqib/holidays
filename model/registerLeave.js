const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Status
 * 1: Leave to be Taken
 * 2: Leave Taken
 **/

const registerHoliday = new Schema({
    employeeName: {
        type: String,
        required: true
    },
    employeeEmail: {
        type: String,
        required: true
    }, 
    dateOfLeave: [Date],
    reasonOfLeave: {
        type: String,
        required: true,
    },
    reportingManager: {
        name: String,
        email: String
    },
    status: Number,
    createdAt: {
        type: Date,
        default: new Date()
    }
    
})

module.exports = mongoose.model('registerHoliday', registerHoliday)