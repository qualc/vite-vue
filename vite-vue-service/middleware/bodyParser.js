const bodyParser = require("body-parser");

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  console.log("[INFO] bodyParser enabled");
};
