const express = require("express");
router = express.Router();

// Student Model
let studentSchema = require("../models/Student");

// CREATE Student
router.post("/create-student", (req, res) => {
  studentSchema.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({
        message: `Email Address ${req.body.email} is already taken.
      Use Another Email Address !` });
    } else {
      const newUser = new studentSchema({
        name: req.body.name,
        email: req.body.email,
        rollno: req.body.rollno
      });
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

// Update Student
router.put("/update-student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const findStudent = await studentSchema.findOne({ email: req.body.email })
    if (findStudent) {
      return res.json({
        message: `Email Address ${req.body.email} is already taken.
        Use Another Email Address !` })
    }
    else {
      const updateStudent = await studentSchema.findByIdAndUpdate(_id, req.body, {
        new: true
      });

      res.status(200).send(updateStudent);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


// READ Students
router.route("/get-students").get((req, res) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single Student
router.route("/edit-student/:id").get((req, res) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Delete Student
router.delete("/delete-student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteStudent = await studentSchema.findByIdAndDelete(_id, req.body);

    if (!_id) {
      return res.status(404).send();
    } else {
      res.send(deleteStudent);
    }

  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;