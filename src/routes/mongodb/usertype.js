import express from "express";
import { CreateTypeUser } from "../../controllers/mongodb/usertype.js";


const root = express.Router()

CreateTypeUser()

export default root;