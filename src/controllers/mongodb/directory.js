import fs from "fs";

var file =[]

export const DirectoryList = async (req, res) => {
    
    const newfile = fs.readdir('./src/routes/mongodb', (error, files) => {
        if (error) {
            throw error
        }

        files.forEach(function (data,i) {
            file[i]  = data.charAt(0).toUpperCase()+data.split('.').shift().slice(1)
        }) 
              
        return res.json(file.filter(file => file !== 'Auth' && file !== 'Directory' && file !== 'Usertype'))
    })
}
