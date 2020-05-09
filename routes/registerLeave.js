const DbRegLeave = require('../model/registerLeave')

module.exports = async(req, res) => {
    try{
        if(req.body.employeeName || req.body.employeeEmail || req.body.dateOfLeave || req.body.reasonOfLeave || req.body.reportingManager || req.body.status){
            res.json({
                success: false,
                msg: 'Please enter all details'
            })
        } else {
            let leaveData = await DbRegLeave.findOne({dateOfLeave: req.body.dateOfLeave})
            if(leaveData || leaveData != null){
                res.json({
                    success: false,
                    msg: 'Leave already taken'
                })
            } else {
                let data = new DbRegLeave({
                    employeeName: req.body.employeeName,
                    employeeEmail: req.body.employeeEmail,
                    reasonOfLeave: req.body.reasonOfLeave,
                    reportingManager: req.body.reportingManager,
                    status: req.body.status
                })
                let savedData = await data.save()
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