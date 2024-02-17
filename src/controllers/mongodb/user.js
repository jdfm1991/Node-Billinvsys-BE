import bcryptjs from "bcryptjs";
import User from "../../models/mongobd/user.js";
import UT from "../../models/mongobd/usertype.js";
import PD from "../../models/mongobd/permissionD.js";
import PM from "../../models/mongobd/permissionM.js";
import { resizeImage } from "../../config/functions/resizeImage.js";
import data from "../../config/strings.json" assert { type: 'json' };

const SU = data.users

export const CreateUser = async (req, res) => {
    try {
        const countUser = await User.countDocuments()
        if (countUser === 0) {
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
        const {name,status,email,type,password,depart} = req.body
        const PasswEnc = await bcryptjs.hash(password,10)
        const Dataimg = req.file ? req.file.filename:'NoImage.jpg'
        const emailDB = await User.findOne({ email:email})
        if (emailDB) {
            return res.status(400).json(['Email is already in use'])
        }
    const typeDB = await UT.findOne({name:/.*super.*/i}, '_id' ) 
             
        if (type == typeDB._id) {
            return res.status(400).json(['You Cannot Create more Than One Super User'])
        }
        
        const newUser = new User({
            name: name,
            email: email,
            password: PasswEnc,
            status: status,
            image: Dataimg,
            type: type,
        });
        if (req.file) {
            resizeImage(req.file.path, `RS-100px-${req.file.filename}` ,100)
            resizeImage(req.file.path, `RS-250px-${req.file.filename}` ,250)
            resizeImage(req.file.path, `RS-500px-${req.file.filename}` ,500)
        }
        const Data = await newUser.save()
        for (let i = 0; i < depart.length; i++) {
            const departDB = await User.findOne({ department:depart[i], user: Data._id})
            if (!departDB) {
                const newPD = new PD({
                    user:Data._id,
                    department:depart[i]
                })
                await newPD.save()                        
            }
        }
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
        const DepDB = []
        const ModDB = []
        const DataU = await User.findById({_id:id})
        const DataDep = await PD.find({user:DataU._id}).populate('department')
        if (DataDep) {
            DataDep.forEach(dep => {
                DepDB.push({
                    name: dep.department.name,
                    code: dep.department._id
                })
            });
        }
        const DataMod = await PM.find({user:DataU._id}).populate('module')
        if (DataDep) {
            DataMod.forEach(mod => {
                ModDB.push(mod.module)
            });
        }
        res.status(200).json({DataU,DepDB,ModDB})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const UpdateUser = async(req,res) => {
    try {
        const id = req.params.id
        const {name,status,email,type,password,depart,modul} = req.body
        const DataActDB = await User.findOne({_id:id})
        const Dataimg = req.file ? req.file.filename:DataActDB.image
        var PasswEnc = ''
        if (password) {
            if (password!==DataActDB.password) {
                PasswEnc = await bcryptjs.hash(password,10)
            }else{
                PasswEnc = password    
            }
        } else {
            PasswEnc = DataActDB.password
        }
        await User.updateOne({_id:id}, { $set: {
            name: name,
            email:email,
            password: PasswEnc,
            status: status,
            image: Dataimg,
		    type: type
        }})
        const countPD = await PD.countDocuments({user:id})
        if (depart.length > countPD) {
            for (let i = 0; i < depart.length; i++) {
                const departDB = await PD.findOne({ department:depart[i], user:id})
                if (!departDB) {
                    const newPD = new PD({
                        user:id,
                        department:depart[i]
                    })
                    await newPD.save()   
                } 
            }
        } else {
            for (let i = 0; i < countPD; i++) {
                const departDB = await PD.findOne({ department:depart[i], user:id})
                if (!departDB) {
                    await PD.deleteOne({user:id})
                } 
            }  
        }

        const countPM = await PM.countDocuments({user:id})
        if (modul.length > countPM) {
            for (let i = 0; i < modul.length; i++) {
                const modulDB = await PM.findOne({ module:modul[i], user:id})
                if (!modulDB) {
                    const newPM = new PD({
                        user:id,
                        module:modul[i]
                    })
                    await newPM.save()   
                } 
            }
        } else {
            for (let i = 0; i < countPM; i++) {
                const modulDB = await PM.findOne({ module:modul[i], user:id})
                if (!modulDB) {
                    await PM.deleteOne({user:id})
                } 
            }  
        }
        
        res.status(200).json({
            ok: true,
            status:200,
            message:"Registro Actualizado",
        })
    } catch (error) {
        res.json({message: error.message})
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