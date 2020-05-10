const regex = require('../common/regex')


module.exports = (req, res, next) => {
    if(!req.body.email){
        res.json({
            success: false,
            msg: 'please provide all details'
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