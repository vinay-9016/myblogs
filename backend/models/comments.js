const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    blogId: {
        type: String,
        require: true
    },

    blogComment: {
        type: String,
        require: true
    },
});

const commentModal = mongoose.model("commentsList", commentSchema);

module.exports = commentModal;