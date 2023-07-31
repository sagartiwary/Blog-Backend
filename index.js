
const express = require("express");
const { connection } = require("./DB/db");
const { userRouter } = require("./router/user");
const cors = require('cors');
const { postRouter } = require("./router/post");
const app = express();
require('dotenv').config();
let port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use("/user", userRouter);
app.use('/blogs', postRouter)
app.listen(port, async (req, res) => {
    try {
        await connection
        console.log(`DB IS CONNECTED AT PORT ${port}`)
    } catch (error) {
        console.log(`Something wrong with this port`)
    }
});

