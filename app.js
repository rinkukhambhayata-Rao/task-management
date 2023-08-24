var express = require("express");
var path = require("path");
var app = express();
config = {};
config.env = require("./config/env.config");
const Database = require("./config/database");
var http = require("http");
var https = require("https");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const routes = require("./routes");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Api Routes initialise
// require("./routes/index")(app);
app.use('/api', routes);

function databaseConnectivity(envName) {
    Database.config(
      config.env.name === envName
        ? config.env.settings.dbaddress
        : config.env.common.dbaddress,
      config.env.name === envName
        ? config.env.settings.dbname
        : config.env.common.dbname,
      config.env.name === envName
        ? config.env.settings.dbusername
        : config.env.common.dbusername,
      config.env.name === envName
        ? config.env.settings.dbpassword
        : config.env.common.dbpassword,
      config && config.databaseOption ? config.databaseOption : undefined,
      (err, message) => {
        if (!err)
          console.info("Mongodb is connected to " + config.env.settings.dbname);
        else console.error(`Mongodb Error:${message}`);
      }
    );
}

if (config.env.name === "production") {
    var credentials = {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/conduct.raoinformationtechnology.com/privkey.pem"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/conduct.raoinformationtechnology.com/fullchain.pem"
      ),
    };
    databaseConnectivity(config.env.name);
    var server = https.createServer(credentials, app);
    server.listen(config.env.port);
}else {
    if (config.env.name === "development" && config.env.https) {
      var server = http.createServer(
        {
          key: fs.readFileSync("./ssl/privkey.pem"),
          cert: fs.readFileSync(".//ssl/fullchain.pem"),
        },
        app
      );
      databaseConnectivity(config.env.name);
    } else {
      databaseConnectivity(config.env.name);
      var server = http.createServer(app);
    }
    server.listen(config.env.port);
}

module.exports = app;