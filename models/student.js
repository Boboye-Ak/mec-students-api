const mongoose=require("mongoose")

const studentSchema=mongoose.Schema({
    lastname:{type: String, required:true},
    firstname:{type: String, required:true},
    aka:{type: String, required:true},
    dob:{type:Date, required:true},
    imgsrc:{type:String, required:false},
    sociallinks:{type:String, required:true},
    email:{type:String, required:true}


})

const model=mongoose.model("studentmodel", studentSchema)

module.exports=model