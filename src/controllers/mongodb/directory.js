import fs from "fs";

var file =[]

export const DirectoryList = async (req, res) => {
    
    const newfile = fs.readdir('./src/routes/mongodb', (error, files) => {
        if (error) {
            throw error
        }

        files.forEach(function (data,i) {
            file[i]  = data.split('.').shift()
        }) 
              
        return res.json(file.filter(file => file !== 'auth' && file !== 'directory'))
    })
}
