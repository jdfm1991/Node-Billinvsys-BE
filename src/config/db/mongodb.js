import mongoose from "mongoose";

export const mongodbconnect = async (host,port,dbname) => {
    const URI = `mongodb://${host}:${port}/${dbname}`
    try {
        await mongoose.connect(URI)
        console.log('conectado a mongodb')
    } catch (error) {
       console.log(error) 
    }
} 