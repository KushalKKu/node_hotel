const express = require('express');
const app = express();
const db= require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //stores in req.body

const Person = require('./models/person')
const MenuItem= require('./models/menuItem')
const TaskItem =  require('./models/task')

app.get('/', (req, res) => {
res.send('Hello from Hotel!');
});

app.post("/api/tasks", async(req,res)=>{
    try{
         const data= req.body

         const newTask = new TaskItem(data)

         const response = await newTask.save()
         console.log("Task added successfully")
         res.status(200).json(response)

    }catch(err){
            console.log("Error saving task",err)
            res.status(500).json({err:'internal server error'})
    }
})

app.get('/api/tasks', async(req,res)=>{
    try{
        const Items = await TaskItem.find()
        console.log("task items fetched")
        res.status(200).json(Items)
    }catch(err){
        console.log("error fetching the data", error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu', menuRoutes)

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

app.listen(3000, () => {
console.log('Server is running on port 3000');
});