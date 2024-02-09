import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { createdToken } from "../../config/functions/jwt.js";
import User from "../../models/mongobd/user.js";
import { resizeImage } from "../../config/functions/resizeImage.js";
import { TOKEN_SECRET } from "../../config/config.js";

export const CreateUser = async (req, res) => {
    try {
        const DataIns = req.body
        const PasswEnc = await bcryptjs.hash(DataIns.password,10)
        const Dataimg = req.file ? req.file.filename:'NoImage.jpg'
        const newUser = new User({
            name: DataIns.name,
            email:DataIns.email,
            password: PasswEnc,
            status: DataIns.status,
            image: Dataimg,
		    category: DataIns.category,
        });
        //newUser.getUrlImg(Dataimg)
        if (req.file) {
            resizeImage(req.file.path, `RS-100px-${req.file.filename}` ,100)
            resizeImage(req.file.path, `RS-250px-${req.file.filename}` ,250)
            resizeImage(req.file.path, `RS-500px-${req.file.filename}` ,500)
        }
        const Data = await newUser.save()
        const token = await createdToken({id: Data._id})
        res.cookie('token', token)
        res.status(201).json({
            ok: true,
            status:201,
            id: Data._id,
            name: Data.name,
            email:Data.email,
            message: "User Created Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const LoginUser = async (req, res) => {
    const {email, password } = req.body
    try {
        const userDB = await User.findOne({ email })

        if (!userDB) return res.status(400).json("User Not Found")

        const isMatch = await bcryptjs.compare(password,userDB.password)

        if (!isMatch) return res.status(400).json("Pass Invalided")

        const token = await createdToken({id: userDB._id, category:userDB.category })
        res.cookie('token', token)
        res.json({
            id: userDB._id,
            name: userDB.name,
            email:userDB.userDB,
            message: "User logged Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const LogoutUser = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const ProfileUser = async (req, res) => {
    const userCK = await User.findById(req.user.id)

    if (!userCK) return res.status(400).json({
        message: "User Not Found"
    })
    return res.json({
        id: userCK._id,
        username: userCK.username,
        email:userCK .userDB,
        message: "User logged Successfully"
    })

}

export const VerifyToken = async (req, res) => {
    const token = req.body.token
    
    if (!token) return res.status(401).json({
        message: "Unauthorized"
    })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({
            message: "Unauthorized"
        })

        const userFound = await User.findById( {_id:user.id} )

        if (!userFound) return res.status(401).json({
            message: "Unauthorized"
        })

        return res.json({
            id: userFound._id,
            name: userFound.name,
            email:userFound.email,
        })
    })
}
