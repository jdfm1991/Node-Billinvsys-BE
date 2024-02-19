import express from "express";
import { CreateTypeUser, GetUserTypes } from "../../controllers/mongodb/usertype.js";
import { authRequired } from "../../config/middleware/validateToken.js";


const root = express.Router()

root.get('/usertypes/', authRequired, GetUserTypes)


export default root;