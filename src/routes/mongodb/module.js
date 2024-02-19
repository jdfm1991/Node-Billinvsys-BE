import express from "express";
import { CreateModule, GetAllModules, GetModulesAvailable } from "../../controllers/mongodb/module.js";
import { authRequired } from "../../config/middleware/validateToken.js";

const root = express.Router()

root.post('/module', authRequired, CreateModule)

root.get('/module', authRequired, GetAllModules)

root.get('/module/available', authRequired, GetModulesAvailable)

export default root;