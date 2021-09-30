
const express = require('express');
const router = express.Router();


//Models
const studentSchema = require('../models/Student');
const userSchema = require('../models/User')

// CREATE Student
router.route('/create-student').post((req, res, next) => {
  studentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      
      console.log(data)
      res.json(data)
    }
  })
});

// READ Students
router.route('/').get((req, res, next) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.route('/edit-student/:id').get((req, res, next) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Student
router.route('/update-student/:id').put((req, res, next) => {
  studentSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Student updated successfully !')
    }
  })
})

// Delete Student
router.route('/delete-student/:id').delete((req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

//Generate Roll Number, ensuring it's not already in use
  router.route('/gen').get((req, res, next) => {
    let stoppage = true;
    let roll = Math.floor(100000 + Math.random() * 900000);
    while(stoppage){
      
        if(userSchema.findOne({rollNum: roll}).data==null && studentSchema.findOne({rollNum: roll}).data==null){
          stoppage=false
        }else{
          
          roll = Math.floor(100000 + Math.random() * 900000);
        }
      }

      
        res.json(roll)
      
  })
  

module.exports = router;