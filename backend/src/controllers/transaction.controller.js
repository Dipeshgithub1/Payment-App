
const {Transaction} = require("../models/transaction")

exports.getMyTransaction = async (req,res) => {

    try {
        const userId = req.userId;

        //pagination 
        const page = Math.max(parseInt(req.query.page) || 1,1);
        const limit = Math.max(parseInt(req.query.limit) || 10,1);
        const skip = (page - 1) * limit; 


        const query =  {
            $or: [
                {from: userId},
                {to:userId}
            ]
        }
        // fetch paginated transactions
        const transactions = await Transaction.find(query)
        .populate("from","firstname lastname username")
        .populate("to","firstname lastname username")
        .sort({createdAt: -1})
        .limit(limit)
        .skip(skip)
        .lean()


     // total count
    const totalTransactions = await Transaction.countDocuments(query);

    res.status(200).json({
      page,
      limit,
      totalTransactions,
      totalPages: Math.ceil(totalTransactions / limit),
      transactions,
    });

        
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch transactions",
            error:error.message
        })
        
    }
}