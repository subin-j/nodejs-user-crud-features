const express = require('express')
const router  = express.Router()

const User = require('../model/UserModel')
const { UserService } = require('../services')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const signUp = async (req, res, next) => {
    try {
        const { email, password, userType, username } = req.body

        const foundUser = User.findByEmail(email)
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

const logIn = async (req, res, next) => {
    try {
        const { email, password: inputPassword } = req.body

        const foundUser = await User.findByEmail(email)

        if (!foundUser) {
            return res.status(404).json({
                message: 'USER_DOES_NOT_EXIST'
            })
        }


        const { id, password: hashedPassword } = foundUser
        console.log(inputPassword, hashedPassword)
        console.log(foundUser)
        const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)

        if (!isValidPassword) {
            return res.status(404).json({
                message: 'INVAILD_PASSWORD'
            })
        }

        const token = foundUser.generateAuthToken()
        return res.status(200).json({
            message: 'LOGIN_SUCCESS',
            token
        })


    } catch (err) {
        next(err)
    }
}


router.post('/signup', signUp)
router.post('/login', logIn)

module.exports = router
