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
router.get('/get/:email/:password', (req, res) => {
  console.log(req.params.email);

  // This is a way to prevent SQL injection
  // "SELECT * FROM users WHERE email = '" + req.params.email + "'",
  connection.query("SELECT * FROM users WHERE email = ?", [req.params.email], function (err, results, fields) {
    results.forEach((result) => {

      bcrypt.compare(req.params.password, result.password, function (err, corr) {

        if (corr == true) {
          console.log(result);

          res.send(result);
        }

      });

    });

    if (err) throw err;

    // req.session.user = result;

  });

});

router.get('/getUser/:id', (req, res) => {
  console.log(req)

  connection.query("SELECT * FROM users WHERE id = '" + req.params.id + "'", function (err, result, fields) {
    console.log(result);

    res.send(result);

    if (err) throw err;

    // req.session.user = result;

  });


});

// signup
router.post('/', (req, res) => {

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {

      const subfname = req.body.fname.substring(0, 3).toLowerCase();
      const sublname = req.body.lname.substring(0, 1).toLowerCase();
      const username = subfname + sublname;
      console.log(username);

      let newUser = { username: username, fname: req.body.fname, lname: req.body.lname, email: req.body.email, password: hash };
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

// edit user
router.put('/', (req, res) => {

  // const subfname = req.body.fname.substring(0, 3).toLowerCase();
  // const sublname = req.body.lname.substring(0, 1).toLowerCase();
  // const username = subfname + sublname;
  // console.log(username);

      let updateUser = {username: req.body.username, email: req.body.email};

      connection.query("UPDATE users SET ? WHERE id = '" + req.body.id + "'", updateUser, function (err, result, fields) {

        if (err) throw err;

        console.log(result);
        console.log("Number of rows affected : " + result.affectedRows);
        console.log("Number of records affected with warning : " + result.warningCount);
        console.log("Message from MySQL Server : " + result.message);
      });

});

router.put('/passowrd', (req, res) => {

  // const subfname = req.body.fname.substring(0, 3).toLowerCase();
  // const sublname = req.body.lname.substring(0, 1).toLowerCase();
  // const username = subfname + sublname;
  // console.log(username);

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {

      let updateUser = {password: hash};

      connection.query("UPDATE users SET ? WHERE id = '" + req.body.id + "'", updateUser, function (err, result, fields) {

        if (err) throw err;

        console.log(result);
        console.log("Number of rows affected : " + result.affectedRows);
        console.log("Number of records affected with warning : " + result.warningCount);
        console.log("Message from MySQL Server : " + result.message);
      });
    });

  });
});

// delete user
router.delete('/:userID', (req, res) => {

  connection.query("DELETE FROM users WHERE users.id = ?", [req.params.userID], function (err, result, fields) {

    if (err) throw err;

    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });

});



module.exports = router;