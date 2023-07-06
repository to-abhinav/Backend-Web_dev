const express =require("express");

const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");  
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(process.env.PORT || 300,function () {
    console.log("server is running at port 3000");
  })
app.get("/",function (req,res) { 
    res.sendFile(__dirname+"/submit.html");
 })

 app.post("/",function (req,res) {

    var firstName=req.body.firstName;
    var lastName=req.body.secondName;
    var email=req.body.email;

    var data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                  }
            }
        ]
    };
    var jasonData =JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/e456fa97d1"

    const options={
        method:"POST",
        auth:"abhiTOmar:b13f50d331d0559a8b9b37c35d90df8a-us21"
    }

    const request=https.request(url,options,function (response) {
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/faliure.html");
        }

        response.on("data",function (data) { 
            console.log(JSON.parse(data));
         })

      })
    request.write(jasonData);
    request.end();

    console.log(req.body);
    console.log("email is "+email);
    console.log("Name is "+firstName+" "+lastName);

    
   })

   app.post("/faliure",function (req,res) {
     res.redirect('/');
     })