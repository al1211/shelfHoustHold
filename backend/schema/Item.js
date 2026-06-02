import mongose, { Types } from "mongoose"

const Items=new mongose.Schema({
    houseHold:{type:mongose.Schema.Types.ObjectId,ref:"houseHold",required:true},
    addedBy:{type:mongose.Schema.Types.ObjectId,ref:"User",required:true} ,
    name:{type:String,required:true,trim:true},
    category:{type:String,enum:[ "produce", "dairy", "meat", "pantry", "frozen", "other"]},
    quantity:{type:Number,default:1,min:1},
    expiryDate:{type:Date,required:true},
    status:{type:String,enum:["fresh", "expiring-soon", "expired", "used", "wasted"]}

    
},{timestamps:true});


export const Item=mongose.model("Items",UserSchema);