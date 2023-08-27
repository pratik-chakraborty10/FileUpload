const File=require("../models/File");

const cloudinary=require("cloudinary").v2;

//local file upload handler

exports.localFileUpload=async(req,res)=>{
    try{
        //fetch file first
        const file=req.files.file; 
        console.log('file upload locally done',file);

        //create path where file need to be stored

        let path=__dirname +"/files" +Date.now() + `.${file.name.split('.')[1]}`;

        //add path to the moved function

        file.mv(path,(err)=>{
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'local file uploaded successfully' 
        });


    }catch(error){
        console.log("not able to upload the file on the server")
        console.log(error);

    }
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);

}

async function uploadFileToCloudinary(file,folder,quality){//quality->size reducer
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";//special syntax for uploading video
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

//image upload handler
exports.imageUpload=async(req,res)=>{
    try{

        //fetch data
        const{name,tags,email}= req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported "
            })
        }

        // file format supported hai,upload in cloudinary
        const response=await uploadFileToCloudinary(file,"pratikGallery");
        console.log(response);

       //db mai data enter kiya
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"image successfully uploaded",
        })



    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })

    }
}

//video upload handler

exports.videoUpload=async(req,res)=>{
     try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported "
            })
        }

        // file format supported hai,upload in cloudinary
        const response=await uploadFileToCloudinary(file,"pratikGallery");
        console.log(response);

        //db mai data enter kiya
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"video successfully uploaded",
        })



         

     }catch(error){
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })
     }
}


//image size reducer
exports.imageSizeReducer=async(req,res)=>{
    try{
        //fetch data
        const{name,tags,email}= req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported "
            })
        }

        // file format supported hai,upload in cloudinary
        const response=await uploadFileToCloudinary(file,"pratikGallery",50);
        console.log(response);

       //db mai data enter kiya
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"image successfully uploaded",
        })




    }catch(error){
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })

    }
}