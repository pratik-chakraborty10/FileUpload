const express=require("express");

const router=express.Router();

const{localFileUpload, imageUpload, videoUpload, imageSizeReducer}=require("../controllers/fileUpload"); 


router.post("/localFileUpload",localFileUpload);
//image upload route
router.post("/imageUpload",imageUpload);

//video upload
router.post("/videoUpload",videoUpload);

//image size reducer
router.post("/imageSizeReducer",imageSizeReducer);

module.exports=router;
