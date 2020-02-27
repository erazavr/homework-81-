const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortenSchema = new Schema({
    shortUrl: {
        type: String,
        required: true,
    },
    originalUrl: {
        type: String,
        required: true
    },
    versionKey: false
});
const Shorten = mongoose.model('Shorten', ShortenSchema);

module.exports = Shorten;