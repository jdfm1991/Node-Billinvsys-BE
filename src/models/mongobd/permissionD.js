import mongoose from "mongoose";

const PermissionDepartmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
},{
    timestamps:true
})

export default mongoose.model('PermissionDepartment', PermissionDepartmentSchema)