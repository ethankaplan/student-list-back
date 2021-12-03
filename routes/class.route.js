const express = require("express");
const router = express.Router();

const classSchema = require("../models/Class");
const studentSchema = require("../models/Student");
//CREATE
router.route("/create-class").post((req, res, next) => {
  classSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//EDIT
router.route("/update-class/:id").put((req, res, next) => {
  classSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Class updated successfully !");
      }
    }
  );
});

//DELETE
router.route("/delete-class/:id").delete((req, res, next) => {
  classSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

//READ
router.route("/").get((req, res, next) => {
  classSchema
    .find((error, data) => {
      if (error) {
        console.log("bad class");
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    })
    .populate("teacher", "firstName lastName");
});

router.route("/:id").get((req, res, next) => {
  classSchema
    .findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
    .populate("teacher", "firstName lastName email _id")
    .populate("students");
});

//students not in a class
router.route("/non/:id").get((req, res, next) => {
  let students = [];

  studentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      students = data;
    }
  });
  classSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      students = students.filter(function (student) {
        return data.students.indexOf(student) === -1;
      });
      res.json(students);
    }
  });
});
module.exports = router;
