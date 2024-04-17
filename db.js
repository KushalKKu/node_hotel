const mongoose = require('mongoose')

//Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

//Set up MongoDb connection
mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

//Access the Default Connection Object
const db= mongoose.connection;

//Define event listener for database connection

db.on('connected', ()=>{
    console.log('connected to mongoDB server')
})

db.on('error', (err)=>{
    console.log('mongoDB connection error', err)
})

db.on('disconnected', ()=>{
    console.log('mongoDB disconnected')
})

//expoer the database collection'

module.exports = db
