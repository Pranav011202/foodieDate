const express = require('express');
const connectDB = require('./config/database'); // Importing database connection
const app = express(); // Initializing Express app
const User = require("./models/user");

app.use(express.json());

// Route to signup a new user
app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

// Route to get a user by email (using query parameters for GET requests)
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;  // Use query parameters for GET requests
    try {
        const user = await User.find({ emailId: userEmail });  // Use findOne for single user
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

// Feed API to get all users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});  // Get all users from the database
        res.send(users);
    } catch (err) {
        res.status(400).send("Error fetching users: " + err.message);
    }
});

app.delete("/user", async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully");
    }
    catch (err) {
        res.status(400).send("Error fetching users: " + err.message);
    }
});

app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    
    try{
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];
    const isUpdateAllowed = Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
        await User.findByIdAndUpdate({ _id: userId},data,{
            runValidators:true,
        });
        res.send("User updated successfully");
    }
    catch (err) {
        res.status(400).send("UPDATE FAILED: " + err.message);
    }
})

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
        console.error('Database connection cannot be established:', err);
    });
