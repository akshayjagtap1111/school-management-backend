const mongoose = require("mongoose");

const classes_schema = new mongoose.Schema(
  {
    grade: { type: String, required: true },

    section: { type: String, required: true },

    subject: { type: String },

    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        required: true,
       }

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const classes = mongoose.model("classes", classes_schema);
module.exports = classes;
