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

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
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