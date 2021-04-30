const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Author = mongoose.model('author');

const articleSchema = new Schema({

    title: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    keywords: {
        type: Array,
        trim: true
    },
    modifiedAt: {
        type: String,
        trim: true
    },
    publishedAt: {
        type: String,
        trim: true
    },
    author:{
        type: Array,
        trim: true
    },
    // {
    //     type: Schema.Types.ObjectId, ref: "authors"
    // },
    readMins: {
        type: Number,
        trim: true
    },
    source: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('articles', articleSchema)