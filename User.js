import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstname: String,
    email: String,
    password: String,
    role: String
}, {
    timestamps: true
}
)
const User = mongoose.model('User', userSchema)
export default User