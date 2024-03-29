import File from "../../models/mongobd/filemanagement.js";
import User from "../../models/mongobd/user.js";

export const CreateFile = async (req, res) => {
    try {
        const DataIns = req.body
        const DataFile = req.file.filename
        const newFile = new File({
            filename: DataIns.filename,
            file: DataFile,
            user: req.user.id,
            status: DataIns.status,
		    
        });
   
        const Data = await newFile.save()

        res.status(201).json({
            ok: true,
            status:201,
            id: Data._id,
            filename: Data.filename,
            message: "File Upload Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const GetAllFile = async (req, res) => {
    try {
        const curUser = await User.findOne({_id:id})
        
        const AllFile = await File.find()
        res.status(200).json(AllFile)
    } catch (error) {
        res.json({message: error.message})
    }
}