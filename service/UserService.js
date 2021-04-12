const mongoose = require('../mongoose') // Service 로직은 오직 Model(=mongoose) 에만 의존합니다.
const { makeDataForCreate } = require('../utils')

const createUser = (fields) => {
  const data = makeDataForCreate(fields)
  return mongoose.users.create({ data })
}

const findUser = (field) => {
  const [uniqueKey] = Object.keys(field)

  const isKeyId = uniqueKey === 'id'
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]

  return mongoose.users.findOne({ where: { [uniqueKey]: value } })
}

module.exports = {
  createUser,
  findUser,
}