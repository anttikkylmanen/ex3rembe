const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const reminderSchema = new mongoose.Schema({
    name: String,
    //timestamp: Date
    timestamp: String
})

const Reminder = mongoose.model('Reminder', reminderSchema)
  
/*
if (process.argv.length<=4) {
    //console.log('anna muistutus ja ajankohta')
    //process.exit(1)
    Reminder
        .find({})
        .then(reminders => {
        reminders.forEach(reminder => {
          console.log(reminder)
        })
        mongoose.connection.close()
        process.exit(1)
    })
}*/


  
const name = process.argv[2]
const time = process.argv[3]

const reminder = new Reminder({
  name: name,
  //timestamp: new Date(time)
  timestamp: time
})

process.argv.length<=3?
    Reminder.find({}).then(result =>{
    result.forEach(rmndr =>{
        console.log(rmndr)
    })
        mongoose.connection.close()
        //process.exit(1)
    }):
    reminder
        .save()
        .then(response => {
        console.log(`adding Reminder ${reminder.name} at ${reminder.timestamp} to the reminder database`)
        mongoose.connection.close()
  })


/*if (process.argv.length<=3) {
    Reminder.find({}).then(result =>{
        result.forEach(rmndr =>{
            console.log(rmndr)
        })
            mongoose.connection.close()
            //process.exit(1)
    })

}
if(process.argv.length >= 4){
    reminder
        .save()
        .then(response => {
        console.log(`adding Reminder ${reminder.name} at ${reminder.timestamp} to the reminder database`)
        mongoose.connection.close()
  })
}*/
