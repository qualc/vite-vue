import express from "express";
import router from "./router";
import middleware from "./middleware";
import overwrite from "@/lib/overwrite";
const app = express();

overwrite(app);
middleware(app);
router(app);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
