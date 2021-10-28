const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

  let userSchema = require('../models/User');
  const studentSchema = require('../models/Student');
  
  //CREATE
  router.route('/create-user').post((req, res, next) => {
    console.log("hit")
    
    userSchema.create(req.body, (error, data) => {
      if (error) {
        console.log(data)
        console.log(error)
        res.json({err,
        msg:"Bad"})
        return next(error)
      } else {
        const passwordHash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
        data.password=passwordHash;
        let roll = Math.floor(100000 + Math.random() * 900000);
        let stoppage = true;
        while(stoppage){
          
          if(userSchema.findOne({rollNum: roll}).data==null && studentSchema.findOne({rollNum: roll}).data==null){
            stoppage=false
          }else{
            
            roll = Math.floor(100000 + Math.random() * 900000);
          }
        
          
          }
        data.rollNum=roll;
        data.save();
        console.log(data)
        res.json(data)
      }
    })
  });

  //LOGIN
  router.route('/log-user').post((req, res, next) => {

    userSchema.findOne({email: req.body.email},(error, data)=>{
    if(error){
      return next(error)
    }else{

        const user = data;
        if(user==null){
          res.json({
            msg:"Server down"
          })
        }
        else if(bcrypt.compareSync(req.body.password, user.password)){

          user.password="no peeking"
          
          res.json({
            user,
            success: user? true : false,
            msg:"Success!"
          })
        }else{
          res.json({
            msg:"Bad login"})
        }
        
      }
    })
  })

  //DELETE
  router.route('/delete-user/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
  userSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/teachers').get((req,res,next)=>{
  userSchema.find({accType:'Teacher'}, (error, data) => {
    if (error) {
      console.log("bad")
      return next(error)

    } else {
      res.json(data)
    }
  })
})

router.route('/user/:id').get((req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

  module.exports = router;