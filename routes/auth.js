const express=require("express")
const router=express.Router();
const bcrypt=require('bcryptjs')
const User=require('../models/Users')
const jwt=require('jsonwebtoken')
const { body, validationResult } = require('express-validator');//importing the required express-validator that we have installed using npm
const JWT_SECRET="harrybaiyyakereactvideos"
const fetchuser= require('../Middleware/fetchuser');

// Route NO.1
router.post('/',[
   body('name','Enter a valid Name').isLength({ min: 5 }),
   body('email','Enter a valid email').isEmail(),
   body('password','Enter a valid Password with at least 5 char').isLength({ min: 5 })//adding the array for checks or the validations 

],async (req,res)=>{
    let success=false
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });  //if no error occurs we carry on with the process else error will be shown
    }
    try{
    let user=await User.findOne({email:req.body.email})//checking for the dublicate email-id using the function
    if(user){
      return res.status(400).json({success,error:"Sorry a user with same mail exists"})
    }
    const salt=await bcrypt.genSalt(10)
    secpass=await bcrypt.hash(req.body.password,salt)
   user= await User.create({
      name: req.body.name,
      password: secpass,
      email: req.body.email,
    })//getting value of user
    const data={
      user:{
        id: user.id
      }
    }
   const authtoken=jwt.sign(data,JWT_SECRET)
  //  console.log(authtoken)
  success=true
   res.json({success,authtoken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("some error occured")
    }
 
})

// Route NO.2
router.post('/getuser',fetchuser,async (req,res)=>{


  try{
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
   
  }
  catch(error){
    
      console.error(error.message);
      res.status(500).send("Internal Server error")
  
  }
 
}) 



// Route NO.3
router.post('/login',async (req,res)=>{
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });  //if no error occurs we carry on with the process else error will be shown
  }
  const {email,password}=req.body;
  try{
    let user=await User.findOne({email})
    if(!user){
      return res.status(400).json({error:"Please Enter correct credentials"})
    }
    const passcompare=await bcrypt.compare(password,user.password)
    if(!passcompare){
      return res.status(400).json({success,error:"Please Enter correct credentials"})
    }
    const data={
      user:{
        id: user.id
      }
    }
    success=true
    const authtoken=jwt.sign(data,JWT_SECRET)
     res.json({success,authtoken})
  }
  catch(error){
    
      console.error(error.message);
      res.status(500).send("Internal Server error")
  
  }
 
}) 


module.exports= router