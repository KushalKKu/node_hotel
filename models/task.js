const mongoose = require('mongoose')


const taskItemSchema = new mongoose.Schema({
    title:{
        type : String,
        required: true
    },
    description:{
        type: String,
    },
    priority:{
        type: Number,
        enum:[1,2,3,4,5],
        required:true
    },
    dueDate:{
        type: Date,

    }
}) 

const TaskItem = mongoose.model("TaskItem", taskItemSchema)
module.exports= TaskItem;