import mongose from "mongoose"

const Household=new mongose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:30},
    inviteCode:{type:String,required:true,unique:true,upperCase:true,minlength:6,maxlength:6} ,
    members:[{
        type:mongose.Schema.Types.ObjectId,
        ref:"User",
      
    }],
    wasteScore:{type:Number,default:null,min:0,max:100},
    
},{timestamps:true});


export const HouseHolded=mongose.model("houseHold",Household);