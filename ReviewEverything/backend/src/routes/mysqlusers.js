const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

var mysql = require('mysql')
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
  console.log(req)

  connection.query("SELECT * FROM users WHERE email = '" + req.params.email + "'", function (err, results, fields) {

    results.forEach((result) => {

      console.log(result);

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

router.get('/admin/:id', (req, res) => {
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

      connection.query("INSERT INTO users(username,fname,lname,email,password,is_admin) VALUES('" + username + "','" + req.body.fname + "','" + req.body.lname + "','" + req.body.email + "','" + hash + "','" + 0 + "')", function (err, result, fields) {

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

router.put('/', (req, res) => {

  const subfname = req.body.fname.substring(0, 3).toLowerCase();
  const sublname = req.body.lname.substring(0, 1).toLowerCase();
  const username = subfname + sublname;
  console.log(username);

  connection.query("UPDATE INTO users SET username = '" + username + "' WHERE id = '" + req.body.id + "'", function (err, result, fields) {

    if (err) throw err;

    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });

});

router.delete('/del/:id', (req, res) => {
  console.log(req)

  connection.query("DELETE FROM users WHERE id = '" + req.params.id + "'", function (err, result, fields) {
    console.log(result);

    if (err) throw err;

    // req.session.user = result;

  });

});


module.exports = router;