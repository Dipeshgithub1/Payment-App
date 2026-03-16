const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const {authmiddleware} = require("../middleware/middlewares")
const googleAuth = require("../controllers/googleAuth")

   

//auth 
router.post("/signup",authController.signup)
router.post("/signin",authController.signin)

//google auth
router.post("/google",googleAuth.googleAuth)

//user
router.put("/",authmiddleware,userController.updateUser)
router.get("/me",authmiddleware,userController.getMe)
router.get("/bulk",authmiddleware,userController.getBulkUsers)


module.exports = router;





