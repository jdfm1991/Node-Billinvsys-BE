import Department from "../../models/mongobd/department.js";
import Module from "../../models/mongobd/module.js";
import PD from "../../models/mongobd/permissionD.js";

export const CreateDepartment= async (req, res) => {
    try {
        const { name } = req.body
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
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
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
        const dependence = await Module.findOne({department:id})
        if (dependence) {
            return res.status(400).json({message:'You Cannot Delete This Department Since It Has Linked Modules'})
        }
        const del = await Department.deleteOne({_id:id})
        await PD.deleteOne({department:id})
        res.status(200).json({message:"Department Deleted"})
    } catch (error) {
        res.json({message: error.message})
    }
}