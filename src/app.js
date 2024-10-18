const express = require('express')

const app = express()

//This will only handle the GET call to /user
app.get("/user" , (req,res)=>{
    res.send({firstName: "Akshay" , lastName:"Saini"})
});

app.post("/user",(req,res)=>{
    console.log("Save data to the database ");
    res.send("Data successfully saved to the database");
});
app.delete("/user",(req,res)=>{
  
    res.send("Deleted Successfully");
});

//this will match all the HTTP method API Calls to /test
app.use("/test",(req,res)=>{
    res.send("Hello Hello Hello !")
});


app.listen(3000,() =>{
    console.log("Server is successfully listening on Port 3000")
});