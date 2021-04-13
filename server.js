require('dotenv').config()

const { PORT } = process.env
const http     = require('http')
const app      = require('./app')
const server   = http.createServer(app)
const mongoose = require('mongoose')

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
    } catch (err) {
        console.error(err)
        await mongoose.connection.close()
    }
}

start()
