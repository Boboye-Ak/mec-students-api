const mongoose=require("mongoose")
const cloudinary=require("../utils/cloudinary")
const path=require("path")
const express=require("express")
const studentModel=require("../models/student.js")
const DATABASE= "mongodb+srv://boboye:boboye@cluster0.r1cxf.mongodb.net/mecstudents?retryWrites=true&w=majority"
mongoose.connect(DATABASE)
const multer=require("multer")
const cors=require("cors")



const storage=multer.diskStorage({
    filename:(req, file, callBack)=>{
        callBack(null, Date.now()+"-"+file.originalname)
    }
})

const upload=multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*5
    }
})

const router=express.Router()
router.use(express.json())
router.use(express.urlencoded({extended:false}))
router.use(cors())


//Get home page
router.get("/", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../static/form.html"))
})

//Uploading form data
router.post("/add", upload.single("image"),async (req, res)=>{
    const data= await studentModel.find({})
    let id=data.length+1 
    const {firstname, lastname, aka, dob, imgsrc, sociallinks, email }=req.body
    const result=await cloudinary.uploader.upload(req.file.path)
    const check= await studentModel.findOne({email: email})
    
    if(check){return res.send("this email is already in the database")}
    await studentModel.create({id:id, firstname: firstname, lastname:lastname, aka:aka, dob:dob, imgsrc:result.secure_url, sociallinks:sociallinks, email:email})
    res.send("student record has been created")
})


//Get all data route
router.get("/data",async(req, res)=>{
    const data=await studentModel.find({})
    res.json(data)
})

//Query route
router.get("/data/query", async(req, res)=>{
   const {surname, firstname, email, aka}=req.query
   if(surname){
        let data= await studentModel.find({surname:surname})
        return res.json(data)
   }
   else if(firstname){
        let data= await studentModel.find({firstname:firstname})
        return res.json(data)
   }
   else if(email){
        let data= await studentModel.find({email:email})
        return res.json(data)
   }

   res.json(data)
})

//Get delete all page
router.get("/delete", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../static/deleteall.html"))
})

//Delete all data

router.post("/deleteall", async (req, res)=>{
    await studentModel.deleteMany({})
    res.send("All data deleted")
})

//Get by id

router.get("/data/:id", async(req,res)=>{
    let data=await studentModel.findOne({id:req.params.id})
    if (!data){return res.send("No student has this id")}
    res.json(data)
})



module.exports=router