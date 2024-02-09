import mongoose from "mongoose";
import config from "../../config/config.js";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType',
        required: true
    }

},{
    timestamps:true
})

UserSchema.methods.getUrlImg = function(data) {
    return this.image = `${config.app.host}:${config.app.port}/public/${data}`
  }

export default mongoose.model('User', UserSchema)
