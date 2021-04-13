const express = require('express')
const router  = express.Router()

const User = require('../model/UserModel')
const { UserService } = require('../services')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const signUp = async (req, res, next) => {
    try {
        const { email, password, userType, username } = req.body

        const foundUser = await User.findByEmail(email)
        if (foundUser) {
            return res.status(400).json({
                message: 'EMAIL_ALREADY_EXIST'
            })
        }

        const createdUser = await UserService.createUser(email, password, userType, username)

        return res.status(200).json({
            message: 'USER_CREATED',
            user_id: createdUser.id,
        })

    } catch (err) {
        next(err)
    }
}


router.post('/signup', signUp)

module.exports = router
