const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://Stoic_Savvy:lsCM7ofyAUFoZP9q@foodiedate.pz089.mongodb.net/foodieDate"
    );
};
module.exports = connectDB;


