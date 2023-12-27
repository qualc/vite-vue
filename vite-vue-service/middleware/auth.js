const { whiteList } = require("../config/auth");
module.exports = (app) => {
  app.use((req, res, next) => {
    if (whiteList.includes(req.path)) {
      return next();
    }
    const auth = req.headers.authorization;
    if (!auth) {
      return res.sendError("No authorization header provided.", null, 401);
    }
    const token = auth.split(" ")[1];
    if (!token) {
      return res.sendError("No token provided.", null, 401);
    }
    next();
  });
  console.log("[INFO] auth enabled");
};
