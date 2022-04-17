const mongoose = require("mongoose");

const teacher_schema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },

    last_name: { type: String, required: true },

    email: { type: String },

    address: { type: String },

    phone_number: { type: Number },

    age: { type: Number },

    gender: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const teacher = mongoose.model("teacher", teacher_schema);
module.exports = teacher;
