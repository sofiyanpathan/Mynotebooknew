const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook"//after the url from the mongodb adding the name of the databse in this case it is"inotebook"

const connectTomongo=()=>{
      mongoose.connect(mongoURI,()=>{
        console.log("Connected Succesfully")
      })
}

module.exports=connectTomongo;