// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url = require('url');
var paramDate;
let unix = null;
let natural = null;

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

function naturalDate(urlDate) {
  if (!urlDate === null) {
    console.log(!urlDate === null);
    return urlDate.getDate() + "-" +(urlDate.getMonth() + 1) +"-"+ urlDate.getFullYear();
  } else {
  console.log(!urlDate === null);
    return null;
  }
}

function parseDate(unix, natural) {
    return {  
        'unix': unix,
        'natural': natural
    }
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/*", function (request, response) {
  if (isNaN(request.params[0])) {
    try {paramDate = new Date(request.params[0])}
    catch (e) {throw (e)}
  } else {
    try {paramDate = new Date(parseInt(request.params[0])*1000)}
    catch (e) {throw (e)}
  }
  if (paramDate) {
    unix = paramDate.getTime()/1000;
    natural = paramDate.getDate() + "-" +(paramDate.getMonth() + 1) +"-"+ paramDate.getFullYear();
    response.send(parseDate(unix, natural));
  } else {
    response.send(request.params[0]);
  }
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
