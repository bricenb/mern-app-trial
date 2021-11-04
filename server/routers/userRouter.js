const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register

router.post("/", async (req, res) => {
    try{
        const {email, password, passwordVerify} = req.body;

        //validation

        if(!email || !password || !passwordVerify)
            return res.status(400).json({errorMessage: "Please enter all fields"});

        if (password.length < 6)
            return res.status(400).json({errorMessage: "Please enter a password of at least 6 characters"});

        if (password !== passwordVerify)
            return res.status(400).json({errorMessage: "Passwords do not match"});

        const existingUser = await User.findOne({ email });
        if (existingUser) 
            return res.status(400).json({errorMessage: "an account with this email already esists."});
    


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // save a new user account to database

        const newUser = new User({
         email, passwordHash
        });

        const savedUser = newUser.save();

        //sign the token

        const token = jwt.sign({
            user: savedUser._id,
            }, process.env.JWT_SECRET);

        // send token in HTTP only cookie

     res.cookie("token", token, {
        httpOnly: true
        })
        .send();




    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

//log in

router.post("/login", async (req, res) => {
   try {

        const { email, password} = req.body;

        //validate

        if(!email || !password)
        return res.status(400).json({errorMessage: "Please enter all fields"});

        const existingUser = await User.findOne({email});
        if (!existingUser)
            return res.status(401).json({errorMessage: "wrong email or password"});

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect)
            return res.status(401).json({errorMessage: "Wrong email or password."});

        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, {
            httpOnly: true,
        })
            .send();

   } catch (err) {
        console.error(err);
        res.status(500).send();
   }
});


// logout

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    .send();
});

module.exports = router;