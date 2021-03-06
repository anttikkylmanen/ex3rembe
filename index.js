//const { response } = require('express')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { response } = require('express')

app.use(bodyParser.json())

let reminders = {
  "reminders": [
    {
      "name": "Buy some eggs",
      "timestamp": "2021-11-10T13:00:00.141Z",
      "id": 1
    },
    {
      "name": "Make an omelette",
      "timestamp": "2021-11-11T08:00:00.141Z",
      "id": 2
    },
    {
      "name": "Wash dishes",
      "timestamp": "2021-11-11T09:00:00.000Z",
      "id": 3
    },
    {
      "name": "Buy more eggs",
      "timestamp": "2021-11-11T13:00:00.000Z",
      "id": 4
    }
  ]
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/reminders/', (req, res) => {
  res.json(reminders)
})

app.get('/api/reminders/:id', (req, res) => {
  const id = Number(req.params.id)
  const reminder = reminders.reminders.find(reminder => reminder.id === id)
  

  if (reminder) {
    res.json(reminder)
  } else {
    res.status(404).end()
   
  }
})

app.delete('/api/reminders/:id', (req, res) =>{
  const id = Number(req.params.id)
  reminders = reminders.reminders.filter(reminder => reminder.id !== id)
  res.status(204).end()

})

const generateId = () => {
  const id = Math.floor(Math.random()*10000000)
  //console.log(id, typeof id, String(id))
  return id
}

app.post('/api/reminders/', (req, res) =>{
  const body = req.body
  console.log(body)

  if (body.name === undefined) {
    return res.status(400).json({error: 'content missing'})
  }

  const reminder = {
    name: body.name,
    timestamp: body.timestamp,
    id: generateId()
  }
console.log(reminder)
  reminders.reminders= reminders.reminders.concat(reminder)

  res.json(reminder)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})