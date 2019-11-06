const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    {
        id: 1,
        name: "Carlos Alba",
        number: "12335",
    },
    {
        id: 2,
        name: "Pepe Pérez", 
        number: "23456"
    },
    {
        id: 3,
        name: "Luis Castro",
        number: "123435"
    }
]

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (request, response) => {
    const people = Object.keys(persons).length;
    const date = new Date();
    response.set('Content-Type', 'text/html');
    response.send(`<p>Phonebook has info for ${people} people</p><p>${date}</p>`)

  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person .id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body


  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const duplicated = persons.find(person => person.name === body.name)
  
  if (duplicated) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
 
  const person = {
    id: Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

