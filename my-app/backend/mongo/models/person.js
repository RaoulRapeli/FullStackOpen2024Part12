const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
require('dotenv').config()

const url = process.env.MONGO_URL
console.log('process.env.MONGO_URL',process.env.MONGO_URL)

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(?:\d{2}|\(\d{2}\))([-/.])\d{6}$/.test(v)||/^(?:\d{3}|\(\d{3}\))([-/.])\d{5}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)