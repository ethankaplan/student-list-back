const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let classSchema = new Schema({
    teacher: {type: String,required: true},
    title:String,
    students:[String],


},{
  collection: 'classes'
})

module.exports = mongoose.model('Class', classSchema)