import express from "express";
import { authRequired } from "../../config/middleware/validateToken.js";
import { DeleteUser, GetAllUser, GetUser, UpdateUser } from "../../controllers/sql/user.js";
import { CreateUser } from "../../controllers/sql/auth.js";
import { createdToken } from "../../config/funtions/jwt.js";

const root = express.Router()

root.post('/user', (req, res) => {

    console.log('lsl'+req.body.name)
})

root.get('/user', GetAllUser)

root.get('/user/:id', GetUser)

root.put('/user/:id', UpdateUser)

root.delete('/user/:id', DeleteUser)

export default root;