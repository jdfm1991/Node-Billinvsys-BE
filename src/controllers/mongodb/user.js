import bcryptjs from "bcryptjs";
import multer from "multer";
import User from "../../models/mongobd/user.js";
import { resizeImage } from "../../config/funtions/resizeImage.js";

export const CreateUser = async (req, res) => {
    try {
        const DataIns = req.body
        const email = await User.findOne({ email:DataIns.email })
        if (email) {
            return res.status(400).json(['Email is already in use'])
        }
        const PasswEnc = await bcryptjs.hash(DataIns.password,10)
        const Dataimg = req.file ? req.file.filename:'NoImage.jpg'
        const newUser = new User({
            name: DataIns.name,
            email:DataIns.email,
            password: PasswEnc,
            status: DataIns.status,
            image: Dataimg,
		    category: DataIns.category,
        });
        //newUser.getUrlImg(Dataimg)
        if (req.file) {
            resizeImage(req.file.path, `RS-100px-${req.file.filename}` ,100)
            resizeImage(req.file.path, `RS-250px-${req.file.filename}` ,250)
            resizeImage(req.file.path, `RS-500px-${req.file.filename}` ,500)
        }
        const Data = await newUser.save()

        res.status(201).json({
            ok: true,
            status:201,
            id: Data._id,
            name: Data.name,
            email:Data.email,
            message: "User Created Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const GetAllUser = async (req, res) => {
    try {
        const AllData = await User.find()
        res.status(200).json(AllData)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const GetUser = async(req, res) => {
    try {
        const id = req.params.id
        await User.findById( {_id:id} ).then( (data) => {
            res.status(200).json(data)
        })  
    } catch (error) {
        res.json({message: error.message})
    }
}

export const UpdateUser = async(req,res) => {
    try {
        const id = req.params.id
        const DataIns = req.body
        const DataActDB = await User.findOne({_id:id})
        const Dataimg = req.file ? req.file.filename:DataActDB.image
        var PasswEnc = ''
        if (DataIns.password) {
            if (DataIns.password!==DataActDB.password) {
                PasswEnc = await bcryptjs.hash(DataIns.password,10)
            }else{
                PasswEnc = DataIns.password    
            }
        } else {
            PasswEnc = DataActDB.password
        }
        
        await User.updateOne({_id:id}, { $set: {
            name: DataIns.name,
            email:DataIns.email,
            password: PasswEnc,
            status: DataIns.status,
            image: Dataimg,
		    category: DataIns.category
        }}).then( res => {
            console.log(res)
        })
        res.status(200).json({
            ok: true,
            status:200,
            message:"Registro Actualizado",
        })
    } catch (error) {
        res.json({message: error.message})
        console.log(error)
    }
}

export const DeleteUser = async(req,res) => { 
    try {
        const id = req.params.id
        await User.deleteOne({_id:id}).then( res => {
            console.log(res)  
        })
        res.status(200).json({
            ok: true,
            status:204,
            message:"Registro Eliminado",
        })
    } catch (error) {
        res.json({message: error.message})
    }
}