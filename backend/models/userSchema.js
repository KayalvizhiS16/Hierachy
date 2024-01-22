const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 emp_id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
 
  role: {
    type: String,
  },
  
});

module.exports = mongoose.model("employee", userSchema);
