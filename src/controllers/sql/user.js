import User from "../../models/sql/user.js";
import bcryptjs from "bcryptjs";

export const GetAllUser = async (req, res) => {
    try {
        const AllData = await User.findAll()
        res.json(AllData)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const GetUser = async(req, res) => {
    try {
        const Data = await User.findAll({
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({
            ok:true,
            status:200,
            body: Data,
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const UpdateUser = async(req,res) => {
    try {
        const DataActDB = await User.findOne({
            attributes: ['password','image'],
            where:{
                id:req.params.id
            }
        })
        const DataAct = req.body
        const Dataimg = req.file ? req.file.filename:DataActDB.image
        var PasswEnc = ''

        if (DataAct.password) {
            if (DataAct.password!==DataActDB.password) {
                PasswEnc = await bcryptjs.hash(DataAct.password,10)
            }else{
                PasswEnc = DataAct.password    
            }
        } else {
            PasswEnc = DataActDB.password
        }

        const DataUp = await User.update({
            name: DataAct.name,
            email:DataAct.email,
            password: PasswEnc,
            status: DataAct.status,
            image: Dataimg,
		    category: DataAct.category,
        }, {
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({
            ok: true,
            status:200,
            message:"Registro Actualizado",
            body: DataUp
        })
    } catch (error) {
        res.json({message: error.message})
        console.log(error)
    }
}

export const DeleteUser = async(req,res) => {
    try {
        const DataDel = await User.destroy({
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({
            ok: true,
            status:204,
            message:"Registro Eliminado",
            body: DataDel
        })
    } catch (error) {
        res.json({message: error.message})
    }
}