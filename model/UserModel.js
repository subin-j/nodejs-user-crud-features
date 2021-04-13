const { SECRET_KEY } = process.env
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema     = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
    }
},
    {
        timestamps: true
    })

UserSchema.pre('save', async function(next) {
    const user = this
    console.log(user.isModified('password'))
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.methods.generateAuthToken = function() {
    const user_id = this._id
    const token = jwt.sign({ user_id }, SECRET_KEY, { expiresIn: '2h' })
    return token
}

UserSchema.statics.findByEmail = (email) => {
    const user = UserModel.findOne({ email })
    return user
}

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel
