import mongoose from "mongoose";

const UserTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
},{
    timestamps:true
})

export default mongoose.model('UserType', UserTypeSchema)
