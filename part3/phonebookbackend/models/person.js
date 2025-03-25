const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

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
    required: [true, 'Name is required!'],
    unique: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        /*
          ^...$   → Anchors the regex to match the entire string.
          \d{2,3} → Matches 2-3 digits in the first part.
          -       → Ensures a hyphen separates the two parts.
          \d{7,8} → Matches 7-8 digits in the second part.
        */
        return /^\d{2,3}-\d{7,8}$/.test(v)
      },
      message: props => `'${props.value}' is not a valid phone number!`
    },
    required: [true, 'Phone number is required!']
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
