import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import UserRoot from "./routes/mongodb/user.js";
import AuthRoot from "./routes/mongodb/auth.js";

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
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use('/api', AuthRoot)
app.use('/api', UserRoot)

export default app