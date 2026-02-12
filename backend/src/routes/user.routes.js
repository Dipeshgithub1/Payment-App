const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const {authmiddleware} = require("../middleware/middlewares")

   

//auth 
router.post("/signup",authController.signup)
router.post("/signin",authController.signin)

//user
router.put("/",authmiddleware,userController.updateUser)
router.get("/bulk",authmiddleware,userController.getBulkUsers)


module.exports = router;





