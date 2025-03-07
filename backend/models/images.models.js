import mongoose from 'mongoose';
const { Schema } = mongoose;


const imageSchema = new Schema({
    id: {type :String, required:false},
    src: { type: String, required: true },
    width: { type: Number, required: false },
    height: { type: Number, required: false },
    country: { type: String, required: true },
    subregion: { type: String, required: true },
    caption: { type: String, required: false },
});

const Image = mongoose.model('Image', imageSchema);

export default Image;