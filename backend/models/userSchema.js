const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 emp_id: {
    type: String,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  
});

module.exports = mongoose.model("employee", userSchema);
