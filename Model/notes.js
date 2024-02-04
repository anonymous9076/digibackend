const mongoose = require('mongoose')
const {Schema} = mongoose

const notesSchema = new Schema({
    my_file:{
        type:String,
        require:true
    },
    class:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    pages:{
        type:Number,
        require:true
    },
    description:{
        type:String,
    },
    book:{
        type:String,
    },
    author:{
        type:String,
        require:true
    }

})
const notesModel = mongoose.model('notes',notesSchema)
module.exports = notesModel