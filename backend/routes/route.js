const router = require("express").Router();

const {
 
  getUser,
  getFlow,
  createFlow,
 
} = require("../controller/userController");



// router.use(requireAuth); // Use the checkUser middleware globally

router.get("/get-user",getUser);
router.get("/get-flow",getFlow);
router.post("/create-flow",createFlow);


module.exports = router;
