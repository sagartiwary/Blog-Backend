
// create a model for the use using mongoose 

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// schema
const userSchema = Schema({
    email: String,
    password: String,
    name: String
}, {
    versionKey: false
}
);
const UserModel = model("user", userSchema);
module.exports = {
    UserModel
}