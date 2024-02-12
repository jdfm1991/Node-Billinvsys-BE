import Module from "../../models/mongobd/module.js";
import Department from "../../models/mongobd/department.js";
import data from "../../config/strings.json" assert { type: 'json' };

const modules = data.modules

export const CreateModule = async (req, res) => {
    
    try {
        const name = req ? req.body.name : null
        const existsMod = await Module.countDocuments()

        if (existsMod < modules.length) {
            for (let i = 0; i < modules.length; i++) {
                const curModule = await Module.findOne({name:modules[i].name})
                if (curModule === null) {
                    const department = await Department.findOne({name:'ID / IT'})
                    const newModule = new Module({
                        name: modules[i].name,
                        icon: modules[i].icon,
                        url: modules[i].url,
                        department:department._id
                    });
                     await newModule.save()
                }
            }  
        }

        if (name !== null) {
            const newDep = new Department({
                name: name,
            });
            const Data = await newDjep.save()

            res.status(201).json({
                ok: true,
                status:201,
                name: Data.name,
                message: "User Created Successfully"
            })
            
        }
    } catch (error) {
        console.log(error)
    }
    

}

export const GetAllModules = async (req, res) => {
    try {
        const AllModules = await Module.find()
        res.status(200).json(AllModules)
    } catch (error) {
        res.json({message: error.message})
    }
}