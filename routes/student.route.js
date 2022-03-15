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

router
  .route("/update-student/:id")
  // Get Single Student
  .get((req, res) => {
    studentSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })

  // Update Student Data
  .put((req, res, next) => {
    studentSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      }
    );
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

// Get Student Data To Edit
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