import { Express } from "express";
import auth from "./auth";
import bodyParser from "./bodyParser";
import cors from "./cors";

export default (app: Express) => {
  cors(app);
  bodyParser(app);
  auth(app);
};
