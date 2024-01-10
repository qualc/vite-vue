import { Express } from "express";
import user from "./user";
import menu from "./menu";
import permission from "./permission";

export default (app: Express) => {
  app.use("/permission", permission);
  app.use("/user", user);
  app.use("/menu", menu);
};
