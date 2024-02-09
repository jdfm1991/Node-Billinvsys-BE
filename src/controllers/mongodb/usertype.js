import UserType from "../../models/mongobd/usertype.js";
import config from "../../config/config.js";

const valuedefault = config.valuedefault.usertypedefault.split(',')

export const CreateTypeUser = async (req, res) => {
    try {
        const existsType = await UserType.countDocuments()
        if (existsType < valuedefault.length) {
            for (let i = 0; i < valuedefault.length; i++) {
                const type = valuedefault[i];
                const curType = await UserType.findOne({name:type})
                if (!curType) {
                    const newType = new UserType({
                        name: type,
                    });
                    await newType.save()
                }
            }  
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}