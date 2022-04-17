const mongoose = require("mongoose");

const bcrypt= require("bcryptjs");

const admin_schema = new mongoose.Schema({

    first_name:{type:String,required:true },

    last_name:{type:String, required:true},
    
   email:{type:String, required:true},

   password:{type:String, required:true},
},{
    versionKey:false,
    timestamps:true,
});


admin_schema.pre("save", function(next){
    if(!this.isModified("password"))return next();


    var hash = bcrypt.hashSync(this.password,8)
    this.password = hash;
    return next();

});

admin_schema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

const admin = mongoose.model("admin",admin_schema)
module.exports = admin;