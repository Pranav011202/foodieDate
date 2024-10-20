const express = require('express');
const connectDB = require('./config/database'); // Importing database connection
const app = express(); // Initializing Express app
const User = require("./models/user")

app.use(express.json());

app.post("/signup",async (req,res)=>{
   
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});

// Establishing the database connection
connectDB()
    .then(() => {
        console.log('Database Connection established...');
        
        // Starting the Express server only after DB connection is successful
        app.listen(7777, () => {
            console.log('Server is successfully listening on Port 7777');
        });
    })
    .catch((err) => {
        console.error('Database cannot be established:');
        
    });
