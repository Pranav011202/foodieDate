const express = require('express')

const app = express()

app.use("/Pranav",(req,res)=>{
    res.send("Hello from the server")
});
app.use("/",(req,res)=>{
    res.send("Hello from the ho")
});

app.listen(3000,() =>{
    console.log("Server is successfully listening on Port 3000")
});