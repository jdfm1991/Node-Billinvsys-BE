
import fs from "fs";
import Module from "../../models/mongobd/module.js";
import PM from "../../models/mongobd/permissionM.js";

export const CreateModule = async (req, res) => {
    try {
        const {name,depart, url} = req.body
        const newMod = new Module({
            name: name,
            department: depart,
            url: url
            
        });
        const Data = await newMod.save()
        res.status(201).json({
            ok: true,
            status:201,
            name: Data.name,
            message: "Module Created Successfully"
        })
    } catch (error) {
        console.log(error)
    }
    

}

export const GetAllModules = async (req, res) => {
    try {
        const AllModules = await Module.find().populate('department')
        res.status(200).json(AllModules)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const GetModulesAvailable = async (req, res) => {
    try {
        const file =[]
        const newfile = fs.readdir('./src/routes/mongodb', async (error, files) => {
            if (error) {
                throw error
            }
            for (let i = 0; i < files.length; i++) {
                const url = '/'+files[i].split('.').shift()
                const modReg = await Module.findOne({url:url})
                if (!modReg) {
                    file[i]  = url
                }
            }
            return res.json(file.filter(file => file !== '/auth' && file !== '/directory' && file !== '/usertype' && file !== '/module'))
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const GetModulesById = async (req, res) => {
    try {
        const user = req.user.id
        const Modules = []
        const UserPM = await PM.find({user:user}).populate('module')
        if (UserPM) {
            UserPM.forEach(mod => {
                Modules.push(mod.module)
            });
        }
        res.status(200).json(Modules)
    } catch (error) {
        res.json({message: error.message})
    }
}