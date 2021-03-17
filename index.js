const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Reminder = require('./models/reminder')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))




/*
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)
*/
/*
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
}*/
const formatReminder = (reminder) => {
  return {
    name: reminder.name,
    timestamp: reminder.timestamp,
    id: reminder._id
  }
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/reminders', (request, response) => {
  Reminder
    .find({})
    .then(reminders => {
      response.json(reminders.map(formatReminder))
    })
  
})

app.get('/api/reminders/:id', (request, response) => {
  const id = Number(request.params.id)
  const reminder = reminders.reminders.find(reminder => reminder.id === id)

  if (reminder) {
    response.json(reminder) 
  } else {
    response.status(404).end()
   
  }
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
  
  /*
  const id = Number(request.params.id)
  reminders.reminders = reminders.reminders.filter(reminder => reminder.id !== id)
  response.status(204).end()
  */
})

/*
const generateId = () => {
  const id = Math.floor(Math.random()*10000000)
  return id
}

const isInArray = (props) => {
  const names= reminders.reminders.map(name => name.name)
  const verdict = names.includes(props)
  return verdict
}
*/

app.post('/api/reminders/', (request, response) =>{
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({error: 'content missing'})
  }
/* 
  if (body.name.trim().length === 0 || body.timestamp.trim().length === 0){
    return response.status(400).json({error: 'content missing!'})
  }
  
  if (isInArray(body.name)){
    return response.status(400).json({error: 'name must be unique'})
  }
*/
  const reminder = new Reminder({
    name: body.name,
    timestamp: body.timestamp,
    //id: generateId()
  })

  //reminders.reminders= reminders.reminders.concat(reminder)
  reminder
    .save()
    .then(savedReminder => {
      response.json(formatReminder(savedReminder))
    })
  
})

//const error = (request, response) => {
//  response.status(404).send({ error: 'unknown endpoint' })
//}
//app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})