import { Express } from "express";

export default (app: Express) => {
  const _send = app.response.send;
  app.response.send = function <T = any>(body: T, code = 200) {
    _send.call(
      this,
      JSON.stringify({
        code,
        data: body,
      }),
    );
    return this;
  };
  app.response.sendError = function <T>(
    msg = "系统异常",
    code = 500,
    data?: T,
  ) {
    _send.call(
      this,
      JSON.stringify({
        code,
        data,
        msg,
      }),
    );
    return this;
  };
};
