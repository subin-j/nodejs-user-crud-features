const express = require('express')
const routes  = require('./routes')

require('./model/connection')

const app = express()

app.use(express.json())
app.use(routes)

app.use((err, req, res, next) => {
    const {status, message} = err
    console.error(err)
    console.log('middleware called ------------------------')
    res.status(status || 500).json({ message })
})

module.exports = app
