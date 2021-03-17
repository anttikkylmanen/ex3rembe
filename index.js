const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Reminder = require('./models/reminder')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))


const formatReminder = (reminder) => {
  return {
    name: reminder.name,
    timestamp: reminder.timestamp,
    id: reminder._id
  }
}

app.get('/api/reminders', (request, response) => {
  Reminder
    .find({})
    .then(reminders => {
      response.json(reminders.map(formatReminder))
    })
  
})

app.get('/api/reminders/:id', (request, response) => {
  Reminder
    .findById(request.params.id)
    .then(reminder => {
      if (reminder) {
        response.json(formatReminder(reminder))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
  
})

app.delete('/api/reminders/:id', (request, response) =>{
  Reminder
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
  
  
})

/*
const isInArray = (props) => {
  const names= reminders.reminders.map(name => name.name)
  const verdict = names.includes(props)
  return verdict
}*/


app.post('/api/reminders/', (request, response) =>{
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  if (body.name.trim().length === 0 || body.timestamp.trim().length === 0){
    return response.status(400).json({error: 'content missing!'})
  }
  
  /*if (isInArray(body.name)){
    return response.status(400).json({error: 'name must be unique'})
  }*/

  const reminder = new Reminder({
    name: body.name,
    timestamp: body.timestamp
  })

  reminder
    .save()
    .then(savedReminder => {
      response.json(formatReminder(savedReminder))
    })
  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})