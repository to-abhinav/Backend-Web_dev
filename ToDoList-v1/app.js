const express = require("express");
const bodyParser = require("body-parser");

const date=require(__dirname +"/date.js")

const app = express();
var nextItem=[];
let workItem=[]; 
// "Study","Take Bath","Eat on time","GO to sleep on time"

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
   
    let day=date.getDate();
    res.render("list", { listTitle: day,newItem:nextItem });
});

app.post("/",function (req,res) {

  let item=req.body.nextItem;

  if(req.body.list=="Work List"){
    workItem.push(item);
    res.redirect("/work")
  } else{
    nextItem.push(item);
    
    // res.send(nextItem);
    res.redirect("/");
  }
  
  })


  

  app.get("/work",function (req,res) {
    res.render("list",{listTitle:"Work List",newItem:workItem})
    });
  app.post("/work",function (req,res) {
    let item=req.body.nextItem;
    workItem.push(item);
    res.redirect("/work");
    })













app.listen(3000, function () {
  console.log("Listning to port 3000");
});