import express from "express"
import cors from "cors"
import { connectMongoDB } from "./config/db.js";
import dotenv from "dotenv"
import { User } from "./schema/schema.js";
import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { createUser } from "./zod.js";
dotenv.config();
import cookie from "cookie-parser"
import { middleware } from "./middleware/auth.js";



const app=express();
app.use(express.json())
app.use(cookie())
connectMongoDB();
const privatekey=process.env.PRIVATEKEY||"my-secret key"

// check health

app.get("/",async(req,res)=>{
    res.send("hello")
})

app.post("/api/auth/register",async(req ,res)=>{
    try{
        const {data,success,error}=createUser.safeParse(req.body);
        if(!success){
            res.status(402).json({
                message:"invalid req.body",
                error:error.message
            })
            return;
        }
        // validation if user does not wrote in form name email and password
        const {name,email,password}=data;
        if(!name || !email || !password){
            res.status(401).json({  
                success:true,
                message:"Please enter the deatails",
                data:null

            });
            return;
        }

       // check user is exist or not
        const checkUserExist=await User.findOne({email:email});
        if(checkUserExist){
            res.status(400).json({
                success:true,
                message:"User already exists",
                data:null
            })
            return;
        }
        const haspassword=await bcrypt.hash(password,10);
        
        const user=await User.create({
            name,
            email,
            password:haspassword,
        });
        const token=await jwt.sign({id:user._id},privatekey)

        res.status(201).json({
            message:"User succesfull create",
            data:user,
            token,
            success:true,

        })



    }catch(err){
        res.status(500).json({
            message:"Internal Server Error"
        });
        return;
    }
})
app.post("/api/auth/login",async(req ,res)=>{
    try{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(403).json({
            message:"Inavlid user name and schema"
        })
        return;
    }

    const checkUserExist=await User.findOne({email});
    if(!checkUserExist){
        res.status(402).json({
            message:"User does not exist"
        })
    }
    const comparepassword=await bcrypt.compare(password,checkUserExist.password);
    if(!comparepassword){
        res.status(403).json({
            message:"Invalid usernam and password"
        })
    }
   const token=await jwt.sign({id:checkUserExist._id},privatekey,{expiresIn:"1d"});
   res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:"lax",
        maxAge:24*60*60*1000
       })




   res.status(200).json({
    message:"succesfull login",
    data:checkUserExist,
    token,
    success:true
   })

    }catch(err){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

// houseHold apis

app.get("/api/households",middleware, async(req ,res)=>{
    try {
        res.send("successfull cokkies implement")
        
    } catch (err) {
        res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
})
app.post("/api/households/join",async(req ,res)=>{})
app.post("/api/households/me",async(req ,res)=>{})
app.post("/api/households/:id/members",async(req ,res)=>{})


//Items

app.get("/api/items",async(req,res)=>{})
app.post("/api/items",async(req,res)=>{})
app.put("/api/items/:id ",async(req,res)=>{})
app.patch("/api/items/:id/status",async(req,res)=>{})
app.get("/api/items/:id",async(req,res)=>{})

//Dashborad Items

app.get("/api/dashboard/stats",async(req,res)=>{})
app.get("/api/dashboard/expiring",async(req,res)=>{})

app.listen(3000,()=>{
    console.log("hello")
})