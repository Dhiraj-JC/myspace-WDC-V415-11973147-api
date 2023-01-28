const {Schema, model} = require('mongoose');


const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    authorName: {
        type: String,
        required: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        required: true,
    }
});

module.exports = model('Book',bookSchema);