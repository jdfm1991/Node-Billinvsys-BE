import UserType from "../../models/mongobd/usertype.js";


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

export const GetUserTypes = async (req, res) => {
    try {
        const AllData = await UserType.find()
        res.status(200).json(AllData)
    } catch (error) {
        res.json({message: error.message})
    }
}