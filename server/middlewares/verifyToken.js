const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
    if(!req.headers.authorization) return res.status(403).json({message: "Not authorized, no token"})

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) return res.status(403).json({message: "Wrong or expired"})
            else {
                req.user = data
                next()
            }
        })
    }
}