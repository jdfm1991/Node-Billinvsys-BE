import express from "express";
import { CreateModule, GetAllModules } from "../../controllers/mongodb/module.js";
import { authRequired } from "../../config/middleware/validateToken.js";

const root = express.Router()

root.post('/module', CreateModule)

root.get('/module', authRequired, GetAllModules)


CreateModule()


export default root;