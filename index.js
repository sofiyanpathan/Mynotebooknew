const connectTomongo = require('./db');
const express = require('express')
var cors=require('cors')
const path=require('path')
connectTomongo();

const app = express()
const port = 5000 //port for backend

app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/',(req,res)=>{
  res.send("Hello sofiyan here")
})

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`)
})

