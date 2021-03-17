const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const reminderSchema = new mongoose.Schema({
    name: String,
    timestamp: String
})

const Reminder = mongoose.model('Reminder', reminderSchema)
  
const name = process.argv[2]
const time = process.argv[3]

const reminder = new Reminder({
  name: name,
  timestamp: time
})

process.argv.length<=3?
    Reminder.find({}).then(result =>{
    result.forEach(rmndr =>{
        console.log(rmndr)
    })
        mongoose.connection.close()
    }):
    reminder
        .save()
        .then(response => {
        console.log(`adding Reminder ${reminder.name} at ${reminder.timestamp} to the reminder database`)
        mongoose.connection.close()
  })
