import React from 'react'

export const TransactionItem = ({txn,userId})  => {
    const isDebit = txn.from._id === userId;


  return (
    <div className='flex justify-between items-center border p-3 rounded'>
         {/* LEFT SIDE: Details */}
        <div className='font-semibold'>
        {isDebit
         ? `Sent to ${txn.to.firstname}`
         : `Received from ${txn.from.firstname}`

        }
        </div>
           
        <div className='text-sm text-gray-500'>
             {new Date(txn.createdAt).toLocaleString()}
        </div>
        
        
       <div
  className={`font-bold ${
    isDebit ? "text-red-500" : "text-green-500"
  }`}
>
{isDebit ? "-" : "+"}₹{txn.amount}

    </div>

    </div>
    
  )
};


export default TransactionItem;