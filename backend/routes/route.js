const router = require("express").Router();
 
const {
 
  getUser,
  getFlow,
  createFlow,
  submitFlow,
  editEmployeeName,
  deleteEmployeeName
 
} = require("../controller/userController");
 
 
 
// router.use(requireAuth); // Use the checkUser middleware globally
 
router.get("/get-user",getUser);
router.get("/get-flow",getFlow);
router.post("/create-flow",createFlow);
router.post("/submit-flow",submitFlow);
router.put('/edit-employee', editEmployeeName)
router.delete('/delete-employee',deleteEmployeeName);
 
 
 
module.exports = router;
