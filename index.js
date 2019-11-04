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

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

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

app.post('/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
 
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})