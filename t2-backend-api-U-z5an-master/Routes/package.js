const express=require("express");
const router=express.Router();
const Package=require("../Model/Package");
const mongoose=require("mongoose");
const multer=require("multer");
const Auth = require('../Middleware/auth');
const path=require('path');
require('../DB/database');



//image upload
var storage = multer.diskStorage({
  destination: 'package',
  filename: (req, file, callback) => {
      let ext = path.extname(file.originalname);
      callback(null, "Package" + Date.now() + ext);
  }
});

var imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|gif)$/)) {
      return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};

var upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 100000000 }
});

  router.post('/uploadPackage', upload.single('imageFile'), (req, res) => {
      res.send(req.file.filename)
      console.log(req.file)
  });

  //add restaurants
  router.post("/addPackage",(req,res)=>
{
    console.log(req.body);

    const package=new Package(req.body);
    package.save()
    .then((result)=>{
        
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err=>{
        res.status(500).json({
            
            error:err,
           // console.log(error);
        })
    })
})

// show restaurant details
router.get("/showPackage",Auth,function(req,res){
  Package.find().then(function(Package){
      console.log(Package);
      // res.json(houseModel);
      res.send(Package);
  }).catch(function(e){
      res.send(e);
  })
})

//delete package details
router.delete('/deletePackage/:id',Auth, function (req, res) {    
            
  console.log(req.params.id);
   Package.findByIdAndDelete(req.params.id).then(function(package){
       res.send("Successfully deleted");
       res.json(package);
   }).catch(function(e){
       res.send(e);
   }) ;
   });

//update restaurant details
router.put('/updatePackage/:id',Auth,function(req,res){
  // userid = req.param.id.toString();

  pid = req.params.id.toString();
  console.log(pid);
  // console.log(userid);
  console.log(req.body);
  Package.findByIdAndUpdate(pid,req.body,{new: true}, (err,package) => {
  res.send(package);


      });
  });

  router.get("/showonePackage/:id",Auth,function(req,res){
    pid=req.params.id.toString();
    Package.findById(pid).then(function(Package){
        console.log(Package);
        // res.json(houseModel);
        res.json(Package);
    }).catch(function(e){
        res.send(e);
    })
  })
  
  router.get('/this',Auth,function(req,res){
    res.send(req.package);
})


  module.exports=router;

