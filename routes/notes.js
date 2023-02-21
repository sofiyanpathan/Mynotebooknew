const express=require("express");
const fetchuser = require("../Middleware/fetchuser");
const router=express.Router();
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator')

//Route-1
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        
    
    const notes=await Notes.find({user:req.user.id})
    res.json(notes)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error")
}
})


//Route-2 adding notes
router.post('/addnote',fetchuser,[
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Enter a valid Description with at least 5 char').isLength({ min: 5 })],async(req,res)=>{
       try {
        
        const{title,description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });  //if no error occurs we carry on with the process else error will be shown
        }
       const note=new Notes({
        title,description,tag,user:req.user.id
       })
       const saveNote=await note.save()
       res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    } 
})

//Route-3 updating note existing one
router.put('/updatenote/:id',fetchuser,async(req,res)=>{

    const {title,description,tag}=req.body;
    //create new note
    let newNote={};
    if(title){
        newNote.title=title;
    }
    if(description){
        newNote.description=description;
    }
    if(tag){
        newNote.tag=tag;
    }


    //find the note to update

    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Not Found")
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("NOt Allowed")
    }

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note)
})

//route-4 delting node
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

    
    //find the note to delete

    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Not Found")
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("NOt Allowed")
    }

    note=await Notes.findByIdAndDelete(req.params.id)
    res.json("Successfully Deleted the note")
})
module.exports=router