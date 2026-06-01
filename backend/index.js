import express from "express"
import cors from "cors"
import { connectMongoDB } from "./config/db.js";
import dotenv from "dotenv"
dotenv.config();



const app=express();
connectMongoDB();

app.post("/api/auth/register",async(req ,res)=>{})
app.post("/api/auth/login",async(req ,res)=>{})

// houseHold apis

app.post("/api/households",async(req ,res)=>{})
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