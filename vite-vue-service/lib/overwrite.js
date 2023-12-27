module.exports = (app) => {
  const _send = app.response.send;
  app.response.send = function (body) {
    _send.call(
      this,
      JSON.stringify({
        code: 200,
        data: body,
      }),
    );
    return this;
  };
  app.response.sendError = function (msg, code = 500, data) {
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
