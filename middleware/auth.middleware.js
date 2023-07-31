const jwt = require('jsonwebtoken')
require('dotenv').config()
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        let decoded = jwt.verify(token, process.env.KEY)
        if (decoded) {
            req.body.userId = decoded.userId;
            req.body.userName = decoded.userName;
            next()
        } else {
            res.status(400).json("Wrong Credentials")
        }
    } else {
        res.status(400).json("please login")
    }

}

module.exports = {
    auth
}