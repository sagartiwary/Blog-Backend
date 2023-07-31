
const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { PostModel } = require("../model/post.model");

let blackLogout = []
const postRouter = express.Router();

// adding blog
postRouter.post("/create", auth, async (req, res) => {
    const { title, image, summary, num_comments, blog, userName, userId } = req.body;
    try {
        let newBlog = new PostModel({
            title, image, summary, num_comments, blog, userName, userId
        })
        await newBlog.save()
        res.status(200).json({ msg: newBlog })
    } catch (error) {
        res.status(400).json("Could not create a blog")
    }

})

postRouter.get("/", auth, async (req, res) => {
    try {
        let newBlog = await PostModel.find()
        res.status(200).json(newBlog)
    } catch (error) {
        res.status(400).json("please Login first!")
    }
})

postRouter.put("/update/:postID", auth, async (req, res) => {
    const userDocId = req.body.userId;
    try {
        const { postID } = req.params;
        const post = await PostModel.findOne({ _id: postID });
        const postDocId = post.userId;
        if (userDocId === postDocId) {
            await PostModel.findByIdAndUpdate(
                { _id: postID },
                req.body
            );
            res.status(200).json({ msg: "post has been updated" });
        } else {
            res.status(400).json({ msg: "Please Login" });
        }
    } catch (error) {
        res.status(400).json({ msg: "PLease login first" });
    }
});

postRouter.delete("/delete/:postID", auth, async (req, res) => {
    const userDocId = req.body.userId;
    try {
        const { postID } = req.params;
        const post = await PostModel.findOne({ _id: postID });
        const postDocId = post.userId;
        if (userDocId === postDocId) {
            let updatedPost = await PostModel.findByIdAndDelete({ _id: postID });
            res.status(200).json({ msg: "post has been deleted" });
        } else {
            res.status(400).json({ msg: "Please Login" });
        }

    } catch (error) {
        res.status(400).json({ msg: "PLease login first" });
    }
});

postRouter.get('/create/:id', async (req, res) => {
    const { id } = req.params
    try {
        let onePost = await PostModel.findById(id)
        res.status(200).json(onePost)
    } catch (error) {
        res.status(400).json("Please try again")
    }
})

postRouter.get("/logout", auth, async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        blackLogout.push(token)
        res.status(200).json("user has logged out")
    } catch (error) {
        res.status(400).json({ msg: error })
    }
})

module.exports = {
    postRouter
}


