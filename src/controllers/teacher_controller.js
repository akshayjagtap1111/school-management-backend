const express = require("express");

const router = express.Router();
const teacher = require("../models/teacher_model");

router.get("", async (req, res) => {
  try {
    let teacher_data;
    let page = req.query.page;
    let qty = req.query.qty;
    let order = req.query.order;
    let gender = req.query.gender;

    if (gender === "male") {
      teacher_data = await teacher
        .find({ gender: "male" })
        .sort({ age: order })
        .skip((page - 1) * qty)
        .limit(qty)
        .lean()
        .exec();
    } else if (gender === "female") {
      teacher_data = await teacher
        .find({ gender: "female" })
        .sort({ age: order })
        .skip((page - 1) * qty)
        .limit(qty)
        .lean()
        .exec();
    } else {
      teacher_data = await teacher
        .find()
        .sort({ age: order })
        .skip((page - 1) * qty)
        .limit(qty)
        .lean()
        .exec();
    }

    res.status(200).send(teacher_data);
  } catch (e) {
    res.send(e.message);
  }
});

//to find the perticular teacher
router.get("/:name", async (req, res) => {
  try {
    const teacher_data = await teacher
      .find({ first_name: req.params.name })
      .lean()
      .exec();

    res.status(200).send(teacher_data);
  } catch (e) {
    res.send(e.message);
  }
});

router.post("", async (req, res) => {
  try {
    const teacher_data = await teacher.create(req.body);

    res.status(200).send(teacher_data);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/:class_id", async (req, res) => {
    try {
      await teacher.findByIdAndDelete(req.params.class_id);
  
      res.status(200).send("deleted");
    } catch (e) {
      res.send(e.message);
    }
  });
  
  
  router.patch("/:id", async (req, res) => {
  
      try {
         
        const teacher_data = await teacher.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
          .lean()
          .exec();
        res.status(201).send(teacher_data);
      } catch (err) {
        return res.status(500).send(err.message);
      }
    });

module.exports = router;
