

const mongoose =require("mongoose");

const dataSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  }
})

userData=mongoose.model("userData",dataSchema)

module.exports=userData;