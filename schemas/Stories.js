const mongoose = require('mongoose');

const StoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Stories', StoriesSchema);