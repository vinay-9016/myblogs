const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogListModal = require('./models/blogs');
const commentListModal = require('./models/comments');


const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb+srv://vinay:vinay12345@myblogs.iptq2va.mongodb.net/?retryWrites=true&w=majority&appName=myblogs");

app.listen(3001, () => {
    console.log("Server is running and listening to port no 3001");
})

//Routes and controllers to manage blogs
app.post("/AddToBlogs", (req, res) => {
    blogListModal.create(req.body)
        .then(blogs => res.json(blogs))
        .catch(err => res.json(err))
});

app.get("/", (req, res) => {
    blogListModal.find({})
        .then(blogs => res.json(blogs))
        .catch(err => res.json(err))
})

app.get("/getBlog/:id", (req, res) => {
    const id = req.params.id;
    blogListModal.findById({ _id: id })
        .then(blogs => res.json(blogs))
        .catch(err => res.json(err))
});

app.put("/UpdateToBlog/:id", (req, res) => {
    const id = req.params.id;
    blogListModal.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .then(blogs => res.json(blogs))
        .catch(err => res.json(err));
})

app.delete("/deleteBlog/:id", (req, res) => {
    const id = req.params.id;

    // Step 1: Find all comments with the matching blogId
    commentListModal.deleteMany({ blogId: id })
        .then(() => {
            // Step 2: Delete the blog
            blogListModal.findByIdAndDelete({ _id: id })
                .then(blogs => res.json(blogs))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

// Routes and controllers to manage the comments
app.post("/AddComment", (req, res) => {
    commentListModal.create(req.body)
        .then(comments => res.json(comments))
        .catch(err => res.json(err))
});

app.get("/getComments/:id", (req, res) => {
    const id = req.params.id;
    commentListModal.find({ blogId: id })
        .then(blogs => res.json(blogs))
        .catch(err => res.json(err))
});

