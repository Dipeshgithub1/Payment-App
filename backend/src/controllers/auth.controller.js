const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const zod = require("zod")

const {User} = require("../models/userdb")
const {Account} = require("../models/accountdb")
const {JWT_SECRET} = require("../config")


const signupSchema = zod.object({
    username : zod.string().min(3).max(30).toLowerCase(),
    password : zod.string().min(6),
    firstname: zod.string().max(30).trim(),
    lastname: zod.string().max(30).trim()

});
const signinSchema = zod.object({
    username : zod.string().min(3).max(30).toLowerCase(),
    password : zod.string().min(6)

});

exports.signup = async(req,res)=> {
    try{
    const {success, data} = signupSchema.safeParse(req.body)

    if(!success){
        return res.status(411).json({message : 'Incorrect inputs'})
    }


    const existingUser =  await User.findOne({username : data.username})


    if(existingUser){
        return res.status(411).json({message:"User Already Exists"})
    }
    const hashPassword = await bcrypt.hash(data.password, 10)


    const user = await User.create({
        username : data.username,
        password : hashPassword,
        firstname: data.firstname,
        lastname: data.lastname,
    })
   
    //create new account 
    await Account.create({
        userId:user._id,
        balance: 1 + Math.random() * 10000
    });
   
    const token = jwt.sign({userId:user._id}, JWT_SECRET);

      
    

    res.json({message:"User created Successfully",token
    })
    
}
catch(error){
   
    res.status(500).json({error:error.message})
}
};

exports.signin = async (req,res) => {
    try{
    const {success, data} = signinSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({message : "Incorrect inputs"})
    }
    const user = await User.findOne({
        username : data.username,
    })
    if(!user){
      return res.status(411).json({message: "Invalid credentials"})

    }
    const isMatch = await bcrypt.compare(
        data.password,
        user.password
    );

    if(!isMatch){
     return res.status(411).json({message: "Error while logging in"})
    }

    const token = jwt.sign({userId:user._id},JWT_SECRET);
    res.json({token});
}
catch(err) {
    res.status(500).json({error:err.message})
}  
};



