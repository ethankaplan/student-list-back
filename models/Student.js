const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  firstName:{type:String,required: true},
  lastName:{type:String,required: true},
  email: {type: String},
  rollno: {type: Number}
},{collection: 'students'})

module.exports = mongoose.model('Student', studentSchema)