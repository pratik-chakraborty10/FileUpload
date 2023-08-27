//app create

const express=require("express");
const app=express();

//port findout
require("dotenv").config();
const PORT=process.env.PORT || 5000;



//middleware add
app.use(express.json());

//require third party package middleware to interact with file-->MULTER

const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));




//db connect

const db=require("./config/database");
db.connect();



//cloud connect
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();




//api route mount
const Upload=require("./routes/FileUpload");
app.use('/api/v1/upload',Upload);





//activate server
app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`);
})