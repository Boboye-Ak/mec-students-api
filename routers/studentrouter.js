const mongoose=require("mongoose")
const cloudinary=require("../utils/cloudinary")
const path=require("path")
const express=require("express")
const studentModel=require("../models/student.js")
const DATABASE= "mongodb+srv://boboye:boboye@cluster0.r1cxf.mongodb.net/mecstudents?retryWrites=true&w=majority"
mongoose.connect(DATABASE)
const multer=require("multer")




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


router.get("/", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../static/form.html"))
})

router.post("/add", upload.single("image"),async (req, res)=>{
    const {firstname, lastname, aka, dob, imgsrc, sociallinks, email }=req.body
    const result=await cloudinary.uploader.upload(req.file.path)
    const check= await studentModel.findOne({email: email})
    
    if(check){return res.send("this email is already in the database")}
    await studentModel.create({firstname: firstname, lastname:lastname, aka:aka, dob:dob, imgsrc:result.secure_url, sociallinks:sociallinks, email:email})
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



module.exports=router