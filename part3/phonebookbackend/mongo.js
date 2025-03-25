require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  /* Add a new person. */
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
  })

  person.save()
    .then(() => {
      console.log(`added ${person.name} '${person.number}' to phonebook`)
      mongoose.connection.close()
    })
    .catch(error =>
      console.log(`Error: ${error}`)
    )
} else {
  /* Get existing persons. */
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
