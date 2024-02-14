import bcryptjs from "bcryptjs";
import User from "../../models/mongobd/user.js";
import UT from "../../models/mongobd/usertype.js";
import { resizeImage } from "../../config/functions/resizeImage.js";
import data from "../../config/strings.json" assert { type: 'json' };

const SU = data.users

export const CreateUser = async (req, res) => {
    try {
        
        const contUser = await User.countDocuments()
        if (contUser === 0) {
            for (let i = 0; i < SU.length; i++) {
                const existsSU = await User.findOne({ name:SU[i].name })
                if (existsSU === null) {
    
                    const newSUT = await UT.findOne({ name: SU[i].type })
                    const PasswEnc = await bcryptjs.hash(SU[i].password,10)
                    const newSU = new User({
                        name: SU[i].name,
                        email:SU[i].email,
                        password: PasswEnc,
                        status: SU[i].status,
                        image: SU[i].image,
                        type: newSUT._id,
                    });
                    await newSU.save()
                }
            }
        }      
        
            const {name,status,email,type,password} = req.body
            const emailDB = await User.findOne({ email:email})
            console.log(req.body)
            if (emailDB) {
                return res.status(400).json(['Email is already in use'])
            }
            const PasswEnc = await bcryptjs.hash(password,10)
            const Dataimg = req.file ? req.file.filename:'NoImage.jpg'
            const newUser = new User({
                name: name,
                email: email,
                password: PasswEnc,
                status: status,
                image: Dataimg,
                type: type,
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
        if (req) {
            res.status(500).json({
                message: error.message
            })
        }
        
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