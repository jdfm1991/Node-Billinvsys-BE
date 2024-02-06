import express from "express";
import { authRequired } from "../../config/middleware/validateToken.js";
import { CreateUser, DeleteUser, GetAllUser, GetUser, UpdateUser } from "../../controllers/mongodb/user.js";
import { upload } from "../../config/middleware/uploadImage.js";

const root = express.Router()

root.post('/user', upload.single('image'), CreateUser)

root.get('/user', GetAllUser)

root.get('/user/:id', GetUser)

root.put('/user/:id', upload.single('image'), UpdateUser)

root.delete('/user/:id', DeleteUser)

export default root;