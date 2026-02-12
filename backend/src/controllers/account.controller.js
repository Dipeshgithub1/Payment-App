const { mongo, default: mongoose, startSession } = require("mongoose");
const { Account } = require("../models/accountdb");
const { Transaction } = require("../models/transaction");


exports.balance = async (req,res) => {
    try {
        const account = await Account.findOne({
            userId:req.userId
        });
       

        if(!account){
            return res.status(404).json({message:"Account not found"})
        }
        res.status(200).json({
        balance: account.balance
          }
        )
        
    } catch (error) {
         res.status(500).json({
            message:"server error",
            error: error.message
         })
    }
}


exports.transfer = async(req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const {to,amount} = req.body;
     
      
      if(!to || !amount ||  amount <= 0){
        await session.abortTransaction();
      return res.status(400).json({message:"Invalid input"})
      }
  // user can not send self 
      if (to === req.userId) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cannot transfer to self" });
    }

      //fetch the account within the transaction
      const account = await Account.findOne({userId:req.userId}).session(session)
        
      if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({message: "Insufficient Balance"})
      }
// receiver account
    const toAccount = await Account.findOne
    ({userId:to,
    }).session(session)

      if(!toAccount){
        await session.abortTransaction();
        return res.status(404).json
        ({message: "Invalid Account"})
      }

      //Perform the transfer
      await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
      await Account.updateOne({userId:to},{$inc: {balance:amount}}).session(session);

      await Transaction.create(
        [
        {
        from : req.userId,
        to : to,
        amount:amount,
        status:"Success"
        
      },
    ],
    {session}
    )
    

      await session.commitTransaction();

      res.status(200).json({message: "Transfer money successfully"})
        
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            message:"Tranfer failed",
            error:error.message
        });
    }
    finally {
      session.endSession();
    }   
        
    };
