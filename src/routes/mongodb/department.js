import express from "express";
import { CreateDepartment, DeleteDepartment, GetAllDepartments, GetDepartmentsByID } from "../../controllers/mongodb/department.js";
import { authRequired } from "../../config/middleware/validateToken.js";

const root = express.Router()

root.post('/department', CreateDepartment)

root.get('/department', authRequired, GetAllDepartments)

root.get('/department/:id', authRequired, GetDepartmentsByID)

root.delete('/department/:id', DeleteDepartment)

export default root;