const Router = require("koa-router");
const relayHandle = require("../router_handdle/relay.handle");
const relayRouter = new Router({ prefix: "/node" });
relayRouter.get("/relay/cats", relayHandle.get);

module.exports = relayRouter;
