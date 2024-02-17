import Department from "../../models/mongobd/department.js";
import PD from "../../models/mongobd/permissionD.js";
import data from "../../config/strings.json" assert { type: 'json' };

const departments = data.departments

export const CreateDepartment= async (req, res) => {
    
    try {
        const name = req ? req.body.name : null
        const existsDep = await Department.countDocuments()

        if (existsDep < departments.length) {
            for (let i = 0; i < departments.length; i++) {
                const curDep = await Department.findOne({name:departments[i].name})
                if (!curDep) {
                    const newDep = new Department({
                        name: departments[i].name,
                        icon: departments[i].icon
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
        const AllDepartments = await Department.find()
        res.status(200).json(AllDepartments)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const GetDepartmentsByID = async (req, res) => {
    try {
        const user = req.user.id
        const Departments = []
        const UserPD = await PD.find({user:user}).populate('department')
        if (UserPD) {
            UserPD.forEach(mod => {
                Departments.push(mod.department )
            });
        }
        res.status(200).json(Departments)
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