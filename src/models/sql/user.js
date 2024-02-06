import { DataTypes, Model } from "sequelize";
import { mssqlconnect, mysqlconnect } from "../../config/db/sql.js";


class User extends Model {}

User.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    category:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
}, {
    sequelize: mssqlconnect,
    modelName: 'User',
})

console.log(User === mssqlconnect.models.User);

export default User