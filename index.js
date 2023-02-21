const connectTomongo = require('./db');
const express = require('express')
var cors=require('cors')

connectTomongo();

const app = express()
const port = 5000 //port for backend

app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/',(req,res)=>{
  res.send("Hi sofiyan here")
})

if(process.env.NODE_ENV=='production'){
  const path=require('path')
  app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'frontend','build','index.html')))
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`)
})