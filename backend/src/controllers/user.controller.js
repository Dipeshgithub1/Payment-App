
const zod = require("zod")
const {User} = require("../models/userdb")

// Get current logged in user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      userId: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
