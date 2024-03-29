import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    icon: {
        type: String,
    },
},{
    timestamps:true
})

export default mongoose.model('Department', DepartmentSchema)
