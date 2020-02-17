const express = require('express');

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

// get all reviews for a single movie
router.get('/movie/:movieID', (req, res) => {
    
      // connection.query("SELECT * FROM reviews_and_ratings WHERE movie_id = '"+ req.params.movieID +"'", function (err, result, fields) {
      connection.query("SELECT * FROM reviews_and_ratings WHERE movie_id = ?", [ req.params.movieID ], function (err, result, fields) {

      if (err) throw err;

      console.log(result);

      res.send(result);
       });

    //  connection.end();
});

router.get('/user/:userID', (req, res) => {
    
  // connection.query("SELECT * FROM reviews_and_ratings WHERE movie_id = '"+ req.params.movieID +"'", function (err, result, fields) {
  connection.query("SELECT * FROM reviews_and_ratings WHERE user_id = ?", [ req.params.userID ], function (err, result, fields) {

  if (err) throw err;

  console.log(result);

  res.send(result);
   });

//  connection.end();
});

// create review
router.post('/', (req, res) => {
  // if(req.isAuthenticated()) {
  //   res.send('you hit the authentication endpoint\n')
  // } else {
  //   res.redirect('/')
  // }
  // connection.query("INSERT INTO reviews_and_ratings(review_title,review_text,rating,movie_id,username,user_id) VALUES('" + req.body.review_title + "','" + req.body.review_text + "','" + req.body.rating + "','" + req.body.movieID + "','" + req.body.username + "','" + req.body.userID + "')", function (err, result, fields) {
  let newReview = {review_title: req.body.review_title, review_text: req.body.review_text, rating: req.body.rating, movie_id: req.body.movieID, username: req.body.username, user_id: req.body.userID};
  connection.query("INSERT INTO reviews_and_ratings SET ?", newReview, function (err, result, fields){
    if (err) throw err;

    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });
     
});

router.put('/', (req, res) => {
  
  console.log(req.body.reviewID);

  let updateReview = {review_title: req.body.review_title, review_text: req.body.review_text, rating: req.body.rating, username: req.body.username};
    
  // connection.query("UPDATE reviews_and_ratings SET review_title = '" + req.body.review_title + "', review_text = '" + req.body.review_text + "', rating = '" + req.body.rating + "' WHERE id = '" + req.body.reviewID + "'", function (err, result, fields) {
  connection.query("UPDATE reviews_and_ratings SET ? WHERE id = '" + req.body.reviewID + "'", updateReview, function (err, result, fields) {

    if (err) throw err;

    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });

});

router.delete('/:reviewID', (req, res) => {
  console.log(req.params.reviewID);  

  connection.query("DELETE FROM reviews_and_ratings WHERE reviews_and_ratings.id = ?", [req.params.reviewID], function (err, result, fields) {

    if (err) throw err;

    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });

});

router.delete('/:userID', (req, res) => {
  console.log(req.params.reviewID);  

  connection.query("DELETE FROM reviews_and_ratings WHERE reviews_and_ratings.user_id = ?", [req.params.userID], function (err, result, fields) {

    if (err) throw err;

    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });

});

module.exports = router;