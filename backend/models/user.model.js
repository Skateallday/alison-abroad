import mongoose from 'mongoose';
const { Schema } = mongoose;



const userSchema = new Schema({
    username: { 
        type: String, 
        required: [true, "Please enter Username"],
        unique: [true, "Username exists"] 
        },
    password: {
        type: String,
        required: [true, "Enter your Password"],
        unique: false
    }

});

const User = mongoose.model('User', userSchema);

export default User;