var envs = [];
const settings = require("./env.json");

//production
envs["production"] = {
  name: "production",
  url: "https://your_site_name.domain/api/",
  https: true,
  port: 4001,
  settings: settings.production,
  common: settings.common,
  redirectTo: "https://your_site_name.domain/",
  hostUrl: "https://your_site_name.domain/",
};
//development
envs["development"] = {
  name: "development",
  url: "http://localhost/pmt_server_development/uploads/",
  https: false,
  port: 3001,
  settings: settings.development,
  common: settings.common,
  redirectTo: "http://localhost:3001/",
  hostUrl: "http://localhost:3001/",
};

var env = process.env.NODE_ENV;
if (!env || !envs[env]) {
  console.log(
    "NODE_ENV is undefined or its value was not understood. Default to development mode. "
  );
  env = "development";
}
module.exports = envs[env];