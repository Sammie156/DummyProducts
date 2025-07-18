import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address:  {type: String, required: true},
    profilePicUrl: {type: String, required: false},
    phone: {type: String, required: true}
});

export default mongoose.model("User", userSchema);