const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/user.routes")
const accountRouter = require("./routes/account")

  
const app = express();

app.use(cors())
app.use(express.json())



//user 
app.use("/api/v1/user",userRouter)

//account 
app.use("/api/v1/account",accountRouter)

//transaction history 
app.use("/api/v1/transaction",accountRouter)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


module.exports = app;




