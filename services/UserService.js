const User = require('../model/UserModel')
const bcrypt = require('bcryptjs')

const createUser = async(email, password, userType, username) => {
    const userInfo = {
        email   : email,
        password: password,
        userType: userType,
        username: username
    }

    const user = new User(userInfo)
    return user.save()
}

const matchUser = async(res, email, inputPassword) => {
    const foundUser = await User.findByEmail(email)

    if (!foundUser) {
        return res.status(404).json({
            message: 'USER_DOES_NOT_EXIST'
        })
    }

    const { id, password: hashedPassword } = foundUser
    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)

    if (!isValidPassword) {
        return res.status(404).json({
            message: 'INVAILD_PASSWORD'
        })
    }

    return foundUser
}

module.exports = {
    createUser,
    matchUser,
}



// const test = await User.findByEmail("test1333@test1.com")
// console.log(`ddddddddddddd ${test}`)

