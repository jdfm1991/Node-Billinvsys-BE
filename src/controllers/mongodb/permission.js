import bcryptjs from "bcryptjs";
import data from "../../config/strings.json" assert { type: 'json' };
import UT from "../../models/mongobd/usertype.js";
import User from "../../models/mongobd/user.js";
import Department from "../../models/mongobd/department.js";
import Module from "../../models/mongobd/module.js";
import PD from "../../models/mongobd/permissionD.js";
import PM from "../../models/mongobd/permissionM.js";

const UserType = async() => {
    try {
        const type = data.usertypes
        for (let i = 0; i < type.length; i++) {
            const newtype = type[i].name;
            const curType = await UT.findOne({name:newtype})
            if (curType === null) {
                const newUT = new UT({
                    name: newtype
                });
                await newUT.save()
            }
        } 
    } catch (error) {
       console.log(error)
    }
}

const UserDefault = async() => {
    try {
        const SU = data.users
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
                })
                await newSU.save()
            } 
        }
    } catch (error) {
        console.log(error);
    }
}

const DepartmentDefault = async() => {
    try {
        const DEP = data.departments
        for (let i = 0; i < DEP.length; i++) {
            const curDep = await Department.findOne({name:DEP[i].name})
            if (!curDep) {
                const newDEP = new Department({
                    name: DEP[i].name,
                    icon: DEP[i].icon
                });
                await newDEP.save()
            }   
        }
    } catch (error) {
        console.log(error);
    }
}

const ModuleDefault = async() => {
    try {
        const MOD = data.modules
        for (let i = 0; i < MOD.length; i++) {
            const curModule = await Module.findOne({name:MOD[i].name})
            if (curModule === null) {
                const dep = await Department.findOne({name:/.*it.*/i})
                const newModule = new Module({
                    name: MOD[i].name,
                    icon: MOD[i].icon,
                    url: MOD[i].url,
                    department:dep._id
                });
                 await newModule.save()
            }
        } 
    } catch (error) {
        console.log(error);
    }
}

const PermissionSU = async () => {
    const SU = await User.findOne({name:'admin'})
    const Dep = await Department.find()
    for (let i = 0; i < Dep.length; i++) {
        const existsPD = await PD.findOne({user:SU._id, department:Dep[i]._id})
        if (!existsPD) {
            const newPD = new PD({
                user:SU._id,
                department:Dep[i]._id
            })
            await newPD.save()                        
        }
        const Mod = await Module.find()
        for (let l = 0; l < Mod.length; l++) {
            const existsPM = await PM.findOne({user:SU._id, module:Mod[l]._id})
            if (!existsPM) {
                const newPM = new PM({
                    user:SU._id,
                    module:Mod[l]._id
                })
                await newPM.save()
            }                
        }
    }    
}

export const init = async() => {
    await UserType()
    await UserDefault()
    await DepartmentDefault()
    await ModuleDefault()
    await PermissionSU()
}