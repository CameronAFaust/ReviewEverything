const express = require('express');

const router = express.Router();

// need to be on pi-network
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: "3306",
  user: 'root',
  password: '',
  database: 'review_everything'
})

// connect to mysql
connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});

router.post('/', (req, res) => {
  connection.connect(function (err) {
     if (err) throw err;
    
      //  connection.query("INSERT INTO reviews_and_ratings(review_title,review_text,rating,movie_id,user_id) VALUES(" + req.body.review_title + "," + req.body.review_text + "," + "5" + "," + '9836' + "," + "tmep" + ")", function (err, result, fields) {
         
      //   //  if (err) console.log(err);
      //   console.log(err)

      //    console.log(result);
      //    console.log("Number of rows affected : " + result.affectedRows);
      //    console.log("Number of records affected with warning : " + result.warningCount);
      //    console.log("Message from MySQL Server : " + result.message);
      //  });
    
     });
    //         connection.query("INSERT INTO reviews_and_ratings(review_title,review_text,rating,movie_id,user_id) VALUES(" + req.body.review_title + "," + req.body.review_text + "," + req.body.rating + "," + req.body.movieid + "," + req.body.userid + ")", function (err, result, fields) {
});

module.exports = router;