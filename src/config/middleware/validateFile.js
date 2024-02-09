import multer from "multer";
import { upload } from "../functions/uploadFile.js";

const imageUp = upload.single('file')

export const validateFile = (req, res, next) => {
    imageUp(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json([err.code])
        } else if (err) {
            return res.status(400).json([err.code])
        }
        next()
      })
}