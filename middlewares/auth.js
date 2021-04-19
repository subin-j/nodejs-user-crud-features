const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')
const User = require('../model/UserModel')


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        
        if (!token) {
            return res.status(403).json({
                message: 'TOKEN_DOES_NOT_EXIST'
            })
        }
        
        const decoded = jwt.verify(token, SECRET_KEY)
        const { user_id } = decoded

        req.user = await User.findById(user_id).exec()
        next()
        
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = authMiddleware
