const mongoose=require("mongoose")
const {isEmail}=require("validator")

const studentSchema=mongoose.Schema({
    id:{type:Number, required:true},
    lastname:{type: String, required:true},
    firstname:{type: String, required:true},
    aka:{type: String, required:true},
    dob:{type:Date, required:true},
    imgsrc:{type:String, required:false},
    sociallinks:{type:String, required:true},
    email:{type:String, required:true, lowercase:true, unique:true, validate:[isEmail,"Please enter a valid email"]}


})

const model=mongoose.model("studentmodel", studentSchema)

module.exports=model