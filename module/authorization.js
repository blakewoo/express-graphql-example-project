
exports.sessionVerify = function (req, res, next) {
    if(req.session.isLogin) {
        next()
    }
    else {
        res.status(401).json({message:"Session is invalid"})
    }
}