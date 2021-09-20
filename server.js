// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// endpoint for date
app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  // console.log("📭", date);
  let output, unix, utc;
  const unixReg = new RegExp(/^\d+$/);
  const buildOutput = (unix, utc) => {
    if (utc === "Invalid Date") return { error: "Invalid Date" };
    else {
      // ! not very elegant, refactor
      utc =
        utc.substr(0, 3) +
        ", " +
        utc.substr(8, 3) +
        utc.substr(4, 4) +
        utc.substr(11, 17);
      return { unix, utc };
    }
  };

  // for whatever reason, when date param is left empty, res.params.date becomes undefined instead of ''
  if (!date) {
    //if input is empty
    unix = Date.now();
    utc = new Date(unix).toString();
  } else if (unixReg.test(date)) {
    //if input is in unix format
    unix = Number(date);
    utc = new Date(unix).toString();
  } else {
    unix = Date.parse(date);
    utc = new Date(date).toString();
  }

  output = buildOutput(unix, utc);
  res.send(output);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app;
