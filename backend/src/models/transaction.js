const mongoose = require("mongoose")
const { required } = require("zod/mini")

const transactionSchema = new mongoose.Schema(
    {
        from: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           required:true
        },
         to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
        },
        amount: {
            type:Number,
            required:true

        },

        status: {
            type:String,
            enum:["Success","Failed"],
            default:"Success"

        }
    },
    
    {
        timestamps:true,
    
        
    })

    const Transaction = mongoose.model("Transaction",transactionSchema);

    module.exports = {
        Transaction
    }