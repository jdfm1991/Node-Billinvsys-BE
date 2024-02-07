import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        trim: true,
    },
    file: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: true
    },

},{
    timestamps:true
})

export default mongoose.model('File', FileSchema)
