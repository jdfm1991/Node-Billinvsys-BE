import express from "express";
import { authRequired } from "../../config/middleware/validateToken.js";
import { validateFile } from "../../config/middleware/validateFile.js";
import { validateSchema } from "../../config/middleware/validateSchema.js";
import { fileSchemaRegister } from "../../config/schemas/filemanagement.js";
import { CreateFile, GetAllFile } from "../../controllers/mongodb/filemanagement.js";

const root = express.Router()

root.post('/file', authRequired, validateFile, validateSchema(fileSchemaRegister), CreateFile)

root.get('/file', GetAllFile)

root.put('/user/:id')

root.delete('/user/:id')

export default root;