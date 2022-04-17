const admin = require("../models/admin_model");

require("dotenv").config();

const jwt = require("jsonwebtoken");
// const res = require("express/lib/response");

const newToken = (admin) => {
  return jwt.sign({ admin }, "process.env.jwt_sec_key");
};

const register = async (req, res) => {
  try {
    let admin_data = await admin.find({ email: req.body.email }).lean().exec();
    console.log(admin_data);

    if (admin_data.length !== 0) {
      return res
        .status(400)
        .send({ message: "account associated with this email already exist" });
    }

    admin_data = await admin.create(req.body);

    const token = newToken(admin_data);

    res.send({ admin_data, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const login = async (req,res) => {
  try {
    const admin_data = await admin
      .findOne({ email: req.body.email })
     

    if (!admin_data) {
      return res
        .status(400)
        .send({ message: "please check your email or password" });
    }

    const match = admin_data.checkPassword(req.body.password);

    if (!match) {

      return res
        .status(400)
        .send({ message: "please check your email or password" });
    }

    const token = newToken(admin_data);

    res.send({admin_data,token});

  } catch (e) {
    res.status(400).send(e.message);
  }
};



module.exports = { register, login };