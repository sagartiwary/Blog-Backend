const mongoose = require("mongoose");
const { connect } = mongoose;
require("dotenv").config();
const url = process.env.MONGOURL;
// connect database to server

const connection = connect(url)
module.exports = {
    connection
}