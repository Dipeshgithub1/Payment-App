
const zod = require("zod")
const {User} = require("../models/userdb")


//allow to user upadte therir infomation
const updateSchema = zod.object({
   password : zod.string().optional(),
   firstname: zod.string().optional(),
   lastname: zod.string().optional()

})

exports.updateUser =  async (req,res) => {
    const {success, data} = updateSchema.safeParse(req.body)
    if(!success){
     return res.status(411).json({message: "Error while updating information"})
    }
    await User.updateOne(
       {_id:req.userId},
       {$set: data}
    );
    res.json({message: "Updated Successfully"})
};

//bulk user
exports.getBulkUsers = async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstname: { $regex: filter, $options: "i" } },
      { lastname: { $regex: filter, $options: "i" } }
    ]
  });

  res.json({
    users: users.map(user => ({
       _id: user._id, 
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname
      
    }))
  });
};
