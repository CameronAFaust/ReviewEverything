var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'review_everything'
})

connection.connect(function (err) {
  if (err) throw err;

  connection.query("INSERT INTO users(fname,lname,street,city,state,zip_code,email,password,phone) VALUES('Chew','Bacca','9 Space St.','Matmata','CA',90052,'chewie@starwars.com','$2b$10$UCWt20G.HaOH4sbvPG5gGeStj9boyonl22pvsu/1YmVi/Tw3Jipr6','(111)222-3333')", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });

});