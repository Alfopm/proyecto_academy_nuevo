const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({

    name: {
        type: String,
        trim: true
    },
    articles: [{
        type: Schema.Types.ObjectId, ref: "articles" 
    }]
    // {
    //     type: Array,
    //     trim: true
    // }
})

module.exports = mongoose.model('authors', authorSchema)