import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    namemodule: {
        type: String,
        required: true,
        trim: true,
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
