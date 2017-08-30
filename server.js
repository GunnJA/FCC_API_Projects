// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url = require('url');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

function parseDate(urlDate) {
    return {  
        'unix': Date.now(urlDate),
        'natural': urlDate.getMonth() + urlDate.getYear()
    }
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/*", function (request, response) {
  let urlStr = Date.parse(request.url);
  let timeStr = new Date(urlStr);
  response.send(parseDate(timeStr));
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
