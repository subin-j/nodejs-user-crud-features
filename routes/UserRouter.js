const express = require('express')
const router  = express.Router()

const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')

const { UserService } = require('../services')
const User            = require('../model/UserModel')
const authMiddleware  = require('../middlewares/auth')

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

const logIn = async (req, res, next) => {
    try {
        const { email, password: inputPassword } = req.body
                    
        if (email === undefined || inputPassword === undefined) {
            return res.status(400).json({
                message: 'KEY_ERROR'
            })
        }

        const foundUser = await UserService.matchUser(res, email, inputPassword)
        
        const token = foundUser.generateAuthToken()
        return res.status(200).json({
            message: 'LOGIN_SUCCESS',
            token
        })

    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

const deleteAccount = async (req, res, next) => {
    try {
        const { email, password: inputPassword } = req.body
        const foundUser = await UserService.matchUser(res, email, inputPassword)
    
        if (foundUser.id !== req.user.id) {
            return res.status(400).json({
                message: 'USER_DOES_NOT_MATCH_WITH_TOKEN'
            })
        }

        foundUser.deletedAt = Date()
        await foundUser.save()

        return res.status(202).json({
            message: 'DELETE_SUCCESS'
        })

    } catch (err) {
        next(err)
    }
} 

const updateAccount = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (username) {
            req.user.username = username
        }

        if (password) {
            req.user.password = password
        }

        await req.user.save()
        return res.status(200).json({
            message: 'USER_UPDATE_SUCCESS'
        })

    } catch (err) {
        next(err)
    }
}

router.post('/signup', signUp)
router.post('/login', logIn)

router.delete('', authMiddleware ,deleteAccount)
router.patch('', authMiddleware, updateAccount)

module.exports = router
