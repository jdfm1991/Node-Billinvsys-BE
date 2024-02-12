import mongoose from "mongoose";

const PermissionModuleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true
    }
},{
    timestamps:true
})

export default mongoose.model('PermissionModule', PermissionModuleSchema)