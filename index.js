const express = require('express')
const app = express()

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

app.get('/reminders', (req, res) => {
  res.json(reminders)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})