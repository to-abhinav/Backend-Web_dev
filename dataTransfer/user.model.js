const mongoose =require("mongoose")

const userSchema= new mongoose.Schema({
    fName:{
        type: String,
        required:true
    },
    lName:{
        type: String,
        required:  [true,"Please, Check your data entry No name specified"]
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    }

})

userModel =mongoose.model('userModel',userSchema)

module.exports=userModel;
