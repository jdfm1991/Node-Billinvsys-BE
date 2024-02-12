import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { PermissionSU } from "./controllers/mongodb/permission.js";
import TypeUserRoot from "./routes/mongodb/usertype.js";
import UserRoot from "./routes/mongodb/user.js";
import DepartmentRoot from "./routes/mongodb/department.js";
import ModuleRoot from "./routes/mongodb/module.js";
import AuthRoot from "./routes/mongodb/auth.js";
import FileRoot from "./routes/mongodb/filemanagement.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
// enable cors
app.use(
    cors({
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
PermissionSU()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use('/api', TypeUserRoot)
app.use('/api', UserRoot)
app.use('/api', DepartmentRoot)
app.use('/api', ModuleRoot)
app.use('/api', AuthRoot)
app.use('/api', FileRoot)

export default app