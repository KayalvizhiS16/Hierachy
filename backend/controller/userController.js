const user = require("../models/userSchema.js");
const hierarchy=require("../models/hierarchySchema.js")



//get
const getUser = async (req, res) => {
  try {
    const db = await user.find();

    if (db.length) {
      return res.status(200).send({ message: "Data fetched successfully", db});
    } else {
      return res.status(404).send({ message: "No data fund in the DB" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server  side error" });
  }
};
//post
const createFlow= async (req, res) => {
  const { selectedEmployees,employeeName } = req.body;
  try {
   
   
    const newFlow = new hierarchy({
     employeeName,
    selectedEmployees,
    });
   const result=await newFlow.save()
    res.status(200).json({ message: 'Selected employees submitted successfully',result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

      


module.exports = {
  getUser,
  createFlow,
 };
