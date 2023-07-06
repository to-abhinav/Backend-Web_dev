const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require("mongoose");

const userModel = require("./user.model");

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));



const url = "mongodb://127.0.0.1:27017/userData";

let lName;
let fName;
let gender;
let email;
let success=false;

app.post("/",function (req,res) {
    console.log(req.body);
    lName=req.body.LastName
    fName=req.body.FirstName
    gender=req.body.gender
    email=req.body.email
    
    const user = userModel({
        fName: fName,
        lName: lName,
        gender: gender,
        email: email,
    });


    saveUserData(user);
    if(success){
        res.sendFile(__dirname+"/success.html")
    }
    else
    res.sendFile(__dirname+"/faliure.html")
  })


 app.post("/faliure",function (req,res) {
    res.redirect("/");
   })
async function saveUserData(user) {
  try {
    const db = await user.save();
    console.log('User Data saved successfully saved :{$db}');
    success=true
  } catch (error) {
    console.error(error.message);
  }
}

async function connectToDb(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB successfully using mongoose");
  } catch (error) {
    console.error(error.message);
  }
}

connectToDb(url);







app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.listen(3000, function () {
  console.log("Listning to port 3000");
});
