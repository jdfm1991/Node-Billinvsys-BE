import express from "express";
import { CreateModule, GetAllModules } from "../../controllers/mongodb/module.js";

const root = express.Router()

root.post('/module', CreateModule)

root.get('/module', GetAllModules)


CreateModule()


export default root;