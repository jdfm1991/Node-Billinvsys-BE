import express from "express";
import { validateSchema } from "../../config/middleware/validateSchema.js";
import { loginSchema, registerSchema } from "../../config/schemas/auth.js";
import { authRequired } from "../../config/middleware/validateToken.js";
import { CreateUser } from "../../controllers/sql/auth.js";

const root = express.Router()

root.post('/userreg', validateSchema(registerSchema), CreateUser)


export default root;