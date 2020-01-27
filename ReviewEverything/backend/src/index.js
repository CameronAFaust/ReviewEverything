const express = require('express');
const cors = require('cors');
const uuid = require('uuid/v4');
var session = require('express-session');
const FileStore = require('session-file-store')(session);
let routes = require('./routes');

// require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/user', routes.user);
app.use('/review', routes.review);

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    return uuid(); // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


app.listen(3000);