const express=require("express");
const bodyParser=require("body-parser");
const app =express();

var height;
var weight;
var bmiRes;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
  });

app.post("/",function (req,res) {

    height=parseFloat(req.body.height);
    weight=(req.body.weight);

    bmiRes=weight/(height*height);
    console.log(req.body);

    res.send("Your BMI is "+bmiRes);
  });

app.listen(3000,function () {
    console.log("Listning to Local host at port 3000");
  });