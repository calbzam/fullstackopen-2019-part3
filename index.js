const express = require('express')
const app = express()
const bodyParser = require('body-parser')

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
  console.log(body);
  console.log(body.content);

  if ((Object.keys(request.body).length === 0)) {
    return response.status(400).json({ 
      error: 'content missing' 
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})