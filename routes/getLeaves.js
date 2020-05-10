const DbLeave = require('../model/registerLeave')

module.exports = async(req, res) => {
    try{
        if(!req.body.date || !req.body.email){
            res.json({
                success: false,
                msg: 'please enter all details'
            })
        } else{
            let leaveData = await DbLeave.find({$and: [{dateOfLeave: req.body.date}, {'reportingManager.email': req.body.email}]})
            if(leaveData.length != 0){
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
        console.log(err)
        res.json({
            success: false,
            msg: 'Something went wrong'
        })
    }
}