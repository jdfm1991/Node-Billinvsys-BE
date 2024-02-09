import Department from "../../models/mongobd/department.js";
import config from "../../config/config.js";

const valuedefault = config.valuedefault.departmentdefault.split(',')

export const CreateDepartment= async (req, res) => {
    try {
        const name = req ? req.body.name : null
        const existsDep = await Department.countDocuments()

        if (existsDep < valuedefault.length) {
            for (let index = 0; index < valuedefault.length; index++) {
                const department = valuedefault[index];
                const curDep = await Department.findOne({name:department})
                if (!curDep) {
                    const newDep = new Department({
                        name: department,
                    });
                    await newDep.save()
                }
            }  
        }

        if (name !== null) {
            const newDep = new Department({
                name: name,
            });
            const Data = await newDep.save()

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

export const GetAllDepartments = async (req, res) => {
    try {
        const AllDepartment = await Department.find()
        res.status(200).json(AllDepartment)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const DeleteDepartment = async(req,res) => { 
    try {
        const id = req.params.id
        await Department.deleteOne({_id:id}).then( res => {
            console.log(res)  
        })
        res.status(200).json({
            ok: true,
            status:204,
            message:"Department Deleted",
        })
    } catch (error) {
        res.json({message: error.message})
    }
}