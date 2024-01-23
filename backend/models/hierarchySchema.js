const mongoose = require("mongoose");

const hierarchySchema = new mongoose.Schema({
 employeeName:{
  type:String,
 },
 selectedEmployees: {
    type: Array,
  },
});

module.exports = mongoose.model("hierarchy", hierarchySchema);
