require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: 'anser'
    },
    (err)=>{
    if(err){
        console.log('Error', err);
    }else{
        console.log('connection success')
    }
});
