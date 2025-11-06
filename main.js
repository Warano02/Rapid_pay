const express=require('express')
const app=express()

app.use("/",(req,res)=>res.json({error:false,msg:"Welcome to the simple solution of payment"}))