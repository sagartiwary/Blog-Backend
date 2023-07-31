const mongoose = require('mongoose')
const { Schema, model } = mongoose;
// schema
const postSchema = Schema({
    title: String,
    summary: String,
    blog: String,
    num_comments: Number,
    image: String,
    userName: String,
    userId: String
});
const PostModel = model("blog", postSchema)
module.exports = {
    PostModel
}