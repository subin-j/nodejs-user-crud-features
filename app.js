const express = require('express')

const routes = require('./routes')

const app = express()

app.use((err, req, res, next) => {
    const { status, message } = err
    console.error(err)
    res.status(status || 500).json({ message })
  })
  
module.exports = app