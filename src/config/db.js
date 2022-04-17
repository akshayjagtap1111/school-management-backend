const mongoose = require("mongoose");

const connect = async () => {
  try {
    return await mongoose.connect(
      "mongodb+srv://Akshay:akshayj9985@cluster0.h8esm.mongodb.net/school-management?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log("error form connection :", err.message);
  }
};

module.exports = connect;
