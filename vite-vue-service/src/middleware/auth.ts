import { Express } from "express";
import { whiteList } from "../config/auth";
import { HttpCode } from "../constant/http";
export default (app: Express) => {
  app.use((req, res, next) => {
    if (whiteList.includes(req.path)) {
      return next();
    }
    const auth = req.headers.authorization;
    if (!auth) {
      return res.sendError(
        "No authorization header provided.",
        HttpCode.Unauthorized,
      );
    }
    const token = auth.split(" ")[1];
    if (!token) {
      return res.sendError("No token provided.", HttpCode.Unauthorized);
    }
    next();
  });
  console.log("[INFO] auth enabled");
};
