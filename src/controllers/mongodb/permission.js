import permissionD from "../../models/mongobd/permissionD.js";
import permissionM from "../../models/mongobd/permissionM.js";
import User from "../../models/mongobd/user.js";
import Department from "../../models/mongobd/department.js";
import Module from "../../models/mongobd/module.js";

export const PermissionSU = async (req, res) => {

    const SU = await User.findOne().populate('type')
    if (SU.type.name === 'Super User') {
        const Dep = await Department.find()
        for (let i = 0; i < Dep.length; i++) {

            const existsPD = await permissionD.findOne({user:SU._id, department:Dep[i]._id})
            if (!existsPD) {
                
                const SUPermissionD = new permissionD({
                    user:SU._id,
                    department:Dep[i]._id
                })
                await SUPermissionD.save()                        
            }
            
            const Mod = await Module.find({department:Dep[i]._id})

            for (let l = 0; l < Mod.length; l++) {
                const existsPM = await permissionM.findOne({user:SU._id, module:Mod[l]._id})

                if (!existsPM) {
                    const SUPermissionM = new permissionM({
                        user:SU._id,
                        module:Mod[l]._id
                    })
                    await SUPermissionM.save()
                }                
            }
        }
    }    

}