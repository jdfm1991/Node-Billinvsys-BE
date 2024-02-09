import multer from "multer";
import Path from "path";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const extname = Path.extname(file.originalname)
        console.log(extname)
        if (extname === '.pdf') {
            cb(null,'./src/public/file/pdf')
        }
        if (extname === '.doc' || extname === '.docx') {
            cb(null,'./src/public/file/doc')
        }
        if (extname === '.xls' || extname === '.xlsx') {
            cb(null,'./src/public/file/xls')
        }
        if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.gif') {
            cb(null,'./src/public/img')
        }
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
        fileSize: 1024 * 1024 * 5, // 5 Mb
    },
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['.png', '.jpg', '.gif', '.jpeg','.doc','.docx','.xls','.xlsx','.pdf'];
        if (!(acceptableExtensions.includes(Path.extname(file.originalname)))) {
            const error = new Error('Invalid file type');
            error.code = 'INVALID_FILE_TYPE';
          return callback(error,false);
        }
        // added this
        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > (1024 * 1024 * 5)) {
            const error = new Error('file too long');
            error.code = 'FILE_TOO_LONG'
          return callback(error,false);
        }
        // --
        callback(null, true);
    }
})
