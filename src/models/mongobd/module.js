import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    icon: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
},{
    timestamps:true
})

export default mongoose.model('Module', ModuleSchema)
