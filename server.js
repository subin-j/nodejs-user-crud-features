require('dotenv').config()
const { PORT } = process.env
const http = require('http')
const app = require('./app') 
const server = http.createServer(app) // Server 는 express 앱에 의존성을 가집니다.
const mongoose = require('mongoose')

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
  } catch (err) {
    console.error(err)
    await mongoose.$disconnect()
  }
}

start()