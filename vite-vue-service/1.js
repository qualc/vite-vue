const express = require("express");
const app = express();

app.use("/", () => {
  console.log("###");
});
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
