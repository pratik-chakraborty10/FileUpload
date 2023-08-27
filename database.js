const mongoose=require("mongoose");

require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("db connection successful"))
    .catch((error)=>{
        console.log("db connection issues");
        console.log(error);
        process.exit(1);

    });
};  