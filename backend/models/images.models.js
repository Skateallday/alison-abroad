const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const imageSchema = new Schema({
    src: { type: String, required: true },
    width: { type: Number, required: false },
    height: { type: Number, required: false },
    country: { type: String, required: true },
    subregion: { type: String, required: true },
    caption: { type: String, required: false },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;