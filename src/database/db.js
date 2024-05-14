import mysql from 'mysql2';

let mysqlConnection=null
export function mysqlConnect(){
if(!mysqlConnection){
    mysqlConnection=mysql.createConnection({
        host:"127.0.0.1",
        user:"root",
        password:"admin",
        database:"GymExercices",
    })
}
return mysqlConnection
}