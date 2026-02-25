const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/user.routes")
const accountRouter = require("./routes/account")
const transferRouter = require("./routes/transfer")
const { FRONTEND_URL } = require("./config")

  
const app = express();

app.use(express.json())



app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));




//user 
app.use("/api/v1/user",userRouter)

//account 
app.use("/api/v1/account",accountRouter)

//transaction history 
app.use("/api/v1/transaction",transferRouter)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


module.exports = app;




