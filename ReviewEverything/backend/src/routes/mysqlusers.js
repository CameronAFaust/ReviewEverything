const express = require('express');

const router = express.Router();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'review_everything'
})

// connection.connect(function (err) {
//   if (err) throw err;

//   connection.query("INSERT INTO users(fname,lname,street,city,state,zip_code,email,password,phone) VALUES()", function (err, result, fields) {
//     // if any error while executing above query, throw error
//     if (err) throw err;
//     // if there is no error, you have the result
//     console.log(result);
//     console.log("Number of rows affected : " + result.affectedRows);
//     console.log("Number of records affected with warning : " + result.warningCount);
//     console.log("Message from MySQL Server : " + result.message);
//   });

// });

router.get('/', (req, res) => {
  connection.connect(function (err) {
    if (err) throw err;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {

        connection.query("SELECT * FROM users WHERE(email = '" + req.body.email + "' AND password = '" + hash + "')", function (err, result, fields) {

          if (err) throw err;

          console.log(result);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);


          return result;
        });

      });
    });

  });
});

router.post('/', (req, res) => {
  connection.connect(function (err) {
    if (err) throw err;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {

        connection.query("INSERT INTO users(username,fname,lname,email,password) VALUES('" + req.body.fname + " " + req.body.lname + "','" + req.body.fname + "','" + req.body.lname + "','" + req.body.email + "','" + hash + "')", function (err, result, fields) {

          if (err) throw err;

          console.log(result);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);
        });

      });
    });

  });
});

module.exports = router;