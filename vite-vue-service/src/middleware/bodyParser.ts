import { Express } from "express";
import bodyParser from "body-parser";

export default (app: Express) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  console.log("[INFO] bodyParser enabled");
};
