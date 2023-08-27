const mongoose=require("mongoose");
const nodemailer=require("nodemailer");

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    imageUrl:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware for sending mail
fileSchema.post("save",async function(doc){
    try{

        //transporter
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //send mail
        let info=await transporter.sendMail({
            from:`sayak`,
            to:doc.email,
            subject:"new file uploaded in cloudinary",
            html:`<h2>hello jee</h2> <p>pratik your file uploaded view here :<a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })

    }
    catch(error){

    }
})

const File=mongoose.model("File",fileSchema);
module.exports=File;