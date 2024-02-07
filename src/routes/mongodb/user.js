import express from "express";
import { CreateUser, DeleteUser, GetAllUser, GetUser, UpdateUser } from "../../controllers/mongodb/user.js";
import { validateSchema } from "../../config/middleware/validateSchema.js";
import { validateImagen } from "../../config/middleware/validateImagen.js";
import { userSchemaRegister } from "../../config/schemas/user.js";
import { authRequired } from "../../config/middleware/validateToken.js";

const root = express.Router()

root.post('/user', validateImagen, validateSchema(userSchemaRegister), CreateUser)

root.get('/user/', authRequired, GetAllUser)

root.get('/user/:id', GetUser)

root.put('/user/:id', validateImagen, validateSchema(userSchemaRegister), UpdateUser)

root.delete('/user/:id', DeleteUser)

export default root;