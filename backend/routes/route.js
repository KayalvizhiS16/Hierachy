const router = require("express").Router();

const {
 
  getUser,
 
} = require("../controller/userController");



// router.use(requireAuth); // Use the checkUser middleware globally

router.get("/get-user",getUser);


module.exports = router;
