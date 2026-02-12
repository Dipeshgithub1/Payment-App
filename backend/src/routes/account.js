const express = require("express")
const router = express.Router()
const accountController = require("../controllers/account.controller")
const transactionController = require("../controllers/transaction.controller")
const {authmiddleware} = require("../middleware/middlewares")


router.get("/balance",authmiddleware,accountController.balance)

router.post("/transfer",authmiddleware,accountController.transfer)

//Route for transaction history
router.get("/history",authmiddleware,transactionController.getMyTransaction)

module.exports = router;