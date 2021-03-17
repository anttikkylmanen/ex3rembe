const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const reminderSchema = new mongoose.Schema({
    name: String,
    timestamp: Date
})
  
const Reminder = mongoose.model('Reminder', reminderSchema)

module.exports = Reminder