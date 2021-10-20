const mongoose=require("mongoose")
const router= require("./routers/studentrouter")
const express=require("express")
const DATABASE= "mongodb+srv://boboye:boboye@cluster0.r1cxf.mongodb.net/mecstudents?retryWrites=true&w=majority"
const studentModel=require("./models/student.js")


const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/", router )


app.listen(process.env.PORT||5000, ()=>{
    console.log("Server listening on port 5000")
})