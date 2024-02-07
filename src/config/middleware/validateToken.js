import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import User from "../../models/mongobd/user.js";

export const authRequired = (req, res, next) => {

    const token = req.headers.cookie ? req.headers.cookie.split('=').pop() : ''
    
    if (!token)  return res.status(401).json({
        message: "No Token, Authorization Denied",
    })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).json({
            message: "Invalid Token",
        })

        if (user.category !== 1) return res.status(403).json({
            message: "Invalid User",
        })

        

    })

    next()
}