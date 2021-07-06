// Get our dependencies
var express = require('express');
var app = express();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USER || 'root',
  password : process.env.DB_PASS || 'root',
  database : process.env.DB_NAME || 'movie_db',
  port     : process.env.DB_PORT || 3305 
});

connection.connect();

//Healthcheck endpoint
app.get('/', function(req, res){
  var response = [{response : 'hello'}, {code : '200'}]
  res.json(response);
})

// Implement the movies API endpoint
app.get('/movies', async (req, res) => {
  connection.query('SELECT * FROM movie', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(rows);
  })
})

app.get('/reviewers', function(req, res){
  connection.query('SELECT * FROM reviewer', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(rows);
  })
})

app.get('/publications', function(req, res){
  connection.query('SELECT * FROM publication', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(rows);
  })
})

// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
  var pending = [
    {title : 'Superman: Homecoming', release: '2017', score: 10, reviewer: 'Chris Harris', publication: 'International Movie Critic'},
    {title : 'Wonder Woman', release: '2017', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Doctor Strange', release : '2016', score: 7, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
  ]
  res.json(pending);
})

const port = process.env.PORT || 3000;

console.log("server listening through port: " + port);
// Launch our API Server and have it listen on port 3000.
app.listen(port);
module.exports = app;
