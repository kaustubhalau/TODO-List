const { default: mongoose } = require("mongoose");

const toDoSchema = new mongoose.Schema({
    description : {
        type: String,
        required:true
    },
    category : {
        type: String,
        required:true
    },
    dateAndTime : {
        type:String,
        required:true
    }
});

const toDo = mongoose.model('toDO',toDoSchema);

module.exports = toDo;