const DbLeave = require('../model/registerLeave')

module.exports = async(req, res) => {
    try{
        if(!req.body.date || !req.body.email){
            res.json({
                success: false,
                msg: 'please enter all details'
            })
        } else{
            gt = new Date(req.body.date)
            lt = new Date(gt.getFullYear(), gt.getMonth(), gt.getDate() + 1)
            let leaveData = await DbLeave.find({$and: [{dateOfLeave: { "$gte": gt, "$lte": lt }}, {'reportingManager.email': req.body.email}]})
                    .sort({'dateOfLeave': 1})
            console.log(leaveData)
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