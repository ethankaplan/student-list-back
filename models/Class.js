const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let classSchema = new Schema({
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    title:{type:String},
    students:[{type: Schema.Types.ObjectId, ref: 'Student'}],


},{
  collection: 'classes'
})

module.exports = mongoose.model('Class', classSchema)