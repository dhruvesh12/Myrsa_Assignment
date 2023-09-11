

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 8111
  
});

let createEmployeeTable = `create table if not exists Employee.employeeData(
    id int primary key auto_increment,
    FName varchar(255)not null,
    LName varchar(255)not null,
    Age tinyint(1) not null default 0
)`;


const connect = ()=>{
    con.connect(function(err,result) {
        if (err) throw err;
        console.log("Database Connected!");
      });
    
    con.query(`CREATE DATABASE IF NOT EXISTS Employee;`,(err,response)=>{
        if(err) throw err

        if(response.affectedRows == 1){
            console.log("Created Database Employee")
        }else{
            console.log("Database Employee Already Created")
        }
    });

    con.query(createEmployeeTable, function(err, results) {
        if (err) {
          console.log(err.message);
        }

        if(results.warningCount == 0){
            console.log("Employee Table Created")
        }else{
            console.log("Employee Table Already Exist")
        }
      });

    
}

module.exports = {connect :connect, DB : con}