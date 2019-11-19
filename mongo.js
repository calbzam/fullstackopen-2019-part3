const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


const url =
  `mongodb+srv://fullstack:${password}@cluster0-5uh6a.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

if ( process.argv.length < 4 ) {
  Person
  .find({})
  .then(people => {
    console.log('phonebook:')
  people.forEach(person =>
    console.log(person.name, person.number),
    mongoose.connection.close()
  )})
}

if ( process.argv.length > 4 ) {
const person = new Person({
  id: Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
  name,
  number
})

person.save().then(response => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
}
