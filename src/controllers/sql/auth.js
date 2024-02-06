import bcryptjs from "bcryptjs";
import { createdToken } from "../../config/funtions/jwt.js";
import User from "../../models/sql/user.js";

export const CreateUser = async(req, res) => {
    try {
        const DataIns = req.body
        
        const PasswEnc = await bcryptjs.hash(DataIns.password,10)
        const Dataimg = req.file ? req.file.filename:'NoImage.jpg'
        await User.sync()
        const Data= await User.create({
            name: DataIns.name,
            email:DataIns.email,
            password: PasswEnc,
            status: DataIns.status,
            image: Dataimg,
		    category: DataIns.category,
        });
        const token = await createdToken({id: Data.id})
        res.cookie('token', token)
        res.status(201).json({
            ok: true,
            status:201,
            id: Data._id,
            name: Data.name,
            email:Data.email,
            message: "User Created Successfully"
        })
    } catch (error) {
        
        res.json({message: error.message})
        console.log(error)
    }
}
