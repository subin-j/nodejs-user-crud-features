require('dotenv').config()
const { PORT } = process.env
const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const mongoose = require('./model')

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
    } catch (err) {
        console.error(err)
        await mongoose.connection.close()
    }
}

start()



// userInstance.email = 'test@test.com'
// userInstance.password = '12341234'
// userInstance.userType = 'admin'
// userInstance.username = 'abc'

// userInstance.save((err) => {
//     if(err){
//         console.log('err' + err)
//     }else{
//         console.log('success')
//     }
// });

// UserModel.deleteOne({'username': '지영'}, (err, docs) => {
//     if(err){
//         console.log('err' + err)
//     }else{
//         console.log(docs)
//     }
// })
