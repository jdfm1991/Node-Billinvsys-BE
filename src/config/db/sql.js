import  Sequelize  from "sequelize";

export const mysqlconnect = new Sequelize('proyecto1','root','20975144',{
    dialect: 'mysql',
    host: 'localhost',
})

try {
    await mysqlconnect.authenticate();
    console.log('se conecto a mysql');
} catch (error) {
    console.error('no conecto a mysql:', error);
}

export const mssqlconnect = new Sequelize('proyecto1','sa','20975144',{
    dialect: 'mssql',
    host: 'localhost',
})

try {
    await mssqlconnect.authenticate();
    console.log('se conecto a sql server');
} catch (error) {
    console.error('no conecto a sql server:', error);
}




