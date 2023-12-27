const auth = require("./auth");
const bodyParser = require("./bodyParser");
const cors = require("./cors");

module.exports = (app) => {
  cors(app);
  bodyParser(app);
  auth(app);
};
