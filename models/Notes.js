const mongoose=require('mongoose')
const {Schema}=mongoose;
const notesSchema=new Schema({
    //user is like foreign key here that is taking id from different model
   user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'user'
   },
    title:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
      
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('notes',notesSchema)