const mongoose =require("mongoose")

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        lowercase:true
    },
    mobile:{
        type:Number,
        default:1234567
    }

})

const UserModel=mongoose.model("UserModel",userSchema)
module.exports=UserModel