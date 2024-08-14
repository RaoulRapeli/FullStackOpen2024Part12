require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL || undefined
module.exports = {
  MONGO_URL,
}