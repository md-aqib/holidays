const DbLeave = require('../model/registerLeave')

module.exports = async(req, res) => {
    try{
        if(!req.body.date || !req.body.email){
            res.json({
                success: false,
                msg: 'please enter all details'
            })
        } else{
            let leaveData = await DbLeave.find({dateOfLeave: req.body.date})
            if(leaveData.length != 0 && leaveData[0].reportingManager[0].email == req.body.email){
                res.json({
                    success: true,
                    msg: 'Leave Data',
                    data: leaveData
                })
            } else {
                res.json({
                    success: false,
                    msg: 'No leaves found'
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