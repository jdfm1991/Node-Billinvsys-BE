import dotenv from "dotenv";

const env = dotenv.config()

export const TOKEN_SECRET = 'some key'
const config = {
    app: {
        host: process.env.HOST_APP,
        port: process.env.PORT_APP
    },
    db: {
        host: process.env.HOST_DATADASE,
        port: process.env.PORT_DATADASE,
        dbname: process.env.NAME_DATADASE
    },
    valuedefault: {
        usertypedefault: process.env.DATA_USER_TYPE_DEDAULT,
        departmentdefault: process.env.DATA_DEPARTMENT_DEDAULT
    }
}

export default config