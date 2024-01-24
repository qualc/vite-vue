import { Express } from "express";
import user from "./user";
import menu from "./menu";
import permission from "./permission";
import simpleFactory from "./simpleFactory";

const simpleRouter = ["notice", "config/banner"];

export default (app: Express) => {
  app.use("/permission", permission);
  app.use("/user", user);
  app.use("/menu", menu);

  simpleRouter.forEach((router) => {
    app.use(`/${router}`, simpleFactory(router));
  });
};
