const express = require("express");

const router = express.Router();
const classes = require("../models/class_model");
const teacher = require("../models/teacher_model");

router.get("", async (req, res) => {
  try {
    const classes_data = await classes
      .find()
      .populate("teacher_id")
      .lean()
      .exec();

    res.status(200).send(classes_data);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/:teacher_id", async (req, res) => {
  try {
    const classes_data = await classes
      .find({ teacher_id: req.params.teacher_id })
      .populate("teacher_id")
      .lean()
      .exec();

    res.status(200).send(classes_data);
  } catch (e) {
    res.send(e.message);
  }
});

router.post("", async (req, res) => {
  try {
    const classes_data = await classes.create(req.body);

    res.status(200).send(classes_data);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/:class_id", async (req, res) => {
  try {
    await classes.findByIdAndDelete(req.params.class_id);

    res.status(200).send("deleted");
  } catch (e) {
    res.send(e.message);
  }
});


router.patch("/:id", async (req, res) => {

    try {
       
      const classes_data = await classes.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      res.status(201).send(classes_data);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

module.exports = router;
