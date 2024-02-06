import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./src/public/img/uploads')//Ruta de Imagen Original
    },
    filename: (req,file,cb) => {
        const name = file.originalname
        //const ext = file.originalname.split('.').pop()
        cb(null,`${name}`)
    }
})

export const upload = multer({
    storage:storage,
})
