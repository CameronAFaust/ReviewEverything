const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'review_everything'
});

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

// login
router.get('/:email/:password', (req, res) => {
    if (err) throw err;

        console.log(req);

        // This is a way to prevent SQL injection
        // "SELECT * FROM users WHERE email = '" + req.params.email + "'",
        connection.query("SELECT * FROM users WHERE email = ?",
        [ req.params.email ],
        function (err, results, fields) {
          results.forEach((result) => {

            console.log(result);

            bcrypt.compare(req.params.password, result.password, function (err, corr) {

              if(corr == true) {
                console.log(result);

              res.send(result);
              }

            });

          });

          if (err) throw err;

          // req.session.user = result;

    });

});

// signup
router.post('/', (req, res) => {
    if (err) throw err;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        let newUser = {username: req.body.fname + "_" + req.body.lname, fname: req.body.fname, lname: req.body.lname, email: req.body.email, password: hash};

        // connection.query("INSERT INTO users(username,fname,lname,email,password) VALUES('" + req.body.fname + "_" + req.body.lname + "','" + req.body.fname + "','" + req.body.lname + "','" + req.body.email + "','" + hash + "')", function (err, result, fields) {
        connection.query("INSERT INTO users SET ?", newUser, function (err, result, fields) {

          if (err) throw err;

          // req.session.user = result;

          console.log(result);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);
        });

      });
    });

});


module.exports = router;