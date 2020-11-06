const mongoose = require('mongoose')
const taskSchema=new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    taskState:{
        type:Number,
        default:0
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate:{
        type:Date,

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task