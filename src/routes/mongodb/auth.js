import express from "express";
import { CreateUser, LoginUser, LogoutUser, ProfileUser, VerifyToken } from "../../controllers/mongodb/auth.js";
import { validateSchema } from "../../config/middleware/validateSchema.js";
import { loginSchema, registerSchema } from "../../config/schemas/auth.js";
import { authRequired } from "../../config/middleware/validateToken.js";

const root = express.Router()

root.post('/userreg',validateSchema(registerSchema), CreateUser)

root.post('/login', validateSchema(loginSchema), LoginUser)

root.post('/logout', LogoutUser)

root.get('/profile', authRequired, ProfileUser)

root.post('/token', VerifyToken)


export default root;