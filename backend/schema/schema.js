import mongoose from "mongoose";
import mongose from "mongoose"

const UserSchema=new mongose.Schema({
    name:{type:String,required:true,minlength:2,maxlegth:20},
    email:{type:String,required:true,unique:true} ,
    password:{type:String,required:true,minlength:6},
    household:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"houseHold",
        default:null
    },
    
},{timestamps:true});


export const User=mongose.model("User",UserSchema);