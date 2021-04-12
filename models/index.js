require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL,
    {
        dbName : 'anser',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err)=>{
    if(err){
        console.log('Error', err);
    }else{
        console.log('connection success')
    }
});

const Schema     = mongoose.Schema;
const ObjectId   = Schema.ObjectId;
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
    }
});

const UserModel = mongoose.model('User', UserSchema);
const userInstance = new UserModel();

userInstance.email = 'jojo@email.com'
userInstance.password = '12312341234'
userInstance.userType = 'user'
userInstance.username = 'jojo'
userInstance.save((err) => {
    if(err){
        console.log('err' + err)
    }else{
        console.log('success')
    }
});


UserModel.find({'userType': 'admin'}, (err, docs) => {
    if(err){
        console.log('err' + err)
    }else{
        console.log(docs)
    }
})