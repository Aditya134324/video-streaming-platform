import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req,res)=>{
    try{
        const {username,fullName,email,password} = req.body;


        if(!username || !fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username,
            fullName,
            email,
            password:hashedPassword,
        });
         
        await newUser.save();
        return res.status(201).json({message:"User created successfully"});
    }
    catch(error){
       console.log(error);
       return res.status(500).json({message:"failed to signup"});
    }
}

export const Login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.status(404).json({message:"User not found"});
        }

        const checkPassword = await bcrypt.compare(password,checkUser.password);
        if(!checkPassword){
        return res.status(400).json({message:"Invalid credentials"});
        }

        const token = jwt.sign({id:checkUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});

       return res.status(200).json({message: "Login successful",
        token,
       });
    }
    catch(error){
         console.log(error);
            return res.status(500).json({message:"failed to login"});
    }
}


 