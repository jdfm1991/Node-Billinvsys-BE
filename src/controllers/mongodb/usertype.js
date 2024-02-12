import UserType from "../../models/mongobd/usertype.js";
import data from "../../config/strings.json" assert { type: 'json' };

const type = data.usertypes

export const CreateTypeUser = async (req, res) => {
    
    try {
        for (let i = 0; i < type.length; i++) {
            const newtype = type[i].name;
            const curType = await UserType.findOne({name:newtype})
            if (curType === null) {
                const newType = new UserType({
                    name: newtype
                });
                await newType.save()
            }
        } 
    } catch (error) {
       console.log(error)
    }
    
}