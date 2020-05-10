const regex = require('../common/regex')


exports.reg = (req, res, next) => {
    if(!req.body.email || !req.body.reportingManager.email){
        res.json({
            success: false,
            msg: 'please provide all details...'
        })
    }else{
        req.body.email = req.body.email.trim()
        req.body.reportingManager.email = req.body.reportingManager.email.trim()
        
        let emailCheck = regex.emailRegex.test(req.body.email)
        let manaEmailCheck = regex.emailRegex.test(req.body.reportingManager.email)

        if(!emailCheck || !manaEmailCheck){
            res.json({
                success: false,
                msg: 'Invalid email'
            })
        }else{
            next()
        }
    }
}

exports.getLeave = (req, res, next) => {
    if(!req.body.email){
        res.json({
            success: false,
            msg: 'please provide all details...'
        })
    }else{
        req.body.email = req.body.email.trim()

        let emailCheck = regex.emailRegex.test(req.body.email)

        if(!emailCheck){
            res.json({
                success: false,
                msg: 'Invalid email'
            })
        }else{
            next()
        }
    }
}