require('dotenv').config()
const { PORT } = process.env;
const http = require('http');
const index = require('./models/index');
const server = http.createServer(index);
const mongoose = require('mongoose');

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
    } catch (err) {
        console.error(err)
        await mongoose.$disconnect()
    }
}
start()

mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'anser'
    },
     (err) => {
    if(err) {
        console.log("Err". err);
    }else {
        console.log("connection Successful")
    }
})