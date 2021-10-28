const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

  const classSchema = require('../models/Class') 
  const userSchema = require('../models/User');
  const studentSchema = require('../models/Student');
  
  //CREATE
  router.route('/create-class').post((req, res, next) => {
    console.log("hit")
    
    classSchema.create(req.body, (error, data) => {
      if (error) {
        console.log(data)
        console.log(error)
        res.json({err,
        msg:"Bad"})
        return next(error)
      } else {
        data.save();
        console.log(data)
        res.json(data)
      }
    })
  });

  //EDIT
  router.route('/update-class/:id').put((req, res, next) => {
    classSchema.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        
      } else {
        res.json(data)
        console.log('Class updated successfully !')
      }
    })
  })

 
  //DELETE
  router.route('/delete-class/:id').delete((req, res, next) => {
    classSchema.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

  //READ
router.route('/class').get((req, res, next) => {
  classSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/class/:id').get((req, res, next) => {
  classSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

  module.exports = router;