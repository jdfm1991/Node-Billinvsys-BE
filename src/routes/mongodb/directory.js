import express from "express";
import { DirectoryList } from "../../controllers/mongodb/directory.js";

const root = express.Router()

root.get('/directory', DirectoryList)

export default root;