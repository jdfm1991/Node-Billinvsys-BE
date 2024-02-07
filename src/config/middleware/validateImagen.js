import multer from "multer";
import { upload } from "../../config/middleware/uploadImage.js";

const imageUp = upload.single('image')

export const validateImagen = (req, res, next) => {
    imageUp(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json([err.code])
        } else if (err) {
            return res.status(400).json([err.code])
        }
        next()
      })
}