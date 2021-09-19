// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// endpoint for date
app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  console.log('📭', date)
  let output;
  const dateReg = new RegExp(/^\d{1,4}-\d{1,2}-\d{1,2}$/);
  const unixReg = new RegExp(/^\d+$/);
  // const utc = (new Date(date)).toString();
  // if (utc === "Invalid Date") res.send({ 'error': "Invalid Date" })
  const buildOutput = (unix, utc) => {
    if (utc === "Invalid Date") return { 'error': "Invalid Date" }
    else {
      // ! not very elegant, refactor
      utc = utc.substr(0, 3) + ', ' + utc.substr(8, 3) + utc.substr(4, 4) + utc.substr(11, 17);
      return { unix, utc }
    }
  }

  // for whatever reason, when date param is left empty, res.params.date becomes undefined instead of ''
  if (!date) {
    const unix = Date.now()
    const utc = (new Date(unix)).toString()
    output = buildOutput(unix, utc)
  } else if (dateReg.test(date)) {
    const unix = Date.parse(date)
    const utc = (new Date(date)).toString()
    output = buildOutput(unix, utc)
  } else if (unixReg.test(date)) {
    const unix = Number(date)
    const utc = (new Date(unix)).toString()
    output = buildOutput(unix, utc)
  } else {
    output = { 'error': "Invalid Date" }
  }

  res.send(output)
})

// endpoint for unix


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
