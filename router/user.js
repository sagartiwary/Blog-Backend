const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// registration for the user

userRouter.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    const existedUser = await UserModel.findOne({ email })
    try {
        if (existedUser) {
            res.status(200).json("user already registered!")
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json("something wrong")
                } else {
                    let newUser = await UserModel({
                        email,
                        password: hash,
                        name
                    })
                    await newUser.save();
                    res.status(200).json("Successfull Registration")
                }
            })
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
})

// login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const existedUser = await UserModel.findOne({ email });

    try {

    } catch (error) {

    }
    try {
        if (existedUser) {
            bcrypt.compare(password, existedUser.password, async (err, result) => {
                if (err) {
                    res.status(400).json("Not logged In!!")
                } else {
                    let token = jwt.sign({ userName: existedUser.email, userId: existedUser._id }, process.env.KEY);
                    res.status(200).json({ msg: "Login successful", token })
                }
            })
        } else {
            res.status(400).json("Please login")
        }


    } catch (error) {
        res.status(400).json({ msg: "Wrong Credentials" })
    }


})



module.exports = {
    userRouter
};


