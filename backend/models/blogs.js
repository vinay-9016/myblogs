const mongoose = require('mongoose');

const blogListSchema = mongoose.Schema({
    blogTitle: {
        type: String,
        require: true
    },

    blogAuthor: {
        type: String,
        require: true
    },

    blogDescription: {
        type: String,
        require: true,
    },

    blogUploadDate: {
        type: String,
        require: true
    }
});

const blogListModal = mongoose.model("blogList", blogListSchema);

module.exports = blogListModal;