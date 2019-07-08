const express=require("express");
const router=express.Router();
const User=require("../Model/Users");
const mongoose=require("mongoose");
const Auth = require('../Middleware/auth');
const path = require('path');
const multer=require("multer");

//REGISTRATION
router.post("/registration",(req,res)=>
{
    console.log(req.body);

    const user=new User(req.body);
    user.save().then((result)=>{
        
        console.log(result);
        res.json(result);
        res.status(201).json({
        message:"User Registered successfully",

        })
    })
    .catch(err=>{
        res.status(500).json({
            
            error:err,
        })
    })
})


//LOGIN
router.post("/userLogin",async function (req,res)
{
    
    var enteredUname=req.body.Username;
    var enteredpass=req.body.Password;
    console.log(enteredUname, enteredpass);
    const user=await User.checkCredentialsDb(enteredUname,enteredpass);
    if(user){
    const token=await user.generateAuthToken();
    res.send({
        token:token,
        userType:user.Usertype
    });
}
else{
    res.json({message:"Invalid"});
}
});

router.get('/this',Auth,function(req,res){
    res.send(req.user);
})
module.exports=router;