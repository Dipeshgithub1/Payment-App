const express = require("express")
const router = express.Router()

const transactionController = require("../controllers/transaction.controller")
const {authmiddleware} = require("../middleware/middlewares")



router.get("/history",authmiddleware,transactionController.getMyTransaction)

module.exports = router;