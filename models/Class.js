const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let classSchema = new Schema({
    teacher: {type: String},
    title:{type:String},
    students:[String],


},{
  collection: 'classes'
})

module.exports = mongoose.model('Class', classSchema)