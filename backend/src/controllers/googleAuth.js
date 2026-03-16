const {OAuth2Client} = require("google-auth-library")
const jwt = require("jsonwebtoken")
const {User} = require("../models/userdb")
const {Account} = require("../models/accountdb")

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.googleAuth = async(req,res) => {

    try {

        const {token} = req.body;

        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const email = payload.email;
        const name = payload.name || "";
        const picture = payload.picture;

        // Split name into firstname and lastname
        const nameParts = name.split(" ");
        const firstname = nameParts[0] || "";
        const lastname = nameParts.slice(1).join(" ") || "";

        // Generate unique username from email
        const username = email.split("@")[0].toLowerCase() + "_" + Date.now();

        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
                username,
                email,
                firstname,
                lastname,
                avatar:picture,
                authProvider: "google"
            })
            // Create account for new Google user
            await Account.create({
                userId: user._id,
                balance: 1 + Math.random() * 10000
            });
        }
        
        const jwtToken = jwt.sign({
            userId:user._id
        },
    process.env.JWT_SECRET
);

   res.json({
    token:jwtToken,
    user
   })
     } catch (error) {
         console.error("Google auth error:", error);
         res.status(401).json({
      message: "Google login failed"
    });
     }

}
