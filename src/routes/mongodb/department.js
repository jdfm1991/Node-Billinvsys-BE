import express from "express";
import { CreateDepartment, DeleteDepartment, GetAllDepartments } from "../../controllers/mongodb/department.js";
import { authRequired } from "../../config/middleware/validateToken.js";

const root = express.Router()

root.post('/department', CreateDepartment)

root.get('/department', authRequired, GetAllDepartments)

root.delete('/department/:id', DeleteDepartment)

CreateDepartment()


export default root;