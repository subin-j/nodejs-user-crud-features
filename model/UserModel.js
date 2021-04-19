const { SECRET_KEY } = process.env
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema     = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            const emailRegEx = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9_-]+\.[a-zA-Z-.]+$/
            if (!emailRegEx.test(value)) {
                throw new Error("Email is not valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            const passwordRegEx = /^(?=.*[!-/:-@])(?!.*[ㄱ-ㅣ가-힣]).{8,20}$/
            if (!passwordRegEx.test(value)) {
                throw new Error("Password is not valid")
            }
        }
    },
    userType: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    username: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
},
    {
        timestamps: true
    })

UserSchema.pre('save', async function(next) {
    const user = this
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
