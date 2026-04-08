const mongoose = require('mongoose')
const password = process.argv[2]
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type: String
      ,minLength: 3,
      required: true
    },
    number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    // Mantener returnedObject.id para que el frontend use el id para eliminar/actualizar.
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)