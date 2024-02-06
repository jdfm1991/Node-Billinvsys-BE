import app from "./src/app.js";
import  config from "./src/config/config.js";
import { mongodbconnect } from "./src/config/db/mongodb.js";

const port = config.app.port || 5000
const host_bd = config.db.host
const port_db = config.db.port
const dbname = config.db.dbname

const init = async (port,host_bd,port_db,dbname) =>{
    try {
        await mongodbconnect(host_bd,port_db,dbname)
        app.listen(port, () =>[
        console.log(`Server on Port ${port}`)
])
        
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

init(port,host_bd,port_db,dbname)