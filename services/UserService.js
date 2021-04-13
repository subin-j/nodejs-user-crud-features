const User = require('../model/UserModel')

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

module.exports = {
    createUser,
}



// const test = await User.findByEmail("test1333@test1.com")
// console.log(`ddddddddddddd ${test}`)

