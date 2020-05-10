const DbRegLeave = require('../model/registerLeave')
const nodemailer = require('../common/nodemailer')
const mailData = require('../common/mailData')

module.exports = async(req, res) => {
    try{
        if(!req.body.name || !req.body.email || !req.body.date || !req.body.reason || !req.body.status){
            console.log(req.body)
            res.json({
                success: false,
                msg: 'Please enter all details'
            })
        } else {
            let leaveData = await DbRegLeave.find({$and: [{employeeEmail: req.body.email}, {dateOfLeave: req.body.date}]})
            if(leaveData.length != 0){
                res.json({
                    success: false,
                    msg: 'Leave already registered'
                })
            } else {
                let data = await new DbRegLeave({
                    employeeName: req.body.name,
                    employeeEmail: req.body.email,
                    reasonOfLeave: req.body.reason,
                    dateOfLeave: req.body.date,
                    reportingManager: {
                        name: req.body.reportingManager.name,
                        email: req.body.reportingManager.email
                    },
                    status: req.body.status
                })
                let savedData = await data.save()
                let emailData = await mailData.emailData(savedData.reportingManager.name, req.body.date, req.body.reason)
                let subject = 'Leave'

                //send mail to the manager
                await nodemailer.sendMails(savedData.reportingManager.email, subject, JSON.stringify(emailData))

                res.json({
                    success: true,
                    msg: 'Leave Registered'
                })
            }
        }
    } catch(err){
        console.log(err)
        res.json({
            success: false,
            msg: 'Something went wrong'
        })
    }
}