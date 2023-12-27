const express = require("express");
const app = express();
const overwrite = require("./lib/overwrite");
const router = require("./router");
const middleware = require("./middleware");

middleware(app);
overwrite(app);
router(app);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
