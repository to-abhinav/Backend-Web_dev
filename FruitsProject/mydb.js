const express = require("express")

const {connectToDb,getDb}=require("./db")

const app=express() 

  connectToDb((err)=>{
    if(!err ){
      app.get("/books",(req,res)=>{
        res.send("Hello this is Port 3000")
      }) 
      db=getDb()
    }
  })



 app.get("/books",(req,res)=>{
  let books=[]
  db.collection("books")
  .find()
  .sort({name:1})
  console.log("hello here")
  .forEach(book => books.push(book))
  .then(()=>
  res.status(200).json(books))
 })
  // .catch(()=> {
  //   res.status(500).json({error:"could not fetch"})
  //  })


