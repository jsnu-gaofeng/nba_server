const errorhandle = (err, ctx) => {
  ctx.status = 404;
  ctx.body = err.message;
  console.log("报错", err.message);
};
module.exports = errorhandle;
