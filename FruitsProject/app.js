const express=require('express')
const app =express()
const mongoose=require("mongoose")

const UserModel=require("./user.model")

const url="mongodb://127.0.0.1:27017/fruitsDB"


const user=UserModel({
  name:"Sanket Tomar",
  email:"sanketv@gmail.com",
  mobile:85272962
})
// .save((err,db)=>{
//   if(err){
//     console.error(err.message);
//   }
//   else console.log("user data saved successfully ${db}");
// })


async function saveUserData(user) {
  try {
    const db = await user.save();
    console.log(`User data saved successfully: ${db}`);
  } catch (error) {
    console.error(error.message);
  }
}

// Usage:
saveUserData(user);
  //  this is the code to save the upper data that we made it through the module



// UserModel.find({name:"Abhinav Tomar"},(err,db)=>{
//   if(err){
//     console.error(err.message);
//   }
//   else{
//     console.log("user data found :${db}");
//   }
// })

async function findUser(query) {
  try {
    const db = await UserModel.find(query).exec();
    console.log(`User data found: ${db}`);
  } catch (error) {
    console.error(error.message);
  }
}

// Usage:
// findUser({ name: "Abhinav Tomar" });



// mongoose.connect(url, (err)=>{
//   if(err) console.log('unable to connect :${err}');
//   else 
//     console.log("mongoDB is connected");
// })




async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log('MongoDB is connected');
  } catch (error) {
    console.log(`Unable to connect: ${error}`);
  }
}

// Usage:
connectToMongoDB(url);
                                      






// const connectToMongo = async () => {
//   try {
//       mongoose.set('strictQuery', false)
//       mongoose.connect(mongoURI) 
//       console.log('Mongo connected')
//   }
//   catch(error) {
//       console.log(error)
//       process.exit()
//   }
//   }







app.listen(3000,()=>{
  console.log("server is running at 3000 port");
})