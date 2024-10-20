const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Converts email to lowercase
        trim: true,      // Removes extra spaces from email
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,  // User must be at least 18 years old
    },
    gender: {
        type: String,
        validate(value) {
            // Validate that gender is one of these values
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender value is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
        default: "This is the default value of the user", // Fixed typo in "default"
    },
    skills: {
        type: [String],
    }
},
{
    timestamps:true,
}
);

// Ensure unique index is created for emailId
userSchema.index({ emailId: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
