const DbRegLeave = require('../model/registerLeave')
const nodemailer = require('../common/nodemailer')
const mailData = require('../common/mailData')

module.exports = async(req, res) => {
    try{
        if(req.body.name || req.body.email || req.body.date || req.body.reason || req.body.reportingManager || req.body.status){
            res.json({
                success: false,
                msg: 'Please enter all details'
            })
        } else {
            let leaveData = await DbRegLeave.find({employeeEmail: req.body.employeeEmail})
            if(leaveData.length != 0 && leaveData[0].dateOfLeave == req.body.dateOfLeave){
                res.json({
                    success: false,
                    msg: 'Leave already registered'
                })
            } else {
                let data = new DbRegLeave({
                    employeeName: req.body.name,
                    employeeEmail: req.body.email,
                    reasonOfLeave: req.body.reason,
                    dateOfLeave: req.body.date,
                    reportingManager: [{
                        name: req.body.name,
                        email: req.body.email
                    }],
                    status: req.body.status
                })
                let savedData = await data.save()
                let emailData = await mailData.emailData(reportingManager.name, req.body.dateOfLeave, req.body.reasonOfLeave)
                let subject = 'Leave'

                //send mail to the manager
                nodemailer.sendMails(req.body.reportingManager, subject, emailData)

                res.json({
                    success: true,
                    msg: 'Leave Registered'
                })
            }
        }
    } catch(err){
        res.json({
            success: false,
            msg: 'Something went wrong'
        })
    }
}