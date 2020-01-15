const express = require('express');

const router = express.Router();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'pi-jbaja',
  user: 'root',
  password: '',
  database: 'review_everything'
})

// connection.connect(function (err) {
//   if (err) throw err;

//   connection.query("INSERT INTO reviews_and_ratings(review_title,review_text,rating,movie_id,user_id) VALUES()", function (err, result, fields) {
//     // if any error while executing above query, throw error
//     if (err) throw err;
//     // if there is no error, you have the result
//     console.log(result);
//     console.log("Number of rows affected : " + result.affectedRows);
//     console.log("Number of records affected with warning : " + result.warningCount);
//     console.log("Message from MySQL Server : " + result.message);
//   });

// });

router.post('/', (req, res) => {
  connection.connect(function (err) {
     if (err) throw err;
    
       connection.query("INSERT INTO reviews_and_ratings(review_title,review_text,rating,movie_id,user_id) VALUES(" + req.body.review_title + "," + req.body.review_text + "," + req.body.rating + "," + req.body.movieid + "," + req.body.userid + ")", function (err, result, fields) {

         if (err) throw err;

         console.log(result);
         console.log("Number of rows affected : " + result.affectedRows);
         console.log("Number of records affected with warning : " + result.warningCount);
         console.log("Message from MySQL Server : " + result.message);
       });
    
     });
});

module.exports = router;