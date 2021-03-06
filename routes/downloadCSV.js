const DbLeave = require('../model/registerLeave')
const { Parser, transforms: { unwind } } = require('json2csv');

module.exports = async(req, res) =>{
    try{
        let query = { $and: [{}] }
        if (req.body.startDate && req.body.endDate) {
            let gt, lt;
            if (req.body.startDate === req.body.endDate) {
                gt = new Date(req.body.startDate)
                lt = new Date(gt.getFullYear(), gt.getMonth(), gt.getDate() + 1)
            } else {
                gt = new Date(req.body.startDate);
                lt = req.body.endDate
            }
            query.$and.push({
                'dateOfLeave': { "$gte": gt, "$lte": lt }
            })
        } else if (req.body.endDate) {
            let end = new Date()

            let start = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 90)
            query.$and.push({
                $or: [{ 'dateOfLeave': { "$gte": start, "$lte": req.body.endDate } }]
            })
        } else if (req.body.startDate) {
            query.$and.push({
                'dateOfLeave': { "$gte": req.body.startDate }
            })
        }
        if (!req.body.startDate || !req.body.endDate) {
            let end = new Date()
            let start = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 90)
            query.$and.push({
                $or: [{ 'dateOfLeave': { "$gte": start, "$lte": end } }]
            })
        }
        let leaveData = await DbLeave.find(query)
                .sort({createdAt: -1})
        if(leaveData.length != 0){
            console.log('>>>>>>>>>>>>>>>>', leaveData)
            const fields = ['reportingManager.name', 'reportingManager.email', 'dateOfLeave', 'employeeName', 'employeeEmail', 'reasonOfLeave', 'status'];
            let json2csvParser = new Parser({fields});
            let csv = json2csvParser.parse(leaveData);
            // res.send(Buffer.from(csv));
            res.send(csv);

        } else {
            res.json({
                success: false,
                msg: 'No data found'
            })
        }
    } catch(err){
        console.log(err)
        res.json({
            success: false,
            msg: 'Something went wrong'
        })
    }
}