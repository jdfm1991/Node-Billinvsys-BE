import multer from "multer";
import Path from "path";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./src/public/img/uploads')//Ruta de Imagen Original
    },
    filename: (req,file,cb) => {
        const name = file.originalname
        cb(null,`${name}`)
    }
})

export const upload = multer({
    storage:storage,
    limits: {
        fieldNameSize: 300,
        fileSize: 1024 * 1024 * 3, // 3 Mb
    },
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['.png', '.jpg', '.gif', '.jpeg'];
        if (!(acceptableExtensions.includes(Path.extname(file.originalname)))) {
            const error = new Error('Invalid file type');
            error.code = 'INVALID_FILE_TYPE';
          return callback(error,false);
        }
        // added this
        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > (1024 * 1024 * 3)) {
            const error = new Error('file too long');
            error.code = 'FILE_TOO_LONG'
          return callback(error,false);
        }
        // --
        callback(null, true);
      }
})
