
const express = require('express');
const router = express.Router();

  const classSchema = require('../models/Class') 
  
  //CREATE
  router.route('/create-class').post((req, res, next) => {
    classSchema.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        
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
router.route('/').get((req, res, next) => {
  console.log("read route")
  classSchema.find((error, data) => {
    if (error) {
      console.log("bad class")
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

router.route('/:id').get((req, res, next) => {
  classSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

  module.exports = router;