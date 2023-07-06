const express = require("express");
const bodyParser=require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function (req,res) {
    console.log(req.body);
    console.log(req.body.contact);
    var num1=Number(req.body.num1);
    var num2=Number(req.body.num2);
    var result;
    // var result=math_it_up['req.body.contact'](num1,num2);

    // var math_it_up = {
    //     '+': function (x, y) { return x + y },
    //     '*': function (x, y) { return x * y },
    //     '/': function (x, y) { return x / y }
    // }​​​​​​​;
    if(req.body.operator=='+'){
        result=num1+num2;
    }
    else if(req.body.operator=='*'){
        result=num1*num2;
    }
    else if(req.body.operator=='/'){
        result=num1/num2;
    }
    else if(req.body.operator=='-'){
        result=num1-num2;
    }
    res.send("The result is "+result);
  })
app.listen(3000, function (req, res) {
  console.log("the server at port 3000 has been started");
});
